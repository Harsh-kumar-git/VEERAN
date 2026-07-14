import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'save-data-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/save-data') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const { key, data } = JSON.parse(body);
                let filePath = '';
                if (key === 'veeran_categories') {
                  filePath = path.resolve(__dirname, 'src/data/categories.json');
                } else if (key === 'veeran_products') {
                  filePath = path.resolve(__dirname, 'src/data/products.json');
                } else if (key === 'veeran_settings') {
                  filePath = path.resolve(__dirname, 'src/data/settings.json');
                }

                if (filePath) {
                  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, message: `Saved to ${path.basename(filePath)}` }));
                } else {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: false, error: 'Invalid storage key' }));
                }
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})
