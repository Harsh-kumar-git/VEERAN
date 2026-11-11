const MAX_INPUT_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

export const processImageFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      reject(new Error('Invalid file type. Please upload a valid image file.'));
      return;
    }

    if (file.size > MAX_INPUT_FILE_SIZE) {
      reject(new Error('File size exceeds the 10MB limit. Please upload a smaller image.'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Max dimensions: ~800px on longest side
        const MAX_SIZE = 800;

        if (width > height && width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context could not be acquired.'));
          return;
        }

        // Fill white background in case of transparent pngs converted to jpeg
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP if supported, otherwise JPEG. Compression ~0.7 targets ~150kb
        let dataUrl = canvas.toDataURL('image/webp', 0.7);
        
        // If webp isn't supported resulting in larger fallback, use jpeg
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        }

        resolve(dataUrl);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image. File may be corrupted.'));
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file from disk.'));
    };

    reader.readAsDataURL(file);
  });
};
