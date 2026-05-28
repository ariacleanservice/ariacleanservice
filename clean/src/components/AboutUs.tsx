import { useState, useEffect } from 'react';
import { Check, Award, Gem, ShieldCheck } from 'lucide-react';

export default function AboutUs() {
  const [aboutCaliberTitle, setAboutCaliberTitle] = useState("A standard beyond clean. A restoration of space.");
  const [aboutCaliberText, setAboutCaliberText] = useState("We define professional cleaning not as a transactional chore, but as an artisan restoration. By merging advanced clean scheduling, safe non-toxic cleaning products, and highly prioritized professional training, we create spaces—homes, Airbnb properties, and commercial offices—where you can immediately breathe, think, and gather safely.");

  useEffect(() => {
    const loadSiteText = () => {
      setAboutCaliberTitle(localStorage.getItem('aria_about_title') || "A standard beyond clean. A restoration of space.");
      setAboutCaliberText(localStorage.getItem('aria_about_desc') || "We define professional cleaning not as a transactional chore, but as an artisan restoration. By merging advanced clean scheduling, safe non-toxic cleaning products, and highly prioritized professional training, we create spaces—homes, Airbnb properties, and commercial offices—where you can immediately breathe, think, and gather safely.");
    };
    loadSiteText();
    window.addEventListener('aria-site-text-updated', loadSiteText);
    return () => {
      window.removeEventListener('aria-site-text-updated', loadSiteText);
    };
  }, []);

  const values = [
    {
      title: "Safe Cleaning & Care",
      desc: "All chemicals inside standard solvents degrade within hours, yet leave harsh fumes. Our signature formulas neutralize smells using premium-grade, non-toxic processes that are certified completely safe and fully vetted.",
      icon: Gem
    },
    {
      title: "Professional Caliber",
      desc: "We don't send independent gigs. All service agents are direct employees, fully liability-insured, background audited, and trained to clean specialized stones, timbers, and premium fabrics.",
      icon: Award
    },
    {
      title: "Ironclad Trust",
      desc: "We prioritize complete privacy. Digital lockboxes, physical security tracking, and strict non-disclosure compliance protect your personal spaces, Airbnb rentals, and corporate offices.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="about-us" className="py-20 bg-[#FAF9F5] border-t border-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Visual splits layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Block with deep aesthetic pairing */}
          <div className="lg:col-span-5 space-y-6 text-left bg-[#FDFCFB]/50 border border-[#EBEBEB] p-8 sm:p-10 rounded-3xl [min-height:510px] flex flex-col justify-between">
            <div>
              <span className="font-sans text-[11px] tracking-widest uppercase font-bold text-[#A8B5A2] block mb-2">
                The ARIA Caliber
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2D] font-semibold tracking-tight leading-tight mb-4">
                {aboutCaliberTitle}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#7A7A7A] font-light leading-relaxed mb-6">
                {aboutCaliberText}
              </p>
            </div>

            <ul className="space-y-3 pt-2">
              {[
                "Safe, non-toxic formulation, free from parabens, VOCs, and skin irritants.",
                "Employees are fully certified, credentialed, and receive comfortable living wages.",
                "Custom visual inspection schedules conducted by our on-site supervisors.",
                "Fully equipped with HEPA ultra-clean filtration and premium raw tools."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-xs text-[#7A7A7A] font-light">
                  <div className="w-5 h-5 rounded-full bg-[#A8B5A2] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right cards representing value block */}
          <div className="lg:col-span-7 space-y-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white border border-[#EBEBEB] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 text-left hover:border-[#A8B5A2] transition-colors duration-300 shadow-sm">
                  <div className="p-3.5 bg-[#EAECE8] text-[#2D2D2D] rounded-full shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-sm tracking-wide text-[#2D2D2D] uppercase mb-1.5 font-medium">
                      {v.title}
                    </h4>
                    <p className="font-sans text-xs text-[#7A7A7A] font-light leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
