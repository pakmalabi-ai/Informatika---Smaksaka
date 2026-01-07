import React, { useState } from 'react';
import { 
  Users, ClipboardList, CheckCircle2, 
  Target, Briefcase, MapPin, Layout, 
  RefreshCw, BarChart3, Search, Lightbulb
} from 'lucide-react';

// --- TYPES ---
type SessionType = 1 | 2 | 3 | 'quiz';

// --- DATA: QUIZ ---
const QUIZ_DATA = [
  {
    question: "Apa tujuan utama dari Praktik Lintas Bidang (PLB) dalam Informatika?",
    options: [
      "Hanya belajar coding sendirian",
      "Mengerjakan proyek kelompok untuk menyelesaikan masalah nyata di lingkungan",
      "Memperbaiki komputer rusak",
      "Bermain game bersama teman"
    ],
    answer: 1
  },
  {
    question: "Peran dalam tim yang bertugas menerjemahkan hasil analisis menjadi kode program adalah...",
    options: ["Project Manager", "System Analyst", "Programmer", "Tester"],
    answer: 2
  },
  {
    question: "Diagram batang yang digunakan untuk memvisualisasikan jadwal proyek disebut...",
    options: ["Flowchart", "Gantt Chart", "Pie Chart", "Histogram"],
    answer: 1
  },
  {
    question: "Langkah pertama yang dilakukan sebelum membangun aplikasi dalam PLB adalah...",
    options: ["Menulis kode", "Observasi lapangan", "Membuat logo", "Testing"],
    answer: 1
  },
  {
    question: "Konsep kota yang mengintegrasikan teknologi informasi untuk mengelola sumber daya secara efisien disebut...",
    options: ["Green City", "Smart City", "Big City", "Metro City"],
    answer: 1
  }
];

// --- SIMULATOR 1: ROLE MATCHER (Pertemuan 1) ---
const RoleSim = () => {
  const [assignments, setAssignments] = useState<{[key: string]: string}>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const roles = [
    { id: 'pm', name: 'Project Manager' },
    { id: 'sa', name: 'System Analyst' },
    { id: 'prog', name: 'Programmer' },
    { id: 'test', name: 'Tester' }
  ];

  const tasks = [
    { id: 1, text: "Menulis kode program aplikasi", correct: 'prog' },
    { id: 2, text: "Menyusun jadwal & memonitor proyek", correct: 'pm' },
    { id: 3, text: "Mendefinisikan kebutuhan RT/RW", correct: 'sa' },
    { id: 4, text: "Menguji aplikasi & mencari bug", correct: 'test' }
  ];

  const handleAssign = (taskId: number, roleId: string) => {
    setAssignments(prev => ({ ...prev, [taskId]: roleId }));
    setFeedback(null);
  };

  const checkAnswers = () => {
    let correct = 0;
    tasks.forEach(t => {
      if (assignments[t.id] === t.correct) correct++;
    });

    if (correct === tasks.length) {
      setFeedback("SEMPURNA! Pembagian peran tim sudah tepat.");
    } else {
      setFeedback(`Masih ada yang kurang tepat. Benar: ${correct}/${tasks.length}. Coba lagi!`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-4">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-slate-800 flex items-center gap-2">
          <Briefcase size={20} className="text-emerald-600"/> Simulasi: Pembagian Peran Tim
        </h4>
        <button 
          onClick={() => { setAssignments({}); setFeedback(null); }}
          className="text-xs flex items-center gap-1 text-slate-500 hover:text-emerald-600"
        >
          <RefreshCw size={12}/> Reset
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-2">{task.text}</p>
              <div className="flex flex-wrap gap-2">
                {roles.map(role => (
                  <button
                    key={role.id}
                    onClick={() => handleAssign(task.id, role.id)}
                    className={`text-xs px-2 py-1 rounded border transition-all ${
                      assignments[task.id] === role.id 
                      ? 'bg-emerald-600 text-white border-emerald-600' 
                      : 'bg-white text-slate-500 border-slate-300 hover:border-emerald-400'
                    }`}
                  >
                    {role.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 flex flex-col justify-center items-center text-center">
          <Target size={48} className="text-emerald-600 mb-3" />
          <p className="text-sm text-emerald-800 mb-4">
            Cocokkan setiap tugas dengan peran yang paling bertanggung jawab dalam sebuah tim proyek PLB.
          </p>
          <button 
            onClick={checkAnswers}
            disabled={Object.keys(assignments).length < 4}
            className={`px-6 py-2 rounded-lg font-bold text-white transition-all shadow-md ${
              Object.keys(assignments).length < 4 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            Cek Jawaban
          </button>
          {feedback && (
            <div className={`mt-4 p-2 rounded text-sm font-bold w-full animate-fade-in ${feedback.includes("SEMPURNA") ? 'bg-green-200 text-green-800' : 'bg-red-100 text-red-700'}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- SIMULATOR 2: OBSERVATION CASE (Pertemuan 2) ---
const ObservationSim = () => {
  const [selectedProblems, setSelectedProblems] = useState<number[]>([]);
  
  const scenarios = [
    { id: 1, text: "Ketua RT mencatat data warga di buku tulis yang sudah kusam.", isProblem: true, feedback: "Benar! Data manual rentan rusak/hilang." },
    { id: 2, text: "Warga membayar iuran sampah tepat waktu setiap bulan.", isProblem: false, feedback: "Ini hal positif, bukan masalah yang perlu solusi sistem." },
    { id: 3, text: "Warga kesulitan melapor tamu 24 jam karena rumah Pak RT sering kosong.", isProblem: true, feedback: "Benar! Ini butuh solusi pelaporan daring." },
    { id: 4, text: "Pengumuman kerja bakti ditempel di tiang listrik tapi sering sobek.", isProblem: true, feedback: "Benar! Informasi tidak tersampaikan efektif." },
  ];

  const handleSelect = (id: number) => {
    if (selectedProblems.includes(id)) {
      setSelectedProblems(prev => prev.filter(p => p !== id));
    } else {
      setSelectedProblems(prev => [...prev, id]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-4">
      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Search size={20} className="text-indigo-600"/> Simulasi: Observasi Lapangan
      </h4>
      <p className="text-sm text-slate-600 mb-4 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
        Anda sedang mengobservasi lingkungan RT 05. Klik pada situasi yang merupakan <strong>Permasalahan</strong> yang bisa diselesaikan dengan Teknologi Informasi.
      </p>

      <div className="grid gap-3">
        {scenarios.map((item) => (
          <div 
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedProblems.includes(item.id) 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-slate-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <p className="text-slate-800 font-medium text-sm">{item.text}</p>
              {selectedProblems.includes(item.id) && (
                <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0" />
              )}
            </div>
            
            {/* Feedback shown immediately on selection for learning */}
            {selectedProblems.includes(item.id) && (
              <p className={`text-xs mt-2 font-semibold ${item.isProblem ? 'text-green-600' : 'text-amber-600'}`}>
                {item.feedback}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SIMULATOR 3: GANTT CHART (Pertemuan 3) ---
const GanttSim = () => {
  const [schedule, setSchedule] = useState<{ [key: string]: boolean }>({});
  
  const activities = ["Observasi", "Desain", "Coding", "Testing"];
  const weeks = [1, 2, 3, 4];

  const toggleSchedule = (activity: string, week: number) => {
    const key = `${activity}-${week}`;
    setSchedule(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-4">
      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <BarChart3 size={20} className="text-purple-600"/> Simulasi: Gantt Chart Proyek
      </h4>
      <p className="text-sm text-slate-600 mb-4">
        Rancang jadwal proyek selama 4 minggu. Klik kotak untuk menetapkan jadwal.
        <br/><span className="text-xs text-slate-400">*Tips: Observasi di awal, Testing di akhir.</span>
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-600">
              <th className="p-3 rounded-tl-lg">Aktivitas</th>
              {weeks.map(w => <th key={w} className="p-3 text-center">Minggu {w}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activities.map(act => (
              <tr key={act}>
                <td className="p-3 font-medium text-slate-700">{act}</td>
                {weeks.map(w => (
                  <td key={w} className="p-1">
                    <button
                      onClick={() => toggleSchedule(act, w)}
                      className={`w-full h-8 rounded transition-all ${
                        schedule[`${act}-${w}`] 
                        ? 'bg-purple-600 shadow-sm scale-95' 
                        : 'bg-slate-50 hover:bg-purple-100'
                      }`}
                    ></button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-200 flex gap-4">
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-purple-600 rounded"></div> Dijadwalkan</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-slate-50 border border-slate-200 rounded"></div> Kosong</div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const PLBPage = () => {
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
             <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-500 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10">
            <span className="bg-white/10 text-slate-200 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">
                Bab 9 - Kelas X SMK
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              Praktika Lintas Bidang <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400">(PLB)</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Berkolaborasi dalam tim untuk menciptakan solusi digital bagi permasalahan nyata di lingkungan sekitar.
            </p>
        </div>
      </div>

      {/* SESSION NAVIGATION */}
      <div className="flex flex-col md:flex-row gap-4 px-2 sticky top-24 z-30 max-w-5xl mx-auto w-full">
        <SessionBtn id={1} sub="Pertemuan 1" title="Manajemen Tim" icon={<Users size={20}/>} colorClass="bg-emerald-600" />
        <SessionBtn id={2} sub="Pertemuan 2" title="Observasi & Rencana" icon={<MapPin size={20}/>} colorClass="bg-indigo-600" />
        <SessionBtn id={3} sub="Pertemuan 3" title="Eksekusi Proyek" icon={<Layout size={20}/>} colorClass="bg-purple-600" />
        <SessionBtn id="quiz" sub="Evaluasi" title="Uji Pemahaman" icon={<CheckCircle2 size={20}/>} colorClass="bg-slate-700" />
      </div>

      {/* CONTENT AREA */}
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl min-h-[600px] relative max-w-5xl mx-auto">
        
        {/* PERTEMUAN 1: TIM & PERAN */}
        {session === 1 && (
          <div className="animate-fade-in space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <Users size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Manajemen Tim Proyek</h3>
                <p className="text-slate-500">Membangun kolaborasi dan pembagian tugas yang efektif.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2"><Target size={18}/> Tujuan PLB</h4>
                  <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                    <li>Membangun aplikasi sederhana untuk solusi masalah.</li>
                    <li>Melatih kerjasama tim (kolaborasi).</li>
                    <li>Menerapkan konsep informatika di masyarakat.</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3">Peran dalam Tim</h4>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold w-20 text-center flex-shrink-0">PM</div>
                      <p className="text-xs text-slate-600"><strong>Project Manager:</strong> Menyusun jadwal, membagi tugas, memimpin komunikasi.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold w-20 text-center flex-shrink-0">Analyst</div>
                      <p className="text-xs text-slate-600"><strong>System Analyst:</strong> Menganalisis masalah, mendefinisikan kebutuhan sistem.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold w-20 text-center flex-shrink-0">Coder</div>
                      <p className="text-xs text-slate-600"><strong>Programmer:</strong> Menulis kode program, menerjemahkan desain menjadi aplikasi.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold w-20 text-center flex-shrink-0">Tester</div>
                      <p className="text-xs text-slate-600"><strong>Tester:</strong> Menguji aplikasi, mencari kesalahan (bug), memastikan kualitas.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <RoleSim />
              </div>
            </div>
          </div>
        )}

        {/* PERTEMUAN 2: OBSERVASI */}
        {session === 2 && (
          <div className="animate-fade-in space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
                <Search size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Observasi & Perencanaan</h3>
                <p className="text-slate-500">Menggali masalah lapangan dan menyusun jadwal kerja.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 text-sm text-slate-700">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2"><Lightbulb size={18}/> Studi Kasus: Smart City</h4>
                  <p className="mb-3">
                    Proyek difokuskan pada konsep <strong>Kota Cerdas</strong> di lingkungan terkecil (RT/RW). Contoh: Pendataan warga, iuran sampah, atau pelaporan tamu.
                  </p>
                  <p>
                    <strong>Metode Observasi:</strong> Wawancara Ketua RT, Melihat buku catatan manual, Mengamati proses pelayanan.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">Dokumentasi Proyek</h4>
                  <ul className="text-sm text-slate-600 list-decimal list-inside space-y-1">
                    <li>Proposal / Rencana Kerja</li>
                    <li>Jurnal Harian (Log Activity)</li>
                    <li>Laporan Observasi</li>
                    <li>Dokumentasi Foto/Video</li>
                  </ul>
                </div>
              </div>

              <div>
                <ObservationSim />
              </div>
            </div>
          </div>
        )}

        {/* PERTEMUAN 3: EKSEKUSI */}
        {session === 3 && (
          <div className="animate-fade-in space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl">
                <Layout size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Eksekusi & Evaluasi</h3>
                <p className="text-slate-500">Pengembangan aplikasi, monitoring, dan pelaporan.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2"><ClipboardList size={18}/> Tahapan Pengembangan</h4>
                  <ol className="text-sm text-slate-700 list-decimal list-inside space-y-2">
                    <li><strong>Desain:</strong> Membuat mockup antarmuka (UI).</li>
                    <li><strong>Coding:</strong> Implementasi logika dengan bahasa pemrograman (C/Python).</li>
                    <li><strong>Testing:</strong> Uji coba fungsionalitas.</li>
                    <li><strong>Implementasi:</strong> Demo kepada pengguna (Ketua RT).</li>
                  </ol>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-2">Evaluasi Diri</h4>
                  <p className="text-sm text-slate-600">
                    Setiap anggota tim harus melakukan refleksi:
                    <br/>- Apakah peran saya dijalankan dengan baik?
                    <br/>- Apa kendala terbesar dalam tim?
                    <br/>- Apakah solusi yang dibuat bermanfaat?
                  </p>
                </div>
              </div>

              <div>
                <GanttSim />
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
              <h3 className="text-2xl font-bold text-slate-900">Evaluasi Bab 9</h3>
              <p className="text-slate-500">Uji pemahamanmu tentang Manajemen Proyek PLB.</p>
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
                    setScore(100); // Demo score
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
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-purple-500 mb-6">
                  {score}
                </div>
                <p className="text-slate-600 mb-8">
                  {score >= 80 ? "Kerja Tim yang Hebat! Kamu siap memimpin proyek." : "Pelajari lagi tentang manajemen peran ya!"}
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

export default PLBPage;