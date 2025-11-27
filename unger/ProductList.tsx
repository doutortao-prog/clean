import React from 'react';
import { Product, Brand } from '../types';

const MOCK_UNGER_PRODUCTS: Product[] = [
  {
    id: 'u1',
    name: 'ErgoTec® Ninja Rodo',
    description: 'Rodo profissional com canal de alumínio aeronáutico T6. O mais avançado para vidros. Mecanismo de troca rápida de borracha e canal.',
    category: 'Vidros',
    imageUrl: '', // Imagem removida
    brand: Brand.UNGER,
    specs: 'Material: Alumínio T6. Borracha: Soft ou Hard. Ângulo: 30° ou 40°.'
  },
  {
    id: 'u2',
    name: 'HydroPower® Ultra',
    description: 'Sistema de limpeza com água pura para vidros externos e fachadas. Utiliza resina de troca iônica para filtrar minerais.',
    category: 'Água Pura',
    imageUrl: '',
    brand: Brand.UNGER,
    specs: 'Fluxo: Até 120L/h. Filtros: Ultra Resin Packs. Altura: Até 20m com cabos de carbono.'
  },
  {
    id: 'u3',
    name: 'Stingray® Kit',
    description: 'Sistema de limpeza interna de vidros para alturas de até 4m. Aplica solução de limpeza diretamente na superfície.',
    category: 'Interno',
    imageUrl: '',
    brand: Brand.UNGER,
    specs: 'Alcance: 4m. Pad: Microfibra Triangula. Bateria: 2x AA.'
  },
  {
    id: 'u4',
    name: 'NiftyNabber® Pro',
    description: 'Pinça pegadora robusta para coleta de detritos e lixo. Estrutura metálica durável.',
    category: 'Manutenção',
    imageUrl: '',
    brand: Brand.UNGER,
    specs: 'Comprimentos: 90cm, 130cm, 250cm. Garra: Aço emborrachado.'
  }
];

export const UngerCatalog: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-unger-green text-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-1">Catálogo Unger</h2>
        <p className="text-sm opacity-90">Lista técnica de ferramentas.</p>
      </div>

      <div className="space-y-4">
        {MOCK_UNGER_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:border-unger-green transition-colors shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs font-bold text-unger-dark uppercase bg-green-50 px-2 py-1 rounded">{product.category}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2">{product.name}</h3>
              </div>
              <span className="text-xs font-mono text-gray-400">ID: {product.id}</span>
            </div>
            
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            {product.specs && (
              <div className="mt-2 p-3 bg-gray-50 rounded border-l-4 border-unger-green text-sm text-gray-700">
                <strong>Especificações:</strong> {product.specs}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};