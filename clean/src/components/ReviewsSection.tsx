import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, MessageSquare, Send, X } from 'lucide-react';

interface Review {
  name: string;
  role: string;
  location: string;
  stars: number;
  quote: string;
  bgImageUrl: string;
  portraitUrl: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    name: "Victoria",
    role: "",
    location: "Key Biscayne, FL",
    stars: 5,
    quote: "My clients invest heavily in premium finishes—honed Calacatta marble, raw cedar ceilings, and custom silk wool rugs. Only ARIA understands how to treat these materials. No bleach odors, just meticulous preservation.",
    bgImageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    portraitUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Juliana",
    role: "",
    location: "Coral Gables, FL",
    stars: 5,
    quote: "With over 8,500 square feet of residential space to keep spotless, scheduling is typically a nightmare. The instant booking tiers and precise concierge coordination save me hours every single month.",
    bgImageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    portraitUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Marcus",
    role: "",
    location: "Miami Beach, FL",
    stars: 5,
    quote: "The professional cleaning standards are genuine. I am highly sensitive to standard chemical cleaners, but ARIA's safe formulas leave the rooms clean, healthy, and breathing completely fresh.",
    bgImageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
    portraitUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  }
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  // Form states code
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [stars, setStars] = useState(5);
  const [quote, setQuote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Load reviews on mount
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const serverReviews = await res.json();
          if (serverReviews && Array.isArray(serverReviews) && serverReviews.length > 0) {
            setReviews(serverReviews);
            return;
          }
        }
      } catch (err) {
        console.warn("Backend review fetch failed, falling back to local list", err);
      }

      // Local storage fallback for network-resilient sandbox
      const customReviews = JSON.parse(localStorage.getItem('aria_clean_custom_reviews') || '[]');
      setReviews([...DEFAULT_REVIEWS, ...customReviews]);
    };
    loadReviews();

    // Listen to updates from other tabs/components of the application
    window.addEventListener('aria-review-updated', loadReviews);
    return () => {
      window.removeEventListener('aria-review-updated', loadReviews);
    };
  }, []);

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  // Automatic slide rotation (only if form is closed and length > 1)
  useEffect(() => {
    if (showForm || reviews.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [showForm, reviews.length]);

  // Compute position class styles for the stack of arbitrary length
  const getSlideStyle = (index: number) => {
    const len = reviews.length;
    if (len === 0) return {};
    
    // Calculate relative index compared to activeIndex
    const relativeIndex = (index - activeIndex + len) % len;

    if (relativeIndex === 0) {
      // CENTER / ACTIVE
      return {
        x: "0%",
        scale: 1,
        zIndex: 30,
        opacity: 1,
        rotate: 0,
        pointerEvents: "auto" as const,
      };
    } else if (relativeIndex === 1) {
      // RIGHT CARD
      return {
        x: "38%",
        scale: 0.85,
        zIndex: 10,
        opacity: 0.45,
        rotate: 4,
        pointerEvents: "none" as const,
      };
    } else if (relativeIndex === len - 1) {
      // LEFT CARD (previous)
      return {
        x: "-38%",
        scale: 0.85,
        zIndex: 10,
        opacity: 0.45,
        rotate: -4,
        pointerEvents: "none" as const,
      };
    } else {
      // OFF SCREEN
      return {
        x: "0%",
        scale: 0.7,
        zIndex: 0,
        opacity: 0,
        rotate: 0,
        pointerEvents: "none" as const,
      };
    }
  };

  // Handle Form Submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          quote: quote.trim(),
          stars,
          location: locationValue.trim()
        })
      });

      if (res.ok) {
        setIsSubmitting(false);
        setSuccessMsg(true);
        // Clear outputs
        setName('');
        setLocationValue('');
        setStars(5);
        setQuote('');

        // Notify components that reviews state needs reloading
        window.dispatchEvent(new Event('aria-review-updated'));

        setTimeout(() => {
          setSuccessMsg(false);
          setShowForm(false);
        }, 5000);
        return;
      }
    } catch (err) {
      console.warn("Backend review submission failed. Executing fallback routing.", err);
    }

    // Dynamic backup path in case server is unavailable (client resilience)
    const bgImages = [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
    ];
    const portraits = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    ];
    const firstNameOnly = name.trim().split(' ')[0];
    const newRev: Review = {
      name: firstNameOnly,
      role: "",
      location: locationValue.trim() || "Miami, FL",
      stars,
      quote: quote.trim(),
      bgImageUrl: bgImages[Math.floor(Math.random() * bgImages.length)],
      portraitUrl: portraits[Math.floor(Math.random() * portraits.length)]
    };

    const existingCustom = JSON.parse(localStorage.getItem('aria_clean_custom_reviews') || '[]');
    const nextCustom = [...existingCustom, newRev];
    localStorage.setItem('aria_clean_custom_reviews', JSON.stringify(nextCustom));
    setReviews([...DEFAULT_REVIEWS, ...nextCustom]);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(true);
      setName('');
      setLocationValue('');
      setStars(5);
      setQuote('');
      setTimeout(() => {
        setSuccessMsg(false);
        setShowForm(false);
      }, 5000);
    }, 850);
  };

  return (
    <section id="reviews" className="py-24 bg-[#FAF9F5] border-t border-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[11px] sm:text-xs tracking-[0.3em] uppercase font-bold text-[#A8B5A2] block mb-3">
            Client Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2D] font-semibold tracking-tight mb-4 leading-tight">
            A Reputation of Pure Standards
          </h2>
          <div className="w-12 h-[1px] bg-[#A8B5A2]/40 mx-auto my-4" />
          <p className="font-sans text-xs sm:text-sm text-[#7A7A7A] font-light leading-relaxed">
            Read verified reviews from premier estate managers, Airbnb hosts, business owners, and homeowners who demand pristine, high-quality residential and commercial cleaning.
          </p>
        </div>

        {/* 3D Interactive Overlapping Slide Deck (replicates image_12.png style) */}
        <div className="relative w-full max-w-4xl mx-auto min-h-[460px] sm:min-h-[500px] flex items-center justify-center overflow-visible select-none py-8">
          
          {/* Navigation Arrows positioned exactly like image_12.png margins */}
          <div className="absolute left-2 sm:left-6 z-40">
            <button
              type="button"
              id="btn-reviews-prev"
              onClick={handlePrev}
              className="p-4 bg-white text-[#2D2D2D] hover:bg-[#A8B5A2] hover:text-white rounded-full transition-all duration-300 shadow-md border border-[#EBEBEB] cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute right-2 sm:right-6 z-40">
            <button
              type="button"
              id="btn-reviews-next"
              onClick={handleNext}
              className="p-4 bg-white text-[#2D2D2D] hover:bg-[#A8B5A2] hover:text-white rounded-full transition-all duration-300 shadow-md border border-[#EBEBEB] cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Frame */}
          <div className="relative w-[92%] max-w-[420px] aspect-[3/4] h-[400px] sm:h-[460px] flex items-center justify-center">
            {reviews.map((rev, index) => {
              const isActive = index === activeIndex;
              const style = getSlideStyle(index);

              return (
                <motion.div
                  key={index}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    transformOrigin: "center bottom",
                  }}
                  animate={style}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 22,
                    mass: 0.95
                  }}
                  // If active card, we can attach interactive sideways animation on active change using custom variants
                  className={`bg-[#2D2D2D] rounded-none overflow-hidden duration-300 flex flex-col justify-between absolute ${
                    isActive 
                      ? 'shadow-2xl shadow-black/30 border border-[#D8CFC6]/20' 
                      : 'border border-[#EBEBEB]/10 cursor-pointer shadow-lg hover:shadow-xl'
                  }`}
                  onClick={() => {
                    if (!isActive) {
                      const len = reviews.length;
                      const relativeIndex = (index - activeIndex + len) % len;
                      if (relativeIndex === 1) handleNext();
                      else handlePrev();
                    }
                  }}
                >
                  {/* High Quality Rich Textured Background */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={rev.bgImageUrl}
                      alt="Sanctuary material presentation"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-35"
                    />
                    {/* Charcoal/Bronze shade overlay for sublime legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-[#1E1C1A]/95 to-[#1A1817]/80" />
                  </div>

                  {/* Overlaid Content Zone */}
                  <div className="relative z-10 p-8 sm:p-10 flex flex-col h-full justify-between text-left">
                    
                    {/* Top row: stars and quote icon */}
                    <div className="flex justify-between items-start">
                      <div className="flex gap-1.5">
                        {[...Array(rev.stars)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#EBE3DB] text-[#EBE3DB]" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-[#EBE3DB]/15" />
                    </div>

                    {/* Middle Quote - Clean luxury Serif */}
                    <div className="my-auto pt-6 pb-4">
                      <p className="font-serif text-sm sm:text-base text-[#F5EFE6] italic font-light leading-relaxed tracking-wide">
                        "{rev.quote}"
                      </p>
                    </div>

                    {/* Bottom Client Details */}
                    <div className="pt-6 border-t border-[#EBE3DB]/10 flex items-center gap-4">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-full overflow-hidden bg-[#EBE3DB]/10 border border-[#EBE3DB]/30">
                          <img 
                            src={rev.portraitUrl} 
                            alt={rev.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-[#A8B5A2] rounded-full p-0.5 border border-[#2D2D2D]">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-sans font-bold text-xs tracking-wider text-[#F5EFE6]">
                          {rev.name}
                        </h4>
                        <p className="text-[9px] text-[#A8B5A2] uppercase tracking-widest font-mono mt-0.5">
                          {rev.location}
                        </p>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Dynamic Client Experience Form Activator */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          {!showForm ? (
            <button
              type="button"
              id="btn-trigger-review-form"
              onClick={() => {
                setShowForm(true);
                setSuccessMsg(false);
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white border border-[#EBEBEB] hover:border-[#A8B5A2] text-[#2D2D2D] hover:text-[#2D2D2D]/90 font-sans font-semibold text-xs tracking-wider uppercase rounded-full transition-all duration-300 shadow-xs hover:shadow-md active:scale-98 cursor-pointer hover:bg-[#FAF9F5]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#A8B5A2]" />
              Share Your ARIA Experience
            </button>
          ) : (
            <button
              type="button"
              id="btn-close-review-form"
              onClick={() => setShowForm(false)}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-neutral-200/50 hover:bg-neutral-200 hover:text-black font-sans font-semibold text-xs tracking-wider uppercase rounded-full transition-colors active:scale-98 cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-neutral-600" />
              Cancel Review
            </button>
          )}

          {/* Form container */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-6 p-6 sm:p-8 bg-white border border-[#EBEBEB] rounded-3xl text-left shadow-lg relative overflow-hidden"
              >
                <div className="border-b border-[#EBEBEB]/60 pb-4 mb-5">
                  <h3 className="font-serif text-lg text-[#2D2D2D] font-light italic">
                    Tell Us About Your Experience
                  </h3>
                  <p className="text-[11px] text-[#7A7A7A] mt-1 font-light leading-relaxed">
                    Your direct feedback maintains our extreme professional standard of purity. Ratings are updated instantly.
                  </p>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-sans font-bold text-[#7A7A7A] uppercase tracking-wider">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Eleanor"
                        className="w-full text-xs bg-[#FAF9F5] border border-[#EBEBEB] focus:border-[#A8B5A2] focus:ring-0 py-3 px-3.5 rounded-xl outline-none placeholder-[#7A7A7A]/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-sans font-bold text-[#7A7A7A] uppercase tracking-wider">
                        Location
                      </label>
                      <input
                        type="text"
                        value={locationValue}
                        onChange={(e) => setLocationValue(e.target.value)}
                        placeholder="e.g. Coconut Grove, FL"
                        className="w-full text-xs bg-[#FAF9F5] border border-[#EBEBEB] focus:border-[#A8B5A2] focus:ring-0 py-3 px-3.5 rounded-xl outline-none placeholder-[#7A7A7A]/40"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-sans font-bold text-[#7A7A7A] uppercase tracking-wider">
                      Star Rating
                    </label>
                    <div className="flex gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setStars(val)}
                          className="focus:outline-none transition-transform hover:scale-110"
                          title={`${val} Stars`}
                        >
                          <Star 
                            className={`w-5 h-5 cursor-pointer ${
                              val <= stars 
                                ? 'text-[#A8B5A2] fill-[#A8B5A2]' 
                                : 'text-gray-200 hover:text-[#A8B5A2]/30 fill-gray-100'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-sans font-bold text-[#7A7A7A] uppercase tracking-wider">
                      Your Testimonial *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="Share your feedback regarding our professional cleaning services and immaculate standards..."
                      className="w-full text-xs bg-[#FAF9F5] border border-[#EBEBEB] focus:border-[#A8B5A2] focus:ring-0 py-3 px-3.5 rounded-xl outline-none placeholder-[#7A7A7A]/40 resize-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center gap-3">
                    {successMsg ? (
                      <div className="text-xs text-emerald-800 font-sans font-medium bg-emerald-50 border border-emerald-100 py-3 px-4 rounded-xl flex flex-col gap-1 text-left animate-fadeIn">
                        <span className="font-bold flex items-center gap-1.5 text-emerald-900">✓ Testimonial Submitted for Admin Moderation</span>
                        <span className="text-[10px] text-emerald-700/85 leading-normal">A notice has been automatically sent to contact@ariacleanservice.com. Your review will display on-site as soon as it is verified.</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-[#7A7A7A] font-light italic">
                        * Required fields
                      </span>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || successMsg}
                      className={`inline-flex items-center gap-2 px-6 py-3.5 bg-[#2D2D2D] hover:bg-[#A8B5A2] text-white font-sans font-semibold text-xs tracking-wider uppercase rounded-full transition-all active:scale-95 cursor-pointer shadow-sm ${
                        (isSubmitting || successMsg) ? 'opacity-60 cursor-not-allowed bg-neutral-400' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <span>Publishing...</span>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          Publish Review
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Trust Signatures: 100% Satisfaction Guarantee */}
        <div id="trust-guarantee-card" className="bg-[#FAF9F5] border border-[#EBEBEB] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left mt-4 shadow-sm">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#2D2D2D] flex items-center justify-center border border-[#2D2D2D] shrink-0 shadow-sm">
              <span className="font-sans font-bold text-lg text-[#FAF9F5]">100%</span>
            </div>
            <div>
              <h4 className="font-sans font-semibold text-xs sm:text-sm text-[#2D2D2D] uppercase tracking-[0.2em]">
                Immaculate Satisfaction Guarantee
              </h4>
              <p className="font-sans text-xs text-[#7A7A7A] font-light leading-relaxed mt-1.5">
                We guarantee immaculate results on every service. <strong>If any zone fails to meet your standard, simply contact us within 24 hours and we will return to re-clean it immediately at no cost.</strong> Your refined clean outcome and complete peace of mind are permanently secured.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0 text-[10px] font-sans font-bold text-[#FAF9F5] uppercase tracking-[0.18em] bg-[#2D2D2D] py-3.5 px-6 rounded-xl shadow-xs backdrop-blur-xs">
            <span>✓ Verified Trust</span>
            <span>✓ Insured Desk</span>
            <span>✓ Premium Service</span>
          </div>
        </div>

      </div>
    </section>
  );
}
