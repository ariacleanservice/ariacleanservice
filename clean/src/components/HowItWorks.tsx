import { Sliders, Calendar, Smile, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Configure Your Space',
      description: 'Choose your desired service type (Standard or Deep Clean) and select your layout requirements (bedrooms, bathrooms, and customized add-ons).',
      icon: Sliders,
    },
    {
      number: '02',
      title: 'Choose Date & Frequency',
      description: 'Pick a flexible date and hours that fit your lifestyle seamlessly. Select a recurring schedule (Weekly, Bi-weekly, or Monthly) to unlock premium pricing.',
      icon: Calendar,
    },
    {
      number: '03',
      title: 'Sit Back & Rest Easy',
      description: 'Relax. A fully trained, vetted, and background-checked professional cleaner will arrive prepared with non-toxic products to restore your space.',
      icon: Smile,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#FDFCFB] border-t border-[#EBEBEB]/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[11px] sm:text-xs tracking-widest uppercase font-semibold text-[#A8B5A2] block mb-3">
            Bespoke Service Flow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light tracking-tight mb-4">
            How we restore your home
          </h2>
          <div className="w-12 h-[1px] bg-[#A8B5A2] mx-auto mt-5 mb-4" />
          <p className="font-sans text-sm text-[#7A7A7A] font-light leading-relaxed">
            We’ve removed the friction from high-end cleaning. Simple bookings, absolute security, and exemplary standards.
          </p>
        </div>

        {/* Steps Grid (Bento columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-[#EBEBEB] rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-[#A8B5A2] transition-colors duration-300 min-h-[250px]"
              >
                {/* Header indicators inside each card */}
                <div className="flex items-center justify-between w-full mb-6 relative z-10">
                  <span className="text-[#A8B5A2] font-mono text-xl font-semibold tracking-tighter">
                    {step.number}
                  </span>
                  
                  {/* Micro Icon */}
                  <div className="p-2.5 bg-[#F3F0EC] text-[#2D2D2D] rounded-full group-hover:bg-[#A8B5A2] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-sans text-lg text-[#2D2D2D] font-semibold mb-2.5 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-[#7A7A7A] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Trust Strip (Styled as long sleek Bento grid row) */}
        <div className="mt-6 bg-[#F3F0EC] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-white border border-[#EBEBEB] rounded-full text-[#A8B5A2] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-sm tracking-wide text-[#2D2D2D]">
                Meticulous Security Vetting
              </h4>
              <p className="font-sans text-xs text-[#7A7A7A] mt-0.5 max-w-xl">
                Every member on our cleaning roster must pass a multi-level state background evaluation, direct reference audits, and a 4-week proprietary training course.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              const el = document.getElementById('booking-widget');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-display text-xs tracking-widest uppercase font-semibold bg-[#2D2D2D] hover:bg-[#404040] text-white px-6 py-3.5 rounded-full transition-all duration-350 shrink-0 self-start sm:self-center shadow-sm"
          >
            Calculate Your Price
          </button>
        </div>

      </div>
    </section>
  );
}
