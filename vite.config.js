import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ALLOWED_KEYS = {
  veeran_categories: path.resolve(__dirname, 'src/data/categories.json'),
  veeran_products: path.resolve(__dirname, 'src/data/products.json'),
  veeran_settings: path.resolve(__dirname, 'src/data/settings.json')
};

// Max payload size: 5MB
const MAX_PAYLOAD_BYTES = 5 * 1024 * 1024;

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'save-data-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/save-data') {
            // Basic origin check: accept only local origin or header verification
            const origin = req.headers.origin || req.headers.referer;
            if (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
              res.writeHead(403, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ success: false, error: 'Forbidden: Untrusted origin' }));
            }

            let body = '';
            let receivedBytes = 0;

            req.on('data', chunk => {
              receivedBytes += chunk.length;
              if (receivedBytes > MAX_PAYLOAD_BYTES) {
                res.writeHead(413, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Payload Too Large' }));
                req.destroy();
                return;
              }
              body += chunk.toString();
            });

            req.on('end', () => {
              if (res.writableEnded) return;

              try {
                const { key, data } = JSON.parse(body);
                
                // Strictly validate whitelist
                if (!key || !ALLOWED_KEYS[key]) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  return res.end(JSON.stringify({ success: false, error: 'Invalid or unauthorized storage key' }));
                }

                // Data must be non-null object/array
                if (!data || typeof data !== 'object') {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  return res.end(JSON.stringify({ success: false, error: 'Invalid data format' }));
                }

                const filePath = ALLOWED_KEYS[key];
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: `Saved to ${path.basename(filePath)}` }));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message || 'Internal server error' }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.js']
  }
})
