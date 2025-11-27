import { Brand, Product } from '../types';

export const COLOR_CODES = {
  description: "Sistema de codificação por área (APPCC) para evitar contaminação cruzada.",
  codes: [
    { code: "+W", color: "Branco", area: "Serviços e Hotelaria / Indústria Alimentícia" },
    { code: "+K", color: "Preto", area: "Indústria em Geral" },
    { code: "+R", color: "Vermelho", area: "Áreas de Alto Risco / Sanitários" },
    { code: "+O", color: "Laranja", area: "Áreas de Gordura / Cozinha" },
    { code: "+Y", color: "Amarelo", area: "Hospitais / Clínicas / Áreas de Isolamento" },
    { code: "+G", color: "Verde", area: "Áreas de Preparação de Alimentos / Frutas e Verduras" },
    { code: "+B", color: "Azul", area: "Áreas Gerais / Baixo Risco" },
    { code: "+P", color: "Roxo", area: "Áreas Específicas / Alérgenos" },
    { code: "+T", color: "Café", area: "Cafeterias / Áreas de Café" }
  ]
};

export const MATERIAL_SPECS = {
  description: "Tabela de resistência e propriedades das fibras e materiais. E=Excelente, B=Boa, S=Suficiente, I=Insuficiente.",
  materials: [
    {
      name: "LECHUGUILLA (Fibra Natural)",
      rigidity: "Média",
      tempDistortion: "150°C",
      resistances: {
        sun: "B", abrasion: "E", waterAbsorb: "B", elasticMem: "I",
        humidity: "S", acidDiluted: "E", acidConc: "B", alkali: "B",
        oilVeg: "B", petroleum: "B"
      }
    },
    {
      name: "PALMYRA (Fibra Natural)",
      rigidity: "Média",
      tempDistortion: "150°C",
      resistances: {
        sun: "E", abrasion: "E", waterAbsorb: "B", elasticMem: "I",
        humidity: "S", acidDiluted: "E", acidConc: "E", alkali: "E",
        oilVeg: "E", petroleum: "S"
      }
    },
    {
      name: "NYLON",
      rigidity: "Média/Alta",
      tempDistortion: "100°C",
      resistances: {
        sun: "B", abrasion: "B", waterAbsorb: "I", elasticMem: "E",
        humidity: "E", acidDiluted: "S", acidConc: "S", alkali: "E",
        oilVeg: "E", petroleum: "E"
      }
    },
    {
      name: "PBT (Polibutileno Tereftalato)",
      rigidity: "Média/Alta",
      tempDistortion: "120°C",
      resistances: {
        sun: "E", abrasion: "E", waterAbsorb: "I", elasticMem: "E",
        humidity: "E", acidDiluted: "B", acidConc: "B", alkali: "E",
        oilVeg: "E", petroleum: "E"
      },
      note: "Ideal para indústria alimentícia, memória elástica excelente, autoclavável."
    },
    {
      name: "POLIÉSTER (PET)",
      rigidity: "Média",
      tempDistortion: "77°C",
      resistances: {
        sun: "S", abrasion: "I", waterAbsorb: "I", elasticMem: "I",
        humidity: "B", acidDiluted: "I", acidConc: "I", alkali: "I",
        oilVeg: "S", petroleum: "S"
      },
      note: "Econômico, feito de garrafas recicladas."
    },
    {
      name: "POLIPROPILENO",
      rigidity: "Alta",
      tempDistortion: "80°C",
      resistances: {
        sun: "B", abrasion: "B", waterAbsorb: "I", elasticMem: "I",
        humidity: "E", acidDiluted: "E", acidConc: "E", alkali: "E",
        oilVeg: "E", petroleum: "S"
      }
    },
    {
      name: "PVC",
      rigidity: "Média",
      tempDistortion: "53°C",
      resistances: {
        sun: "E", abrasion: "B", waterAbsorb: "I", elasticMem: "B",
        humidity: "E", acidDiluted: "E", acidConc: "E", alkali: "B",
        oilVeg: "E", petroleum: "B"
      }
    },
    {
      name: "AÇO INOXIDÁVEL",
      rigidity: "Alta",
      tempDistortion: "N/A",
      resistances: {
        sun: "E", abrasion: "E", waterAbsorb: "I", elasticMem: "E",
        humidity: "E", acidDiluted: "B", acidConc: "B", alkali: "E",
        oilVeg: "E", petroleum: "E"
      }
    }
  ]
};

export const EL_CASTOR_PRODUCTS: Product[] = [
  // Escovas PBT
  {
    id: '4002-4102',
    name: 'Escova Multiuso (PBT)',
    description: 'Escova com cerdas de PBT de rigidez média. Disponível em cabo curto (4002) ou longo (4102). Resistente a autoclave, ideal para indústria alimentícia.',
    category: 'Escovas Alimentícias',
    imageUrl: 'https://picsum.photos/seed/4002/300/300',
    brand: Brand.EL_CASTOR,
    specs: "Material: PBT. Temp Máx: 120°C. Comprimento cerda: 4,44cm."
  },
  {
    id: '4012',
    name: 'Escova Larga Limpeza Detalhada',
    description: 'Design ergonômico, cerda rígida de PBT. Para peças de máquinas pequenas e difícil acesso.',
    category: 'Escovas Alimentícias',
    imageUrl: 'https://picsum.photos/seed/4012/300/300',
    brand: Brand.EL_CASTOR,
    specs: "Medida: 17,8cm. Material: PBT Rígido."
  },
  {
    id: '4022',
    name: 'Escova Estreita Detalhada',
    description: 'Design estreito e alongado (22,86cm x 2,22cm). Fibra PBT rígida. Para máquinas ou detalhamento.',
    category: 'Escovas Alimentícias',
    imageUrl: 'https://picsum.photos/seed/4022/300/300',
    brand: Brand.EL_CASTOR
  },
  {
    id: '4302',
    name: 'Escova Limpeza Tábuas de Corte',
    description: 'Base ergonômica, cerdas PBT rigidez média. Cerdas inclinadas na ponta.',
    category: 'Escovas Alimentícias',
    imageUrl: 'https://picsum.photos/seed/4302/300/300',
    brand: Brand.EL_CASTOR
  },
  {
    id: '4312',
    name: 'Escova Tipo Prancha',
    description: 'Cabo de plástico maciço tipo ferro. Alça aberta para pendurar na borda de baldes.',
    category: 'Escovas Alimentícias',
    imageUrl: 'https://picsum.photos/seed/4312/300/300',
    brand: Brand.EL_CASTOR
  },
  // Tubos
  {
    id: '5325-5330',
    name: 'Escova Limpeza Tubos e Válvulas',
    description: 'Cerdas PBT rigidez média em toda circunferência. Rosca de 3/4". Diâmetros: 6,35cm e 7,62cm.',
    category: 'Tubos e Válvulas',
    imageUrl: 'https://picsum.photos/seed/5325/300/300',
    brand: Brand.EL_CASTOR
  },
  {
    id: '5401',
    name: 'Escova Curvada Tubulações',
    description: 'Forma curva para perfil exterior de canos e tubulações aéreas. Acoplável a cabos extensores.',
    category: 'Tubos e Válvulas',
    imageUrl: 'https://picsum.photos/seed/5401/300/300',
    brand: Brand.EL_CASTOR
  },
  // Rodos
  {
    id: 'FI25-FI99',
    name: 'Secador de Bancadas',
    description: 'Secador de 25cm para pias e bancadas. Materiais aprovados para contato com alimentos.',
    category: 'Rodos e Secadores',
    imageUrl: 'https://picsum.photos/seed/FI25/300/300',
    brand: Brand.EL_CASTOR
  },
  {
    id: 'FI45-FI75',
    name: 'Rodo Higiênico Pequeno',
    description: 'Base leve e flexível. Borracha que não propaga microrganismos. Medidas 45cm e 75cm.',
    category: 'Rodos e Secadores',
    imageUrl: 'https://picsum.photos/seed/FI45/300/300',
    brand: Brand.EL_CASTOR
  },
  {
    id: 'UH50',
    name: 'Rodo Ultra Higiênico',
    description: 'Lâmina e base integrados (peça única), evita acúmulo de sujeira. 50cm.',
    category: 'Rodos e Secadores',
    imageUrl: 'https://picsum.photos/seed/UH50/300/300',
    brand: Brand.EL_CASTOR
  },
  // Cabos
  {
    id: '1906-FIBRA',
    name: 'Cabo Fibra de Vidro',
    description: '1,50m. Não conduz energia, resistente, rosca padrão americano.',
    category: 'Cabos',
    imageUrl: 'https://picsum.photos/seed/1906F/300/300',
    brand: Brand.EL_CASTOR
  },
  {
    id: '1906-ALUM',
    name: 'Cabo de Alumínio',
    description: '1,50m. Leve e seguro. Opção com pintura (codificação por cores) ou sem.',
    category: 'Cabos',
    imageUrl: 'https://picsum.photos/seed/1906A/300/300',
    brand: Brand.EL_CASTOR
  },
  // Automotivo
  {
    id: '1609',
    name: 'Ultimate 1609 (Média)',
    description: 'Escova automotiva cerda natural rigidez média. Bloco com borracha (bumper).',
    category: 'Automotivo',
    imageUrl: 'https://picsum.photos/seed/1609/300/300',
    brand: Brand.EL_CASTOR
  },
  {
    id: '1809',
    name: 'Ultimate 1809 (Suave)',
    description: 'Cerda PVC macia (9 pol). Ideal para lava-rápidos exigentes.',
    category: 'Automotivo',
    imageUrl: 'https://picsum.photos/seed/1809/300/300',
    brand: Brand.EL_CASTOR
  },
  {
    id: '1810',
    name: 'Escova Bi-Level 1810',
    description: 'Dois níveis de cerdas para superfícies altas. Disponível macia (1810-B) ou média (1810-P).',
    category: 'Automotivo',
    imageUrl: 'https://picsum.photos/seed/1810/300/300',
    brand: Brand.EL_CASTOR
  },
  // Vassouras e Pás
  {
    id: '4188',
    name: 'Escova Spectrum Omni Sweep',
    description: 'Cerdas Polipropileno corte angular. Varrição rápida. Base rosca 3/4.',
    category: 'Vassouras',
    imageUrl: 'https://picsum.photos/seed/4188/300/300',
    brand: Brand.EL_CASTOR
  },
  {
    id: '9801-9802',
    name: 'Pá Sanitária',
    description: 'Pá de plástico peça única, não oxida. Pequena ou Grande.',
    category: 'Pás e Espátulas',
    imageUrl: 'https://picsum.photos/seed/9801/300/300',
    brand: Brand.EL_CASTOR
  }
];
