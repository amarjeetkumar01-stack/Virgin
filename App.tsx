
import React, { useState } from 'react';
import { Logo, ArrowIcon } from './constants';
import { MemeResult } from './types';
import { analyzePersona } from './services/geminiService';

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<'idle' | 'judging' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<MemeResult | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    try {
      setStatus('judging');
      // Suspense delay for "Audit" feel
      await new Promise(r => setTimeout(r, 2500));
      const memeResult = await analyzePersona(username);
      setResult(memeResult);
      setStatus('done');
    } catch (err) {
      setStatus('error');
    }
  };

  const reset = () => {
    setUsername('');
    setStatus('idle');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center selection:bg-[#CBFF00] selection:text-black bg-[#050a1f]">
      {/* Header */}
      <header className="w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-10 flex justify-center items-center z-10">
        <Logo />
      </header>

      <main className="flex-1 w-full max-w-4xl px-4 py-4 flex flex-col items-center text-center justify-center relative">
        
        {status === 'idle' && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700 w-full">
            <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-black leading-[0.9] mb-6 uppercase tracking-tighter italic text-white">
              ARE YOU <br />
              <span className="text-[#CBFF00] text-neon">VIRGIN OR NOT?</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-bold opacity-40 mb-8 sm:mb-12 max-w-lg text-white">
              THE PREMIER ON-CHAIN SOUL AUDITOR. <br/>REVEAL YOUR TRUE PROTOCOL STATUS.
            </p>

            <form onSubmit={handleCheck} className="w-full max-w-xl relative flex flex-col sm:flex-row items-center gap-4 sm:gap-0 group">
               <div className="hidden sm:flex absolute inset-y-0 left-0 pl-8 items-center pointer-events-none">
                <span className="text-xl md:text-3xl font-black text-[#CBFF00]">@</span>
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full bg-white/5 border-4 border-white/20 rounded-full py-4 sm:py-8 pl-6 sm:pl-16 pr-6 sm:pr-56 text-lg sm:text-2xl md:text-3xl font-black placeholder:text-white/10 focus:outline-none focus:border-[#CBFF00] transition-all text-white focus:bg-white/10"
              />
              <button 
                type="submit"
                className="sm:absolute sm:right-4 w-full sm:w-auto bg-[#CBFF00] text-black px-6 sm:px-10 py-4 sm:py-5 rounded-full font-black text-base sm:text-xl uppercase flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-[0_0_30px_rgba(203,255,0,0.3)]"
              >
                Reveal <ArrowIcon className="w-5 h-5 sm:w-8 sm:h-8" />
              </button>
            </form>
          </div>
        )}

        {status === 'judging' && (
          <div className="flex flex-col items-center space-y-8 sm:space-y-12 animate-in fade-in duration-300 w-full">
            <div className="relative group scale-75 sm:scale-100">
                <div className="w-48 h-48 sm:w-64 sm:h-64 bg-black rounded-3xl overflow-hidden border-4 border-[#CBFF00] shadow-[0_0_60px_rgba(203,255,0,0.4)] glitch-effect relative">
                  <div className="crt-overlay"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&h=400&auto=format&fit=crop" 
                    className="w-full h-full object-cover grayscale invert brightness-50 contrast-150"
                    alt="Scanning"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#CBFF00]/20 to-transparent"></div>
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#CBFF00] shadow-[0_0_15px_#CBFF00] animate-[scan_1.5s_linear_infinite] z-20"></div>
                </div>
                
                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6">
                   <div className="w-20 h-20 sm:w-32 h-32 border-[6px] sm:border-[10px] border-white/5 border-t-[#CBFF00] rounded-full animate-spin"></div>
                </div>
                
                <div className="absolute -left-8 sm:-left-10 top-1/2 -translate-y-1/2 flex flex-col gap-1 sm:gap-2 font-mono text-[6px] sm:text-[8px] text-[#CBFF00] opacity-60 text-left">
                  <span>0x7A...F2</span>
                  <span>SCANNING_SINS...</span>
                  <span>ID: {username.toUpperCase().substring(0, 10)}</span>
                  <span>STATUS: PENDING</span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2 px-4">
              <h2 className="text-2xl sm:text-5xl font-black uppercase italic text-[#CBFF00] animate-pulse tracking-tighter">LIQUIDATING PRIVACY...</h2>
              <p className="font-mono text-[10px] sm:text-sm opacity-40 tracking-[0.2em] sm:tracking-[0.3em] uppercase">DECRYPTING @{username}</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center space-y-6 sm:space-y-8 animate-in zoom-in duration-300">
            <div className="text-6xl sm:text-[10rem] glitch-effect">💀</div>
            <h2 className="text-2xl sm:text-5xl font-black uppercase italic px-4 text-red-500">SYSTEM OVERLOAD</h2>
            <button 
              onClick={reset}
              className="bg-white text-black px-6 sm:px-12 py-3 sm:py-5 rounded-full font-black text-lg sm:text-2xl hover:bg-[#CBFF00] transition-colors uppercase italic"
            >
              REBOOT
            </button>
          </div>
        )}

        {status === 'done' && result && (
          <div className="w-full max-w-2xl flex flex-col space-y-6 sm:space-y-10 animate-in slide-in-from-bottom duration-700">
            
            <div className="flex flex-col items-center px-4">
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.4em] mb-2 sm:mb-4 text-[#CBFF00]">ARCHETYPE IDENTIFIED</p>
                <h3 className="text-4xl sm:text-8xl md:text-9xl font-black text-white italic uppercase leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] break-words w-full">
                    {result.category}
                </h3>
            </div>

            <div className="glass-card rounded-[1.5rem] sm:rounded-[3rem] p-1 overflow-hidden shadow-2xl relative group cursor-pointer transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-4 hover:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8)] border-white/20">
                <div className="crt-overlay opacity-40 group-hover:opacity-10"></div>
                <div className="vignette absolute inset-0 z-10 pointer-events-none opacity-80"></div>
                <img 
                  src={result.memeUrl} 
                  alt="Meme" 
                  className="w-full h-64 sm:h-[28rem] object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000 ease-out grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-6 sm:p-12 text-left pointer-events-none z-20">
                    <p className="text-lg sm:text-4xl font-black italic leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)] transform transition-transform duration-700 group-hover:translate-y-[-10px]">
                        {result.roast}
                    </p>
                </div>
            </div>

            <div className="glass-card rounded-xl sm:rounded-3xl p-5 sm:p-10 text-left relative overflow-hidden border-[#CBFF00]/30 shadow-[0_0_40px_rgba(203,255,0,0.1)] mx-2">
                <div className="absolute top-0 right-0 p-3 sm:p-6 opacity-5 sm:opacity-20 scale-75 sm:scale-125 invert">
                    <Logo />
                </div>
                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-[#CBFF00] mb-2 sm:mb-4">THE FINAL VERDICT</p>
                <p className="text-lg sm:text-4xl md:text-5xl font-black leading-tight italic text-white/90">
                    "{result.verdict}"
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 px-4 sm:px-0">
                <button 
                  onClick={() => {
                    const text = `I am classified as ${result.category} on @VirginChecker! My soul is revealed. Check yours now: `;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="flex-[2] bg-[#CBFF00] text-black py-4 sm:py-7 rounded-full font-black text-lg sm:text-2xl uppercase italic shadow-[0_0_30px_rgba(203,255,0,0.2)] hover:scale-105 transition-transform"
                >
                  SHAME ON X
                </button>
                <button 
                  onClick={reset}
                  className="flex-1 border-2 border-white/20 bg-white/5 py-4 sm:py-7 rounded-full font-black text-lg sm:text-2xl uppercase italic hover:bg-white hover:text-black transition-all hover:scale-105 shadow-xl text-white"
                >
                  RE-ROLL
                </button>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full max-w-7xl px-4 py-8 sm:py-12 flex flex-col items-center text-white/20 text-[7px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase text-center border-t border-white/5 mt-10">
        <p>© 2026 VIRGINCHECKER // CRYPTO DYSTOPIA PROTOCOL // PARODY ONLY</p>
      </footer>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default App;
