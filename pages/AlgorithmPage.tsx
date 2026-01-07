import React, { useState, useEffect } from 'react';
import { 
  Code, CheckCircle2, 
  Box, Cpu, GitBranch, Repeat,
  BookOpen, Table, 
  ShoppingBag, Scale, Calculator, Bug, Lightbulb
} from 'lucide-react';

// --- TYPES ---
type SessionType = 1 | 2 | 3 | 'quiz';

// --- DATA: QUIZ (ASESMEN SUMATIF RPP) ---
const QUIZ_DATA = [
  {
    question: "Apa tujuan utama penulisan algoritma dalam pemrograman?",
    options: ["Agar komputer bekerja cepat", "Menyusun langkah penyelesaian masalah secara logis", "Menghias tampilan program", "Menghemat listrik"],
    answer: 1
  },
  {
    question: "Dalam Flowchart, simbol 'Belah Ketupat' (Diamond) digunakan untuk...",
    options: ["Proses Perhitungan", "Input/Output", "Keputusan (Decision)", "Mulai/Selesai"],
    answer: 2
  },
  {
    question: "Studi Kasus Kembang Kol: Jika berat < 50g 'Kecil', 50-200g 'Sedang', > 200g 'Jumbo'. Struktur kontrol yang paling tepat adalah...",
    options: ["Looping (For)", "If - Else If - Else", "Switch Case", "Function"],
    answer: 1
  },
  {
    question: "Pada kode: for(i=0; i<n; i--) { ... }, apa yang menyebabkan error/infinite loop?",
    options: ["Variabel i belum dideklarasikan", "Kondisi i<n salah", "Decrement i-- seharusnya Increment i++", "Kurang titik koma"],
    answer: 2
  },
  {
    question: "Apa keuntungan menggunakan 'Fungsi' (Function) dalam pemrograman?",
    options: ["Program jadi lebih panjang", "Kode bisa digunakan kembali (Modular) dan rapi", "Komputer jadi lambat", "Hanya bisa dipakai untuk matematika"],
    answer: 1
  }
];

// --- SIMULATOR 1: FLOWCHART BAKSO (LKPD 1 - PERTEMUAN 7) ---
const BaksoFlowchart = () => {
  const [totalBayar, setTotalBayar] = useState<number>(15000);
  const [uang, setUang] = useState<number>(0);
  const [step, setStep] = useState(0); // 0:Start, 1:Input, 2:Decision, 3:Process, 4:End
  const [message, setMessage] = useState("");

  const reset = () => {
    setStep(0);
    setMessage("");
    setUang(0);
  };

  const nextStep = () => {
    if (step === 0) setStep(1);
    else if (step === 1) {
      if (uang <= 0) return alert("Masukkan uang dulu!");
      setStep(2);
    } else if (step === 2) {
      if (uang >= totalBayar) {
        setStep(3); // Hitung Kembalian
      } else {
        setStep(5); // Uang Kurang (Alternative Path)
      }
    } else if (step === 3) {
      setMessage(`Kembalian: Rp ${uang - totalBayar}`);
      setStep(4);
    } else if (step === 5) {
      setMessage("Uang Kurang! Transaksi Gagal.");
      setStep(4);
    }
  };

  const getNodeStyle = (s: number) => `p-3 rounded-lg border-2 text-center text-xs font-bold transition-all duration-300 relative z-10 
    ${step === s ? 'bg-amber-100 border-amber-500 text-amber-800 scale-110 shadow-lg' : 'bg-white border-slate-300 text-slate-500'}`;

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
         <ShoppingBag className="text-amber-600" size={20}/>
         <h4 className="font-bold text-slate-800">Simulasi: Mesin Bayar Bakso</h4>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Flowchart Visual */}
        <div className="flex-1 relative flex flex-col items-center gap-4">
           <div className="absolute inset-y-0 left-1/2 w-0.5 bg-slate-300 -z-0"></div>
           
           <div className={`${getNodeStyle(0)} rounded-full w-24`}>START</div>
           
           <div className={`${getNodeStyle(1)} skew-x-[-12deg] w-40`}>
             <div className="skew-x-[12deg]">INPUT Uang & Total</div>
           </div>
           
           <div className={`${getNodeStyle(2)} rotate-45 w-24 h-24 flex items-center justify-center !p-0`}>
             <div className="-rotate-45">Uang &ge; Total?</div>
           </div>
           
           <div className="flex w-full justify-between px-8 -mt-20 pointer-events-none">
              <span className="text-xs font-bold text-green-600 bg-white px-1 relative z-20">Ya</span>
              <span className="text-xs font-bold text-red-600 bg-white px-1 relative z-20">Tidak</span>
           </div>

           <div className="flex gap-8 w-full mt-4">
              <div className="flex-1 flex flex-col items-center gap-4">
                 <div className={`${getNodeStyle(3)} w-full`}>Kembalian = Uang - Total</div>
                 <div className={`${getNodeStyle(4)} rounded-full w-24`}>END</div>
              </div>
              <div className="flex-1 flex flex-col items-center gap-4">
                 <div className={`${getNodeStyle(5)} skew-x-[-12deg] w-full`}>
                    <div className="skew-x-[12deg]">PRINT "Kurang"</div>
                 </div>
                 {/* Visual line back to End omitted for simplicity */}
              </div>
           </div>
        </div>

        {/* Controls */}
        <div className="w-full md:w-64 bg-white p-4 rounded-xl border border-slate-200 shadow-md h-fit">
           <div className="mb-4 space-y-2">
             <label className="text-xs font-bold text-slate-500 block">Total Bayar (Rp)</label>
             <input type="number" value={totalBayar} disabled className="w-full bg-slate-100 border border-slate-300 rounded p-2 text-right font-mono" />
             
             <label className="text-xs font-bold text-slate-500 block">Uang Pelanggan (Rp)</label>
             <input 
                type="number" 
                value={uang} 
                onChange={(e) => setUang(Number(e.target.value))}
                disabled={step !== 1}
                className={`w-full border rounded p-2 text-right font-mono focus:ring-2 focus:ring-amber-400 outline-none ${step === 1 ? 'bg-white border-amber-500' : 'bg-slate-100 border-slate-300'}`}
                placeholder="0"
             />
           </div>

           <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-xs min-h-[60px] mb-4 flex items-center justify-center text-center">
              {message || (step === 0 ? "Siap..." : step === 1 ? "Menunggu Input..." : "Memproses...")}
           </div>

           {step === 4 ? (
             <button onClick={reset} className="w-full bg-slate-700 text-white py-2 rounded-lg font-bold hover:bg-slate-800">Reset</button>
           ) : (
             <button onClick={nextStep} className="w-full bg-amber-500 text-white py-2 rounded-lg font-bold hover:bg-amber-600">
                {step === 0 ? "Mulai" : "Lanjut"}
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

// --- SIMULATOR 2: SORTIR KEMBANG KOL (STUDI KASUS - PERTEMUAN 8) ---
const CauliflowerSorter = () => {
  const [weight, setWeight] = useState<number | ''>('');
  const [category, setCategory] = useState<'kecil' | 'sedang' | 'jumbo' | null>(null);

  const checkCategory = () => {
    const w = Number(weight);
    if (w <= 0) {
        setCategory(null);
        return;
    }
    if (w < 50) setCategory('kecil');
    else if (w <= 200) setCategory('sedang');
    else setCategory('jumbo');
  };

  useEffect(() => {
     checkCategory();
  }, [weight]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
       <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
          <Scale className="text-indigo-600" size={20} />
          <h4 className="font-bold text-slate-800">Studi Kasus: Sortir Kembang Kol</h4>
       </div>

       <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Logic Visualization */}
          <div className="space-y-3 font-mono text-sm">
             <div className={`p-3 rounded-lg border transition-all ${category === 'kecil' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                if (berat &lt; 50) {'{'} category = "Kecil"; {'}'}
             </div>
             <div className={`p-3 rounded-lg border transition-all ${category === 'sedang' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                else if (berat &lt;= 200) {'{'} category = "Sedang"; {'}'}
             </div>
             <div className={`p-3 rounded-lg border transition-all ${category === 'jumbo' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                else {'{'} category = "Jumbo"; {'}'}
             </div>
          </div>

          {/* Interactive Input */}
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center">
             <label className="block text-sm font-bold text-indigo-900 mb-2">Input Berat (Gram)</label>
             <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="text-3xl font-bold text-center w-32 p-2 rounded-lg border-2 border-indigo-300 focus:border-indigo-600 outline-none text-indigo-700 mb-4"
                placeholder="0"
             />
             <div className="h-32 flex items-center justify-center">
                {category ? (
                   <div className="animate-blob transition-all">
                      <div className={`rounded-full flex items-center justify-center shadow-lg font-bold text-white transition-all duration-500
                         ${category === 'kecil' ? 'w-16 h-16 bg-green-500 text-xs' : 
                           category === 'sedang' ? 'w-24 h-24 bg-blue-500 text-sm' : 
                           'w-32 h-32 bg-purple-600 text-lg'
                         }`}
                      >
                         {category.toUpperCase()}
                      </div>
                   </div>
                ) : (
                   <span className="text-slate-400 italic">Masukkan berat...</span>
                )}
             </div>
          </div>
       </div>
    </div>
  );
};

// --- SIMULATOR 3: BUG HUNTER (LKPD 2 - PERTEMUAN 8) ---
const BugHunter = () => {
   const [code, setCode] = useState(`
int i, n = 5;
// Loop mencetak 1 s.d 5
for(i=1; i<=n; i--) { 
    printf("%d ", i);
}`);
   const [status, setStatus] = useState<'idle'|'error'|'success'>('idle');

   const checkCode = () => {
      if (code.includes('i++')) {
         setStatus('success');
      } else {
         setStatus('error');
      }
   };

   return (
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl text-white mt-8">
         <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold flex items-center gap-2 text-red-400">
               <Bug size={20}/> Gamifikasi: Bug Hunter
            </h4>
            <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-400">Tantangan Debugging</span>
         </div>
         <p className="text-sm text-slate-300 mb-4">
            Kode di bawah ini menyebabkan <strong>Infinite Loop</strong> (tidak berhenti). Temukan bug-nya dan perbaiki!
         </p>

         <div className="grid md:grid-cols-2 gap-6">
            <textarea 
               value={code}
               onChange={(e) => setCode(e.target.value)}
               className="bg-black font-mono text-sm p-4 rounded-lg border border-slate-700 focus:border-green-500 outline-none text-green-400 w-full h-32 resize-none"
            />
            <div className="flex flex-col justify-center gap-4">
               <button 
                  onClick={checkCode}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2"
               >
                  {/* Fixed: Use Code icon instead of Play icon since Play is unused elsewhere */}
                  <Code size={16}/> Compile & Run
               </button>
               
               {status === 'error' && (
                  <div className="bg-red-900/50 p-3 rounded border border-red-500/50 text-red-200 text-sm animate-pulse">
                     ⚠️ <strong>Runtime Error:</strong> Infinite Loop terdeteksi! Nilai 'i' terus mengecil (0, -1, -2...) sehingga kondisi i &lt;= 5 selalu benar.
                  </div>
               )}
               {status === 'success' && (
                  <div className="bg-green-900/50 p-3 rounded border border-green-500/50 text-green-200 text-sm animate-fade-in">
                     ✅ <strong>Sukses!</strong> Anda memperbaiki 'i--' menjadi 'i++'. Loop berjalan 5 kali.
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

// --- SIMULATOR 4: MODULAR CALCULATOR (LKPD 3 - PERTEMUAN 9) ---
const ModularCalc = () => {
   const [sisi, setSisi] = useState(0);
   const [jari, setJari] = useState(0);
   const [output, setOutput] = useState<string[]>([]);

   const runSquare = () => {
      // Logic simulation
      const luas = sisi * sisi;
      setOutput(prev => [`[Main] Memanggil fungsi hitungLuasPersegi(${sisi})...`, `   [Fungsi] ${sisi} x ${sisi} = ${luas}`, `[Main] Hasil diterima: ${luas}`]);
   };

   const runCircle = () => {
      const luas = 3.14 * jari * jari;
      setOutput(prev => [`[Main] Memanggil fungsi hitungLuasLingkaran(${jari})...`, `   [Fungsi] 3.14 x ${jari} x ${jari} = ${luas}`, `[Main] Hasil diterima: ${luas}`]);
   };

   return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
            <Calculator className="text-purple-600" size={20} />
            <h4 className="font-bold text-slate-800">Proyek Mini: Kalkulator Modular</h4>
         </div>

         <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <h5 className="font-bold text-purple-900 mb-2 text-sm">Fungsi 1: Persegi</h5>
                  <div className="flex gap-2">
                     <input type="number" placeholder="Sisi" onChange={e => setSisi(Number(e.target.value))} className="w-20 p-2 rounded border border-purple-200 text-sm" />
                     <button onClick={runSquare} className="bg-purple-600 text-white px-4 py-2 rounded text-xs font-bold hover:bg-purple-700">Panggil Fungsi</button>
                  </div>
               </div>
               <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <h5 className="font-bold text-purple-900 mb-2 text-sm">Fungsi 2: Lingkaran</h5>
                  <div className="flex gap-2">
                     <input type="number" placeholder="Jari-jari" onChange={e => setJari(Number(e.target.value))} className="w-20 p-2 rounded border border-purple-200 text-sm" />
                     <button onClick={runCircle} className="bg-purple-600 text-white px-4 py-2 rounded text-xs font-bold hover:bg-purple-700">Panggil Fungsi</button>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 text-green-400 p-4 rounded-xl font-mono text-xs h-48 overflow-y-auto border border-slate-700 shadow-inner">
               <div className="text-slate-500 mb-2">// Log Eksekusi Program</div>
               {output.map((line, i) => (
                  <div key={i} className="mb-1">{line}</div>
               ))}
               {output.length === 0 && <span className="text-slate-600">Menunggu pemanggilan fungsi...</span>}
            </div>
         </div>
      </div>
   );
};

// --- HELPER COMPONENTS ---
const SectionHeader = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">{icon}</div>
    <h3 className="text-xl font-bold text-slate-800">{title}</h3>
  </div>
);

const Card = ({ title, children, className = "" }: { title: string, children?: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-5 rounded-xl border border-slate-200 shadow-sm ${className}`}>
    <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
      <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
      {title}
    </h4>
    {children}
  </div>
);

// --- MAIN PAGE COMPONENT ---
const AlgorithmPage = () => {
  const [session, setSession] = useState<SessionType>(1);
  const [score, setScore] = useState<number | null>(null);

  const SessionBtn = ({ id, title, sub, icon }: { id: SessionType, title: string, sub: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setSession(id)}
      className={`flex flex-col items-center gap-1 px-4 py-4 rounded-xl transition-all duration-300 border-2 w-full md:w-auto flex-1 text-center
        ${session === id 
        ? 'bg-slate-800 border-amber-500 text-white shadow-xl transform scale-105' 
        : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
    >
      <div className={`p-2 rounded-full mb-1 ${session === id ? 'bg-amber-500 text-slate-900' : 'bg-slate-200 text-slate-500'}`}>
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-wider opacity-80">{sub}</span>
      <span className="font-bold text-sm md:text-base">{title}</span>
    </button>
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* HEADER */}
      <div className="text-center mb-10 bg-slate-900 text-white py-14 px-4 rounded-[2.5rem] shadow-2xl border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
             <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-500 rounded-full blur-[100px] opacity-20"></div>
        </div>
        <div className="relative z-10">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">
                RPP Algoritma - Fase E
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              Algoritma & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Pemrograman</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Memecahkan masalah dengan logika komputasional dan bahasa C (Prosedural).
            </p>
        </div>
      </div>

      {/* SESSION NAVIGATION */}
      <div className="flex flex-col md:flex-row gap-4 px-2 sticky top-24 z-30 max-w-5xl mx-auto w-full">
        <SessionBtn id={1} sub="Pertemuan 7" title="Konsep Algoritma" icon={<GitBranch size={20}/>} />
        <SessionBtn id={2} sub="Pertemuan 8" title="Struktur Kontrol" icon={<Code size={20}/>} />
        <SessionBtn id={3} sub="Pertemuan 9" title="Fungsi Modular" icon={<Box size={20}/>} />
        <SessionBtn id="quiz" sub="Evaluasi" title="Uji Pemahaman" icon={<CheckCircle2 size={20}/>} />
      </div>

      {/* CONTENT AREA */}
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl min-h-[600px] relative max-w-5xl mx-auto">
        
        {/* PERTEMUAN 7: KONSEP ALGORITMA */}
        {session === 1 && (
          <div className="animate-fade-in space-y-10">
            <SectionHeader title="Konsep Algoritma & Flowchart" icon={<BookOpen size={24} />} />

            {/* Mindfulness & Analogy */}
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-start gap-4">
               <div className="bg-white p-3 rounded-full shadow-sm text-indigo-600"><Lightbulb size={24}/></div>
               <div>
                  <h4 className="font-bold text-indigo-900 mb-2">Apersepsi: Rute Rumah</h4>
                  <p className="text-indigo-800 text-sm leading-relaxed">
                    Bagaimana kalian menjelaskan jalan ke rumah pada orang asing agar tidak tersesat? 
                    Itulah <strong>Algoritma</strong>: Urutan langkah logis yang terdefinisi jelas.
                  </p>
               </div>
            </div>

            {/* Theory */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                      Definisi & Karakteristik
                    </h4>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      <strong>Algoritma</strong> adalah sekumpulan instruksi terstruktur untuk menyelesaikan masalah komputasi. 
                      Prinsip utamanya adalah: <em>"Program ditulis agar dipahami mesin, algoritma ditulis agar dipahami manusia."</em>
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">3 Syarat Algoritma (Donald Knuth):</h5>
                      <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex gap-2 items-start">
                          <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0"/> 
                          <span><strong>Finite (Terbatas):</strong> Harus berhenti setelah sejumlah langkah, tidak boleh looping selamanya.</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0"/> 
                          <span><strong>Definite (Pasti):</strong> Setiap langkah jelas, tidak ambigu/membingungkan.</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0"/> 
                          <span><strong>Efektif:</strong> Langkah sederhana yang bisa dikerjakan oleh akal manusia.</span>
                        </li>
                      </ul>
                    </div>
                </div>
              </div>

              {/* Tabel Simbol Flowchart */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm flex items-center gap-2">
                  <Table size={16}/> Simbol Standar ANSI
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-2"><div className="w-12 h-6 border-2 border-slate-800 rounded-full bg-white mx-auto"></div></td>
                        <td className="px-4 py-2 text-slate-600"><strong>Terminator:</strong> Start/End</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2"><div className="w-12 h-6 border-2 border-slate-800 skew-x-[-12deg] bg-white mx-auto"></div></td>
                        <td className="px-4 py-2 text-slate-600"><strong>Input/Output:</strong> Data masuk/keluar</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2"><div className="w-12 h-6 border-2 border-slate-800 bg-white mx-auto"></div></td>
                        <td className="px-4 py-2 text-slate-600"><strong>Proses:</strong> Perhitungan</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2"><div className="w-6 h-6 border-2 border-slate-800 rotate-45 bg-white mx-auto"></div></td>
                        <td className="px-4 py-2 text-slate-600"><strong>Decision:</strong> Keputusan (Ya/Tidak)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* LKPD 1 Simulator */}
            <div>
              <div className="flex items-center justify-between mb-4 mt-8">
                <h4 className="font-bold text-slate-900 border-l-4 border-amber-500 pl-3 text-lg">LKPD 1: Logika Pembayaran Bakso</h4>
                <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">Simulasi</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">Buatlah logika mesin kasir: Jika Uang {'>='} Total, hitung kembalian. Jika tidak, tolak transaksi.</p>
              <BaksoFlowchart />
            </div>
          </div>
        )}

        {/* PERTEMUAN 8: STRUKTUR KONTROL */}
        {session === 2 && (
          <div className="animate-fade-in space-y-10">
            <SectionHeader title="Variabel & Struktur Kontrol (Bahasa C)" icon={<Cpu size={24} />} />

            <div className="grid md:grid-cols-2 gap-8">
               {/* Tipe Data */}
               <Card title="Tipe Data Dasar C">
                  <ul className="space-y-2 text-sm text-slate-600">
                     <li className="flex justify-between border-b pb-1">
                        <span><code className="text-indigo-600 font-bold">int</code> (Integer)</span>
                        <span>Bilangan bulat (10, -5)</span>
                     </li>
                     <li className="flex justify-between border-b pb-1">
                        <span><code className="text-indigo-600 font-bold">float</code></span>
                        <span>Bilangan desimal (3.14)</span>
                     </li>
                     <li className="flex justify-between">
                        <span><code className="text-indigo-600 font-bold">char</code></span>
                        <span>Karakter tunggal ('A')</span>
                     </li>
                  </ul>
               </Card>

               {/* Struktur Kontrol */}
               <Card title="Struktur Kontrol">
                  <div className="space-y-4 text-sm text-slate-600">
                     <div>
                        <strong className="text-indigo-700">1. Percabangan (Decision)</strong>
                        <p>Menggunakan <code>if-else</code> atau <code>switch-case</code> untuk logika "JIKA... MAKA...".</p>
                     </div>
                     <div>
                        <strong className="text-indigo-700">2. Perulangan (Looping)</strong>
                        <p>Menggunakan <code>for</code>, <code>while</code> untuk tugas berulang.</p>
                     </div>
                  </div>
               </Card>
            </div>

            {/* Studi Kasus Simulator */}
            <div>
               <div className="flex items-center justify-between mb-4 mt-8">
                  <h4 className="font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 text-lg">Studi Kasus: If-Else-If</h4>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold">Deep Learning</span>
               </div>
               <CauliflowerSorter />
            </div>

            {/* Gamifikasi Bug Hunter */}
            <BugHunter />
          </div>
        )}

        {/* PERTEMUAN 9: FUNGSI */}
        {session === 3 && (
          <div className="animate-fade-in space-y-10">
            <SectionHeader title="Fungsi & Pemrograman Modular" icon={<Box size={24} />} />

            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex items-start gap-4">
               <div className="bg-white p-3 rounded-full shadow-sm text-purple-600"><Repeat size={24}/></div>
               <div>
                  <h4 className="font-bold text-purple-900 mb-2">Konsep Bermakna</h4>
                  <p className="text-purple-800 text-sm leading-relaxed">
                    Bayangkan jika tombol 'Print' di Word harus diprogram ulang setiap kali mau nge-print. Repot kan? 
                    Makanya ada <strong>Fungsi</strong>: blok kode yang bisa dipanggil berulang kali.
                  </p>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="prose text-sm text-slate-600">
                  <h4 className="font-bold text-slate-800 mb-2">Struktur Fungsi C</h4>
                  <pre className="bg-slate-800 text-white p-4 rounded-xl font-mono overflow-x-auto">
{`// Definisi Fungsi
int hitungLuas(int s) {
   return s * s;
}

int main() {
   // Pemanggilan Fungsi
   int hasil = hitungLuas(5);
   printf("%d", hasil);
   return 0;
}`}
                  </pre>
               </div>
               <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">Keuntungan Modular</h4>
                  <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                     <li>Kode lebih rapi dan mudah dibaca.</li>
                     <li>Memudahkan debugging (mencari kesalahan per blok).</li>
                     <li>Dapat digunakan kembali (Reusability).</li>
                     <li>Memungkinkan kerja tim (Pair Programming).</li>
                  </ul>
               </div>
            </div>

            {/* LKPD 3 Simulator */}
            <div>
              <div className="flex items-center justify-between mb-4 mt-8">
                <h4 className="font-bold text-slate-900 border-l-4 border-purple-500 pl-3 text-lg">LKPD 3: Tantangan Fungsi</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">Project Based</span>
              </div>
              <ModularCalc />
            </div>
          </div>
        )}

        {/* EVALUASI */}
        {session === 'quiz' && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-amber-100 text-amber-600 rounded-full mb-4 shadow-sm">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Evaluasi Sumatif</h3>
              <p className="text-slate-500">Uji pemahamanmu tentang Algoritma, Bahasa C, dan Fungsi.</p>
            </div>

            {score === null ? (
              <div className="space-y-6">
                {QUIZ_DATA.map((q, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-400 transition group">
                    <h4 className="font-bold text-slate-800 mb-4 flex gap-2">
                      <span className="text-indigo-600">#{idx + 1}</span> {q.question}
                    </h4>
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => (
                        <label key={oIdx} className="flex items-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition">
                          <input type="radio" name={`q-${idx}`} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 accent-indigo-600" />
                          <span className="ml-3 text-slate-700 text-sm group-hover:text-slate-900">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    // Demo score calculation
                    setScore(85);
                    window.scrollTo(0, 0);
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:scale-[1.02]"
                >
                  Kirim Jawaban
                </button>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-2xl text-center animate-in zoom-in">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Nilai Kamu</h3>
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-6">
                  {score}
                </div>
                <p className="text-slate-600 mb-8">
                  {score >= 80 ? "Hebat! Kamu sudah siap coding." : "Tetap semangat! Pelajari lagi materi simulasi."}
                </p>
                <button onClick={() => setScore(null)} className="px-8 py-3 bg-slate-100 text-slate-800 rounded-lg font-bold hover:bg-slate-200 transition">
                  Ulangi Tes
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AlgorithmPage;