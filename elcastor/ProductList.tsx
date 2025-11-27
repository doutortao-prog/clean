import React, { useState } from 'react';
import { Product } from '../types';
import { EL_CASTOR_PRODUCTS } from './catalogData';

export const ElCastorCatalog: React.FC = () => {
  const [filter, setFilter] = useState('');

  const filteredProducts = EL_CASTOR_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) || 
    p.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-elcastor-red text-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-1">Catálogo El Castor</h2>
        <p className="text-sm opacity-90">Especificações técnicas e Códigos APPCC.</p>
        
        <div className="mt-4">
          <input 
            type="text" 
            placeholder="Filtrar especificações..." 
            className="w-full max-w-md px-3 py-2 text-sm rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-white bg-white/90 placeholder-gray-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:border-elcastor-red transition-colors shadow-sm flex flex-col sm:flex-row sm:items-start gap-4">
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-elcastor-dark uppercase bg-red-50 px-2 py-0.5 rounded border border-red-100">{product.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                </div>
                <div className="text-xs font-mono text-gray-400 mt-1 sm:mt-0 bg-gray-50 px-2 py-1 rounded">
                    REF: {product.id}
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">{product.description}</p>
              
              {product.specs && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  {product.specs.split('. ').map((spec, idx) => (
                      spec ? <div key={idx} className="flex items-start gap-1"><span className="w-1.5 h-1.5 rounded-full bg-elcastor-red mt-1.5 flex-shrink-0"></span><span>{spec}</span></div> : null
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-10 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
          Nenhum produto técnico encontrado para essa busca.
        </div>
      )}
    </div>
  );
};