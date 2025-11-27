import React from 'react';
import { Product, Brand } from '../types';

const MOCK_ELCASTOR_PRODUCTS: Product[] = [
  {
    id: 'c1',
    name: 'Mop Pó Profissional',
    description: 'Conjunto completo com armação, cabo e refil de algodão sintético.',
    category: 'Mops',
    imageUrl: 'https://picsum.photos/300/300?random=10',
    brand: Brand.EL_CASTOR
  },
  {
    id: 'c2',
    name: 'Carro Funcional América',
    description: 'Carrinho de limpeza completo com bolsa de vinil amarela.',
    category: 'Carrinhos',
    imageUrl: 'https://picsum.photos/300/300?random=11',
    brand: Brand.EL_CASTOR
  },
  {
    id: 'c3',
    name: 'Balde Espremedor Doblo',
    description: 'Sistema de dois baldes para separação de água limpa e suja.',
    category: 'Baldes',
    imageUrl: 'https://picsum.photos/300/300?random=12',
    brand: Brand.EL_CASTOR
  },
  {
    id: 'c4',
    name: 'Placa Sinalizadora',
    description: 'Placa "Piso Molhado" amarela de alta visibilidade.',
    category: 'Sinalização',
    imageUrl: 'https://picsum.photos/300/300?random=13',
    brand: Brand.EL_CASTOR
  }
];

export const ElCastorCatalog: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-elcastor-red text-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-2">Catálogo El Castor</h2>
        <p className="opacity-90">Soluções práticas e robustas para limpeza institucional.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_ELCASTOR_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
            <div className="h-48 overflow-hidden rounded-t-lg bg-gray-100 relative group">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-elcastor-red text-white text-xs px-2 py-1 rounded-full font-bold">
                El Castor
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="text-xs font-semibold text-elcastor-dark mb-1 uppercase tracking-wide">{product.category}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">{product.description}</p>
              <button className="w-full mt-auto py-2 px-4 border border-elcastor-red text-elcastor-red rounded hover:bg-elcastor-red hover:text-white transition-colors text-sm font-medium">
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};