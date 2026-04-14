import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Layout & Pages
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';

// Admin Components & Structure
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';

// Admin Views
import Dashboard from './pages/admin/Dashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Application */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
        </Route>

        {/* Administration Login (Unprotected) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Administration Interface */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="categories" element={<CategoriesAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
        </Route>

        {/* Fallback to root if completely lost */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
