import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../ui/BackToTop';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-stone-900 selection:bg-stone-200">
      <Header />
      <main className="flex-1 w-full mt-16 md:mt-20 flex flex-col">
        {/* mt-16 / mt-20 to account for fixed header height bindings */}
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
