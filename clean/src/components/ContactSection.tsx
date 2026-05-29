import { Phone, Instagram, Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="aria-contact-section-anchor" className="py-20 bg-[#FAF9F5] border-t border-[#EBEBEB] w-full">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Title and Wording intro */}
        <span className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#A8B5A2] block mb-3">
          Instant Contact Access
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2D] font-semibold tracking-tight mb-4">
          Contact Us for Services
        </h2>
        <div className="w-12 h-[1px] bg-[#A8B5A2] mx-auto my-4" />
        <p className="font-sans text-[13px] sm:text-sm text-[#5A5A5A] font-light leading-relaxed max-w-xl mx-auto mb-10">
          Whether you need premium residential cleaning, Airbnb guest turnovers, or commercial office restoration in Miami, we are here to assist. Connect with our dispatch team instantly.
        </p>

        {/* 3 Premium Action Buttons with same color and style as See Our Services */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-6 max-w-2xl mx-auto">
          
          {/* Phone Contact Button */}
          <a
            href="tel:3058765595"
            className="flex-1 flex items-center justify-center gap-3 font-sans text-[10px] tracking-[0.22em] uppercase font-bold bg-[#2D2D2D] hover:bg-[#404040]/90 text-white px-4 rounded-xl transition-all duration-300 shadow-xs cursor-pointer active:translate-y-[1px] outline outline-1 outline-offset-[3px] outline-[#2D2D2D]/60 hover:outline-[#2D2D2D] h-[58px] text-center w-full"
          >
            <Phone className="w-4 h-4 text-[#A8B5A2] shrink-0" />
            <span>Call (305) 876-5595</span>
          </a>

          {/* Instagram Link Button */}
          <a
            href="https://www.instagram.com/ariacleanservice/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 font-sans text-[10px] tracking-[0.22em] uppercase font-bold bg-[#2D2D2D] hover:bg-[#404040]/90 text-white px-4 rounded-xl transition-all duration-300 shadow-xs cursor-pointer active:translate-y-[1px] outline outline-1 outline-offset-[3px] outline-[#2D2D2D]/60 hover:outline-[#2D2D2D] h-[58px] text-center w-full"
          >
            <Instagram className="w-4 h-4 text-[#A8B5A2] shrink-0" />
            <span>@ariacleanservice</span>
          </a>

          {/* Email Support Button */}
          <a
            href="mailto:contact@ariacleanservice.com"
            className="flex-1 flex items-center justify-center gap-3 font-sans text-[10px] tracking-[0.22em] uppercase font-bold bg-[#2D2D2D] hover:bg-[#404040]/90 text-white px-4 rounded-xl transition-all duration-300 shadow-xs cursor-pointer active:translate-y-[1px] outline outline-1 outline-offset-[3px] outline-[#2D2D2D]/60 hover:outline-[#2D2D2D] h-[58px] text-center w-full"
          >
            <Mail className="w-4 h-4 text-[#A8B5A2] shrink-0" />
            <span>Email Support</span>
          </a>

        </div>

      </div>
    </section>
  );
}
