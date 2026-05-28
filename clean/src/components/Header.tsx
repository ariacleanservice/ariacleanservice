import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface HeaderProps {
  currentPage: 'book' | 'portfolio' | 'privacy' | 'terms' | '404';
  onPageChange: (page: 'book' | 'portfolio' | 'privacy' | 'terms' | '404') => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileLinkClick = (page: 'book' | 'portfolio' | 'privacy' | 'terms' | '404') => {
    setIsMobileMenuOpen(false);
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#E8EEFA] border-b border-[#B9C9E3]/70 shadow-sm transition-all duration-300"
    >
      <div className="max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-24 flex items-center justify-between relative z-50">
        {/* Top-Left: Compact, elegant header brand group always visible */}
        <div 
          onClick={() => {
            setIsMobileMenuOpen(false);
            onPageChange('book');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center cursor-pointer group transition-all duration-300 min-h-[48px]"
          id="hdr-owner-logo"
        >
          <Logo variant="horizontal" iconSize="w-20 h-20" />
        </div>

        {/* Desktop Navigation Link row */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          <button
            onClick={() => {
              onPageChange('book');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 font-bold relative py-3 cursor-pointer min-h-[48px] px-2 flex items-center ${
              currentPage === 'book'
                ? 'text-[#2D2D2D]'
                : 'text-[#7A7A7A] hover:text-[#2D2D2D]'
            }`}
          >
            BOOK NOW
            {currentPage === 'book' && (
              <span className="absolute bottom-1 left-2 right-2 h-[1.5px] bg-[#2D2D2D]" />
            )}
          </button>
          <button
            onClick={() => {
              onPageChange('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 font-bold relative py-3 cursor-pointer min-h-[48px] px-2 flex items-center ${
              currentPage === 'portfolio'
                ? 'text-[#2D2D2D]'
                : 'text-[#7A7A7A] hover:text-[#2D2D2D]'
            }`}
          >
            PORTFOLIO
            {currentPage === 'portfolio' && (
              <span className="absolute bottom-1 left-2 right-2 h-[1.5px] bg-[#2D2D2D]" />
            )}
          </button>

        </nav>

        {/* CTA Buttons / Mobile Triggers Block */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            {/* Added Contact Us button to the left of See Our Services */}
            <button
              onClick={() => {
                onPageChange('book');
                setTimeout(() => {
                  const el = document.getElementById('aria-contact-section-anchor');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className="font-sans text-[10px] tracking-[0.22em] uppercase font-bold bg-[#FAF9F5] hover:bg-[#EAECE8] text-[#2D2D2D] border border-[#2D2D2D]/30 hover:border-[#2D2D2D]/80 px-6 py-4.5 rounded-xl transition-all duration-300 shadow-xs cursor-pointer active:translate-y-[1px] outline outline-1 outline-offset-[3px] outline-transparent hover:outline-[#2D2D2D]/20 min-h-[48px]"
            >
              CONTACT US
            </button>
            <button
              onClick={() => {
                onPageChange('book');
                window.dispatchEvent(new Event('reset-booking-step'));
                setTimeout(() => {
                  const el = document.getElementById('square-footage-calculator-anchor');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className="font-sans text-[10px] tracking-[0.22em] uppercase font-bold bg-[#2D2D2D] hover:bg-[#404040] text-white px-6 py-4.5 rounded-xl transition-all duration-300 shadow-xs cursor-pointer active:translate-y-[1px] outline outline-1 outline-offset-[3px] outline-[#2D2D2D]/60 hover:outline-[#2D2D2D] min-h-[48px]"
            >
              See Our Services
            </button>
          </div>

          {/* Elegant Mobile Hamburger Menu Button - Tap target sized to at least 48px */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-12 h-12 bg-white/65 hover:bg-white text-[#2D2D2D] rounded-xl border border-[#B9C9E3] transition-all cursor-pointer active:scale-95 focus:outline-none"
            aria-label="Toggle navigation menu"
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive mobile menu panel using framer motion to guarantee beautiful, fluid layout scaling */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-24 left-0 right-0 bg-[#E8EEFA] border-b border-[#B9C9E3]/85 shadow-lg md:hidden overflow-hidden z-40"
          >
            <div className="px-6 py-6 pb-8 space-y-4 flex flex-col">
              <button
                onClick={() => handleMobileLinkClick('book')}
                className={`w-full text-left font-sans text-xs tracking-[0.25em] uppercase font-bold py-4 px-4 rounded-xl border transition-all ${
                  currentPage === 'book'
                    ? 'bg-[#2D2D2D] text-white border-transparent'
                    : 'bg-white/45 text-[#7A7A7A] border-[#B9C9E3]/40 hover:bg-white/80 hover:text-[#2D2D2D]'
                }`}
                style={{ minHeight: '48px' }}
              >
                BOOK NOW
              </button>
              <button
                onClick={() => handleMobileLinkClick('portfolio')}
                className={`w-full text-left font-sans text-xs tracking-[0.25em] uppercase font-bold py-4 px-4 rounded-xl border transition-all ${
                  currentPage === 'portfolio'
                    ? 'bg-[#2D2D2D] text-white border-transparent'
                    : 'bg-white/45 text-[#7A7A7A] border-[#B9C9E3]/40 hover:bg-white/80 hover:text-[#2D2D2D]'
                }`}
                style={{ minHeight: '48px' }}
              >
                PORTFOLIO
              </button>


              {/* Mobile primary CTA buttons styled compactly */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onPageChange('book');
                    setTimeout(() => {
                      const el = document.getElementById('aria-contact-section-anchor');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 150);
                  }}
                  className="w-full font-sans text-[11px] tracking-[0.2em] uppercase font-bold bg-white text-[#2D2D2D] border border-[#2D2D2D]/20 py-4 rounded-xl text-center shadow-xs cursor-pointer hover:bg-white/80 transition-all"
                  style={{ minHeight: '48px' }}
                >
                  CONTACT US
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onPageChange('book');
                    window.dispatchEvent(new Event('reset-booking-step'));
                    setTimeout(() => {
                      const el = document.getElementById('square-footage-calculator-anchor');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 150);
                  }}
                  className="w-full font-sans text-[11px] tracking-[0.2em] uppercase font-bold bg-[#A8B5A2] text-white py-4 rounded-xl text-center shadow-sm cursor-pointer hover:bg-[#96A490] transition-colors"
                  style={{ minHeight: '48px' }}
                >
                  SERVICES
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
