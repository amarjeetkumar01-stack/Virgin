
import React from 'react';

export const COLORS = {
  primary: '#0047FF',
  accent: '#CBFF00',
  white: '#FFFFFF',
};

export const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="bg-white text-[#0047FF] font-black px-3 py-1 rounded-full text-xl italic">
      VIRGIN
    </div>
    <div className="border-2 border-white px-3 py-1 rounded-full text-white font-bold text-xl uppercase tracking-tighter">
      CHECKER
    </div>
  </div>
);
