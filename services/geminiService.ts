import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Brand } from "../types";
import { EL_CASTOR_PRODUCTS, MATERIAL_SPECS, COLOR_CODES } from "../elcastor/catalogData";

// Safety check for API Key
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Construct the technical knowledge base string
const TECHNICAL_CONTEXT = `
DADOS DO CATÁLOGO EL CASTOR:
${JSON.stringify(EL_CASTOR_PRODUCTS)}

ESPECIFICAÇÕES DE MATERIAIS (FIBRAS):
${JSON.stringify(MATERIAL_SPECS)}

CÓDIGO DE CORES (APPCC/HACCP):
${JSON.stringify(COLOR_CODES)}
`;

const BASE_INSTRUCTION = `
Você é o "CleanMaster Expert", um consultor técnico sênior especializado nas ferramentas Unger e El Castor.
Seu objetivo é garantir a escolha técnica perfeita da ferramenta, evitando danos à superfície ou contaminação.

REGRAS ABSOLUTAS:
1. NUNCA invente produtos. Use APENAS os produtos listados nos dados JSON fornecidos. Se não existir, diga claramente.
2. NUNCA invente especificações técnicas. Consulte a tabela de materiais para resistência térmica e química.
3. Responda em Português do Brasil.

PROTOCOLO DE ATENDIMENTO (DIAGNÓSTICO):
Ao receber uma dúvida, você não deve apenas listar produtos. Você deve agir como um engenheiro de aplicação.
Se o usuário pedir uma recomendação, você deve VERIFICAR AS VARIÁVEIS CRÍTICAS antes de responder.
Se o usuário não informou, faça perguntas de "múltipla escolha" para facilitar a resposta dele.

Variáveis a verificar (consulte a Tabela de Materiais):
1. TIPO DE INDÚSTRIA: Alimentícia (exige PBT/Cores), Hospitalar, Automotiva ou Geral?
2. TEMPERATURA: O local é quente? (Ex: Fornos > 100°C exigem PBT ou Inox, evite Polipropileno/PVC).
3. QUÍMICA: Vai usar ácidos ou alcalinos? (Consulte a coluna 'resistances' da tabela).
4. SUPERFÍCIE: É delicada (pintura de carro) ou rústica (chão de fábrica)?

EXEMPLO DE INTERAÇÃO IDEAL:
Usuário: "Preciso de uma escova para limpar um tanque."
IA: "Para recomendar a escova correta do catálogo El Castor, preciso de alguns detalhes para não danificar seu equipamento:
1. Qual a temperatura de trabalho? (Ex: Ambiente ou acima de 80°C?)
2. Você utilizará algum produto químico ácido ou alcalino?
3. É para indústria alimentícia? (Se sim, recomendarei a linha PBT com codificação de cores)."

FORMATO DE RESPOSTA:
- Use markdown para formatar.
- Quando recomendar um produto, cite o NOME EXATO e o CÓDIGO (ID) se disponível.
- Se houver risco (ex: usar Nylon em Ácido), ALERTE o usuário baseado na tabela.
`;

export const sendMessageToGemini = async (
  message: string, 
  currentBrand: Brand,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  if (!API_KEY) {
    return "Erro: API Key não configurada. Por favor configure a chave Gemini.";
  }

  let contextInstruction = BASE_INSTRUCTION + "\n\n" + TECHNICAL_CONTEXT;

  if (currentBrand === Brand.UNGER) {
    contextInstruction += "\n\nCONTEXTO ATUAL: O usuário está na aba UNGER. Foque em vidros e limpeza em altura.";
  } else if (currentBrand === Brand.EL_CASTOR) {
    contextInstruction += "\n\nCONTEXTO ATUAL: O usuário está na aba EL CASTOR. Foque nas escovas técnicas, rodos e código de cores.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: contextInstruction,
        temperature: 0.3, // Lower temperature for more factual/technical responses
      },
      history: history
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "Desculpe, não consegui processar sua resposta no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao conectar com o assistente inteligente. Tente novamente.";
  }
};
