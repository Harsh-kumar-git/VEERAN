import { useState, useEffect } from 'react';
import { getProducts, getCategories, getSettings } from '../../services/dataService';
import { Package, Tags, Store } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    siteName: ''
  });

  useEffect(() => {
    setStats({
      products: getProducts().length,
      categories: getCategories().length,
      siteName: getSettings().siteName
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-medium text-stone-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-stone-200 flex items-center shadow-sm">
          <div className="p-3 bg-stone-100 mr-4">
            <Package className="w-6 h-6 text-stone-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">Total Products</p>
            <p className="text-3xl font-light text-stone-900">{stats.products}</p>
          </div>
        </div>

        <div className="bg-white p-6 border border-stone-200 flex items-center shadow-sm">
          <div className="p-3 bg-stone-100 mr-4">
            <Tags className="w-6 h-6 text-stone-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">Categories</p>
            <p className="text-3xl font-light text-stone-900">{stats.categories}</p>
          </div>
        </div>

        <div className="bg-white p-6 border border-stone-200 flex items-center shadow-sm">
          <div className="p-3 bg-stone-100 mr-4">
            <Store className="w-6 h-6 text-stone-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">Active Store</p>
            <p className="text-xl font-medium text-stone-900 mt-1">{stats.siteName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
