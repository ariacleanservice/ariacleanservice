import { Mail, Clock, ShieldCheck, Heart, Phone } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onPageChange?: (page: 'book' | 'portfolio' | 'privacy' | 'terms' | '404') => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  return (
    <footer id="contact-footer" className="bg-[#FAF9F5] border-t border-[#EBEBEB] pt-16 pb-12 w-full">
      <div className="max-w-7xl mx-auto px-6">
        
       

        {/* Brand details, Contact block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12">
          {/* Brand Presentation */}
          <div className="md:col-span-5 flex flex-col items-start space-y-4">
            <div 
              onClick={() => {
                if (onPageChange) {
                  onPageChange('book');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="cursor-pointer group text-left"
            >
              <Logo variant="horizontal" iconSize="w-18 h-18" />
            </div>
            <p className="font-sans text-xs text-[#7A7A7A] leading-relaxed font-light text-left max-w-sm">
              Providing impeccably clean residential, commercial, and Airbnb properties in Miami using safe, non-toxic formulations, rigorous professional vetting, and modern digital reservation experiences.
            </p>
          </div>

          {/* Clean Contact block (Contact Information) */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="font-sans font-bold text-[10px] tracking-[0.25em] uppercase text-[#2D2D2D]">
              Contact Us
            </h4>
            <div className="space-y-3 font-sans text-xs text-[#7A7A7A]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#2D2D2D]" />
                <a href="tel:3059005345" className="hover:text-black transition-colors underline underline-offset-4 decoration-[#EBEBEB]">
                  (305) 900-5345
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#2D2D2D]" />
                <a href="mailto:contact@ariacleanservice.com" className="hover:text-black transition-colors underline underline-offset-4 decoration-[#EBEBEB]">
                  contact@ariacleanservice.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#A8B5A2]" />
                <span>
                  Support Hours: 8:00 AM – 6:00 PM (EST)
                </span>
              </div>
            </div>
          </div>

          {/* Service Hours */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="font-sans font-bold text-[10px] tracking-[0.25em] uppercase text-[#2D2D2D]">
              Service Hours
            </h4>
            <div className="space-y-2 font-sans text-xs text-[#7A7A7A]">
              <div className="flex justify-between border-b border-[#EBEBEB] pb-1.5">
                <span>Monday – Friday:</span>
                <span className="font-semibold text-[#2D2D2D]">7:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-[#EBEBEB] pb-1.5">
                <span>Saturday:</span>
                <span className="font-semibold text-[#2D2D2D]">8:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold text-[#2D2D2D]">8:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL FOOTER */}
        <div className="border-t border-[#EBEBEB] pt-[40px] flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-sans text-[#7A7A7A] text-center md:text-left">
          <p className="font-medium text-[#2D2D2D]/80">
            © 2026 Aria Clean Service. All rights reserved. To Paz Asset Holdings LLC.
          </p>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-6 text-[10px] tracking-[0.12em] uppercase font-bold text-[#7A7A7A]">
            <span 
              onClick={() => {
                if (onPageChange) {
                  onPageChange('privacy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }} 
              className="hover:text-[#2D2D2D] cursor-pointer transition-colors min-h-[44px] flex items-center px-1"
            >
              Privacy Policy
            </span>
            <span 
              onClick={() => {
                if (onPageChange) {
                  onPageChange('terms');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }} 
              className="hover:text-[#2D2D2D] cursor-pointer transition-colors min-h-[44px] flex items-center px-1"
            >
              Terms of Service
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
