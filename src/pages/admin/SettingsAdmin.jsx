import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../../services/dataService';
import Toast from '../../components/admin/Toast';

export default function SettingsAdmin() {
  const [formData, setFormData] = useState({
    siteName: '',
    contactEmail: '',
    whatsappNumber: ''
  });
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(getSettings());
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      updateSettings(formData);
      setIsSubmitting(false);
      showToast('Settings saved successfully!');
    }, 500);
  };

  return (
    <div className="max-w-2xl">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div className="mb-8">
        <h1 className="text-2xl font-medium text-stone-900">Global Settings</h1>
        <p className="text-stone-600 mt-1">Configure your storefront identity and contact parameters</p>
      </div>

      <div className="bg-white border border-stone-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2 mb-4">Store Identity</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Site Name *</label>
                  <input 
                    type="text" 
                    name="siteName" 
                    value={formData.siteName} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-2 border border-stone-300 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-stone-900 transition-colors"
                  />
                  <p className="text-xs text-stone-500 mt-1">This appears in the header and footer.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2 mb-4">Contact Integration</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Contact Email *</label>
                  <input 
                    type="email" 
                    name="contactEmail" 
                    value={formData.contactEmail} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-2 border border-stone-300 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-stone-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">WhatsApp Number *</label>
                  <input 
                    type="text" 
                    name="whatsappNumber" 
                    value={formData.whatsappNumber} 
                    onChange={handleChange} 
                    required
                    placeholder="e.g. 919876543210"
                    className="w-full px-4 py-2 border border-stone-300 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 font-mono text-stone-900 transition-colors"
                  />
                  <p className="text-xs text-stone-500 mt-1">
                    Include country code without '+'. This dynamically drives every "Enquire on WhatsApp" button globally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
