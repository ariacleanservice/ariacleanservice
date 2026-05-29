import { useState, useEffect, useRef, ChangeEvent, MouseEvent, CSSProperties } from 'react';
import { Check, Star, RefreshCw, Camera, Upload, Lock, Unlock, ShieldAlert, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import luxuryCleanInterior from '../assets/images/luxury_mop_bathroom_isometric_1779810900581.png';
// @ts-ignore
import ildaFounderImg from '../assets/images/ilda.PNG';
// @ts-ignore
import bathroomImg from '../assets/images/bathroom.JPG';
// @ts-ignore
import bed3Img from '../assets/images/bed3.JPG';

interface HeroProps {
  onCalculateClick: () => void;
}

export default function Hero({ onCalculateClick }: HeroProps) {
  const [reviewStats, setReviewStats] = useState({ rating: 4.9, count: 2428 });
  const [founderPhoto, setFounderPhoto] = useState<string>(ildaFounderImg);
  const [heroBanner, setHeroBanner] = useState<string>(luxuryCleanInterior);
  const [categoryName, setCategoryName] = useState('Elite Residential, Airbnb & Commercial Cleaning');
  const [masterTitle, setMasterTitle] = useState('Immaculate Spaces, Spotless Perfection.');
  const [mutedDescription, setMutedDescription] = useState('Experience premium residential, short-term Airbnb rental, and commercial cleaning at its absolute finest. Aria Clean Service delivers meticulous deep cleaning, detailed turnovers, and professional office and store care in Miami, combining elite professional sanitization with safe, refreshing comfort.');

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const slideshowImages = [
    {
      url: heroBanner,
      caption: "Spotless Modern Residence",
      role: "Living Room Sanctuary"
    },
    {
      url: bathroomImg,
      caption: "High-Definition Sanitization",
      role: "Immaculate Bathroom Luxury"
    },
    {
      url: bed3Img,
      caption: "Restorative Dust & Linen Detailing", 
      role: "Pristine Luxury Chamber"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 15000); // 15 seconds
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const handleNextImage = (e: MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % slideshowImages.length);
  };

  const handlePrevImage = (e: MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  useEffect(() => {
    const loadPhoto = () => {
      const stored = localStorage.getItem('aria_ilda_custom_photo');
      if (stored) {
        setFounderPhoto(stored);
      } else {
        setFounderPhoto(ildaFounderImg);
      }
    };

    const loadHeroBanner = () => {
      const storedBanner = localStorage.getItem('aria_hero_custom_banner');
      if (storedBanner) {
        setHeroBanner(storedBanner);
      } else {
        setHeroBanner(luxuryCleanInterior);
      }
    };

    const loadSiteText = () => {
      setCategoryName(localStorage.getItem('aria_hero_category') || 'Elite Residential, Airbnb & Commercial Cleaning');
      setMasterTitle(localStorage.getItem('aria_hero_title') || 'Immaculate Spaces, Spotless Perfection.');
      setMutedDescription(localStorage.getItem('aria_hero_description') || 'Experience premium residential, short-term Airbnb rental, and commercial cleaning at its absolute finest. Aria Clean Service delivers meticulous deep cleaning, detailed turnovers, and professional office and store care in Miami, combining elite professional sanitization with safe, refreshing comfort.');
    };

    loadPhoto();
    loadHeroBanner();
    loadSiteText();

    // Sync across tabs, sections, and events
    window.addEventListener('ilda-photo-updated', loadPhoto);
    window.addEventListener('hero-banner-updated', loadHeroBanner);
    window.addEventListener('aria-site-text-updated', loadSiteText);
    return () => {
      window.removeEventListener('ilda-photo-updated', loadPhoto);
      window.removeEventListener('hero-banner-updated', loadHeroBanner);
      window.removeEventListener('aria-site-text-updated', loadSiteText);
    };
  }, []);

  useEffect(() => {
    const loadStats = () => {
      const custom = JSON.parse(localStorage.getItem('aria_clean_custom_reviews') || '[]');
      const baseCount = 2428;
      const baseSum = 11897.2;
      const totalCount = baseCount + custom.length;
      const totalSum = baseSum + custom.reduce((acc: number, r: any) => acc + (r.stars || 5), 0);
      const avgRating = totalCount > 0 ? (totalSum / totalCount) : 4.9;
      
      setReviewStats({
        rating: parseFloat(avgRating.toFixed(1)),
        count: totalCount
      });
    };

    loadStats();
    
    // Custom event listener for instant updates
    window.addEventListener('aria-review-updated', loadStats);
    window.addEventListener('storage', loadStats);
    return () => {
      window.removeEventListener('aria-review-updated', loadStats);
      window.removeEventListener('storage', loadStats);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden border-b border-[#EBEBEB] bg-[#FAF9F5]">
      
      {/* Split container - stacks on mobile, split on large viewports */}
      <div className="w-full flex flex-col lg:flex-row items-stretch min-h-0">
        
        {/* Left half: Clean light muted gray/beige background (bg-[#F5F4F0]) */}
        <div className="w-full lg:w-[55%] xl:w-[50%] bg-[#F5F4F0] px-4 sm:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24 flex flex-col justify-center text-left">
          
          {/* Category pre-header */}
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#A8B5A2] block mb-3">
            {categoryName}
          </span>
          
          {/* Master title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2D2D2D] font-light leading-[1.15] tracking-tight mb-6">
            {masterTitle}
          </h1>
          
          {/* Muted description */}
          <p className="font-sans text-xs sm:text-sm text-[#7A7A7A] font-light leading-relaxed max-w-xl mb-8">
            {mutedDescription}
          </p>
          
          {/* Crucial CTA links to contact and calculator anchors */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start justify-start mb-10">
            <button
              onClick={() => {
                const el = document.getElementById('aria-contact-section-anchor');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="font-sans text-[11px] tracking-[0.22em] uppercase font-bold bg-[#FAF9F5] hover:bg-[#EAECE8] text-[#2D2D2D] border border-[#2D2D2D]/30 hover:border-[#2D2D2D]/85 px-8 py-4.5 rounded-xl transition-all duration-300 shadow-xs cursor-pointer active:translate-y-[1px] outline outline-1 outline-offset-[3px] outline-transparent hover:outline-[#2D2D2D]/20 text-center"
            >
              CONTACT US
            </button>
            <button
              onClick={onCalculateClick}
              className="font-sans text-[11px] tracking-[0.22em] uppercase font-bold bg-[#2D2D2D] hover:bg-[#404040]/90 text-white px-8 py-4.5 rounded-xl transition-all duration-300 shadow-xs cursor-pointer active:translate-y-[1px] outline outline-1 outline-offset-[3px] outline-[#2D2D2D]/60 hover:outline-[#2D2D2D] text-center"
            >
              SEE OUR SERVICES
            </button>
          </div>

          {/* Compact Bento grid holding trust elements */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Creator Profile Box (Ilda) */}
            <div className="md:col-span-2 bg-[#ffffff] rounded-[16px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row gap-6 items-center max-w-[600px] border border-[#e5e7eb] text-left w-full">
              
              <div className="w-[120px] h-[120px] rounded-[12px] overflow-hidden shrink-0 border border-[#d1d5db] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <img 
                  src={founderPhoto} 
                  alt="Ilda - Founder & Principal Director" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-[24px] text-[#111827] m-0 font-semibold leading-tight">Ilda</h2>
                <p className="font-sans italic text-[14px] text-[#4b5563] m-0">Founder & Principal Director of Clean Operations</p>
                <p className="font-sans text-[14px] text-[#6b7280] mt-2 leading-[1.5]">Leading our team to deliver premium, high-definition cleaning spaces with an absolute focus on luxury, detail, and effortless calm.</p>
              </div>

            </div>

            {/* Client Trust Card */}
            <div className="bg-white border border-[#EBEBEB] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 text-left relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#7A7A7A] block">
                    CLIENT TRUST
                  </span>
                  <div className="flex items-center gap-1.5 mt-1.5 font-sans">
                    <span id="hero-trust-rating" className="font-sans text-xl font-bold text-[#2D2D2D] tracking-tight">{reviewStats.rating}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={`w-3 h-3 ${s <= Math.round(reviewStats.rating) ? 'text-[#A8B5A2] fill-[#A8B5A2]' : 'text-gray-200 fill-gray-200'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => {
                    const custom = JSON.parse(localStorage.getItem('aria_clean_custom_reviews') || '[]');
                    const baseCount = 2428;
                    const baseSum = 11897.2;
                    const totalCount = baseCount + custom.length;
                    const totalSum = baseSum + custom.reduce((acc: number, r: any) => acc + (r.stars || 5), 0);
                    const avgRating = totalSum / totalCount;
                    setReviewStats({
                      rating: parseFloat(avgRating.toFixed(1)),
                      count: totalCount
                    });
                  }}
                  className="w-6 h-6 rounded-full border border-[#EBEBEB] flex items-center justify-center text-[#7A7A7A]/80 bg-[#FAF9F5] shadow-xs cursor-pointer hover:bg-white active:scale-95 transition-all text-center"
                  title="Force Sync Reviews"
                >
                  <RefreshCw className="w-2.5 h-2.5 hover:rotate-180 transition-transform duration-500" />
                </div>
              </div>
              
              <p className="font-sans text-[10.5px] text-[#7A7A7A] leading-relaxed mt-3 font-light">
                Rated <strong className="text-[#2D2D2D] font-bold">"Exemplary Status"</strong> based on residential, commercial, and short-term Airbnb cleaning services in Miami.
              </p>
            </div>

            {/* Our Assurances Card */}
            <div className="bg-white/40 border border-[#EBEBEB] rounded-2xl p-5 text-left flex flex-col justify-between min-h-[140px] shadow-xs">
              <div>
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#7A7A7A] block mb-2">
                  OUR ASSURANCES
                </span>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#A8B5A2] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-2 h-2" />
                    </div>
                    <span className="font-sans text-[10.5px] text-[#2D2D2D] font-medium leading-normal">
                      Bespoke Clean Checklist & Proof
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#A8B5A2] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-2 h-2" />
                    </div>
                    <span className="font-sans text-[10.5px] text-[#2D2D2D] font-medium leading-normal">
                      Dedicated Quality Audit Inspections
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[8.5px] uppercase font-mono tracking-widest text-[#7A7A7A] flex items-center gap-1 mt-3 border-t border-[#EBEBEB]/60 pt-2 font-medium">
                <span>✨ ZERO HARSH ADDITIVES, PURE COMFORT.</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right half: Sophisticated, minimalist, and professional luxury interior image carousel with overlapping layers */}
        <div className="w-full lg:w-[45%] xl:w-[50%] relative min-h-[440px] sm:min-h-[540px] lg:min-h-auto bg-[#F5F4F0] flex items-center justify-center overflow-hidden py-16 group/carousel">
          
          {/* Overlapping slide track with premium 3D depth stack */}
          <div className="relative w-[90%] h-[320px] sm:h-[440px] lg:h-[88%] flex items-center justify-center">
            {slideshowImages.map((img, index) => {
              const len = slideshowImages.length;
              // Compute difference wrapping around
              const diff = (index - activeImageIndex + len) % len;
              
              let styleObj: CSSProperties = {};
              let isActive = diff === 0;
              let isPrev = diff === len - 1;
              let isNext = diff === 1;

              if (isActive) {
                // Active Center
                styleObj = {
                  transform: 'translateX(0) scale(1)',
                  opacity: 1,
                  zIndex: 20,
                  width: '74%',
                  height: '100%',
                };
              } else if (isPrev) {
                // Previous (in the back, transparent, shifted left)
                styleObj = {
                  transform: 'translateX(-40%) scale(0.88)',
                  opacity: 0.25,
                  zIndex: 10,
                  width: '74%',
                  height: '92%',
                  filter: 'blur(0.5px)',
                  pointerEvents: 'none'
                };
              } else if (isNext) {
                // Next (to the right, transparent, shifted right)
                styleObj = {
                  transform: 'translateX(40%) scale(0.88)',
                  opacity: 0.35,
                  zIndex: 15,
                  width: '74%',
                  height: '92%',
                  filter: 'blur(0.5px)',
                  pointerEvents: 'none'
                };
              } else {
                // Hidden completely
                styleObj = {
                  transform: 'translateX(0) scale(0.7)',
                  opacity: 0,
                  zIndex: 0,
                  width: '74%',
                  height: '92%',
                  pointerEvents: 'none'
                };
              }

              return (
                <div
                  key={index}
                  style={styleObj}
                  className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out rounded-2xl overflow-hidden shadow-xl border border-[#EBEBEB]/15 cursor-pointer"
                  onClick={() => {
                    if (isPrev) handlePrevImage({ stopPropagation: () => {} } as any);
                    if (isNext) handleNextImage({ stopPropagation: () => {} } as any);
                  }}
                >
                  <img 
                    src={img.url} 
                    alt={img.caption} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                  />
                  
                  {/* Subtle warm luxury gradient and caption display */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/95 via-transparent to-transparent pointer-events-none transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-40'}`} />
                  
                  {isActive && (
                    <div className="absolute bottom-6 left-6 right-6 z-10 text-left animate-fadeIn">
                      <span className="font-sans text-[8.5px] tracking-[0.2em] uppercase font-bold text-[#A8B5A2] block mb-1">
                        {img.role}
                      </span>
                      <h3 className="font-serif text-sm sm:text-base text-white font-light tracking-wide">
                        {img.caption}
                      </h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Left Arrow (Glass / Transparent style) - Styled like a premium control */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/85 hover:bg-white/25 hover:text-white transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Right Arrow (Glass / Transparent style) - Styled like a premium control */}
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/85 hover:bg-white/25 hover:text-white transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Progress Indicators/Dots on the Bottom Right */}
          <div className="absolute bottom-8 right-8 z-30 flex gap-2">
            {slideshowImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(i);
                }}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeImageIndex 
                    ? 'w-6 bg-[#A8B5A2]' 
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
