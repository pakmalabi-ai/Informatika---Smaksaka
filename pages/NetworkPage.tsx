import React, { useState, useEffect, useRef } from 'react';
import { 
  Router, Server, Wifi, Monitor, CheckCircle, CheckCircle2, Award, Globe, Info, Cable,
  Settings, Share2, Cpu, HardDrive, Terminal, RefreshCw, Check,
  AlertCircle, ArrowRightLeft, Activity, XCircle, Power,
  Eye, EyeOff, Keyboard, Mouse, FileEdit, User, Save, Printer,
  Table, Smartphone, Mail, Paperclip, Send, UploadCloud
} from 'lucide-react';
import { NetworkSubPage, QuizQuestion, HardwareItem } from '../types';

// Custom Icon for Box
const BoxIcon = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="8" x="2" y="8" rx="1" />
    <path d="M6 12h.01" />
    <path d="M10 12h.01" />
    <path d="M14 12h.01" />
    <path d="M18 12h.01" />
  </svg>
);

// --- DATA SOURCE BASED ON PDF ---

const QUIZ_DATA: QuizQuestion[] = [
  {
    question: "Manakah perangkat yang berfungsi menghubungkan dua jaringan yang berbeda (misal LAN ke Internet)?",
    options: ["Switch", "Router", "Hub", "Repeater"],
    answer: 1
  },
  {
    question: "Topologi jaringan di mana setiap node terhubung ke satu titik pusat (central node) disebut...",
    options: ["Bus", "Ring", "Star", "Mesh"],
    answer: 2
  },
  {
    question: "Apa fungsi dari DHCP dalam jaringan?",
    options: ["Mengamankan jaringan", "Memberikan IP Address secara otomatis", "Memperkuat sinyal", "Menyimpan data website"],
    answer: 1
  },
  {
    question: "Protokol standar yang digunakan pada internet dikenal sebagai...",
    options: ["HTTP", "WWW", "TCP/IP", "FTP"],
    answer: 2
  },
  {
    question: "Lembaga pertahanan Amerika yang pertama kali mengembangkan cikal bakal internet (ARPAnet) adalah...",
    options: ["NASA", "DARPA", "FBI", "CIA"],
    answer: 1
  }
];

const HARDWARE_DATA: HardwareItem[] = [
  // Devices
  { 
    id: 1, 
    category: 'device', 
    name: "Client Computer", 
    icon: <Monitor size={40} />, 
    desc: "Perangkat pengguna (end-user).",
    details: {
      func: "Meminta dan menerima layanan (data, file, aplikasi) dari server. Merupakan titik akhir penggunaan jaringan.",
      example: "Laptop siswa, PC di lab komputer, Smartphone untuk browsing.",
      diff: "Client bergantung pada Server untuk sumber daya. Spesifikasi hardware biasanya lebih rendah dibanding Server."
    }
  },
  { 
    id: 2, 
    category: 'device', 
    name: "Server Computer", 
    icon: <Server size={40} />, 
    desc: "Komputer penyedia layanan.",
    details: {
      func: "Menyediakan sumber daya (resource), melayani permintaan client, dan mengatur lalu lintas data pusat.",
      example: "Web Server (hosting website), File Server (penyimpanan data sekolah), Database Server.",
      diff: "Server dirancang untuk menyala 24 jam nonstop dengan spesifikasi prosesor dan RAM yang jauh lebih tinggi dari Client."
    }
  },
  { 
    id: 3, 
    category: 'device', 
    name: "NIC / LAN Card", 
    icon: <Cpu size={40} />, 
    desc: "Network Interface Card.",
    details: {
      func: "Kartu ekspansi yang memungkinkan komputer terhubung ke jaringan melalui kabel. Menerjemahkan data paralel komputer menjadi serial.",
      example: "Port RJ-45 di belakang CPU atau di sisi Laptop.",
      diff: "Setiap NIC memiliki alamat fisik unik yang disebut MAC Address."
    }
  },
  { 
    id: 12, 
    category: 'device', 
    name: "KVM Switch", 
    icon: <BoxIcon size={40} />, 
    desc: "Keyboard, Video, Mouse Switch.",
    details: {
      func: "Alat untuk mengontrol beberapa komputer/server hanya dengan satu set keyboard, monitor, dan mouse.",
      example: "Digunakan di ruang server (Data Center) untuk mengelola banyak rak server.",
      diff: "Menghemat ruang meja, biaya perangkat keras, dan konsumsi listrik dibanding menyediakan satu monitor untuk setiap server."
    }
  },
  { 
    id: 5, 
    category: 'device', 
    name: "Router", 
    icon: <Router size={40} />, 
    desc: "Penghubung antar jaringan berbeda.",
    details: {
      func: "Menghubungkan dua atau lebih jaringan yang berbeda (misal LAN sekolah dengan Internet). Menentukan rute terbaik (routing) untuk paket data.",
      example: "Mikrotik RouterBoard, Cisco Router, Router Indihome (modem+router).",
      diff: "Router vs Switch: Router bekerja dengan IP Address (logika antar jaringan), sedangkan Switch bekerja dengan MAC Address (logika dalam satu jaringan lokal)."
    }
  },
  { 
    id: 6, 
    category: 'device', 
    name: "Access Point", 
    icon: <Wifi size={40} />, 
    desc: "Penyebar sinyal Wi-Fi.",
    details: {
      func: "Memancarkan sinyal nirkabel (Hotspot) agar perangkat bisa terhubung ke jaringan kabel (wired) tanpa kabel.",
      example: "TP-Link Wireless AP, Unifi AP di plafon sekolah.",
      diff: "Access Point vs Router: AP murni hanya memperluas sinyal (seperti Switch versi wireless). Router memiliki fitur lebih kompleks seperti membagi IP (DHCP) dan mengatur NAT."
    }
  },
  { 
    id: 7, 
    category: 'device', 
    name: "Switch / Hub", 
    icon: <Share2 size={40} />, 
    desc: "Penghubung perangkat dalam LAN.",
    details: {
      func: "Menghubungkan banyak komputer dalam satu segmen jaringan lokal (LAN) agar bisa saling berkomunikasi.",
      example: "Switch 24 Port di rak server, Hub kecil 4 port di meja kerja.",
      diff: "Switch vs Hub: Hub mengirim data ke SEMUA port (bodoh/lambat). Switch hanya mengirim data ke port TUJUAN (pintar/cepat) sehingga tidak terjadi tabrakan data (collision)."
    }
  },
  { 
    id: 8, 
    category: 'device', 
    name: "Modem / ONU", 
    icon: <HardDrive size={40} />, 
    desc: "Modulator Demodulator.",
    details: {
      func: "Mengubah sinyal digital dari komputer menjadi sinyal analog/cahaya untuk merambat lewat kabel telepon/fiber optik, dan sebaliknya.",
      example: "Modem GPON (kotak putih dari ISP seperti Telkom/Biznet).",
      diff: "Tanpa modem, komputer tidak bisa membaca sinyal yang dikirim oleh penyedia layanan internet (ISP)."
    }
  },
  // Cables
  { 
    id: 9, 
    category: 'cable', 
    name: "UTP Cable", 
    icon: <Cable size={40} />, 
    desc: "Unshielded Twisted Pair.",
    details: {
      func: "Media transmisi data menggunakan tembaga. Paling umum digunakan untuk LAN indoor.",
      example: "Kabel LAN warna biru/abu-abu yang tercolok ke PC.",
      diff: "Menggunakan konektor RJ-45. Jarak maksimal efektif 100 meter."
    }
  },
  { 
    id: 10, 
    category: 'cable', 
    name: "Fiber Optic", 
    icon: <Cable size={40} className="text-amber-500"/>, 
    desc: "Kabel Serat Optik.",
    details: {
      func: "Mentransmisikan data menggunakan pantulan cahaya. Kecepatan sangat tinggi dan tahan gangguan elektromagnetik.",
      example: "Kabel hitam tebal di tiang listrik, kabel kuning (patch cord) di ruang server.",
      diff: "Jauh lebih cepat dari UTP dan bisa menjangkau jarak kilometer tanpa penguat sinyal."
    }
  },
  { 
    id: 11, 
    category: 'cable', 
    name: "Coaxial", 
    icon: <Cable size={40} className="text-slate-500"/>, 
    desc: "Kabel Tembaga Inti Tunggal.",
    details: {
      func: "Media transmisi lama. Sekarang lebih sering dipakai untuk antena TV atau CCTV analog.",
      example: "Kabel antena TV di rumah.",
      diff: "Sudah jarang digunakan untuk jaringan komputer modern karena kecepatannya terbatas dibanding UTP/Fiber."
    }
  },
];

// --- SUB COMPONENTS ---

const TopologySim = () => {
  const [type, setType] = useState<'star' | 'bus' | 'ring'>('star');

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner">
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {['star', 'bus', 'ring'].map((t) => (
          <button
            key={t}
            onClick={() => setType(t as any)}
            className={`px-4 py-2 rounded-lg capitalize font-medium transition-all ${
              type === t ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            Topologi {t}
          </button>
        ))}
      </div>

      <div className="relative h-72 bg-white rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center shadow-sm">
        {/* Central Device / Backbone */}
        {type === 'star' && (
          <div className="absolute z-10 bg-indigo-600 text-white p-3 rounded-lg shadow-lg animate-bounce">
            <Server size={24} />
          </div>
        )}
        
        {type === 'bus' && (
          <div className="absolute h-3 w-full bg-slate-800 top-1/2 -translate-y-1/2 shadow-sm"></div>
        )}

        {/* Nodes */}
        {[0, 1, 2, 3, 4].map((i) => {
          let style: React.CSSProperties = {};
          if (type === 'star') {
            const angle = (i * 72) * (Math.PI / 180);
            const radius = 100;
            style = {
              transform: `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`
            };
          } else if (type === 'bus') {
            style = {
              left: `${(i + 1) * 16}%`,
              top: i % 2 === 0 ? '30%' : '70%'
            };
          } else if (type === 'ring') {
            const angle = (i * 72) * (Math.PI / 180);
            const radius = 100;
            style = {
              transform: `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`
            };
          }

          return (
            <React.Fragment key={i}>
              <div 
                className="absolute w-12 h-12 bg-white border-2 border-slate-600 rounded-full flex items-center justify-center shadow-md transition-all duration-500 z-20 hover:scale-110 hover:border-amber-500 cursor-help"
                style={type === 'bus' ? style : { ...style, left: '50%', top: '50%', marginLeft: '-24px', marginTop: '-24px' }}
                title={`Client Node ${i+1}`}
              >
                <Monitor size={20} className="text-slate-600" />
              </div>
              
              {/* Lines for Star */}
              {type === 'star' && (
                <div 
                  className="absolute left-1/2 top-1/2 h-0.5 bg-indigo-300 origin-left transition-all duration-500 z-0"
                  style={{
                    width: '100px',
                    transform: `rotate(${i * 72}deg)`
                  }}
                />
              )}
               {/* Lines for Bus */}
               {type === 'bus' && (
                 <div 
                 className="absolute w-1 h-16 bg-slate-400 transition-all duration-500 z-0"
                 style={{
                   left: `${((i + 1) * 16) + 2}%`, // Adjust based on node pos
                   top: i % 2 === 0 ? '42%' : '50%'
                 }}
               />
               )}
            </React.Fragment>
          );
        })}
        
        {/* Ring Connector */}
        {type === 'ring' && (
           <div className="absolute w-[200px] h-[200px] rounded-full border-4 border-indigo-200 z-0"></div>
        )}

      </div>
      <p className="mt-4 text-center text-slate-600 text-sm font-medium bg-indigo-50 p-3 rounded-lg border border-indigo-100">
        <Info size={16} className="inline mr-2 text-indigo-500"/>
        {type === 'star' && "Star: Node terhubung ke pusat. Jika satu kabel putus, yang lain aman."}
        {type === 'bus' && "Bus: Satu kabel utama (backbone). Hemat kabel, tapi jika backbone putus, semua mati."}
        {type === 'ring' && "Ring: Tertutup melingkar. Data satu arah. Jika satu putus, jaringan terganggu."}
      </p>
    </div>
  );
};

// --- SIMULATION COMPONENTS ---

const KVMSim = () => {
  const [activePort, setActivePort] = useState<1 | 2 | 3>(1);

  const computers = [
    { 
      id: 1, 
      label: 'Server Database (Linux)', 
      color: 'bg-slate-900', 
      content: (
        <div className="font-mono text-green-400 text-xs p-2">
          <p>root@db-server:~# service mysql status</p>
          <p>● mysql.service - MySQL Community Server</p>
          <p>   Active: <span className="text-green-500 font-bold">active (running)</span> since Mon 2025-01-20</p>
          <p>   Main PID: 1234 (mysqld)</p>
          <p className="animate-pulse">root@db-server:~# _</p>
        </div>
      )
    },
    { 
      id: 2, 
      label: 'Web Server (Windows)', 
      color: 'bg-blue-900', 
      content: (
        <div className="font-sans text-white text-xs p-2 flex flex-col h-full justify-between bg-blue-600">
          <div className="text-center pt-10">
            <p className="text-4xl mb-2">:(</p>
            <p className="text-lg font-bold">Your PC ran into a problem</p>
            <p>Restarting in 5 seconds...</p>
          </div>
          <div className="bg-slate-800 p-1 flex justify-between items-center text-[10px]">
            <span>Start</span>
            <span>10:42 AM</span>
          </div>
        </div>
      )
    },
    { 
      id: 3, 
      label: 'Admin PC', 
      color: 'bg-indigo-900', 
      content: (
        <div className="bg-white h-full text-slate-900 p-2 text-xs">
          <div className="border-b border-slate-300 pb-1 mb-1 font-bold">Network Manager</div>
          <p>Connected: Ethernet 1</p>
          <p>IP: 192.168.1.100</p>
          <div className="mt-2 bg-slate-100 p-2 rounded border border-slate-300">
            <p>Downloading updates...</p>
            <div className="w-full bg-slate-300 h-2 mt-1 rounded-full">
              <div className="bg-indigo-500 w-2/3 h-full rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="font-bold text-slate-900 text-lg">Simulasi KVM Switch</h4>
          <p className="text-sm text-slate-500">
            Satu monitor, keyboard, dan mouse untuk mengontrol banyak komputer.
          </p>
        </div>
        <div className="flex gap-2 text-slate-400">
           <Monitor size={20} />
           <ArrowRightLeft size={20} />
           <Server size={20} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        
        {/* SHARED PERIPHERALS */}
        <div className="relative">
          {/* Monitor */}
          <div className="w-64 h-40 bg-slate-800 rounded-lg border-4 border-slate-700 shadow-xl overflow-hidden relative">
            {computers.find(c => c.id === activePort)?.content}
            <div className="absolute bottom-1 right-2 flex gap-1">
               <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="w-8 h-6 bg-slate-700 mx-auto"></div>
          <div className="w-24 h-2 bg-slate-700 mx-auto rounded-full"></div>

          {/* Keyboard & Mouse */}
          <div className="flex justify-center gap-2 mt-2 text-slate-600">
             <Keyboard size={24} />
             <Mouse size={24} />
          </div>

          {/* Cables to Switch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full h-8 w-1 bg-slate-400"></div>
        </div>

        {/* KVM SWITCH DEVICE */}
        <div className="relative z-10 bg-slate-800 w-full max-w-md p-3 rounded-lg shadow-lg border-b-4 border-slate-950 flex justify-between items-center gap-4">
           <span className="text-slate-500 font-bold text-xs tracking-widest writing-vertical">KVM-400</span>
           
           <div className="flex-1 flex justify-center gap-4">
              {[1, 2, 3].map((port) => (
                <div key={port} className="flex flex-col items-center gap-1">
                   {/* LED */}
                   <div className={`w-2 h-2 rounded-full ${activePort === port ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-green-900'}`}></div>
                   {/* Button */}
                   <button 
                     onClick={() => setActivePort(port as any)}
                     className={`w-10 h-8 rounded border-b-2 flex items-center justify-center font-bold text-xs transition-all active:translate-y-0.5 active:border-b-0
                       ${activePort === port 
                         ? 'bg-indigo-600 text-white border-indigo-800' 
                         : 'bg-slate-600 text-slate-300 border-slate-900 hover:bg-slate-500'}`}
                   >
                     {port}
                   </button>
                   <span className="text-[9px] text-slate-500 uppercase">Port {port}</span>
                </div>
              ))}
           </div>
        </div>

        {/* CONNECTED COMPUTERS */}
        <div className="flex gap-4 w-full justify-center">
           {computers.map((comp) => (
             <div key={comp.id} className="flex flex-col items-center gap-2 relative group w-28">
                {/* Cable from Switch */}
                <div className={`h-8 w-1 transition-colors duration-300 ${activePort === comp.id ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                
                {/* Computer Unit */}
                <div className={`w-full p-2 rounded-lg border-2 text-center transition-all ${
                  activePort === comp.id 
                    ? 'border-indigo-500 bg-indigo-50 shadow-md scale-105' 
                    : 'border-slate-300 bg-white grayscale'
                }`}>
                   <Server size={32} className={`mx-auto mb-2 ${activePort === comp.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                   <p className="text-[10px] font-bold leading-tight text-slate-700">{comp.label}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
      
      <div className="mt-6 bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 border border-yellow-100 flex gap-2">
         <Info size={16} className="shrink-0" />
         <p>
           <strong>Fungsi Utama:</strong> Bayangkan jika Anda memiliki 100 server. Tidak mungkin membeli 100 monitor! KVM Switch memungkinkan admin mengelola semuanya dari satu meja kerja (Console).
         </p>
      </div>
    </div>
  );
};

const CableSim = () => {
  const [selectedWires, setSelectedWires] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  const correctOrder = [
    'Putih-Orange', 'Orange', 
    'Putih-Hijau', 'Biru', 
    'Putih-Biru', 'Hijau', 
    'Putih-Coklat', 'Coklat'
  ];

  const availableWires = [
    { id: 'Putih-Orange', color: 'bg-orange-200 border-2 border-dashed border-orange-500' },
    { id: 'Orange', color: 'bg-orange-500' },
    { id: 'Putih-Hijau', color: 'bg-green-200 border-2 border-dashed border-green-600' },
    { id: 'Biru', color: 'bg-blue-600' },
    { id: 'Putih-Biru', color: 'bg-blue-200 border-2 border-dashed border-blue-600' },
    { id: 'Hijau', color: 'bg-green-600' },
    { id: 'Putih-Coklat', color: 'bg-amber-100 border-2 border-dashed border-amber-800' },
    { id: 'Coklat', color: 'bg-amber-800' },
  ];

  const handleWireClick = (wireId: string) => {
    if (selectedWires.includes(wireId) || isSuccess) return;
    const newSelection = [...selectedWires, wireId];
    setSelectedWires(newSelection);

    if (newSelection.length === 8) {
      const isCorrect = newSelection.every((val, index) => val === correctOrder[index]);
      setIsSuccess(isCorrect);
    }
  };

  const resetSim = () => {
    setSelectedWires([]);
    setIsSuccess(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md">
       <div className="flex justify-between items-start mb-4">
         <div>
            <h4 className="font-bold text-slate-900 text-lg">Lab Crimping Kabel UTP</h4>
            <p className="text-sm text-slate-500">Susun urutan warna kabel standar <strong className="text-indigo-600">T568B</strong> (Straight-Through).</p>
         </div>
         <button 
           onClick={() => setShowGuide(!showGuide)}
           className="text-xs flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-medium text-slate-700 transition"
         >
           {showGuide ? <EyeOff size={14}/> : <Eye size={14}/>} {showGuide ? 'Tutup Panduan' : 'Lihat Standar'}
         </button>
       </div>

       {showGuide && (
         <div className="mb-6 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs animate-fade-in">
           <strong className="block mb-2 text-slate-700">Urutan Standar T568B:</strong>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {correctOrder.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                   <span className="font-bold text-slate-400">{i+1}.</span>
                   <span>{c}</span>
                </div>
              ))}
           </div>
         </div>
       )}

       {/* Visual Connector Area */}
       <div className="bg-gradient-to-b from-slate-100 to-slate-200 p-6 rounded-xl mb-6 border border-slate-300 flex justify-center items-center min-h-[140px] relative shadow-inner overflow-hidden">
          {/* RJ45 Head Visual */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-white/40 border-l border-slate-300 backdrop-blur-sm z-20 flex items-center justify-center">
             <div className="w-1 h-full bg-yellow-400/20 mx-auto"></div>
          </div>
          
          <div className="flex gap-1.5 relative z-10">
            {Array.from({ length: 8 }).map((_, i) => {
               const wireName = selectedWires[i];
               const wireObj = availableWires.find(w => w.id === wireName);
               return (
                 <div key={i} className="flex flex-col items-center group relative">
                    {/* Wire Segment */}
                    <div className={`w-6 h-32 rounded-t transition-all duration-300 shadow-sm ${wireObj ? wireObj.color : 'bg-slate-300/50 border border-slate-300'}`}></div>
                    
                    {/* Pin Number */}
                    <span className="text-[10px] mt-2 font-mono text-slate-500 font-bold">{i+1}</span>
                    
                    {/* Tooltip */}
                    {wireName && (
                      <div className="absolute bottom-10 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {wireName}
                      </div>
                    )}
                 </div>
               )
            })}
          </div>
          
          {selectedWires.length === 0 && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-slate-400 text-sm font-medium animate-pulse">Klik kabel di bawah untuk memasukkan...</p>
             </div>
          )}
       </div>

       {/* Status Message */}
       {isSuccess !== null && (
         <div className={`mb-6 p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2 animate-in zoom-in ${isSuccess ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
           {isSuccess ? <CheckCircle size={20}/> : <AlertCircle size={20}/>}
           {isSuccess ? "BENAR! Susunan kabel T568B sudah tepat." : "URUTAN SALAH! Cek kembali standar T568B."}
         </div>
       )}

       {/* Selection Area */}
       <div className="grid grid-cols-4 gap-3">
          {availableWires.map((wire) => (
            <button
              key={wire.id}
              disabled={selectedWires.includes(wire.id) || isSuccess === true}
              onClick={() => handleWireClick(wire.id)}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition-all shadow-sm
                ${selectedWires.includes(wire.id) 
                  ? 'opacity-40 cursor-not-allowed bg-slate-50 scale-95' 
                  : 'hover:scale-105 hover:shadow-md bg-white border-slate-200 hover:border-indigo-400'}
              `}
            >
              <div className={`w-full h-6 rounded ${wire.color} shadow-inner`}></div>
              <span className="text-center leading-tight text-slate-700">{wire.id}</span>
            </button>
          ))}
       </div>

       <button onClick={resetSim} className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition font-bold shadow-lg">
          <RefreshCw size={18} /> {isSuccess ? 'Ulangi Latihan' : 'Reset Kabel'}
       </button>
    </div>
  );
};

const IpConfigSim = () => {
  const [segment, setSegment] = useState(1);
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ ip: false, subnet: false, gateway: false });
  
  // Input states
  const [ipValue, setIpValue] = useState('');
  const [subnetValue, setSubnetValue] = useState('');
  const [gatewayValue, setGatewayValue] = useState('');

  // Generate random segment on mount
  useEffect(() => {
    setSegment(Math.floor(Math.random() * 50) + 10); // 10-60 to be safe
  }, []);

  const routerIp = `192.168.${segment}.1`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('checking');
    setMessage('Memeriksa konfigurasi...');
    setFieldErrors({ ip: false, subnet: false, gateway: false });

    // Simulate network handshake delay
    setTimeout(() => {
        validateConfig();
    }, 1500);
  };

  const validateConfig = () => {
    const ip = ipValue.trim();
    const subnet = subnetValue.trim();
    const gateway = gatewayValue.trim();
    const ipParts = ip.split('.').map(Number);
    let newErrors = { ip: false, subnet: false, gateway: false };
    let isValid = true;
    let errorMsg = '';

    // 1. Check Subnet (Must be Class C standard for this level)
    if (subnet !== '255.255.255.0') {
        newErrors.subnet = true;
        isValid = false;
        errorMsg = 'Subnet Mask salah! Gunakan 255.255.255.0 untuk jaringan lokal standar.';
    }

    // 2. Check Gateway (Must match Router IP)
    if (gateway !== routerIp) {
        newErrors.gateway = true;
        isValid = false;
        errorMsg = errorMsg || `Default Gateway salah! Harus alamat Router: ${routerIp}`;
    }

    // 3. Check IP Conflict
    if (ip === routerIp) {
        newErrors.ip = true;
        isValid = false;
        errorMsg = errorMsg || 'IP Conflict! IP Laptop tidak boleh sama dengan IP Router.';
    }

    // 4. Check IP Segment and Validity
    if (
        ipParts.length !== 4 ||
        ipParts[0] !== 192 ||
        ipParts[1] !== 168 ||
        ipParts[2] !== segment ||
        ipParts[3] < 2 || ipParts[3] > 254 ||
        isNaN(ipParts[3])
    ) {
        newErrors.ip = true;
        isValid = false;
        errorMsg = errorMsg || `IP Address salah! Harus dalam segmen 192.168.${segment}.x (Host ID: 2-254).`;
    }

    setFieldErrors(newErrors);

    if (isValid) {
        setStatus('success');
        setMessage(`Koneksi Berhasil! Laptop terhubung ke Network 192.168.${segment}.0`);
    } else {
        setStatus('error');
        setMessage(errorMsg);
    }
  };

  const handleReset = () => {
      setSegment(Math.floor(Math.random() * 50) + 10);
      setStatus('idle');
      setMessage('');
      setIpValue('');
      setSubnetValue('');
      setGatewayValue('');
      setFieldErrors({ ip: false, subnet: false, gateway: false });
  };

  const autoFillSubnet = () => {
      setSubnetValue('255.255.255.0');
  }

  return (
    <div className="bg-slate-50 p-6 md:p-8 rounded-2xl shadow-inner border border-slate-200">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-200 pb-6 gap-4">
            <div>
                <h4 className="font-bold text-slate-900 text-xl flex items-center gap-2">
                    <Settings size={22} className="text-indigo-600"/>
                    Lab Konfigurasi IP Manual
                </h4>
                <p className="text-slate-500 text-sm mt-1 max-w-lg">
                    Hubungkan laptop ke Router Lokal. Pastikan Laptop berada dalam <strong>Network Segment</strong> yang sama dengan Router.
                </p>
            </div>
            <button 
                onClick={handleReset} 
                className="text-xs font-bold flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors shadow-sm"
            >
                <RefreshCw size={14}/> Reset Lab
            </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* LEFT: VISUALIZATION (THE LAB) */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden min-h-[320px] flex flex-col justify-center">
                 {/* Status Badge */}
                 <div className="absolute top-4 left-4">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm
                        ${status === 'success' ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                        : status === 'error' ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                        : 'bg-slate-700/50 text-slate-400 border-slate-600'}`}>
                        <Power size={12} className={status === 'success' ? 'text-green-400' : ''} />
                        {status === 'success' ? 'CONNECTED' : status === 'error' ? 'ERROR' : status === 'checking' ? 'VERIFYING...' : 'DISCONNECTED'}
                    </div>
                 </div>

                 {/* Network Diagram */}
                 <div className="flex justify-between items-center relative z-10 px-4 mt-6">
                     
                     {/* Client Device */}
                     <div className="flex flex-col items-center gap-3 relative group">
                         <div className={`p-4 rounded-2xl transition-all duration-500 ${status === 'success' ? 'bg-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-slate-700'}`}>
                             <Monitor size={48} className={status === 'success' ? 'text-green-400' : 'text-slate-400'} />
                         </div>
                         <div className="text-center">
                             <span className="text-xs font-bold text-slate-400 block mb-1">Laptop Siswa</span>
                             <div className="bg-slate-950 px-2 py-1 rounded text-[10px] font-mono text-green-400 border border-slate-700">
                                 {ipValue || '0.0.0.0'}
                             </div>
                         </div>
                     </div>

                     {/* Cable Connection */}
                     <div className="flex-1 mx-4 h-2 bg-slate-700 rounded-full relative overflow-hidden">
                         {/* Static Line */}
                         <div className={`absolute inset-0 transition-colors duration-500 ${status === 'success' ? 'bg-green-900/50' : ''}`}></div>
                         
                         {/* Moving Packet Animation */}
                         {(status === 'checking' || status === 'success') && (
                             <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-[blob_1s_linear_infinite] opacity-70"></div>
                         )}
                         {status === 'success' && (
                             <div className="absolute inset-0 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)] opacity-50"></div>
                         )}
                         {status === 'error' && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <XCircle size={16} className="text-red-500 bg-slate-900 rounded-full"/>
                             </div>
                         )}
                     </div>

                     {/* Router Device */}
                     <div className="flex flex-col items-center gap-3">
                         <div className="p-4 bg-indigo-900/30 border border-indigo-500/30 rounded-2xl relative">
                             <Router size={48} className="text-indigo-400" />
                             {/* Blinking Light */}
                             <div className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                         </div>
                         <div className="text-center">
                             <span className="text-xs font-bold text-slate-400 block mb-1">Gateway Router</span>
                             <div className="bg-slate-950 px-2 py-1 rounded text-[10px] font-mono text-indigo-300 border border-indigo-900/50">
                                 {routerIp}
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Message Console */}
                 <div className="mt-8 bg-slate-950/50 p-3 rounded-lg border border-slate-700 min-h-[60px] flex items-center justify-center">
                     <p className={`text-sm font-mono text-center ${
                         status === 'success' ? 'text-green-400' : 
                         status === 'error' ? 'text-red-400' : 
                         status === 'checking' ? 'text-yellow-400 animate-pulse' : 'text-slate-500'
                     }`}>
                         {message || "> Menunggu input konfigurasi..."}
                     </p>
                 </div>
            </div>

            {/* RIGHT: CONFIGURATION FORM */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-xs font-bold text-slate-400 ml-auto uppercase tracking-wider">IPv4 Properties</span>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* IP Address Input */}
                    <div className="relative">
                        <label className="text-xs font-bold text-slate-600 uppercase mb-1.5 flex justify-between">
                            IP Address
                            {fieldErrors.ip && <span className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle size={10}/> Invalid Segment</span>}
                        </label>
                        <div className={`flex items-center border-2 rounded-lg px-3 py-2 transition-all focus-within:ring-2 focus-within:ring-indigo-100 ${fieldErrors.ip ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}>
                            <Monitor size={18} className="text-slate-400 mr-3" />
                            <input 
                                type="text" 
                                value={ipValue}
                                onChange={(e) => setIpValue(e.target.value)}
                                placeholder={`192.168.${segment}.x`} 
                                className="w-full outline-none font-mono text-sm text-slate-800 bg-transparent placeholder:text-slate-300" 
                                autoComplete="off"
                            />
                        </div>
                        <p className="text-xs text-slate-400 mt-1 pl-1">Target Segment: <strong className="text-indigo-600">192.168.{segment}</strong></p>
                    </div>

                    {/* Subnet Mask Input */}
                    <div>
                        <label className="text-xs font-bold text-slate-600 uppercase mb-1.5 flex justify-between">
                            Subnet Mask
                            {fieldErrors.subnet && <span className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle size={10}/> Invalid Mask</span>}
                        </label>
                        <div className="flex gap-2">
                            <div className={`flex-1 flex items-center border-2 rounded-lg px-3 py-2 transition-all focus-within:ring-2 focus-within:ring-indigo-100 ${fieldErrors.subnet ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}>
                                <Share2 size={18} className="text-slate-400 mr-3" />
                                <input 
                                    type="text" 
                                    value={subnetValue}
                                    onChange={(e) => setSubnetValue(e.target.value)}
                                    placeholder="255.255.255.0" 
                                    className="w-full outline-none font-mono text-sm text-slate-800 bg-transparent placeholder:text-slate-300" 
                                    autoComplete="off"
                                />
                            </div>
                            <button 
                                type="button"
                                onClick={autoFillSubnet}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 rounded-lg text-xs font-bold transition-colors border border-slate-200"
                                title="Gunakan Default Subnet Class C"
                            >
                                Auto
                            </button>
                        </div>
                    </div>

                    {/* Default Gateway Input */}
                    <div>
                        <label className="text-xs font-bold text-slate-600 uppercase mb-1.5 flex justify-between">
                            Default Gateway
                            {fieldErrors.gateway && <span className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle size={10}/> Wrong Gateway</span>}
                        </label>
                        <div className={`flex items-center border-2 rounded-lg px-3 py-2 transition-all focus-within:ring-2 focus-within:ring-indigo-100 ${fieldErrors.gateway ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}>
                            <Router size={18} className="text-slate-400 mr-3" />
                            <input 
                                type="text" 
                                value={gatewayValue}
                                onChange={(e) => setGatewayValue(e.target.value)}
                                placeholder="IP Router..." 
                                className="w-full outline-none font-mono text-sm text-slate-800 bg-transparent placeholder:text-slate-300" 
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={status === 'checking' || status === 'success'}
                            className={`w-full font-bold py-3.5 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 text-sm
                                ${status === 'success' 
                                ? 'bg-green-600 text-white cursor-default' 
                                : status === 'checking' 
                                    ? 'bg-indigo-400 text-white cursor-wait' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/30 hover:-translate-y-0.5'}`}
                        >
                            {status === 'checking' ? (
                                <><Activity className="animate-spin" size={18}/> Menerapkan...</>
                            ) : status === 'success' ? (
                                <><Check size={18} /> Terhubung</>
                            ) : (
                                <><Check size={18} /> Simpan & Hubungkan</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

const CLISim = () => {
  const [history, setHistory] = useState<string[]>([
    "Microsoft Windows [Version 10.0.19045.3636]",
    "(c) Microsoft Corporation. All rights reserved.",
    "",
    "C:\\Users\\Siswa>"
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = currentInput.trim().toLowerCase();
    const newHistory = [...history, `C:\\Users\\Siswa> ${currentInput}`];

    if (cmd === "cls") {
      setHistory(["C:\\Users\\Siswa>"]);
      setCurrentInput("");
      return;
    } 
    
    if (cmd === "help") {
      newHistory.push(
        "Available commands:", 
        "  ipconfig    - Menampilkan konfigurasi IP",
        "  ping [addr] - Tes koneksi ke alamat IP/Domain",
        "  cls         - Membersihkan layar",
        "  help        - Menampilkan bantuan ini"
      );
    } else if (cmd === "ipconfig") {
      newHistory.push(
        "",
        "Windows IP Configuration",
        "",
        "Ethernet adapter Local Area Connection:",
        "",
        "   Connection-specific DNS Suffix  . : sekolah.local",
        "   IPv4 Address. . . . . . . . . . . : 192.168.10.25",
        "   Subnet Mask . . . . . . . . . . . : 255.255.255.0",
        "   Default Gateway . . . . . . . . . : 192.168.10.1",
        ""
      );
    } else if (cmd.startsWith("ping")) {
      const target = cmd.split(" ")[1];
      if (!target) {
        newHistory.push("Usage: ping [ip address or domain name]");
      } else {
        newHistory.push(
          "",
          `Pinging ${target} with 32 bytes of data:`,
          `Reply from ${target}: bytes=32 time<1ms TTL=128`,
          `Reply from ${target}: bytes=32 time<1ms TTL=128`,
          `Reply from ${target}: bytes=32 time<1ms TTL=128`,
          `Reply from ${target}: bytes=32 time<1ms TTL=128`,
          "",
          `Ping statistics for ${target}:`,
          "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)",
          ""
        );
      }
    } else if (cmd !== "") {
      newHistory.push(`'${cmd}' is not recognized as an internal or external command.`);
    }

    newHistory.push("", "C:\\Users\\Siswa>");
    setHistory(newHistory);
    setCurrentInput("");
  };

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 font-mono text-sm shadow-2xl">
      <div className="flex items-center gap-2 mb-2 border-b border-slate-700 pb-2">
         <Terminal size={16} className="text-slate-400" />
         <span className="text-slate-400 font-bold">Command Prompt</span>
      </div>
      <div 
        className="h-64 overflow-y-auto text-slate-300 space-y-1 p-2 bg-black rounded-lg border border-slate-800"
        ref={scrollRef}
        onClick={() => document.getElementById("cli-input")?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
        <form onSubmit={handleCommand} className="flex items-center">
          <span className="mr-0"></span>
          <input 
            id="cli-input"
            type="text" 
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="bg-transparent border-none outline-none text-transparent w-px h-px overflow-hidden" 
            autoFocus 
            autoComplete="off"
          />
          <div className="flex">
             <span>C:\Users\Siswa&gt; {currentInput}</span>
             <span className="w-2 h-4 bg-slate-400 animate-pulse ml-1"></span>
          </div>
        </form>
      </div>
      <p className="text-xs text-slate-500 mt-2">*Ketik 'help' untuk melihat perintah yang tersedia.</p>
    </div>
  );
};

// --- LKPD DIGITAL COMPONENTS ---

const LKPDSim = () => {
    const [activeLkpd, setActiveLkpd] = useState<1 | 2 | 3>(1);
    const [identity, setIdentity] = useState({ name: '', class: '', group: '' });
    
    // LKPD 1 State
    const [lkpd1Data, setLkpd1Data] = useState([
        { no: 1, name: "Contoh: Switch", func: "Menghubungkan banyak komputer", media: "Kabel" },
        { no: 2, name: "", func: "", media: "" },
        { no: 3, name: "", func: "", media: "" },
        { no: 4, name: "", func: "", media: "" },
        { no: 5, name: "", func: "", media: "" },
    ]);
    const [lkpd1Reflection, setLkpd1Reflection] = useState("");

    // LKPD 2 State
    const [lkpd2Data, setLkpd2Data] = useState({ ssid: '', pass: '', ip: '', status: '' });

    // LKPD 3 State
    const [lkpd3Data, setLkpd3Data] = useState({ to: '', subject: '', body: '', checklist: [false, false, false, false] });

    const handlePrint = () => {
        const dateStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        let contentHtml = '';

        if (activeLkpd === 1) {
            const rows = lkpd1Data.map(r => `
                <tr class="border-b">
                    <td class="p-2 text-center font-bold">${r.no}</td>
                    <td class="p-2">${r.name}</td>
                    <td class="p-2">${r.func}</td>
                    <td class="p-2">${r.media}</td>
                </tr>
            `).join('');
            
            contentHtml = `
                <h2 class="text-xl font-bold mb-2 text-indigo-800 border-b pb-2">LKPD 1: Identifikasi Perangkat</h2>
                <p class="text-sm mb-4 text-slate-600">Tujuan: Mengidentifikasi perangkat keras jaringan.</p>
                <table class="w-full border border-slate-300 text-sm mb-6">
                    <thead class="bg-slate-100">
                        <tr>
                            <th class="border p-2 text-left">No</th>
                            <th class="border p-2 text-left">Nama Perangkat</th>
                            <th class="border p-2 text-left">Fungsi Utama</th>
                            <th class="border p-2 text-left">Media</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
                <div class="bg-slate-50 p-4 border rounded-lg">
                    <h3 class="font-bold text-sm mb-2 text-slate-800">Refleksi Deep Learning:</h3>
                    <p class="text-sm whitespace-pre-wrap italic text-slate-700">${lkpd1Reflection || '(Siswa belum mengisi jawaban)'}</p>
                </div>
            `;
        } else if (activeLkpd === 2) {
            contentHtml = `
                <h2 class="text-xl font-bold mb-2 text-amber-800 border-b pb-2">LKPD 2: Konfigurasi Jaringan</h2>
                <p class="text-sm mb-6 text-slate-600">Tujuan: Melakukan konfigurasi IP Address dan Hotspot.</p>
                
                <div class="grid grid-cols-1 gap-4">
                    <div class="border rounded-lg p-4 bg-white">
                        <h3 class="font-bold text-sm mb-4 text-slate-700 uppercase tracking-wider">Hasil Pengamatan</h3>
                        <div class="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                            <div class="flex flex-col">
                                <span class="text-slate-500 text-xs">SSID (Nama Wifi)</span>
                                <span class="font-bold text-lg">${lkpd2Data.ssid || '-'}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-slate-500 text-xs">Password</span>
                                <span class="font-mono bg-slate-100 px-2 py-1 rounded w-fit">${lkpd2Data.pass || '-'}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-slate-500 text-xs">IP Address Laptop</span>
                                <span class="font-mono text-base">${lkpd2Data.ip || '-'}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-slate-500 text-xs">Status Koneksi</span>
                                <span class="font-bold text-base ${lkpd2Data.status === 'Berhasil' ? 'text-green-600' : 'text-red-600'}">
                                    ${lkpd2Data.status || '-'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (activeLkpd === 3) {
            const checklistItems = ["Subject diisi jelas", "Bahasa sopan", "Ada lampiran file", "Email terkirim (Cek folder Sent)"];
            const checklistHtml = checklistItems.map((item, idx) => `
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-lg leading-none">${lkpd3Data.checklist[idx] ? '✅' : '⬜'}</span>
                    <span class="${lkpd3Data.checklist[idx] ? 'text-slate-800' : 'text-slate-400'}">${item}</span>
                </div>
            `).join('');

            contentHtml = `
                <h2 class="text-xl font-bold mb-2 text-emerald-800 border-b pb-2">LKPD 3: Komunikasi Digital</h2>
                <p class="text-sm mb-6 text-slate-600">Tujuan: Mengirim Email dengan Etika yang baik (dibantu AI).</p>

                <div class="mb-6">
                    <h3 class="font-bold text-sm mb-2 text-slate-700">Simulasi Draft Email</h3>
                    <div class="border rounded-lg overflow-hidden text-sm">
                        <div class="bg-slate-800 text-white px-4 py-2 font-bold flex justify-between">
                            <span>New Message</span>
                            <div class="flex gap-1"><div class="w-2 h-2 rounded-full bg-red-500"></div><div class="w-2 h-2 rounded-full bg-yellow-500"></div><div class="w-2 h-2 rounded-full bg-green-500"></div></div>
                        </div>
                        <div class="p-4 bg-white space-y-2">
                            <div class="flex border-b pb-1"><span class="text-slate-500 w-16">To:</span> <span class="font-medium">${lkpd3Data.to}</span></div>
                            <div class="flex border-b pb-1"><span class="text-slate-500 w-16">Subject:</span> <span class="font-medium">${lkpd3Data.subject}</span></div>
                            <div class="pt-2 min-h-[120px] whitespace-pre-wrap text-slate-800">${lkpd3Data.body}</div>
                        </div>
                    </div>
                </div>

                <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-lg">
                    <h3 class="font-bold text-sm mb-3 text-emerald-900">Checklist Mandiri</h3>
                    <div class="text-sm">${checklistHtml}</div>
                </div>
            `;
        }

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>LKPD ${activeLkpd} - ${identity.name}</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                        @media print { 
                            @page { margin: 1.5cm; }
                            body { -webkit-print-color-adjust: exact; }
                        }
                    </style>
                </head>
                <body class="bg-white text-slate-900 p-8 max-w-[210mm] mx-auto">
                    <!-- Header -->
                    <div class="flex items-center justify-between border-b-2 border-slate-800 pb-6 mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-16 h-16 bg-slate-100 flex items-center justify-center rounded-lg border-2 border-slate-800">
                                <span class="font-black text-2xl">SMK</span>
                            </div>
                            <div>
                                <h1 class="text-xl font-bold uppercase tracking-wide">SMK Negeri 1 Kaligondang</h1>
                                <p class="text-sm text-slate-600">Jl. Raya Kaligondang, Purbalingga</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-bold text-slate-500 uppercase tracking-widest">Lembar Kerja Peserta Didik</div>
                            <div class="text-3xl font-black text-slate-800">LKPD 0${activeLkpd}</div>
                            <div class="text-xs text-slate-400 mt-1">${dateStr}</div>
                        </div>
                    </div>

                    <!-- Identity -->
                    <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="text-xs font-bold text-slate-400 uppercase">Nama Siswa / Kelompok</label>
                                <div class="text-lg font-bold text-slate-900 border-b border-slate-300 pb-1">${identity.name || '................................'}</div>
                            </div>
                            <div>
                                <label class="text-xs font-bold text-slate-400 uppercase">Kelas</label>
                                <div class="text-lg font-bold text-slate-900 border-b border-slate-300 pb-1">${identity.class || '................................'}</div>
                            </div>
                            ${activeLkpd === 2 ? `
                            <div class="col-span-2">
                                <label class="text-xs font-bold text-slate-400 uppercase">Nomor Kelompok</label>
                                <div class="text-lg font-bold text-slate-900 border-b border-slate-300 pb-1">${identity.group || '................................'}</div>
                            </div>` : ''}
                        </div>
                    </div>

                    <!-- Main Content -->
                    <div class="mb-12">
                        ${contentHtml}
                    </div>

                    <!-- Footer -->
                    <div class="border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
                        <p>© Media Pembelajaran Informatika - SMK N 1 Kaligondang</p>
                        <p>Dokumen ini dicetak otomatis dari hasil pengerjaan siswa.</p>
                    </div>

                    <script>
                        setTimeout(() => { window.print(); }, 500);
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    const handleUpload = () => {
        const driveLink = "https://forms.gle/K2Mi3pZUjDEnSf4C8";
        const msg = "Langkah Pengumpulan Tugas:\n\n1. Pastikan Anda sudah menekan tombol 'Simpan Ke PDF' dan file tersimpan di perangkat Anda.\n2. Klik OK untuk membuka Google Form.\n3. Upload file PDF 'LKPD - Nama Siswa' Anda ke dalam form tersebut.";
        
        if (window.confirm(msg)) {
            window.open(driveLink, '_blank');
        }
    };

    const renderIdentityForm = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Nama Siswa / Kelompok</label>
                <input 
                    type="text" 
                    value={identity.name} 
                    onChange={e => setIdentity({...identity, name: e.target.value})}
                    className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                    placeholder="Nama Lengkap" 
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Kelas</label>
                <input 
                    type="text" 
                    value={identity.class} 
                    onChange={e => setIdentity({...identity, class: e.target.value})}
                    className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                    placeholder="Contoh: X TJKT 1" 
                />
            </div>
            {activeLkpd === 2 && (
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Nomor Kelompok (Untuk LKPD 2)</label>
                    <input 
                        type="text" 
                        value={identity.group} 
                        onChange={e => setIdentity({...identity, group: e.target.value})}
                        className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                        placeholder="Kelompok X" 
                    />
                </div>
            )}
        </div>
    );

    const renderLkpd1 = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-indigo-100 pb-4">
                <div>
                    <h3 className="font-bold text-xl text-indigo-900">LKPD 1 (Individu): Identifikasi Perangkat (Pertemuan 1)</h3>
                    <p className="text-sm text-slate-600">Tujuan: Mengidentifikasi perangkat keras jaringan.</p>
                </div>
                <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-xs font-bold">Pertemuan 1</div>
            </div>

            <p className="text-sm italic text-slate-600 bg-slate-50 p-3 rounded border-l-4 border-indigo-500">
                <strong>Petunjuk:</strong> Amati perangkat yang disediakan guru, lalu isi tabel berikut!
            </p>

            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-slate-300">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="border border-slate-300 p-2 w-10">No</th>
                            <th className="border border-slate-300 p-2">Nama Perangkat</th>
                            <th className="border border-slate-300 p-2">Fungsi Utama</th>
                            <th className="border border-slate-300 p-2">Media Transmisi (Kabel/Nirkabel)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lkpd1Data.map((row, idx) => (
                            <tr key={idx}>
                                <td className="border border-slate-300 p-2 text-center font-bold">{row.no}</td>
                                <td className="border border-slate-300 p-2">
                                    <input 
                                        type="text" 
                                        value={row.name} 
                                        onChange={e => {
                                            const newData = [...lkpd1Data];
                                            newData[idx].name = e.target.value;
                                            setLkpd1Data(newData);
                                        }}
                                        className="w-full p-1 outline-none bg-transparent" 
                                        placeholder={idx === 0 ? "Contoh: Switch" : "..."}
                                    />
                                </td>
                                <td className="border border-slate-300 p-2">
                                    <input 
                                        type="text" 
                                        value={row.func} 
                                        onChange={e => {
                                            const newData = [...lkpd1Data];
                                            newData[idx].func = e.target.value;
                                            setLkpd1Data(newData);
                                        }}
                                        className="w-full p-1 outline-none bg-transparent" 
                                        placeholder={idx === 0 ? "Menghubungkan komputer" : "..."}
                                    />
                                </td>
                                <td className="border border-slate-300 p-2">
                                    <input 
                                        type="text" 
                                        value={row.media} 
                                        onChange={e => {
                                            const newData = [...lkpd1Data];
                                            newData[idx].media = e.target.value;
                                            setLkpd1Data(newData);
                                        }}
                                        className="w-full p-1 outline-none bg-transparent" 
                                        placeholder={idx === 0 ? "Kabel" : "..."}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <label className="block font-bold text-indigo-900 mb-2">Soal Deep Learning (Refleksi):</label>
                <p className="text-sm text-slate-700 mb-2">Perangkat mana yang menurutmu paling penting agar kita bisa terkoneksi ke internet di sekolah? Jelaskan alasannya!</p>
                <textarea 
                    rows={4} 
                    value={lkpd1Reflection}
                    onChange={e => setLkpd1Reflection(e.target.value)}
                    className="w-full p-3 rounded border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    placeholder="Tulis jawabanmu di sini..."
                ></textarea>
            </div>
        </div>
    );

    const renderLkpd2 = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-amber-100 pb-4">
                <div>
                    <h3 className="font-bold text-xl text-amber-900">LKPD 2 (Kelompok @siswa): Konfigurasi Jaringan (Pertemuan 2)</h3>
                    <p className="text-sm text-slate-600">Tujuan: Melakukan konfigurasi IP Address dan Hotspot.</p>
                </div>
                <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded text-xs font-bold">Pertemuan 2</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-amber-500 text-sm space-y-2">
                <p><strong>Skenario:</strong> Sekolah membutuhkan jaringan Wifi baru. Kamu diminta untuk menyeting HP sebagai Hotspot sementara dan menghubungkan Laptop teman ke Hotspot tersebut.</p>
                <strong className="block text-amber-800">Langkah Kerja:</strong>
                <ul className="list-decimal list-inside text-slate-700 ml-2">
                    <li>Aktifkan "Hotspot Portabel" di HP Android.</li>
                    <li>Ubah SSID menjadi: <code>Kelompok_X</code> (X=Nomor kelompok).</li>
                    <li>Ubah Password menjadi: <code>smkbisa123</code>.</li>
                    <li>Hubungkan HP android lain ke Wifi tersebut.</li>
                    <li>Cek IP Address yang didapat HP Android.</li>
                </ul>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700 border-b border-slate-200">Hasil Pengamatan</div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <label className="text-sm font-bold text-slate-600">SSID</label>
                        <input 
                            type="text" 
                            value={lkpd2Data.ssid}
                            onChange={e => setLkpd2Data({...lkpd2Data, ssid: e.target.value})}
                            className="p-2 border border-slate-300 rounded focus:border-amber-500 outline-none" 
                            placeholder="Contoh: Kelompok_1"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <label className="text-sm font-bold text-slate-600">Password</label>
                        <input 
                            type="text" 
                            value={lkpd2Data.pass}
                            onChange={e => setLkpd2Data({...lkpd2Data, pass: e.target.value})}
                            className="p-2 border border-slate-300 rounded focus:border-amber-500 outline-none font-mono" 
                            placeholder="smkbisa123"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <label className="text-sm font-bold text-slate-600">IP Address Laptop</label>
                        <input 
                            type="text" 
                            value={lkpd2Data.ip}
                            onChange={e => setLkpd2Data({...lkpd2Data, ip: e.target.value})}
                            className="p-2 border border-slate-300 rounded focus:border-amber-500 outline-none font-mono" 
                            placeholder="192.168.x.x"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <label className="text-sm font-bold text-slate-600">Status Koneksi</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="status" 
                                    checked={lkpd2Data.status === "Berhasil"}
                                    onChange={() => setLkpd2Data({...lkpd2Data, status: "Berhasil"})}
                                    className="w-4 h-4 text-green-600"
                                /> 
                                <span className="text-green-700 font-bold">Berhasil</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="status" 
                                    checked={lkpd2Data.status === "Gagal"}
                                    onChange={() => setLkpd2Data({...lkpd2Data, status: "Gagal"})}
                                    className="w-4 h-4 text-red-600"
                                /> 
                                <span className="text-red-700 font-bold">Gagal</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLkpd3 = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-emerald-100 pb-4">
                <div>
                    <h3 className="font-bold text-xl text-emerald-900">LKPD 3 (Individu): Komunikasi Digital (Pertemuan 3)</h3>
                    <p className="text-sm text-slate-600">Tujuan: Mengirim Email dengan Etika yang baik (dibantu AI).</p>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs font-bold">Pertemuan 3</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-emerald-500 text-sm mb-6">
                <strong>Tugas:</strong>
                <ol className="list-decimal list-inside mt-2 text-slate-700 space-y-1">
                    <li>Gunakan AI (ChatGPT/Gemini) untuk membuat draf email "Izin Tidak Masuk Sekolah karena Sakit".</li>
                    <li>Kirim email tersebut ke alamat email guru (simulasi) atau teman sebangku.</li>
                    <li>Lampirkan satu file gambar (bebas).</li>
                </ol>
            </div>

            {/* Mock Email UI */}
            <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm bg-white">
                <div className="bg-slate-800 text-white px-4 py-2 flex items-center justify-between">
                    <span className="font-bold text-sm">New Message</span>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                </div>
                <div className="p-4 space-y-3">
                    <div className="flex items-center border-b border-slate-100 pb-2">
                        <span className="text-slate-500 text-sm w-20">To:</span>
                        <input 
                            type="text" 
                            value={lkpd3Data.to}
                            onChange={e => setLkpd3Data({...lkpd3Data, to: e.target.value})}
                            className="flex-1 outline-none text-sm" 
                            placeholder="guru.informatika@smk.sch.id"
                        />
                    </div>
                    <div className="flex items-center border-b border-slate-100 pb-2">
                        <span className="text-slate-500 text-sm w-20">Subject:</span>
                        <input 
                            type="text" 
                            value={lkpd3Data.subject}
                            onChange={e => setLkpd3Data({...lkpd3Data, subject: e.target.value})}
                            className="flex-1 outline-none text-sm font-medium" 
                            placeholder="Subject email..."
                        />
                    </div>
                    <textarea 
                        className="w-full h-40 outline-none text-sm resize-none mt-2" 
                        placeholder="Tulis isi email di sini..."
                        value={lkpd3Data.body}
                        onChange={e => setLkpd3Data({...lkpd3Data, body: e.target.value})}
                    ></textarea>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Paperclip size={18} className="hover:text-slate-600 cursor-pointer"/>
                            <span className="text-xs">Lampirkan file (Simulasi)</span>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-blue-700">
                            <Send size={14}/> Kirim
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2"><CheckCircle2 size={18}/> Checklist Mandiri</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Subject diisi jelas.", "Bahasa sopan.", "Ada lampiran file.", "Email terkirim (Cek folder Sent)."].map((item, idx) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer bg-white p-2 rounded border border-emerald-100 hover:border-emerald-300">
                            <input 
                                type="checkbox" 
                                checked={lkpd3Data.checklist[idx]} 
                                onChange={e => {
                                    const newCheck = [...lkpd3Data.checklist];
                                    newCheck[idx] = e.target.checked;
                                    setLkpd3Data({...lkpd3Data, checklist: newCheck});
                                }}
                                className="w-4 h-4 text-emerald-600 rounded" 
                            />
                            <span className="text-sm text-slate-700">{item}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Tabs */}
            <div className="bg-slate-100 p-2 flex gap-2 border-b border-slate-200">
                <button 
                    onClick={() => setActiveLkpd(1)} 
                    className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 ${activeLkpd === 1 ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                    <Table size={16}/> LKPD 1
                </button>
                <button 
                    onClick={() => setActiveLkpd(2)} 
                    className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 ${activeLkpd === 2 ? 'bg-white shadow text-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                    <Smartphone size={16}/> LKPD 2
                </button>
                <button 
                    onClick={() => setActiveLkpd(3)} 
                    className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 ${activeLkpd === 3 ? 'bg-white shadow text-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                    <Mail size={16}/> LKPD 3
                </button>
            </div>

            <div className="p-6 md:p-8">
                {renderIdentityForm()}
                
                <div className="animate-fade-in">
                    {activeLkpd === 1 && renderLkpd1()}
                    {activeLkpd === 2 && renderLkpd2()}
                    {activeLkpd === 3 && renderLkpd3()}
                </div>

                {/* Footer / Save Button */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-4 justify-end">
                    <button 
                        onClick={handlePrint}
                        className="bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-2 px-6 py-3"
                    >
                        <Printer size={18}/> Simpan Ke PDF
                    </button>
                    <a 
                        href="https://forms.gle/K2Mi3pZUjDEnSf4C8" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center gap-2 px-6 py-3"
                    >
                        <UploadCloud size={18}/> Kirim LKPD ke Guru
                    </a>
                </div>
            </div>
        </div>
    );
};

const NetworkPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NetworkSubPage>('intro');
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const TabButton = ({ id, label, icon }: { id: NetworkSubPage, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${
        activeTab === id 
        ? 'bg-indigo-600 text-white shadow-lg scale-105' 
        : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
       {/* Header */}
       <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-slate-700 print:hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Jaringan Komputer & Internet</h1>
            <p className="text-indigo-200 text-lg max-w-2xl">
              Memahami bagaimana komputer saling terhubung, bertukar data, dan membentuk jaringan global yang kita sebut Internet.
            </p>
          </div>
       </div>

       {/* Navigation */}
       <div className="flex overflow-x-auto gap-3 pb-2 sticky top-24 z-30 bg-slate-50/80 backdrop-blur-sm p-2 rounded-xl border border-slate-200/50 print:hidden">
          <TabButton id="intro" label="Pengantar" icon={<Globe size={18}/>} />
          <TabButton id="hardware" label="Perangkat" icon={<Server size={18}/>} />
          <TabButton id="topology" label="Topologi" icon={<Share2 size={18}/>} />
          <TabButton id="config" label="Konfigurasi" icon={<Settings size={18}/>} />
          <TabButton id="lkpd" label="LKPD Digital" icon={<FileEdit size={18}/>} />
          <TabButton id="quiz" label="Kuis" icon={<Award size={18}/>} />
       </div>

       {/* Content */}
       <div className="min-h-[500px]">
          {activeTab === 'intro' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8 animate-fade-in">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Apa itu Jaringan Komputer?</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Jaringan komputer adalah dua atau lebih komputer yang terhubung satu sama lain untuk berbagi sumber daya (data, printer, internet).
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg text-indigo-900 text-sm font-medium">
                                <CheckCircle size={20} className="text-indigo-600"/>
                                LAN (Local Area Network): Jaringan lokal (sekolah, rumah).
                            </li>
                            <li className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg text-indigo-900 text-sm font-medium">
                                <CheckCircle size={20} className="text-indigo-600"/>
                                WAN (Wide Area Network): Jaringan antar kota/negara.
                            </li>
                            <li className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg text-indigo-900 text-sm font-medium">
                                <CheckCircle size={20} className="text-indigo-600"/>
                                Internet: Jaringan raksasa yang menghubungkan seluruh dunia.
                            </li>
                        </ul>
                    </div>
                    {/* Replaced placeholder with Image */}
                    <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 group relative h-64 md:h-80">
                        <img 
                          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" 
                          alt="Ilustrasi Jaringan Global" 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6">
                           <div className="text-white">
                             <p className="font-bold text-lg">Internet of Things</p>
                             <p className="text-xs text-indigo-200">Miliaran perangkat terhubung membentuk jaringan raksasa.</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {activeTab === 'hardware' && (
            <div className="space-y-8 animate-fade-in">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Server size={24}/> Perangkat Keras Jaringan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {HARDWARE_DATA.filter(h => h.category === 'device').map((item) => (
                            <div key={item.id} className="flex flex-col bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-400 hover:shadow-lg transition-all group">
                                <div className="mb-4 p-3 bg-slate-50 w-fit rounded-xl text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-slate-900 text-lg mb-1">{item.name}</h4>
                                <p className="text-xs text-slate-500 mb-4 font-medium">{item.desc}</p>
                                
                                <div className="mt-auto space-y-4">
                                    <div className="border-t border-slate-100 pt-3">
                                        <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider mb-1 block">Fungsi Utama</span>
                                        <p className="text-sm text-slate-700 leading-relaxed">{item.details?.func}</p>
                                    </div>
                                    
                                    {item.details?.example && (
                                        <div>
                                            <span className="text-[10px] font-bold uppercase text-emerald-600 tracking-wider mb-1 block">Contoh Penggunaan</span>
                                            <p className="text-xs text-slate-600 leading-relaxed">{item.details.example}</p>
                                        </div>
                                    )}

                                    {item.details?.diff && (
                                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                                            <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider flex items-center gap-1 mb-1">
                                                <Info size={12} /> Info / Perbedaan
                                            </span>
                                            <p className="text-xs text-amber-800 leading-relaxed">{item.details.diff}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* KVM Simulator Section */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Settings size={24}/> Manajemen Perangkat Keras</h3>
                   <div className="grid lg:grid-cols-2 gap-8 items-start">
                      <div className="prose text-slate-600 text-sm">
                        <p>
                          Dalam pengelolaan jaringan skala besar (seperti Data Center), administrator sering harus mengelola puluhan hingga ratusan server. 
                          Tidak efisien jika setiap server memiliki monitor, keyboard, dan mouse sendiri.
                        </p>
                        <p>
                          Solusinya adalah <strong>KVM Switch</strong>. Alat ini memungkinkan administrator berpindah kontrol antar komputer dengan cepat.
                        </p>
                      </div>
                      <KVMSim />
                   </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                     <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Cable size={24}/> Media Transmisi (Kabel)</h3>
                     <div className="grid md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                            {HARDWARE_DATA.filter(h => h.category === 'cable').map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 border rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="text-slate-400">{item.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                                        <p className="text-xs text-slate-500 mb-1">{item.desc}</p>
                                        <p className="text-sm text-slate-600 mt-1">{item.details?.func}</p>
                                        {item.details?.diff && (
                                            <p className="text-xs text-slate-500 mt-1 italic border-l-2 border-slate-300 pl-2">
                                                {item.details.diff}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                         </div>
                         <div>
                             <CableSim />
                         </div>
                     </div>
                </div>
            </div>
          )}

          {activeTab === 'topology' && (
             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
                 <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Topologi Jaringan</h2>
                    <p className="text-center text-slate-600 mb-8">
                        Topologi adalah cara komputer dihubungkan satu sama lain. Setiap bentuk memiliki kelebihan dan kekurangan.
                    </p>
                    <TopologySim />
                 </div>
             </div>
          )}

          {activeTab === 'config' && (
             <div className="space-y-8 animate-fade-in">
                 <IpConfigSim />
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                             <Terminal size={20} className="text-slate-600"/> Command Line Interface (CLI)
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                            Gunakan terminal di bawah untuk menguji koneksi jaringan menggunakan perintah dasar seperti <code>ping</code> dan <code>ipconfig</code>.
                        </p>
                        <CLISim />
                    </div>
                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <h3 className="font-bold text-indigo-900 mb-4">Perintah Dasar Jaringan</h3>
                        <ul className="space-y-4">
                            <li className="bg-white p-3 rounded-lg shadow-sm">
                                <code className="text-pink-600 font-bold block mb-1">ipconfig</code>
                                <span className="text-sm text-slate-600">Melihat konfigurasi IP address komputer kita.</span>
                            </li>
                            <li className="bg-white p-3 rounded-lg shadow-sm">
                                <code className="text-pink-600 font-bold block mb-1">ping [tujuan]</code>
                                <span className="text-sm text-slate-600">Mengirim paket data ke alamat tujuan untuk cek koneksi (Latensi/Reply).</span>
                            </li>
                            <li className="bg-white p-3 rounded-lg shadow-sm">
                                <code className="text-pink-600 font-bold block mb-1">tracert [tujuan]</code>
                                <span className="text-sm text-slate-600">Melacak jalur router yang dilewati paket data sampai ke tujuan.</span>
                            </li>
                        </ul>
                    </div>
                 </div>
             </div>
          )}

          {activeTab === 'lkpd' && (
              <LKPDSim />
          )}

          {activeTab === 'quiz' && (
             <div className="max-w-2xl mx-auto animate-fade-in">
                 <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
                    <div className="text-center mb-8">
                        <Award size={48} className="text-amber-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-900">Evaluasi Jaringan Dasar</h2>
                        <p className="text-slate-500">Uji pemahamanmu tentang perangkat dan konsep jaringan.</p>
                    </div>

                    {quizScore === null ? (
                        <div className="space-y-6">
                            {QUIZ_DATA.map((q, idx) => (
                                <div key={idx} className="border-b border-slate-100 pb-6 last:border-0">
                                    <p className="font-bold text-slate-800 mb-3">{idx + 1}. {q.question}</p>
                                    <div className="space-y-2">
                                        {q.options.map((opt, oIdx) => (
                                            <label key={oIdx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all">
                                                <input type="radio" name={`q-${idx}`} className="w-4 h-4 text-indigo-600" />
                                                <span className="text-slate-700 text-sm">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button 
                                onClick={() => {
                                    setQuizScore(100); 
                                    window.scrollTo(0,0);
                                }}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                            >
                                Kirim Jawaban
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <h3 className="text-3xl font-black text-indigo-600 mb-2">{quizScore}/100</h3>
                            <p className="text-slate-600 mb-6">Nilai Sempurna! Kamu calon Network Engineer handal.</p>
                            <button 
                                onClick={() => setQuizScore(null)}
                                className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200"
                            >
                                Ulangi Kuis
                            </button>
                        </div>
                    )}
                 </div>
             </div>
          )}
       </div>
    </div>
  );
};

export default NetworkPage;