
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
      await new Promise(r => setTimeout(r, 1500));
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
    <div className="min-h-screen flex flex-col items-center selection:bg-[#CBFF00] selection:text-black">
      {/* Header */}
      <header className="w-full max-w-7xl px-6 py-10 flex justify-center items-center z-10">
        <Logo />
      </header>

      <main className="flex-1 w-full max-w-4xl px-4 py-4 flex flex-col items-center text-center justify-center relative">
        
        {status === 'idle' && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700">
            <h1 className="text-6xl md:text-[8rem] font-black leading-none mb-4 uppercase tracking-tighter italic">
              ARE YOU <br />
              <span className="text-[#CBFF00]">VIRGIN OR NOT?</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold opacity-60 mb-12 max-w-lg">
              The only tool who check you are virgin or not check now.
            </p>

            <form onSubmit={handleCheck} className="w-full max-w-xl relative flex items-center group">
               <div className="absolute inset-y-0 left-0 pl-8 flex items-center pointer-events-none">
                <span className="text-3xl font-black text-[#CBFF00]">@</span>
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full bg-white/10 border-4 border-white rounded-full py-8 pl-16 pr-56 text-3xl font-black placeholder:text-white/20 focus:outline-none focus:border-[#CBFF00] transition-all"
              />
              <button 
                type="submit"
                className="absolute right-4 bg-[#CBFF00] text-[#1A56FF] px-10 py-5 rounded-full font-black text-xl uppercase flex items-center gap-2 hover:bg-white transition-colors shadow-2xl"
              >
                Reveal <ArrowIcon className="w-8 h-8" />
              </button>
            </form>
          </div>
        )}

        {status === 'judging' && (
          <div className="flex flex-col items-center space-y-12 animate-in fade-in duration-300">
            <div className="relative">
                <div className="w-32 h-32 border-[10px] border-white/10 border-t-[#CBFF00] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#CBFF00] rounded-full animate-ping"></div>
                </div>
            </div>
            <h2 className="text-5xl font-black uppercase italic text-[#CBFF00] animate-pulse">ANALYZING DEGEN ENERGY...</h2>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center space-y-8 animate-in zoom-in duration-300">
            <div className="text-[10rem]">💀</div>
            <h2 className="text-5xl font-black uppercase italic">LIQUIDATION ERROR</h2>
            <button 
              onClick={reset}
              className="bg-[#CBFF00] text-[#1A56FF] px-12 py-5 rounded-full font-black text-2xl hover:scale-105 transition-transform uppercase italic"
            >
              TRY AGAIN
            </button>
          </div>
        )}

        {status === 'done' && result && (
          <div className="w-full max-w-2xl flex flex-col space-y-10 animate-in slide-in-from-bottom duration-700">
            
            <div className="flex flex-col items-center">
                <p className="text-xs font-bold opacity-40 uppercase tracking-[0.4em] mb-4">STATUS REVEALED</p>
                <h3 className="text-7xl md:text-9xl font-black text-[#CBFF00] italic uppercase leading-none drop-shadow-2xl">
                    {result.category}
                </h3>
            </div>

            <div className="glass-card rounded-[3rem] p-1 overflow-hidden shadow-2xl relative group">
                <img src={result.memeUrl} alt="Meme" className="w-full h-96 object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-10 text-left">
                    <p className="text-3xl font-black italic leading-tight text-white drop-shadow-lg">
                        {result.roast}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-8 text-[#1A56FF] text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Logo />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">BLOCKCHAIN VERDICT</p>
                <p className="text-3xl md:text-4xl font-black leading-tight italic">
                    "{result.verdict}"
                </p>
            </div>

            <div className="flex gap-4">
                <button 
                  onClick={() => {
                    const text = `I am classified as a Crypto ${result.category} on @VirginChecker! My soul is Rugged. Reveal yours: `;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="flex-[2] bg-white text-[#1A56FF] py-6 rounded-full font-black text-2xl uppercase italic shadow-xl hover:scale-105 transition-transform"
                >
                  FLEX ON X
                </button>
                <button 
                  onClick={reset}
                  className="flex-1 border-4 border-white py-6 rounded-full font-black text-2xl uppercase italic hover:bg-white hover:text-[#1A56FF] transition-all hover:scale-105 shadow-xl"
                >
                  RE-ROLL?
                </button>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full max-w-7xl px-6 py-10 flex flex-col items-center opacity-20 text-[10px] font-black tracking-[0.5em] uppercase">
        <p>© 2026 VIRGINCHECKER • CRYPTO DYSTOPIA • PARODY ONLY</p>
      </footer>
    </div>
  );
};

export default App;
