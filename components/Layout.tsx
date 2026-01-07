import React, { useState } from 'react';
import { Network, Menu, X, Monitor, FileText, Database, Bot, Users, Layers } from 'lucide-react';
import { MainPageRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: MainPageRoute;
  onNavigate: (page: MainPageRoute) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 1 as MainPageRoute, label: 'Beranda', icon: <Monitor size={18} /> },
    { id: 2 as MainPageRoute, label: 'Jaringan & Internet', icon: <Network size={18} /> },
    { id: 3 as MainPageRoute, label: 'Algoritma', icon: <Layers size={18} /> },
    { id: 4 as MainPageRoute, label: 'Dampak Sosial', icon: <FileText size={18} /> },
    { id: 5 as MainPageRoute, label: 'Analisis Data', icon: <Database size={18} /> },
    { id: 6 as MainPageRoute, label: 'Praktik Lintas Bidang', icon: <Users size={18} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-500/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-xl text-white transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Area */}
            <div 
              className="flex items-center gap-4 cursor-pointer group" 
              onClick={() => onNavigate(1)}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-2.5 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg">
                  <Network className="text-amber-500" size={26} />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Informatika<span className="text-amber-500">X</span>
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <span className="text-[10px] bg-indigo-900/50 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-800/50 font-medium">by MWS AI Studio</span>
                </div>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1 bg-slate-800/50 p-1.5 rounded-full border border-slate-700/50 backdrop-blur-sm">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden group ${
                    activePage === item.id 
                      ? 'text-white bg-indigo-600 shadow-[0_2px_15px_-3px_rgba(79,70,229,0.4)]' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 animate-fade-in shadow-2xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium transition-all ${
                    activePage === item.id 
                      ? 'text-white bg-indigo-600 shadow-lg' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/50 text-slate-400 py-10 mt-auto relative overflow-hidden">
        {/* Elegant Abstract Decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute left-1/4 top-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px]"></div>
            <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-amber-600 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Bot size={24} className="text-amber-500" />
            <span className="font-bold text-white text-lg tracking-wide">MWS AI Studio</span>
          </div>
          
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-600 to-transparent my-2"></div>
          
          <p className="font-medium text-slate-300">
            Disusun oleh <span className="text-white font-semibold">Malabi Wibowo Susanto</span>
          </p>
          
          <p className="text-xs text-slate-500 font-mono tracking-widest mt-2">
            © Tahun 2026 MEDIA PEMBELAJARAN INFORMATIKA
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;