import React, { useState } from 'react';
import { 
  Database, Shield, Search, FileText, Lock, 
  AlertTriangle, Mail, Globe, Key, 
  CheckCircle2, Copy, RefreshCw, Award, PieChart,
  Calendar, ClipboardList,
  Unlock, XCircle
} from 'lucide-react';

// --- TYPES ---
type SessionType = 1 | 2 | 3 | 'quiz';

// --- DATA SOURCE FROM RPP (ASESMEN SUMATIF) ---
const QUIZ_DATA = [
  {
    question: "Apa perbedaan mendasar sifat informasi digital dibandingkan informasi analog (fisik)?",
    options: ["Susah digandakan", "Fleksibel dan mudah dimodifikasi", "Membutuhkan kertas", "Kualitas menurun saat disalin"],
    answer: 1
  },
  {
    question: "Ciri utama email Phishing yang paling mudah dikenali adalah...",
    options: ["Menggunakan Bahasa Indonesia baku", "Alamat email pengirim aneh/tidak resmi", "Tidak ada link tautan", "Dikirim oleh teman dikenal"],
    answer: 1
  },
  {
    question: "Jika menerima email dengan lampiran file berekstensi .exe dari orang tak dikenal, tindakan paling tepat adalah...",
    options: ["Mengunduh dan membukanya", "Meneruskan ke teman", "Mengabaikan dan menghapusnya (Potensi Malware)", "Membalas email tersebut"],
    answer: 2
  },
  {
    question: "Apa fungsi utama dari Enkripsi dalam keamanan data?",
    options: ["Menghapus data", "Mengubah teks asli menjadi kode acak agar tidak terbaca", "Mempercepat koneksi internet", "Mengompres ukuran file"],
    answer: 1
  },
  {
    question: "Kelebihan metode pengumpulan data Kuesioner dibandingkan Wawancara adalah...",
    options: ["Bisa menjangkau banyak responden dalam waktu singkat", "Data lebih mendalam", "Bisa melihat ekspresi wajah", "Tidak butuh persiapan"],
    answer: 0
  }
];

// --- SIMULATOR COMPONENTS ---

// 1. Phishing Simulator (Pertemuan 4 - Detektif Digital)
const PhishingSim = () => {
  const [foundFlags, setFoundFlags] = useState<string[]>([]);

  const handleFlagClick = (id: string) => {
    if (!foundFlags.includes(id)) {
      setFoundFlags([...foundFlags, id]);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden mt-6">
      <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
        <h4 className="font-bold flex items-center gap-2"><Mail size={18} /> Simulasi: Detektif Phishing</h4>
        <div className="text-xs bg-indigo-600 px-3 py-1 rounded-full border border-indigo-400">
          Status: {foundFlags.length}/4 Bukti Ditemukan
        </div>
      </div>
      
      <div className="p-3 bg-indigo-50 text-xs text-indigo-800 text-center border-b border-indigo-100 font-medium">
        Instruksi LKPD: Temukan 4 kejanggalan pada email "DANA Kaget" palsu di bawah ini!
      </div>

      <div className="p-6 relative bg-slate-100">
        {/* FAKE EMAIL UI */}
        <div className="border border-slate-300 rounded-lg p-6 bg-white shadow-sm relative max-w-2xl mx-auto">
          
          {/* Flag 1: Sender */}
          <div 
            onClick={() => handleFlagClick('sender')}
            className={`cursor-pointer border-2 p-3 rounded-lg mb-4 transition-all group ${foundFlags.includes('sender') ? 'border-green-500 bg-green-50' : 'border-transparent hover:border-red-400 hover:bg-red-50'}`}
          >
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-slate-900 text-sm">Dari: CS DANA OFFICIAL <span className="text-slate-500 font-normal text-xs">&lt;promo-dana-kaget@yahoo.com&gt;</span></p>
                    <p className="text-xs text-slate-500">Kepada: siswa@smk.sch.id</p>
                </div>
                {foundFlags.includes('sender') && <CheckCircle2 size={16} className="text-green-600"/>}
            </div>
            {foundFlags.includes('sender') && <p className="text-xs text-green-700 font-bold mt-1">✓ Email gratisan (@yahoo), bukan resmi (@dana.id).</p>}
          </div>

          <hr className="mb-4 border-slate-100" />

          {/* Flag 2: Generic Greeting */}
          <div className="space-y-4 text-slate-700">
            <div
               onClick={() => handleFlagClick('generic')}
               className={`cursor-pointer border-2 p-2 rounded-lg transition-all w-full ${foundFlags.includes('generic') ? 'border-green-500 bg-green-50' : 'border-transparent hover:border-red-400 hover:bg-red-50'}`}
            >
              <h2 className="text-lg font-bold text-slate-800">Yth. Pengguna Setia,</h2>
              {foundFlags.includes('generic') && <p className="text-xs text-green-700 font-bold mt-1">✓ Salam umum, tidak menyebut nama spesifik Anda.</p>}
            </div>

            <p className="text-sm">Selamat! Nomor Anda terpilih mendapatkan Saldo Kaget Rp 2.000.000.</p>
            
            {/* Flag 3: Urgency */}
            <div 
              onClick={() => handleFlagClick('urgency')}
              className={`cursor-pointer border-2 p-2 rounded-lg transition-all ${foundFlags.includes('urgency') ? 'border-green-500 bg-green-50' : 'border-transparent hover:border-red-400 hover:bg-red-50'}`}
            >
              <p className="text-red-600 font-bold text-sm bg-red-50 p-2 rounded inline-block">PERINGATAN: Klaim dalam 15 menit atau hangus!</p>
              {foundFlags.includes('urgency') && <p className="text-xs text-green-700 font-bold mt-1">✓ Desakan waktu (Urgency) agar korban panik.</p>}
            </div>

            {/* Flag 4: Link */}
            <div className="text-center py-4">
              <div 
                onClick={() => handleFlagClick('link')}
                className={`inline-block cursor-pointer border-2 p-3 rounded-lg transition-all ${foundFlags.includes('link') ? 'border-green-500 bg-green-50' : 'border-transparent hover:border-red-400 hover:bg-red-50'}`}
              >
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md pointer-events-none mb-1">
                  AMBIL UANG SEKARANG
                </button>
                <p className="text-xs text-blue-500 underline">http://bit.ly/dana-kaget-2026</p>
                {foundFlags.includes('link') && <p className="text-xs text-green-700 font-bold mt-1">✓ Link pendek/mencurigakan, bukan website resmi.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {foundFlags.length === 4 && (
        <div className="bg-green-600 p-3 text-center text-white font-bold animate-fade-in text-sm">
          <CheckCircle2 className="inline mr-2" size={18} /> SELAMAT! Analisis Anda Benar. Email ini adalah PHISHING.
        </div>
      )}
    </div>
  );
};

// 2. Encryption Lab (Pertemuan 5 - Benteng Digital)
const EncryptionLab = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [algo, setAlgo] = useState<'base64' | 'caesar'>('base64');
  const [shift, setShift] = useState(3);
  
  const caesarCipher = (str: string, shift: number, decrypt = false) => {
    if (decrypt) shift = (26 - (shift % 26)) % 26;
    return str.replace(/[a-zA-Z]/g, (c) => {
      const base = c >= 'a' ? 97 : 65;
      return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
    });
  };

  const processText = () => {
    if (!input) return '';
    try {
      if (algo === 'base64') {
        return mode === 'encrypt' ? btoa(input) : atob(input);
      } else if (algo === 'caesar') {
        return caesarCipher(input, shift, mode === 'decrypt');
      }
      return '';
    } catch (e) {
      return "Error: Input bukan format yang valid.";
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-xl text-white border border-slate-700">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
        <div className="p-2 bg-indigo-500 rounded-lg"><Lock size={20} /></div>
        <div>
          <h4 className="font-bold text-lg">Lab Kriptografi Sederhana</h4>
          <p className="text-xs text-slate-400">Belajar melindungi pesan dengan Encoding & Enkripsi.</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4 bg-slate-800 p-1 rounded-lg w-fit">
         <button 
           onClick={() => { setAlgo('base64'); setInput(''); }}
           className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${algo === 'base64' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
         >
           Base64 (Encoding)
         </button>
         <button 
           onClick={() => { setAlgo('caesar'); setInput(''); }}
           className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${algo === 'caesar' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
         >
           Caesar Cipher (Enkripsi)
         </button>
      </div>

      {algo === 'caesar' && (
        <div className="mb-4 flex items-center gap-3 text-sm animate-fade-in">
           <span className="text-slate-400">Geser Karakter (Shift):</span>
           <input 
             type="number" 
             min="1" max="25"
             value={shift} 
             onChange={(e) => setShift(Number(e.target.value))}
             className="w-16 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-center"
           />
           <span className="text-xs text-slate-500 italic">(A geser {shift} langkah menjadi {String.fromCharCode(65 + (shift % 26))})</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
           <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
             {mode === 'encrypt' ? 'Pesan Asli (Plaintext)' : 'Kode Rahasia (Ciphertext)'}
           </label>
           <textarea 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             className="w-full h-32 bg-slate-800 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm resize-none"
             placeholder={mode === 'encrypt' ? "Ketik pesan rahasia di sini..." : "Tempel kode terenkripsi di sini..."}
           />
        </div>

        <div className="flex flex-col gap-4">
           <div className="flex justify-center bg-slate-800 p-1 rounded-lg self-center border border-slate-700">
             <button 
               onClick={() => {setMode('encrypt');}}
               className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'encrypt' ? 'bg-green-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
             >
               <Lock size={12} className="inline mr-1 mb-0.5"/> ENKRIPSI
             </button>
             <button 
               onClick={() => {setMode('decrypt');}}
               className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'decrypt' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
             >
               <Unlock size={12} className="inline mr-1 mb-0.5"/> DEKRIPSI
             </button>
           </div>

           <div>
             <label className="block text-xs font-bold text-green-400 uppercase tracking-wider mb-2">Hasil Output</label>
             <div className="w-full h-32 bg-black border border-green-900/50 rounded-lg p-3 text-green-400 font-mono text-sm break-all overflow-y-auto relative group">
                {processText()}
                {processText() && !processText().startsWith('Error') && (
                  <button 
                    onClick={() => navigator.clipboard.writeText(processText())}
                    className="absolute top-2 right-2 p-1.5 bg-slate-800 rounded hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Copy"
                  >
                    <Copy size={14} />
                  </button>
                )}
             </div>
           </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-slate-500 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
        <strong className="text-slate-300">Info:</strong> {algo === 'base64' ? "Base64 bukan enkripsi sejati karena mudah dikembalikan (decode). Ini hanya pengkodean (Encoding)." : "Caesar Cipher adalah enkripsi substitusi klasik. Meski sederhana, ini adalah dasar kriptografi modern."}
      </div>
    </div>
  );
};

// 2b. Password Checker with Time Estimate (Pertemuan 5)
const PasswordSim = () => {
    const [pwd, setPwd] = useState("");
    
    const checkStrength = (p: string) => {
        let score = 0;
        if (p.length >= 8) score++;
        if (p.length >= 12) score++;
        if (/[A-Z]/.test(p)) score++;
        if (/[0-9]/.test(p)) score++;
        if (/[^A-Za-z0-9]/.test(p)) score++; // Special char
        return score;
    };
    
    const estimateCrackTime = (p: string) => {
      if (!p) return { time: "0 detik", label: "Instan", color: "text-red-600" };
      
      // Calculate entropy pool
      let pool = 0;
      if (/[a-z]/.test(p)) pool += 26;
      if (/[A-Z]/.test(p)) pool += 26;
      if (/[0-9]/.test(p)) pool += 10;
      if (/[^A-Za-z0-9]/.test(p)) pool += 32;
      
      const combinations = Math.pow(pool, p.length);
      const guessesPerSecond = 10_000_000_000; // 10 Billion guesses/sec (Modern GPU)
      const seconds = combinations / guessesPerSecond;
      
      if (seconds < 1) return { time: "Instan", label: "Sangat Lemah", color: "text-red-600" };
      if (seconds < 60) return { time: `${Math.round(seconds)} detik`, label: "Lemah", color: "text-red-500" };
      if (seconds < 3600) return { time: `${Math.round(seconds/60)} menit`, label: "Lemah", color: "text-orange-500" };
      if (seconds < 86400) return { time: `${Math.round(seconds/3600)} jam`, label: "Sedang", color: "text-amber-500" };
      if (seconds < 31536000) return { time: `${Math.round(seconds/86400)} hari`, label: "Kuat", color: "text-green-500" };
      if (seconds < 3153600000) return { time: `${Math.round(seconds/31536000)} tahun`, label: "Sangat Kuat", color: "text-green-600" };
      return { time: "Berabad-abad", label: "Tak Tertembus", color: "text-emerald-600" };
    };

    const strength = checkStrength(pwd);
    const width = Math.min((strength / 5) * 100, 100);
    const colorBar = strength < 2 ? 'bg-red-500' : strength < 4 ? 'bg-amber-500' : 'bg-green-500';
    const crackInfo = estimateCrackTime(pwd);

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-4">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Key size={20} className="text-amber-500"/> Cek Kekuatan Password</h4>
            
            <div className="relative mb-4">
              <input 
                  type="text" 
                  value={pwd} 
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="Ketik password tes di sini..." 
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-mono text-lg transition-colors"
              />
              <div className="absolute right-4 top-3.5 text-slate-400">
                {pwd.length > 0 ? (strength >= 4 ? <CheckCircle2 className="text-green-500"/> : <AlertTriangle className="text-amber-500"/>) : <Lock size={20}/>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                    <div className={`h-full ${colorBar} transition-all duration-500`} style={{ width: `${width}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-medium mb-4">
                    <span>Lemah</span>
                    <span>Sedang</span>
                    <span>Kuat</span>
                </div>
                
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 text-sm ${pwd.length >= 8 ? 'text-green-600' : 'text-slate-400'}`}>
                    {pwd.length >= 8 ? <CheckCircle2 size={14}/> : <XCircle size={14}/>} Min. 8 Karakter
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${/[A-Z]/.test(pwd) ? 'text-green-600' : 'text-slate-400'}`}>
                    {/[A-Z]/.test(pwd) ? <CheckCircle2 size={14}/> : <XCircle size={14}/>} Huruf Besar
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${/[0-9]/.test(pwd) ? 'text-green-600' : 'text-slate-400'}`}>
                    {/[0-9]/.test(pwd) ? <CheckCircle2 size={14}/> : <XCircle size={14}/>} Angka
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${/[^A-Za-z0-9]/.test(pwd) ? 'text-green-600' : 'text-slate-400'}`}>
                    {/[^A-Za-z0-9]/.test(pwd) ? <CheckCircle2 size={14}/> : <XCircle size={14}/>} Simbol (!@#$)
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
                 <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Estimasi Waktu Hack</div>
                 <div className={`text-2xl font-black mb-1 ${crackInfo.color}`}>{crackInfo.time}</div>
                 <div className={`text-sm font-bold px-3 py-1 rounded-full bg-white border shadow-sm ${crackInfo.color}`}>
                   {crackInfo.label}
                 </div>
                 <p className="text-[10px] text-slate-400 mt-3 leading-tight">
                   *Estimasi menggunakan komputer super cepat (10 Miliar tebakan/detik).
                 </p>
              </div>
            </div>
        </div>
    );
};

// 3. Mini Riset Data Hunter (Pertemuan 6)
const SurveySim = () => {
  const [step, setStep] = useState<'intro' | 'collect' | 'result'>('intro');
  const [collectedData, setCollectedData] = useState<any[]>([]);

  const respondents = [
    { id: 1, name: "Ali", habit: "Jarang", reason: "Malas hafal baru" },
    { id: 2, name: "Budi", habit: "Sering", reason: "Demi keamanan" },
    { id: 3, name: "Cici", habit: "Jarang", reason: "Lupa terus" },
    { id: 4, name: "Dedi", habit: "Sering", reason: "Takut dihack" },
    { id: 5, name: "Eva", habit: "Jarang", reason: "Ribet" },
  ];

  const handleInterview = (id: number) => {
    if (collectedData.find(d => d.id === id)) return;
    const person = respondents.find(r => r.id === id);
    setCollectedData([...collectedData, person]);
  };

  const getChartData = () => {
    const sering = collectedData.filter(d => d.habit === 'Sering').length;
    const jarang = collectedData.filter(d => d.habit === 'Jarang').length;
    const total = collectedData.length;
    return { sering: (sering/total)*100, jarang: (jarang/total)*100 };
  };

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-6">
       <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
          <h4 className="font-bold text-slate-900 flex items-center gap-2"><ClipboardList size={20}/> Simulasi PjBL: Data Hunter</h4>
          <button 
            onClick={() => { setStep('intro'); setCollectedData([]); }} 
            className="text-xs flex items-center gap-1 text-slate-500 hover:text-indigo-600"
          >
            <RefreshCw size={12}/> Reset Riset
          </button>
       </div>

       {step === 'intro' && (
         <div className="text-center py-6">
            <Search size={48} className="mx-auto text-indigo-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Topik: Kebiasaan Ganti Password</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Tugasmu adalah mengumpulkan data primer dari 5 teman sekelas menggunakan metode Wawancara, lalu memvisualisasikan hasilnya.
            </p>
            <button 
              onClick={() => setStep('collect')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
            >
              Mulai Pengumpulan Data
            </button>
         </div>
       )}

       {step === 'collect' && (
         <div>
            <p className="text-sm font-bold text-slate-700 mb-4">Klik pada avatar siswa untuk mewawancarai mereka:</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {respondents.map((r) => {
                const isCollected = collectedData.find(d => d.id === r.id);
                return (
                  <button
                    key={r.id}
                    disabled={!!isCollected}
                    onClick={() => handleInterview(r.id)}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 w-24 transition-all
                      ${isCollected 
                        ? 'bg-green-50 border-green-500 opacity-50 cursor-default' 
                        : 'bg-white border-slate-200 hover:border-indigo-400 hover:-translate-y-1 shadow-sm'}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${isCollected ? 'bg-green-500' : 'bg-slate-400'}`}>
                      {r.name.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{r.name}</span>
                  </button>
                )
              })}
            </div>

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-6">
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-100 text-slate-600 font-bold">
                   <tr>
                     <th className="p-3">Nama</th>
                     <th className="p-3">Ganti Password?</th>
                     <th className="p-3">Alasan</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {collectedData.length === 0 && <tr><td colSpan={3} className="p-4 text-center text-slate-400 italic">Belum ada data...</td></tr>}
                   {collectedData.map((d, i) => (
                     <tr key={i} className="animate-fade-in">
                       <td className="p-3">{d.name}</td>
                       <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${d.habit === 'Sering' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{d.habit}</span></td>
                       <td className="p-3 text-slate-500">{d.reason}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>

            <div className="flex justify-end">
              <button 
                disabled={collectedData.length < 5}
                onClick={() => setStep('result')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition
                  ${collectedData.length < 5 ? 'bg-slate-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-md'}`}
              >
                <PieChart size={18}/> Visualisasikan Data
              </button>
            </div>
         </div>
       )}

       {step === 'result' && (
         <div className="animate-fade-in">
            <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Hasil Riset: Diagram Kebiasaan</h3>
            <div className="flex justify-center items-end gap-12 h-40 mb-6 bg-white p-6 rounded-xl border border-slate-200">
               {/* Simple Bar Chart */}
               <div className="flex flex-col items-center gap-2 w-24">
                  <div className="w-full bg-green-500 rounded-t-lg transition-all duration-1000" style={{ height: `${getChartData().sering * 1.5}px` }}></div>
                  <span className="font-bold text-green-700">Sering ({getChartData().sering}%)</span>
               </div>
               <div className="flex flex-col items-center gap-2 w-24">
                  <div className="w-full bg-red-500 rounded-t-lg transition-all duration-1000" style={{ height: `${getChartData().jarang * 1.5}px` }}></div>
                  <span className="font-bold text-red-700">Jarang ({getChartData().jarang}%)</span>
               </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg text-sm text-indigo-900">
               <strong>Interpretasi Data:</strong> <br/>
               Dari 5 responden, {getChartData().sering > getChartData().jarang ? "sebagian besar" : "sebagian besar"} siswa {getChartData().sering > getChartData().jarang ? "sadar keamanan" : "kurang peduli keamanan"} akun mereka.
               Penyuluhan tentang pentingnya ganti password diperlukan.
            </div>
         </div>
       )}
    </div>
  );
};

// --- MAIN COMPONENT ---

const DataAnalysisPage = () => {
  const [session, setSession] = useState<SessionType>(1);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const SessionBtn = ({ id, label, icon, sub }: { id: SessionType, label: string, sub: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setSession(id)}
      className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all duration-300 border-2 text-center w-full md:w-auto flex-1 ${
        session === id 
        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' 
        : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:bg-slate-50'
      }`}
    >
      <div className={`p-2 rounded-full mb-1 ${session === id ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-wider opacity-70">{sub}</span>
      <span className="font-bold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* HEADER */}
      <div className="text-center mb-10 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-12 px-4 rounded-[2rem] shadow-2xl border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
             <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-500 rounded-full blur-[80px]"></div>
             <div className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-500 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10">
            <span className="bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 inline-block">
                RPP Analisis Data - Fase E
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">Analisis Data & Keamanan</h2>
            <p className="text-slate-300 text-base max-w-xl mx-auto font-light">
              Modul Pembelajaran 3 Pertemuan: Keamanan Informasi, Prosedur Keamanan, dan Pengumpulan Data.
            </p>
        </div>
      </div>

      {/* SESSION NAVIGATION */}
      <div className="flex flex-col md:flex-row gap-3 px-2 sticky top-24 z-30 max-w-5xl mx-auto w-full">
        <SessionBtn id={1} sub="Pertemuan 4" label="Detektif Digital" icon={<Globe size={18}/>} />
        <SessionBtn id={2} sub="Pertemuan 5" label="Benteng Digital" icon={<Shield size={18}/>} />
        <SessionBtn id={3} sub="Pertemuan 6" label="Data Hunter" icon={<Database size={18}/>} />
        <SessionBtn id="quiz" sub="Evaluasi" label="Asesmen Sumatif" icon={<Award size={18}/>} />
      </div>

      {/* CONTENT AREA */}
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl min-h-[600px] relative max-w-5xl mx-auto">
        
        {/* PERTEMUAN 1 (RPP PERTEMUAN 4) */}
        {session === 1 && (
           <div className="animate-fade-in space-y-8">
             <div className="border-b border-slate-100 pb-4 mb-4">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                   <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold text-lg">1</div>
                   Detektif Digital: Identifikasi Ancaman
                </h3>
                <p className="text-slate-500 mt-1 ml-12">Mengidentifikasi jenis informasi digital (Spam, Phishing, Scam).</p>
             </div>

             {/* Materi Ringkas */}
             <div className="grid md:grid-cols-2 gap-8">
                <div>
                   <h4 className="font-bold text-indigo-700 mb-3 flex items-center gap-2"><FileText size={18}/> Karakteristik Informasi Digital</h4>
                   <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Berbeda dengan informasi analog (kertas), informasi digital:
                   </p>
                   <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-green-500 mt-0.5"/> <strong>Mudah Digandakan:</strong> Tanpa penurunan kualitas.</li>
                      <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-green-500 mt-0.5"/> <strong>Mudah Didistribusikan:</strong> Murah dan cepat via internet.</li>
                      <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-green-500 mt-0.5"/> <strong>Fleksibel:</strong> Mudah diedit (rawan hoax/manipulasi).</li>
                   </ul>
                </div>
                <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                   <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2"><AlertTriangle size={18}/> Waspada Ancaman!</h4>
                   <ul className="space-y-3 text-sm">
                      <li className="bg-white p-2 rounded shadow-sm border border-red-100">
                         <span className="font-bold text-red-800 block">Phishing (DANA Kaget Palsu)</span>
                         <span className="text-slate-600">Meniru institusi resmi untuk mencuri password/OTP. Ciri: Email aneh, desakan waktu.</span>
                      </li>
                      <li className="bg-white p-2 rounded shadow-sm border border-red-100">
                         <span className="font-bold text-red-800 block">Scam (Pangeran Nigeria)</span>
                         <span className="text-slate-600">Penipuan identitas yang menjanjikan hadiah besar (uang) jika kita mengirim biaya administrasi.</span>
                      </li>
                      <li className="bg-white p-2 rounded shadow-sm border border-red-100">
                         <span className="font-bold text-red-800 block">Malware (.exe)</span>
                         <span className="text-slate-600">File virus yang menyamar (misal: "Foto.exe") untuk merusak sistem.</span>
                      </li>
                   </ul>
                </div>
             </div>

             <PhishingSim />
           </div>
        )}

        {/* PERTEMUAN 2 (RPP PERTEMUAN 5) */}
        {session === 2 && (
           <div className="animate-fade-in space-y-8">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                   <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">2</div>
                   Benteng Digital: Prosedur Keamanan
                </h3>
                <p className="text-slate-500 mt-1 ml-12">Menerapkan proteksi dokumen, akses kontrol, dan enkripsi.</p>
             </div>

             <div className="grid md:grid-cols-2 gap-8 mb-6">
                 <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                       <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Shield size={18}/> Lapisan Keamanan</h4>
                       <ul className="text-sm text-slate-600 space-y-2">
                         <li><strong>1. Akses Kontrol (User Account):</strong> Gunakan password pada login Windows agar orang lain tidak bisa akses komputer.</li>
                         <li><strong>2. Proteksi Dokumen:</strong> Fitur <em>Encrypt with Password</em> di Ms. Word/Excel untuk file rahasia.</li>
                         <li><strong>3. Enkripsi Data:</strong> Mengubah pesan menjadi kode acak.</li>
                       </ul>
                    </div>
                    <PasswordSim />
                 </div>
                 
                 <div>
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 border-l-4 border-indigo-600 pl-3">Aktivitas LKPD 2: Pesan Rahasia</h4>
                    <p className="text-sm text-slate-600 mb-4">
                       Gunakan alat di bawah ini untuk mengenkripsi pesan rahasia menggunakan berbagai algoritma (Base64 atau Caesar Cipher).
                    </p>
                    <EncryptionLab />
                 </div>
             </div>
           </div>
        )}

        {/* PERTEMUAN 3 (RPP PERTEMUAN 6) */}
        {session === 3 && (
           <div className="animate-fade-in space-y-8">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                   <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold text-lg">3</div>
                   Data Hunter: Pengumpulan Data
                </h3>
                <p className="text-slate-500 mt-1 ml-12">PjBL: Survei, Metode Pengumpulan, dan Visualisasi Data.</p>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-indigo-700 mb-3 flex items-center gap-2"><Calendar size={20}/> Sumber Data</h4>
                    <div className="space-y-3">
                       <div className="p-3 bg-indigo-50 rounded-lg">
                          <span className="font-bold text-slate-800 text-sm block">1. Data Primer (Langsung)</span>
                          <span className="text-xs text-slate-600">Data diambil sendiri oleh peneliti. Contoh: Wawancara tatap muka, Observasi lapangan.</span>
                       </div>
                       <div className="p-3 bg-indigo-50 rounded-lg">
                          <span className="font-bold text-slate-800 text-sm block">2. Data Sekunder (Tidak Langsung)</span>
                          <span className="text-xs text-slate-600">Data dari pihak lain. Contoh: Statistik BPS, Jurnal, Buku Laporan.</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2"><ClipboardList size={20}/> Metode Pengumpulan</h4>
                    <ul className="text-sm space-y-3">
                       <li className="flex items-start gap-2">
                          <div className="min-w-[20px] font-bold text-slate-400">A</div>
                          <div><strong>Wawancara:</strong> Tanya jawab langsung. <br/><span className="text-xs text-slate-500">Pro: Data mendalam. Kontra: Butuh waktu lama.</span></div>
                       </li>
                       <li className="flex items-start gap-2">
                          <div className="min-w-[20px] font-bold text-slate-400">B</div>
                          <div><strong>Kuesioner (Angket):</strong> Daftar pertanyaan tertulis. <br/><span className="text-xs text-slate-500">Pro: Cepat, banyak responden. Kontra: Jawaban terbatas.</span></div>
                       </li>
                       <li className="flex items-start gap-2">
                          <div className="min-w-[20px] font-bold text-slate-400">C</div>
                          <div><strong>Observasi:</strong> Pengamatan langsung.</div>
                       </li>
                    </ul>
                 </div>
             </div>

             <SurveySim />
           </div>
        )}

        {/* QUIZ (ASESMEN SUMATIF) */}
        {session === 'quiz' && (
           <div className="animate-fade-in max-w-2xl mx-auto">
             <div className="text-center mb-8">
                 <div className="inline-block p-4 bg-amber-100 text-amber-600 rounded-full mb-4">
                     <Award size={40} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900">Asesmen Sumatif</h3>
                 <p className="text-slate-500">Kerjakan soal berikut untuk mengukur pemahaman materi dari 3 pertemuan.</p>
             </div>

             {quizScore === null ? (
               <div className="space-y-6">
                 {QUIZ_DATA.map((q, idx) => (
                   <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-400 transition">
                     <h4 className="font-bold text-slate-800 mb-4 flex gap-2">
                        <span className="text-indigo-600">#{idx + 1}</span> {q.question}
                     </h4>
                     <div className="space-y-2">
                        {q.options.map((opt, oIdx) => (
                           <label key={oIdx} className="flex items-center p-3 rounded-lg border border-slate-100 hover:bg-indigo-50 cursor-pointer transition">
                              <input type="radio" name={`q-${idx}`} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 accent-indigo-600" />
                              <span className="ml-3 text-slate-700 text-sm">{opt}</span>
                           </label>
                        ))}
                     </div>
                   </div>
                 ))}
                 <button 
                   onClick={() => {
                     // Simulasi skor (random high score for demo)
                     setQuizScore(80 + Math.floor(Math.random() * 20));
                     window.scrollTo(0, 0);
                   }}
                   className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:scale-[1.02]"
                 >
                   Kirim Jawaban
                 </button>
               </div>
             ) : (
               <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-2xl text-center animate-in zoom-in">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Nilai Kamu</h3>
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-amber-500 mb-6">
                     {quizScore}
                  </div>
                  <p className="text-slate-600 mb-8">
                     {quizScore >= 80 ? "Kompeten! Kamu sudah menguasai Keamanan dan Analisis Data." : "Coba pelajari lagi bagian simulasi untuk hasil sempurna."}
                  </p>
                  <button onClick={() => setQuizScore(null)} className="px-6 py-3 bg-slate-200 text-slate-800 rounded-lg font-bold hover:bg-slate-300 transition">
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

export default DataAnalysisPage;