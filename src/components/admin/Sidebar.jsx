import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tags, Settings, LogOut } from 'lucide-react';
import { logout } from '../../services/authService';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', end: true, icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', end: false, icon: Package },
    { name: 'Categories', path: '/admin/categories', end: false, icon: Tags },
    { name: 'Settings', path: '/admin/settings', end: false, icon: Settings },
  ];

  return (
    <aside className="w-64 bg-stone-900 flex flex-col h-full text-stone-300">
      <div className="h-16 flex items-center px-6 bg-stone-950/50 mb-6 border-b border-stone-800">
        <span className="text-xl font-medium tracking-widest text-white">VEERAN</span>
        <span className="ml-2 text-xs px-2 py-0.5 bg-stone-800 text-stone-400 rounded-sm">ADMIN</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-stone-800 text-white font-medium'
                    : 'hover:bg-stone-800/50 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-stone-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center px-4 py-3 text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}
