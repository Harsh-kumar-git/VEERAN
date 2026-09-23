import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public layout & pages
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import OurStory from './pages/OurStory';
import Journal from './pages/Journal';
import Cart from './pages/Cart';
import Collections from './pages/Collections';

// Legacy products page (redirect to shop)
import Products from './pages/Products';

// Admin components
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Public routes ── */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="products" element={<Navigate to="/shop" replace />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="collections" element={<Collections />} />
          <Route path="our-story" element={<OurStory />} />
          <Route path="journal" element={<Journal />} />
          <Route path="journal/:slug" element={<Journal />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        {/* ── Admin ── */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="categories" element={<CategoriesAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
        </Route>

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
