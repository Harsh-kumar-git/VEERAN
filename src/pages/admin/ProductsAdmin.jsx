import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories } from '../../services/dataService';
import { processImageFile } from '../../utils/imageProcess';
import { getWhatsAppLink } from '../../utils/whatsapp';
import Modal from '../../components/admin/Modal';
import Toast from '../../components/admin/Toast';
import { Plus, Edit2, Trash2, Image as ImageIcon, Upload, Link as LinkIcon, Copy, X, Search } from 'lucide-react';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Toast State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  
  // Form State
  const [uploadMode, setUploadMode] = useState('url'); // 'url' | 'upload'
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [originalFormData, setOriginalFormData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    price: '',
    imageUrl: '',
    featured: false,
    in_stock: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProducts(getProducts());
    setCategories(getCategories());
  };

  const handleOpenModal = (product = null) => {
    let payload;
    if (product) {
      setEditingProduct(product);
      payload = {
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        price: product.price,
        imageUrl: product.imageUrl,
        featured: product.featured,
        in_stock: product.in_stock
      };
      setUploadMode(product.imageUrl?.startsWith('data:') ? 'upload' : 'url');
    } else {
      setEditingProduct(null);
      payload = {
        name: '',
        description: '',
        categoryId: categories.length > 0 ? categories[0].id : '',
        price: '',
        imageUrl: '',
        featured: false,
        in_stock: true
      };
      setUploadMode('url');
    }
    setFormData(payload);
    setOriginalFormData(payload);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (editingProduct && JSON.stringify(formData) !== JSON.stringify(originalFormData)) {
      if (!window.confirm("You have unsaved changes. Are you sure you want to discard them?")) {
        return;
      }
    }

    setIsModalOpen(false);
    setTimeout(() => {
      setEditingProduct(null);
      setOriginalFormData(null);
      setFormData({ name: '', description: '', categoryId: '', price: '', imageUrl: '', featured: false, in_stock: true });
    }, 300);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleCopyWhatsApp = (product) => {
    const link = getWhatsAppLink(product.name);
    navigator.clipboard.writeText(link)
      .then(() => showToast('WhatsApp link copied!'))
      .catch(() => showToast('Failed to copy link', 'error'));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsProcessingImage(true);
      const base64Str = await processImageFile(file);
      setFormData(prev => ({ ...prev, imageUrl: base64Str }));
      setIsProcessingImage(false);
    } catch (err) {
      showToast(err.message || 'Image processing failed', 'error');
      setIsProcessingImage(false);
    }
  };

  const handleToggleState = (productId, field, currentValue) => {
    try {
      updateProduct(productId, { [field]: !currentValue });
      loadData();
      showToast('Product updated successfully');
    } catch (err) {
      showToast('Failed to update product', 'error');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        deleteProduct(id);
        loadData();
        showToast('Product deleted successfully');
      } catch (err) {
        showToast('Failed to delete product', 'error');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name || !formData.categoryId || !formData.price || !formData.imageUrl) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    
    if (parseFloat(formData.price) <= 0) {
      showToast('Price must be greater than 0', 'error');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      try {
        if (editingProduct) {
          updateProduct(editingProduct.id, {
            ...formData,
            price: parseFloat(formData.price)
          });
          showToast('Product updated successfully');
        } else {
          addProduct({
            ...formData,
            price: parseFloat(formData.price)
          });
          showToast('Product added successfully');
        }
        
        loadData();
        setIsSubmitting(false);
        setOriginalFormData(formData); // Set it here so close modal bypasses check immediately.
        setIsModalOpen(false);
        
      } catch (err) {
        console.error(err);
        if (err.name === 'QuotaExceededError' || err.message?.toLowerCase().includes('quota')) {
          showToast('Browser storage is full. Please use smaller images or external URLs.', 'error');
        } else {
          showToast('An error occurred while saving the product.', 'error');
        }
        setIsSubmitting(false);
      }
    }, 400);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategoryId === 'all' || product.categoryId === selectedCategoryId;
    const matchesSearch = searchQuery.trim() === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-medium text-stone-900">Products</h1>
          <p className="text-stone-600 mt-1">Manage your catalog items</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-5 py-2.5 bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors rounded-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 mb-6 gap-4">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 -mb-[1px] overflow-x-auto scrollbar-none">
          <button
            onClick={() => { setSelectedCategoryId('all'); setSearchQuery(''); }}
            className={`pb-3 px-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              selectedCategoryId === 'all'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            All Products <span className="ml-1 text-xs text-stone-400 font-normal">({products.length})</span>
          </button>
          {categories.map((cat) => {
            const catProducts = products.filter(p => p.categoryId === cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategoryId(cat.id); setSearchQuery(''); }}
                className={`pb-3 px-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  selectedCategoryId === cat.id
                    ? 'border-stone-900 text-stone-900 font-semibold'
                    : 'border-transparent text-stone-500 hover:text-stone-900 hover:border-stone-300'
                }`}
              >
                {cat.name} <span className="ml-1 text-xs text-stone-400 font-normal">({catProducts.length})</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:max-w-xs mb-3 md:mb-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-stone-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 pr-8 py-1.5 border border-stone-200 bg-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-xs text-stone-900 transition-colors rounded-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-stone-200 shadow-sm overflow-hidden text-left rounded-sm">
        <table className="w-full text-sm text-left text-stone-600">
          <thead className="text-xs text-stone-900 uppercase bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 w-28">Featured</th>
              <th className="px-6 py-4 w-28">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-stone-600">
                  {products.length === 0 
                    ? "No products found. Add your first product to get started." 
                    : "No products match this category or search filter."}
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => {
                const category = categories.find(c => c.id === product.categoryId);
                return (
                  <tr key={product.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-10 h-12 bg-stone-100 overflow-hidden rounded-sm border border-stone-200/50">
                        {product.imageUrl ? (
                           <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                           <ImageIcon className="w-full h-full p-2 text-stone-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-900">{product.name}</td>
                    <td className="px-6 py-4">{category ? category.name : 'Unknown'}</td>
                    <td className="px-6 py-4">₹{product.price}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleToggleState(product.id, 'featured', product.featured)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${product.featured ? 'bg-amber-700' : 'bg-stone-200'}`}
                        aria-label="Toggle featured"
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${product.featured ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleToggleState(product.id, 'in_stock', product.in_stock)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${product.in_stock ? 'bg-stone-900' : 'bg-stone-200'}`}
                        aria-label="Toggle in stock"
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${product.in_stock ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button onClick={() => handleCopyWhatsApp(product)} title="Copy Link" className="text-stone-400 hover:text-stone-900 mr-4 transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleOpenModal(product)} title="Edit" className="text-stone-400 hover:text-stone-900 mr-4 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} title="Delete" className="text-stone-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-900 mb-1.5">Product Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required
                className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-stone-900 transition-colors rounded-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-1.5">Category *</label>
              <select 
                name="categoryId" 
                value={formData.categoryId} 
                onChange={handleChange} 
                required
                className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-white text-stone-900 transition-colors rounded-sm"
              >
                <option value="" disabled>Select category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-1.5">Price *</label>
              <input 
                type="number" 
                name="price" 
                min="0.01" 
                step="0.01"
                value={formData.price} 
                onChange={handleChange} 
                required
                className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-stone-900 transition-colors rounded-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <div className="flex justify-between items-end mb-1.5">
                <label className="block text-sm font-medium text-stone-900">Product Image *</label>
                <div className="flex bg-stone-100 p-0.5 rounded-sm">
                  <button 
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${uploadMode === 'url' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    <LinkIcon className="w-3 h-3 inline mr-1" /> URL
                  </button>
                  <button 
                    type="button"
                    onClick={() => setUploadMode('upload')}
                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${uploadMode === 'upload' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    <Upload className="w-3 h-3 inline mr-1" /> Upload
                  </button>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                {/* Inputs */}
                <div className="flex-1">
                  {uploadMode === 'url' ? (
                    <input 
                      type="url" 
                      name="imageUrl" 
                      value={formData.imageUrl} 
                      onChange={handleChange} 
                      required={uploadMode === 'url' && !formData.imageUrl}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-stone-900 transition-colors rounded-sm"
                    />
                  ) : (
                    <div className="w-full border-2 border-dashed border-stone-200 p-4 text-center hover:bg-stone-50 transition-colors bg-white relative rounded-sm group overflow-hidden">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        title=""
                      />
                      {isProcessingImage ? (
                        <span className="text-sm font-medium text-stone-600 pointer-events-none">Processing...</span>
                      ) : (
                        <div className="flex flex-col items-center pointer-events-none">
                          <Upload className="w-5 h-5 text-stone-400 mb-2 group-hover:-translate-y-1 transition-transform" />
                          <span className="text-sm font-medium text-stone-900">Click to upload</span>
                          <span className="text-xs text-stone-500 mt-1">JPEG, PNG up to 5MB</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 3:4 Preview Box */}
                <div className="relative w-24 border border-stone-200 bg-stone-50 flex items-center justify-center overflow-hidden flex-shrink-0 group rounded-sm" style={{ aspectRatio: '3/4' }}>
                  {formData.imageUrl ? (
                    <>
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} 
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({...p, imageUrl: ''}))}
                        className="absolute top-1 right-1 p-1 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white text-stone-900"
                        title="Remove Image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <div className="text-stone-400 flex-col items-center justify-center p-2 text-center absolute inset-0 flex pointer-events-none">
                      <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                      <span className="text-[10px] uppercase tracking-wider">Preview</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-900 mb-1.5">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="3"
                className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-stone-900 resize-none transition-colors rounded-sm"
              ></textarea>
            </div>
          </div>

          <div className="flex gap-8 border-t border-stone-100 pt-5">
            <label className="flex items-center text-sm font-medium text-stone-900 cursor-pointer">
              <input 
                type="checkbox" 
                name="featured" 
                checked={formData.featured} 
                onChange={handleChange} 
                className="w-4 h-4 mr-2.5 text-stone-900 border-stone-300 focus:ring-stone-900 rounded-sm cursor-pointer"
              />
              Featured Product
            </label>
            <label className="flex items-center text-sm font-medium text-stone-900 cursor-pointer">
              <input 
                type="checkbox" 
                name="in_stock" 
                checked={formData.in_stock} 
                onChange={handleChange} 
                className="w-4 h-4 mr-2.5 text-stone-900 border-stone-300 focus:ring-stone-900 rounded-sm cursor-pointer"
              />
              In Stock
            </label>
          </div>

          <div className="mt-6 pt-5 border-t border-stone-100 flex gap-3 pb-2">
            <button 
              type="button" 
              onClick={handleCloseModal} 
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 border border-stone-200 text-stone-900 bg-white hover:bg-stone-50 font-medium transition-colors rounded-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || isProcessingImage}
              className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
