import { Search, Compass, ArrowRight, Home } from 'lucide-react';

interface NotFoundProps {
  onBackToHome: () => void;
}

export default function NotFound({ onBackToHome }: NotFoundProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center animate-fadeIn flex flex-col items-center justify-center min-h-[60vh]" id="not-found-container">
      
      {/* Decorative clean outline placeholder icon */}
      <div className="w-24 h-24 rounded-full bg-[#FAF9F5] border border-[#EBEBEB] flex items-center justify-center mb-8 shadow-xs relative">
        <Compass className="w-10 h-10 text-[#A8B5A2] stroke-[1.25] animate-spin" style={{ animationDuration: '20s' }} />
        <span className="absolute -top-1 -right-1 bg-[#2D2D2D] text-white text-[9px] font-bold font-sans tracking-widest uppercase px-2 py-0.5 rounded-full border border-white">
          404s
        </span>
      </div>

      <span className="font-sans text-[11px] tracking-[0.3em] uppercase font-bold text-[#A8B5A2] block mb-2">
        STRAY COORDINATES
      </span>
      
      <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#2D2D2D] mb-4 tracking-tight leading-tight">
        Sanctuary Out of Range
      </h1>
      
      <p className="font-sans text-sm text-[#7A7A7A] max-w-md mx-auto mb-10 leading-relaxed font-light">
        The coordinates you are currently exploring are vacant and do not point to any active service page. Let's return you back to the core Aria Clean Service booking system.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onBackToHome}
          className="group flex items-center justify-center gap-2 font-sans text-xs tracking-widest uppercase font-bold bg-[#2D2D2D] hover:bg-[#404040] text-white px-8 py-4.5 rounded-xl transition-all duration-300 shadow-sm cursor-pointer active:translate-y-[1px] min-h-[48px]"
        >
          <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Return To Sanctuary</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="mt-16 pt-8 border-t border-[#EBEBEB] w-full max-w-sm text-center">
        <p className="font-sans text-[10px] text-[#7A7A7A]/75 tracking-wider uppercase">
          Need immediate support or direct assistance?
        </p>
        <p className="font-serif italic text-xs text-[#2D2D2D] mt-1">
          Email us directly: contact@ariacleanservice.com
        </p>
      </div>

    </div>
  );
}
