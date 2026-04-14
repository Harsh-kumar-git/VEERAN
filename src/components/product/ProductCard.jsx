import { getWhatsAppLink } from '../../utils/whatsapp';

export default function ProductCard({ product, category }) {
  const whatsappUrl = getWhatsAppLink(product.name);
  
  return (
    <div className="group flex flex-col h-full bg-white border border-stone-100 hover:border-stone-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
      <div className="relative aspect-[4/5] bg-stone-50 overflow-hidden">
        {/* Badges container */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
          {product.featured && (
            <span className="inline-flex items-center px-2 py-1 bg-amber-700 shadow-sm text-[10px] font-medium tracking-widest text-white uppercase">
              Featured
            </span>
          )}
          {product.in_stock === false && (
            <span className="inline-flex items-center px-2 py-1 bg-stone-900 text-[10px] font-medium tracking-widest text-white uppercase shadow-sm">
              Out of Stock
            </span>
          )}
        </div>

        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <p className="text-xs font-medium text-stone-400 mb-1 uppercase tracking-wider">
            {category ? category.name : 'Category'}
          </p>
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-lg font-medium text-stone-900 leading-tight group-hover:text-stone-700 transition-colors">{product.name}</h3>
            <p className="text-lg font-medium text-stone-900 whitespace-nowrap">${product.price}</p>
          </div>
        </div>
        
        <p className="text-sm text-stone-600 mb-6 flex-1 line-clamp-3">
          {product.description}
        </p>

        <div className="mt-auto">
          {product.in_stock ? (
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center px-4 py-3 text-sm font-medium text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            >
              Enquire on WhatsApp
            </a>
          ) : (
            <button 
              disabled
              className="w-full inline-flex justify-center items-center px-4 py-3 text-sm font-medium text-stone-400 bg-stone-50 border border-stone-200 cursor-not-allowed transition-colors rounded-sm"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
