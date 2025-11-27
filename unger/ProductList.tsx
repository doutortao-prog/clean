import React from 'react';
import { Product, Brand } from '../types';

const MOCK_UNGER_PRODUCTS: Product[] = [
  {
    id: 'u1',
    name: 'ErgoTec® Ninja Rodo',
    description: 'Rodo profissional com canal de alumínio aeronáutico T6. O mais avançado para vidros.',
    category: 'Vidros',
    imageUrl: 'https://picsum.photos/300/300?random=1',
    brand: Brand.UNGER
  },
  {
    id: 'u2',
    name: 'HydroPower® Ultra',
    description: 'Sistema de limpeza com água pura para vidros externos e fachadas.',
    category: 'Água Pura',
    imageUrl: 'https://picsum.photos/300/300?random=2',
    brand: Brand.UNGER
  },
  {
    id: 'u3',
    name: 'Stingray® Kit',
    description: 'Sistema de limpeza interna de vidros para alturas de até 4m.',
    category: 'Interno',
    imageUrl: 'https://picsum.photos/300/300?random=3',
    brand: Brand.UNGER
  },
  {
    id: 'u4',
    name: 'NiftyNabber® Pro',
    description: 'Pinça pegadora robusta para coleta de detritos e lixo.',
    category: 'Manutenção',
    imageUrl: 'https://picsum.photos/300/300?random=4',
    brand: Brand.UNGER
  }
];

export const UngerCatalog: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-unger-green text-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-2">Catálogo Unger</h2>
        <p className="opacity-90">Qualidade alemã em ferramentas de limpeza profissional.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_UNGER_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
            <div className="h-48 overflow-hidden rounded-t-lg bg-gray-100 relative group">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-unger-green text-white text-xs px-2 py-1 rounded-full font-bold">
                Unger
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="text-xs font-semibold text-unger-dark mb-1 uppercase tracking-wide">{product.category}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">{product.description}</p>
              <button className="w-full mt-auto py-2 px-4 border border-unger-green text-unger-green rounded hover:bg-unger-green hover:text-white transition-colors text-sm font-medium">
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};