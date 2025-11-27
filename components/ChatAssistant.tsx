import React, { useState, useRef, useEffect } from 'react';
import { Brand, ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { Button } from './Button';

interface ChatAssistantProps {
  activeBrand: Brand;
  mode: 'embedded' | 'floating'; // Novo prop para controlar o modo de exibição
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ activeBrand, mode }) => {
  // Se estiver em modo embedded, começa aberto. Se floating, começa fechado.
  const [isOpen, setIsOpen] = useState(mode === 'embedded');
  
  // Atualiza estado de abertura quando o modo muda
  useEffect(() => {
    if (mode === 'embedded') {
      setIsOpen(true);
    }
  }, [mode]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou o CleanMaster AI. Estou pronto para analisar suas necessidades técnicas e indicar a ferramenta correta dos catálogos Unger e El Castor.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, mode]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendMessageToGemini(userMsg.text, activeBrand, history);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsTyping(false);
  };

  const getBrandColor = () => {
    if (activeBrand === Brand.UNGER) return 'bg-unger-green';
    if (activeBrand === Brand.EL_CASTOR) return 'bg-elcastor-red';
    return 'bg-brand-600';
  };

  // Classes de container baseadas no modo
  const containerClasses = mode === 'embedded' 
    ? "w-full h-[600px] bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col"
    : "fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[500px]";

  // Se estiver em modo floating e fechado, renderiza apenas o botão
  if (mode === 'floating' && !isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <button
          onClick={() => setIsOpen(true)}
          className={`${getBrandColor()} text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="font-semibold hidden sm:inline">Assistente Técnico</span>
        </button>
      </div>
    );
  }

  return (
    <div className={mode === 'embedded' ? 'w-full' : 'fixed bottom-6 right-6 z-50'}>
      <div className={containerClasses}>
        {/* Header */}
        <div className={`${getBrandColor()} p-4 text-white flex justify-between items-center transition-colors duration-300`}>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <h3 className="font-bold text-lg">CleanMaster AI</h3>
              <span className="text-xs opacity-90 block">
                {activeBrand === Brand.UNGER ? 'Consultor Técnico Unger' : 
                 activeBrand === Brand.EL_CASTOR ? 'Consultor Técnico El Castor' : 'Consultor Geral'}
              </span>
            </div>
          </div>
          
          {mode === 'floating' && (
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-5 py-3 text-sm shadow-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none prose prose-sm'
                }`}
              >
                {/* Simple Markdown Rendering (Bold and Line breaks) */}
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line.split('**').map((part, j) => 
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 rounded-full px-4 py-2 flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Descreva o cenário (ex: limpar tanque a 100°C)..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          />
          <Button type="submit" variant="primary" disabled={!inputText || isTyping} className="px-6 rounded-lg">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};