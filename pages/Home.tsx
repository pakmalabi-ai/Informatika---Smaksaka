import React from 'react';
import { ChevronRight, Cpu, Sparkles, User, GraduationCap } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl text-center py-16 px-6 border border-slate-700">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl mix-blend-multiply filter opacity-30 animate-blob"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl mix-blend-multiply filter opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-slate-800 border border-slate-600 text-amber-500 text-xs font-semibold mb-6 uppercase tracking-wider animate-fade-in">
            <Sparkles size={14} /> Semester Genap 2025/2026
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Halo, Siswa-Siswi Kelas X <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              SMK Negeri 1 Kaligondang!
            </span>
          </h1>

          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 text-left mb-8 shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Selamat datang di ruang belajar digital mata pelajaran <strong className="text-white">Informatika</strong>. 
              Website ini hadir sebagai pusat media pembelajaran interaktif untuk menemani perjalanan kalian di Semester Genap Tahun Pelajaran 2025/2026.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Di sini, kita tidak hanya akan belajar tentang teknologi, tetapi juga mengasah pola pikir komputasional 
              (<em className="text-indigo-400 not-italic">Computational Thinking</em>) untuk menghadapi tantangan di era digital yang dinamis. 
              Manfaatkan setiap materi, video, dan modul yang ada di portal ini untuk memperkaya wawasan kalian.
            </p>
            <p className="text-lg text-white font-medium italic">
              "Mari bersama-sama mewujudkan generasi Smaksaka yang unggul, kreatif, dan melek teknologi!"
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-800 p-4 rounded-xl border border-slate-700 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-full animate-blob">
                <User className="text-white" size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400 uppercase font-bold">Guru Mata Pelajaran</p>
                <p className="text-white font-semibold">Malabi Wibowo Susanto</p>
              </div>
            </div>

            <button 
              onClick={onStart}
              className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-8 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
            >
              <GraduationCap size={20} /> Mulai Belajar Sekarang <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights (Decorational) */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 animate-fade-in hover:shadow-md hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.4s' }}>
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Cpu /></div>
          <div>
            <h3 className="font-bold text-slate-800">Interaktif</h3>
            <p className="text-sm text-slate-500">Simulasi langsung di browser.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 animate-fade-in hover:shadow-md hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.5s' }}>
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Sparkles /></div>
          <div>
            <h3 className="font-bold text-slate-800">Modern</h3>
            <p className="text-sm text-slate-500">Desain UI/UX terkini.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 animate-fade-in hover:shadow-md hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.6s' }}>
          <div className="p-3 bg-green-100 text-green-600 rounded-lg"><User /></div>
          <div>
            <h3 className="font-bold text-slate-800">Mandiri</h3>
            <p className="text-sm text-slate-500">Belajar sesuai kecepatanmu.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;