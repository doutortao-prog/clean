import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Brand } from "../types";

// Safety check for API Key
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

const BASE_INSTRUCTION = `
Você é um assistente técnico especializado em ferramentas de limpeza profissional das marcas Unger e El Castor.
Seu objetivo é ajudar profissionais de limpeza e empresas a escolherem os melhores equipamentos.

Diretrizes:
1. Responda em Português do Brasil de forma profissional e cortês.
2. Se o usuário perguntar sobre a Unger, foque em: Vidros, extensões telescópicas, ergonomia e inovação alemã.
3. Se o usuário perguntar sobre a El Castor, foque em: Mops, carrinhos funcionais, rodos e custo-benefício.
4. Se não souber uma especificação técnica, admita e sugira consultar o catálogo PDF oficial (simulado).
5. Tente sempre recomendar um produto específico se o usuário descrever um problema (ex: "janela alta" -> Extensão Unger).
`;

export const sendMessageToGemini = async (
  message: string, 
  currentBrand: Brand,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  if (!API_KEY) {
    return "Erro: API Key não configurada. Por favor configure a chave Gemini.";
  }

  let contextInstruction = BASE_INSTRUCTION;

  if (currentBrand === Brand.UNGER) {
    contextInstruction += "\n\nO usuário está navegando atualmente no catálogo da UNGER. Dê prioridade a produtos Unger.";
  } else if (currentBrand === Brand.EL_CASTOR) {
    contextInstruction += "\n\nO usuário está navegando atualmente no catálogo da EL CASTOR. Dê prioridade a produtos El Castor.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // We construct a chat session for history
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: contextInstruction,
        temperature: 0.7,
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