
import React from 'react';

export const COLORS = {
  primary: '#050a1f',
  accent: '#CBFF00',
  white: '#FFFFFF',
};

export const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Logo = () => (
  <div className="flex items-center gap-2 group cursor-default">
    <div className="bg-[#CBFF00] text-[#050a1f] font-black px-3 py-1 rounded-sm text-xl italic skew-x-[-12deg] group-hover:skew-x-[12deg] transition-transform duration-300">
      VIRGIN
    </div>
    <div className="border-2 border-[#CBFF00] px-3 py-1 rounded-sm text-[#CBFF00] font-bold text-xl uppercase tracking-tighter skew-x-[-12deg] group-hover:skew-x-[12deg] transition-transform duration-300">
      CHECKER
    </div>
  </div>
);
