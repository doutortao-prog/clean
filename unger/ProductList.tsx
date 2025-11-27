import React, { useState } from 'react';
import { Product, Brand } from '../types';

// Mock data remains for Unger as user provided generic info for Unger but specific PDF for El Castor.
// Keeping structure consistent with text-only requirement.
const MOCK_UNGER_PRODUCTS: Product[] = [
  {
    id: 'EN000',
    name: 'ErgoTec® Ninja Rodo Completo',
    description: 'Rodo profissional premium com canal de alumínio aeronáutico T6 extrudado (não dobra). Mecanismo TriLoc para segurança do canal. Ângulo de trabalho de 40°.',
    category: 'Limpeza de Vidros',
    imageUrl: '',
    brand: Brand.UNGER,
    specs: 'Material: Alumínio T6 e Plástico Bi-componente. Borracha: Soft (Shore 53) ou Hard (Shore 60). Comprimentos: 30cm a 105cm.'
  },
  {
    id: 'DIK12',
    name: 'HydroPower® Ultra Kit S',
    description: 'Sistema de deionização de água para limpeza de vidros em altura sem químicos. Produz água 100% pura através de troca iônica.',
    category: 'Água Pura',
    imageUrl: '',
    brand: Brand.UNGER,
    specs: 'Produção: Até 120L/h. Filtro: Resina mista (Cátion/Ânion). Conexão: Padrão Gardena. Peso: Portátil.'
  },
  {
    id: 'SRKT1',
    name: 'Stingray® Kit de Limpeza Interna',
    description: 'Limpeza de vidros internos até 4m de altura sem escadas. Sistema aplica solução de limpeza no pad de microfibra, evitando gotejamento.',
    category: 'Vidros Internos',
    imageUrl: '',
    brand: Brand.UNGER,
    specs: 'Alcance: 4m (com extensões). Bateria: 2x AA (para bomba). Pad: Triangula Microfibra.'
  },
  {
    id: 'NT090',
    name: 'NiftyNabber® Pro',
    description: 'Pinça pegadora de detritos para uso externo e pesado. Garras de aço revestidas de borracha para força máxima de agarre.',
    category: 'Manutenção',
    imageUrl: '',
    brand: Brand.UNGER,
    specs: 'Comprimento: 90cm. Capacidade de carga: Alta. Material: Aço Tubular.'
  }
];

export const UngerCatalog: React.FC = () => {
  const [filter, setFilter] = useState('');

  const filtered = MOCK_UNGER_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(filter.toLowerCase()) || 
      p.id.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-unger-green text-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-1">Catálogo Unger</h2>
        <p className="text-sm opacity-90">Ferramentas profissionais para vidros e manutenção predial.</p>
        <div className="mt-4">
             <input 
                type="text" 
                placeholder="Buscar ferramenta Unger..." 
                className="w-full max-w-md px-4 py-2 text-sm rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white placeholder-gray-500 shadow-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-unger-green transition-all shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-bold text-unger-dark uppercase bg-green-50 px-2 py-1 rounded">{product.category}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2">{product.name}</h3>
              </div>
              <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">ID: {product.id}</span>
            </div>
            
            <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
            
            {product.specs && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700 flex gap-2 items-start">
                <svg className="w-5 h-5 text-unger-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{product.specs}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};