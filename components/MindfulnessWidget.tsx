import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

const MindfulnessWidget: React.FC = () => {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (active) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            if (phase === 'Inhale') { setPhase('Hold'); return 4; }
            if (phase === 'Hold') { setPhase('Exhale'); return 4; }
            if (phase === 'Exhale') { setPhase('Inhale'); return 4; }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [active, phase]);

  if (!active) return (
    <div className="fixed bottom-6 right-6 z-40">
      <button 
        onClick={() => setActive(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white px-4 py-3 rounded-full shadow-[0_10px_20px_rgba(79,70,229,0.4)] transition-all hover:scale-105"
      >
        <Brain size={20} />
        <span className="font-medium">Fokus Sejenak</span>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-amber-500"></div>
        <h3 className="text-2xl font-bold text-white mb-2">Mindfulness</h3>
        <p className="text-slate-400 mb-6 text-sm">Atur napas agar pikiran lebih jernih dan fokus kembali.</p>
        
        <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
          <div className={`absolute inset-0 bg-indigo-500/20 rounded-full animate-ping ${phase === 'Hold' ? 'paused' : ''}`}></div>
          <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
            phase === 'Inhale' ? 'border-indigo-400 scale-110 shadow-[0_0_30px_rgba(129,140,248,0.5)]' : 
            phase === 'Exhale' ? 'border-amber-400 scale-90' : 'border-white scale-100'
          }`}>
            <span className="text-3xl font-bold text-white">{timer}</span>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-indigo-300 mb-8 uppercase tracking-widest">{phase}...</h2>
        
        <button 
          onClick={() => setActive(false)}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-colors font-medium"
        >
          Selesai & Lanjutkan Belajar
        </button>
      </div>
    </div>
  );
};

export default MindfulnessWidget;