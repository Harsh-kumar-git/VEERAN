import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MiniCart from '../ui/MiniCart';
import BackToTop from '../ui/BackToTop';
import { CartProvider } from '../../context/CartContext';

export default function Layout() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#1A1A18]">
        <Header />
        <main className="flex-1 w-full flex flex-col">
          <Outlet />
        </main>
        <Footer />
        <MiniCart />
        <BackToTop />
      </div>
    </CartProvider>
  );
}
