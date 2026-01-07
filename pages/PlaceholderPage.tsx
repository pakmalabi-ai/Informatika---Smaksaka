import React from 'react';
import { Lock, Clock } from 'lucide-react';

interface PlaceholderPageProps {
  pageNumber: number;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ pageNumber }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in text-center p-8 bg-slate-100 rounded-3xl border border-slate-200 border-dashed">
      <div className="bg-slate-200 p-6 rounded-full mb-6 relative overflow-hidden">
        <Lock className="text-slate-400" size={64} />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white opacity-20"></div>
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Halaman {pageNumber}</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        Materi pembelajaran untuk bagian ini sedang dipersiapkan oleh Bapak Malabi. 
        Silakan kembali lagi nanti atau fokus pada materi yang sudah tersedia.
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-600 rounded-lg text-sm font-medium">
        <Clock size={16} /> Coming Soon
      </div>
    </div>
  );
};

export default PlaceholderPage;
