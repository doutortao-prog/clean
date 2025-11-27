import React, { useState, useEffect } from 'react';
import { User, Brand } from './types';
import { getCurrentUser, logoutUser } from './services/authService';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UngerCatalog } from './unger/ProductList';
import { ElCastorCatalog } from './elcastor/ProductList';
import { ChatAssistant } from './components/ChatAssistant';

type ViewState = 'dashboard' | 'unger' | 'elcastor';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    const u = getCurrentUser();
    setUser(u);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setCurrentView('dashboard');
    setAuthView('login');
  };

  const getActiveBrand = (): Brand => {
    if (currentView === 'unger') return Brand.UNGER;
    if (currentView === 'elcastor') return Brand.EL_CASTOR;
    return Brand.NONE;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  // Authentication Flow
  if (!user) {
    return authView === 'login' ? (
      <Login 
        onSuccess={handleLoginSuccess} 
        onSwitchToRegister={() => setAuthView('register')} 
      />
    ) : (
      <Register 
        onSuccess={handleLoginSuccess} 
        onSwitchToLogin={() => setAuthView('login')} 
      />
    );
  }

  // Authenticated App Layout
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm z-10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('dashboard')}>
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="h-8 w-8 bg-brand-600 rounded flex items-center justify-center text-white font-bold">CM</div>
                <span className="font-bold text-xl text-gray-900 hidden sm:block">CleanMaster AI</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`${currentView === 'dashboard' ? 'border-brand-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('unger')}
                  className={`${currentView === 'unger' ? 'border-unger-green text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16`}
                >
                  Unger
                </button>
                <button
                  onClick={() => setCurrentView('elcastor')}
                  className={`${currentView === 'elcastor' ? 'border-elcastor-red text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16`}
                >
                  El Castor
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-4 hidden md:block">
                  Olá, <strong>{user.name}</strong> ({user.company})
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <div className="space-y-8">
            <div className="text-center py-10">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Catálogos Inteligentes
              </h1>
              <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                Selecione uma marca para explorar os produtos e utilizar nosso assistente AI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Card Unger */}
              <div 
                onClick={() => setCurrentView('unger')}
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 border-t-4 border-unger-green"
              >
                <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <span className="text-4xl font-bold text-unger-dark">UNGER</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-unger-green transition-colors">
                    Ferramentas de Vidro
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Acesso completo à linha ErgoTec, HydroPower e sistemas telescópicos de alta performance.
                  </p>
                  <span className="text-unger-green font-semibold flex items-center">
                    Acessar Catálogo &rarr;
                  </span>
                </div>
              </div>

              {/* Card El Castor */}
              <div 
                onClick={() => setCurrentView('elcastor')}
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 border-t-4 border-elcastor-red"
              >
                <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <span className="text-4xl font-bold text-elcastor-dark">EL CASTOR</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-elcastor-red transition-colors">
                    Limpeza Geral
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Linha completa de Mops, carrinhos funcionais e equipamentos para limpeza úmida.
                  </p>
                  <span className="text-elcastor-red font-semibold flex items-center">
                    Acessar Catálogo &rarr;
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'unger' && <UngerCatalog />}
        {currentView === 'elcastor' && <ElCastorCatalog />}
      </main>

      {/* AI Assistant - Always available but context aware */}
      <ChatAssistant activeBrand={getActiveBrand()} />
    </div>
  );
};

export default App;