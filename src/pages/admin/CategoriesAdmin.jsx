import { useState, useEffect } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory, getProducts } from '../../services/dataService';
import Modal from '../../components/admin/Modal';
import Toast from '../../components/admin/Toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  
  // Modals & Toast State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = () => {
    setCategories(getCategories());
    setProducts(getProducts());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || ''
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', slug: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingCategory(null);
      setFormData({ name: '', slug: '', description: '' });
    }, 300);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData(prev => ({
      ...prev,
      name,
      slug: editingCategory ? prev.slug : slug
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    const inUse = products.some(p => p.categoryId === id);
    if (inUse) {
      showToast('Cannot delete category: It is currently assigned to products.', 'error');
      return;
    }

    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
      loadData();
      showToast('Category deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.slug) {
      showToast('Name and Slug are required', 'error');
      return;
    }

    const isDuplicate = categories.some(c => c.slug === formData.slug && c.id !== editingCategory?.id);
    if (isDuplicate) {
      showToast('This slug is already in use by another category', 'error');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      if (editingCategory) {
        updateCategory(editingCategory.id, formData);
        showToast('Category updated successfully');
      } else {
        addCategory(formData);
        showToast('Category added successfully');
      }
      
      loadData();
      setIsSubmitting(false);
      handleCloseModal();
    }, 400);
  };

  return (
    <div>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-medium text-stone-900">Categories</h1>
          <p className="text-stone-600 mt-1">Organize your product catalog</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-5 py-2.5 bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors rounded-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      <div className="bg-white border border-stone-200 shadow-sm overflow-hidden text-left">
        <table className="w-full text-sm text-left text-stone-600">
          <thead className="text-xs text-stone-900 uppercase bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-stone-600">
                  No categories found. Add your first category.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900">{category.name}</td>
                  <td className="px-6 py-4 font-mono text-xs text-stone-500">{category.slug}</td>
                  <td className="px-6 py-4">{category.description || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleOpenModal(category)} className="text-stone-600 hover:text-stone-900 mr-4 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(category.id)} className="text-stone-400 hover:text-red-600 cursor-pointer transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingCategory ? "Edit Category" : "Add New Category"}
      >
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-900 mb-1.5">Category Name *</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleNameChange} // Using special handler for auto-slug
              required
              className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-stone-900 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-900 mb-1.5">URL Slug *</label>
            <input 
              type="text" 
              name="slug" 
              value={formData.slug} 
              onChange={handleChange} 
              required
              className="w-full px-3 py-2 border border-stone-200 bg-stone-50 text-stone-500 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
            />
            <p className="text-xs text-stone-500 mt-1">This will be used in the URL (e.g., /products?category=<strong>{formData.slug || '...' }</strong>)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-900 mb-1.5">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="3"
              className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-stone-900 resize-none transition-colors"
            ></textarea>
          </div>

          <div className="mt-6 pt-5 border-t border-stone-100 flex gap-3 pb-2">
            <button 
              type="button" 
              onClick={handleCloseModal} 
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 border border-stone-200 text-stone-800 bg-white hover:bg-stone-50 font-medium transition-colors rounded-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              {isSubmitting ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
