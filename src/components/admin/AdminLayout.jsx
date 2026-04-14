import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import { isAuthenticated } from '../../services/authService';

export default function AdminLayout() {
  const navigate = useNavigate();

  // Validate session actively on random generic user clicks representing interaction points
  useEffect(() => {
    const handleUserAction = () => {
      if (!isAuthenticated()) {
        navigate('/admin/login');
      }
    };

    window.addEventListener('click', handleUserAction);
    return () => {
      window.removeEventListener('click', handleUserAction);
    };
  }, [navigate]);

  return (
    <div className="flex h-screen w-full bg-stone-50 overflow-hidden font-sans text-stone-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
