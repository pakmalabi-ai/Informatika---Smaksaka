import React, { useState } from 'react';
import { 
  History, Briefcase, Award, CheckCircle2, 
  Scale, Users, 
  TrendingUp, User, GraduationCap,
  Copyright, FileCheck
} from 'lucide-react';

// --- TYPES ---
type SessionType = 1 | 2 | 3 | 'quiz';

// --- DATA: QUIZ ---
const QUIZ_DATA = [
  {
    question: "Siapakah tokoh yang dikenal sebagai pemrogram (programmer) pertama di dunia?",
    options: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "Bill Gates"],
    answer: 2
  },
  {
    question: "Jenis lisensi perangkat lunak yang memperbolehkan pengguna melihat dan memodifikasi kode sumber adalah...",
    options: ["Commercial", "Freeware", "Open Source", "Shareware"],
    answer: 2
  },
  {
    question: "Konsep masyarakat yang berpusat pada manusia dan menyeimbangkan kemajuan ekonomi dengan penyelesaian masalah sosial disebut...",
    options: ["Society 1.0", "Industry 4.0", "Society 5.0", "Revolusi Digital"],
    answer: 2
  },
  {
    question: "Profesi yang bertugas menganalisis data besar untuk menemukan pola dan prediksi disebut...",
    options: ["Web Designer", "Data Scientist", "Network Engineer", "System Analyst"],
    answer: 1
  },
  {
    question: "Hak eksklusif yang diberikan hukum atas karya intelektual (termasuk software) disebut...",
    options: ["HAKI (Hak Kekayaan Intelektual)", "KUHP", "UU ITE", "Sertifikasi"],
    answer: 0
  }
];

// --- SIMULATOR 1: TIMELINE HISTORY (Pertemuan 1) ---
const HistorySim = () => {
  const [activeEra, setActiveEra] = useState(0);

  const eras = [
    {
      year: "2400 BC",
      title: "Abacus",
      desc: "Alat hitung kuno pertama sebelum masehi. Menjadi cikal bakal logika perhitungan mesin.",
      icon: "🧮"
    },
    {
      year: "1840s",
      title: "Ada Lovelace & Babbage",
      desc: "Charles Babbage merancang Analytical Engine. Ada Lovelace menulis algoritma pertama untuk mesin tersebut.",
      icon: "⚙️"
    },
    {
      year: "1940s",
      title: "ENIAC & Turing",
      desc: "Alan Turing menciptakan konsep Mesin Turing. ENIAC lahir sebagai komputer elektronik digital pertama yang dapat diprogram.",
      icon: "🖥️"
    },
    {
      year: "1980s",
      title: "PC & Internet",
      desc: "Komputer masuk ke rumah (Personal Computer). Internet mulai menghubungkan dunia (WWW).",
      icon: "💻"
    },
    {
      year: "2020s",
      title: "Society 5.0 & AI",
      desc: "Integrasi ruang fisik dan siber. IoT, Big Data, dan AI membantu kehidupan manusia sehari-hari.",
      icon: "🤖"
    }
  ];

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <History size={20} className="text-teal-600"/> Lorong Waktu Informatika
      </h4>
      
      {/* Timeline Bar */}
      <div className="flex justify-between items-center mb-8 relative px-4">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-200 -z-0 rounded"></div>
        {eras.map((era, idx) => (
          <button
            key={idx}
            onClick={() => setActiveEra(idx)}
            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300
              ${activeEra === idx 
                ? 'bg-teal-600 text-white scale-125 shadow-lg ring-4 ring-teal-100' 
                : 'bg-white text-slate-500 border-2 border-slate-300 hover:border-teal-400'}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md flex gap-6 items-center animate-fade-in transition-all">
        <div className="text-6xl bg-slate-50 p-4 rounded-2xl shadow-inner border border-slate-100">
          {eras[activeEra].icon}
        </div>
        <div>
          <span className="text-teal-600 font-bold tracking-widest text-sm uppercase">{eras[activeEra].year}</span>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{eras[activeEra].title}</h3>
          <p className="text-slate-600 leading-relaxed text-sm">{eras[activeEra].desc}</p>
        </div>
      </div>
    </div>
  );
};

// --- SIMULATOR 2: LICENSE JUDGE (Pertemuan 2) ---
const LicenseSim = () => {
  const [scenario, setScenario] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const cases = [
    {
      id: 1,
      text: "Andi membuat aplikasi kasir. Ia ingin menjualnya ke minimarket dan tidak ingin kodenya diubah orang lain.",
      correct: "Commercial",
      options: ["Open Source", "Commercial", "Public Domain"]
    },
    {
      id: 2,
      text: "Siti membuat library matematika. Ia ingin semua orang bisa memakai dan memperbaikinya secara gratis.",
      correct: "Open Source",
      options: ["Open Source", "Commercial", "Freeware (Closed)"]
    },
    {
      id: 3,
      text: "Budi membuat game. Ia mengizinkan orang main gratis selama 30 hari, setelah itu harus bayar.",
      correct: "Shareware",
      options: ["Freeware", "Shareware", "Open Source"]
    }
  ];

  const handleAnswer = (answer: string) => {
    if (answer === cases[scenario].correct) {
      setFeedback("BENAR! Pilihan lisensi tepat sesuai tujuan.");
      setTimeout(() => {
        setFeedback(null);
        setScenario((prev) => (prev + 1) % cases.length);
      }, 1500);
    } else {
      setFeedback("KURANG TEPAT. Coba pelajari lagi karakteristik lisensinya.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-slate-800 flex items-center gap-2">
          <Scale size={20} className="text-rose-600"/> Hakim Lisensi Digital
        </h4>
        <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded font-bold">Kasus {scenario + 1}/{cases.length}</span>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
        <p className="text-slate-700 font-medium text-lg text-center">"{cases[scenario].text}"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {cases[scenario].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className="py-3 px-4 bg-white border-2 border-slate-200 rounded-lg font-semibold text-slate-600 hover:border-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-all shadow-sm"
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`mt-4 p-3 rounded-lg text-center font-bold text-sm animate-fade-in ${feedback.includes("BENAR") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {feedback}
        </div>
      )}
    </div>
  );
};

// --- SIMULATOR 3: CAREER COMPASS (Pertemuan 3) ---
const CareerSim = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ dev: 0, data: 0, network: 0, design: 0 });
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      q: "Apa yang paling kamu sukai saat menggunakan komputer?",
      opts: [
        { t: "Membuat tampilan web jadi cantik", type: "design" },
        { t: "Memecahkan teka-teki logika / kode", type: "dev" },
        { t: "Menganalisis grafik dan angka", type: "data" },
        { t: "Mengatur koneksi wifi agar lancar", type: "network" }
      ]
    },
    {
      q: "Pelajaran sekolah apa yang paling kamu nikmati?",
      opts: [
        { t: "Matematika & Statistika", type: "data" },
        { t: "Seni Budaya / Menggambar", type: "design" },
        { t: "Fisika / Elektro", type: "network" },
        { t: "Logika Matematika", type: "dev" }
      ]
    },
    {
      q: "Jika ada masalah pada aplikasi, apa yang kamu lakukan?",
      opts: [
        { t: "Mencari tahu kenapa server down", type: "network" },
        { t: "Memperbaiki bug pada program", type: "dev" },
        { t: "Mengkritik tata letak tombol yang susah", type: "design" },
        { t: "Melihat pola kapan error terjadi", type: "data" }
      ]
    }
  ];

  const handleSelect = (type: string) => {
    const newScores = { ...scores, [type as keyof typeof scores]: scores[type as keyof typeof scores] + 1 };
    setScores(newScores);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Determine result
      const max = Object.entries(newScores).reduce((a, b) => a[1] > b[1] ? a : b);
      let jobTitle = "";
      let jobDesc = "";
      
      switch(max[0]) {
        case 'dev': jobTitle = "Software Engineer / Programmer"; jobDesc = "Kamu cocok membangun aplikasi dan memecahkan masalah logika!"; break;
        case 'data': jobTitle = "Data Scientist"; jobDesc = "Kamu ahli dalam menemukan wawasan dari tumpukan data!"; break;
        case 'design': jobTitle = "UI/UX Designer"; jobDesc = "Kreativitasmu cocok untuk merancang tampilan aplikasi yang ramah pengguna."; break;
        case 'network': jobTitle = "Network Administrator"; jobDesc = "Kamu penjaga kestabilan koneksi dan infrastruktur internet."; break;
      }
      setResult(`${jobTitle}|${jobDesc}`);
    }
  };

  const reset = () => {
    setStep(0);
    setScores({ dev: 0, data: 0, network: 0, design: 0 });
    setResult(null);
  };

  return (
    <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 shadow-md">
      <h4 className="font-bold text-sky-900 mb-4 flex items-center gap-2">
        <Briefcase size={20}/> Kompas Karier IT
      </h4>

      {!result ? (
        <div className="animate-fade-in">
          <p className="text-sm text-sky-700 font-bold mb-4 uppercase tracking-wider">Pertanyaan {step + 1} dari {questions.length}</p>
          <h3 className="text-xl font-bold text-slate-900 mb-6">{questions[step].q}</h3>
          <div className="space-y-3">
            {questions[step].opts.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt.type)}
                className="w-full text-left p-4 bg-white rounded-xl border border-sky-200 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all shadow-sm font-medium"
              >
                {opt.t}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 animate-in zoom-in">
          <div className="inline-block p-4 bg-white rounded-full shadow mb-4">
            <Award size={48} className="text-sky-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{result.split('|')[0]}</h3>
          <p className="text-slate-600 mb-6">{result.split('|')[1]}</p>
          <button 
            onClick={reset}
            className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-bold"
          >
            Coba Lagi
          </button>
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const SocialImpactPage = () => {
  const [session, setSession] = useState<SessionType>(1);
  const [score, setScore] = useState<number | null>(null);

  const SessionBtn = ({ id, title, sub, icon, colorClass }: { id: SessionType, title: string, sub: string, icon: React.ReactNode, colorClass: string }) => (
    <button
      onClick={() => setSession(id)}
      className={`flex flex-col items-center gap-1 px-4 py-4 rounded-xl transition-all duration-300 border-2 w-full md:w-auto flex-1 text-center
        ${session === id 
        ? `${colorClass} text-white shadow-xl transform scale-105 border-transparent` 
        : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
    >
      <div className={`p-2 rounded-full mb-1 ${session === id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
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
             <div className="absolute top-10 left-10 w-64 h-64 bg-teal-500 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-10 right-10 w-64 h-64 bg-rose-500 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10">
            <span className="bg-white/10 text-slate-200 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">
                Bab 8 - Kelas X SMK
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              Dampak Sosial <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-rose-400">Informatika</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Memahami sejarah, hukum, ekonomi, dan masa depan teknologi agar menjadi pengguna yang bijak dan profesional.
            </p>
        </div>
      </div>

      {/* SESSION NAVIGATION */}
      <div className="flex flex-col md:flex-row gap-4 px-2 sticky top-24 z-30 max-w-5xl mx-auto w-full">
        <SessionBtn id={1} sub="Pertemuan 1" title="Sejarah & Masa Depan" icon={<History size={20}/>} colorClass="bg-teal-600" />
        <SessionBtn id={2} sub="Pertemuan 2" title="Ekonomi & Hukum" icon={<Scale size={20}/>} colorClass="bg-rose-600" />
        <SessionBtn id={3} sub="Pertemuan 3" title="Karier & Studi" icon={<GraduationCap size={20}/>} colorClass="bg-sky-600" />
        <SessionBtn id="quiz" sub="Evaluasi" title="Uji Pemahaman" icon={<CheckCircle2 size={20}/>} colorClass="bg-slate-700" />
      </div>

      {/* CONTENT AREA */}
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl min-h-[600px] relative max-w-5xl mx-auto">
        
        {/* PERTEMUAN 1: SEJARAH */}
        {session === 1 && (
          <div className="animate-fade-in space-y-10">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="p-3 bg-teal-100 text-teal-700 rounded-2xl">
                <History size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Sejarah & Masa Depan</h3>
                <p className="text-slate-500">Dari Abacus hingga Society 5.0.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-teal-800 mb-3 flex items-center gap-2"><User size={18}/> Tokoh Penting</h4>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">AL</div>
                      <div>
                        <strong className="block text-slate-900">Ada Lovelace</strong>
                        Pemrogram komputer pertama di dunia (1840-an).
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">AT</div>
                      <div>
                        <strong className="block text-slate-900">Alan Turing</strong>
                        Pencetus konsep Mesin Turing & kecerdasan buatan.
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="prose text-slate-600 text-sm">
                  <h4 className="text-slate-900 font-bold mb-2">Society 5.0</h4>
                  <p>
                    Konsep masyarakat masa depan (dicetuskan Jepang) yang berpusat pada manusia. Menyeimbangkan kemajuan ekonomi dengan penyelesaian masalah sosial melalui sistem yang mengintegrasikan ruang siber dan fisik.
                  </p>
                </div>
              </div>

              <div>
                <HistorySim />
              </div>
            </div>
          </div>
        )}

        {/* PERTEMUAN 2: EKONOMI & HUKUM */}
        {session === 2 && (
          <div className="animate-fade-in space-y-10">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="p-3 bg-rose-100 text-rose-700 rounded-2xl">
                <Scale size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Ekonomi & Hukum</h3>
                <p className="text-slate-500">Bisnis Digital, Lisensi, dan HAKI.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-rose-50 p-5 rounded-xl border border-rose-100">
                  <h4 className="font-bold text-rose-800 mb-3 flex items-center gap-2"><TrendingUp size={18}/> Aspek Ekonomi</h4>
                  <p className="text-sm text-slate-700 mb-3">
                    Inovasi digital melahirkan <strong>Startup</strong>. Di Indonesia, startup yang valuasinya &gt; $1 Miliar disebut <strong>Unicorn</strong> (Contoh: Gojek, Tokopedia, Traveloka).
                  </p>
                  <div className="flex gap-2 text-xs font-semibold">
                    <span className="bg-white px-2 py-1 rounded text-slate-600 border">E-Commerce</span>
                    <span className="bg-white px-2 py-1 rounded text-slate-600 border">Fintech</span>
                    <span className="bg-white px-2 py-1 rounded text-slate-600 border">Edutech</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Copyright size={18}/> Jenis Lisensi Software</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li><strong className="text-rose-600">Commercial:</strong> Berbayar, kode tertutup (Ms. Office).</li>
                    <li><strong className="text-rose-600">Freeware:</strong> Gratis, tapi kode tertutup (Skype).</li>
                    <li><strong className="text-rose-600">Open Source:</strong> Gratis, kode terbuka, boleh dimodifikasi (Linux, Android).</li>
                    <li><strong className="text-rose-600">Shareware:</strong> Gratis masa percobaan (Trial), lalu bayar (WinRAR).</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900 border-l-4 border-rose-500 pl-3">Simulasi Hukum</h4>
                  <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded font-bold">Studi Kasus</span>
                </div>
                <LicenseSim />
              </div>
            </div>
          </div>
        )}

        {/* PERTEMUAN 3: KARIER & STUDI */}
        {session === 3 && (
          <div className="animate-fade-in space-y-10">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="p-3 bg-sky-100 text-sky-700 rounded-2xl">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Karier & Studi Lanjut</h3>
                <p className="text-slate-500">Meniti masa depan di bidang Informatika.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Users size={16}/> Profesi IT</h5>
                    <ul className="text-xs text-slate-600 space-y-1">
                      <li>• Software Engineer</li>
                      <li>• Data Scientist</li>
                      <li>• Network Admin</li>
                      <li>• UI/UX Designer</li>
                      <li>• Cyber Security</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><FileCheck size={16}/> Sertifikasi</h5>
                    <ul className="text-xs text-slate-600 space-y-1">
                      <li>• Microsoft (MTA/MOS)</li>
                      <li>• Cisco (CCNA)</li>
                      <li>• Google (GDE)</li>
                      <li>• Oracle (Java)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 text-sm text-slate-700">
                  <h4 className="font-bold text-sky-800 mb-2">Program Studi Kuliah</h4>
                  <p className="mb-2">Berdasarkan kurikulum ACM & IEEE:</p>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>Teknik Informatika (Computer Science)</li>
                    <li>Sistem Informasi (Information System)</li>
                    <li>Teknik Komputer (Computer Engineering)</li>
                    <li>Rekayasa Perangkat Lunak (Software Engineering)</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900 border-l-4 border-sky-500 pl-3">Simulasi Karier</h4>
                  <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded font-bold">Minat Bakat</span>
                </div>
                <CareerSim />
              </div>
            </div>
          </div>
        )}

        {/* EVALUASI */}
        {session === 'quiz' && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-slate-100 text-slate-600 rounded-full mb-4 shadow-sm">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Evaluasi Bab 8</h3>
              <p className="text-slate-500">Uji wawasanmu tentang Dunia Informatika.</p>
            </div>

            {score === null ? (
              <div className="space-y-6">
                {QUIZ_DATA.map((q, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-400 transition group">
                    <h4 className="font-bold text-slate-800 mb-4 flex gap-2">
                      <span className="text-slate-500">#{idx + 1}</span> {q.question}
                    </h4>
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => (
                        <label key={oIdx} className="flex items-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition">
                          <input type="radio" name={`q-${idx}`} className="w-4 h-4 text-slate-600 focus:ring-slate-500 accent-slate-600" />
                          <span className="ml-3 text-slate-700 text-sm group-hover:text-slate-900">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    setScore(90); // Demo score
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
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-rose-500 mb-6">
                  {score}
                </div>
                <p className="text-slate-600 mb-8">
                  {score >= 80 ? "Wawasan yang luas! Kamu siap menghadapi masa depan." : "Pelajari lagi bagian sejarah dan hukum ya!"}
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

export default SocialImpactPage;