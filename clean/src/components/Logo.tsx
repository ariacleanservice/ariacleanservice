import React from 'react';

interface LogoProps {
  variant?: 'full' | 'horizontal' | 'icon';
  className?: string;
  iconSize?: string;
}

export default function Logo({ variant = 'full', className = '', iconSize = 'w-20 h-20' }: LogoProps) {
  // SVG Monogram component
  const Monogram = (
    <svg
      viewBox="0 0 200 180"
      className="w-full h-full text-[#0A2239]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Top Cap Serif of the A */}
      <path
        d="M 86,35 
           H 114 
           V 33.5 
           H 86 
           Z"
        fill="currentColor"
      />

      {/* Main Right Leg (Thick classic vertical serif column with bracketed feet) */}
      <path
        d="M 106,35 
           L 145,135 
           Q 146,145 158,145 
           H 112 
           Q 124,145 125,135 
           L 100,50 
           L 106,35 
           Z"
        fill="currentColor"
      />
      
      {/* Main Left Leg (Slender class calligraphic stroke with smaller bracketed feet) */}
      <path
        d="M 94,35 
           L 100,35 
           L 62,135 
           Q 64,145 72,145 
           H 44 
           Q 52,145 53,135 
           L 94,35 
           Z"
        fill="currentColor"
      />

      {/* Elegant smooth swooshing wave in light slate silver/gray crossing as the crossbar */}
      <path
        d="M 30,154 
           C 45,134 72,118 106,118 
           C 134,118 152,123 162,127 
           C 142,121 122,113 104,113 
           C 70,113 46,131 30,154 
           Z"
        fill="#7A8F9E"
      />

      {/* Sparkling 4-pointed Stars (silver/gray) carefully positioned on the right */}
      {/* Top Larger Star - taller than wide */}
      <path
        d="M 150,61 
           Q 150,76 163,76 
           Q 150,76 150,91 
           Q 150,76 137,76 
           Q 150,76 150,61 
           Z"
        fill="#7A8F9E"
      />
      {/* Bottom Smaller Star - matching geometry */}
      <path
        d="M 168,96 
           Q 168,104 175,104 
           Q 168,104 168,112 
           Q 168,104 161,104 
           Q 168,104 168,96 
           Z"
        fill="#7A8F9E"
      />
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`${iconSize} shrink-0 flex items-center justify-center bg-transparent ${className}`}>
        {Monogram}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className={`${iconSize} shrink-0 flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform duration-500`}>
          {Monogram}
        </div>
        
        {/* Horizontal text lockup - custom matching typography requested */}
        <div className="flex flex-col text-left select-none">
          <h1 className="font-serif text-2xl tracking-[0.04em] font-medium text-[#0C2340] leading-tight">
            Aria
          </h1>
          <span className="font-serif text-xs tracking-[0.08em] font-light text-[#0C2340] leading-none mt-1">
            Clean Service
          </span>
        </div>
      </div>
    );
  }

  // Full stacked sophisticated brand mark
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Central big icon */}
      <div className={`${iconSize} shrink-0 flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform duration-500 mb-2`}>
        {Monogram}
      </div>

      {/* Text group */}
      <div className="flex flex-col items-center">
        {/* "Aria" in sophisticated serif */}
        <span className="font-serif text-3xl tracking-[0.06em] font-medium text-[#0C2340] leading-none mb-1">
          Aria
        </span>
        
        {/* "Clean Service" with exact same editorial color & serif font */}
        <span className="font-serif text-sm tracking-[0.12em] font-light text-[#0C2340] leading-none uppercase">
          Clean Service
        </span>

        {/* Delicate divider line */}
        <div className="w-10 h-[1px] bg-[#EBEBEB] mt-4" />
      </div>
    </div>
  );
}
