import { motion } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  Check, 
  Home, 
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function BookingWidget() {
  const services = [
    {
      id: "deep-clean",
      title: "Move-In & Move-Out Cleaning",
      description: "Thorough and exhaustive detailed clean for homes and apartments in transition. Perfect for securing tenant security deposits, satisfying commercial leases, or preparing a fresh, pristine sanctuary before moving your life in.",
      icon: Sparkles,
      tags: ["Cabinet interiors & exteriors", "Deep baseboard detailing", "Full fixture sanitization", "Comprehensive floor restoration"]
    },
    {
      id: "laundry",
      title: "Laundry & Folding Service",
      description: "Careful, premium laundering of garments, sheets, and home or commercial linens. We wash, dry, and precisely fold your textiles using delicate, allergen-free, premium detergents.",
      icon: Check,
      tags: ["Premium scentless detergent", "Precise standard folding", "Linen & bedsheet care", "Delicate fabric handling"]
    },
    {
      id: "windows",
      title: "Deep Window Cleaning",
      description: "Professional interior window cleaning designed to restore crystal clarity for both homes and businesses. Thoroughly removes water spots, pollen, dirt, and dust from glass panes, frames, screens, and racks.",
      icon: Home,
      tags: ["Glass hand-polishing", "Screen dust extraction", "Tracks & sills detailing", "Crystal-clear restoration"]
    },
    {
      id: "organizer",
      title: "Master Closet, Pantry & Kitchen Organization",
      description: "Bespoke styling and structural arrangement for your high-end interior spaces. Beautifully organizing master closets, walk-in pantries, kitchen cabinetry, and refrigeration systems.",
      icon: Layers,
      tags: ["Master closet styling", "Walk-in pantry alignment", "Kitchen cabinet layouts", "Refrigeration arrangement"]
    },
    {
      id: "appliances",
      title: "Interior Oven & Refrigerator Cleaning",
      description: "Deep-cleaning and restoration of major kitchen appliances. We remove grease, baked-on carbon deposits, food spills, and refrigerator grime using safe, non-toxic, professional cleaning solutions.",
      icon: ShieldCheck,
      tags: ["Oven grease extraction", "Full fridge shelf wash", "Baking soda treatments", "Odour & trace elimination"]
    },
    {
      id: "commercial-airbnb",
      title: "Hotels & Airbnb Commercial Services",
      description: "Premium housekeeping and rapid-turnover cleanings designed specifically for boutique hotels, short-term Airbnb rentals, and corporate commercial spaces. We keep guest experiences immaculate and five-star ready.",
      icon: Building2,
      tags: ["Airbnb rapid turnovers", "Amenity cleaning & restocking", "Commercial space detailing", "High-frequency disinfection"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section id="square-footage-calculator-anchor" className="py-24 bg-[#EFECE5] border-t border-b border-[#EBEBEB] scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[11px] sm:text-xs tracking-widest uppercase font-bold text-[#687C63] block mb-3">
            Premium Cleaning & Restoration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2D] font-semibold tracking-tight mb-4">
            Our Services
          </h2>
          <div className="w-12 h-[1px] bg-[#687C63] mx-auto my-4" />
          <p className="font-sans text-[13px] sm:text-sm text-[#4E4E4E] font-medium leading-relaxed">
            Explore our curated series of premium residential, commercial, and short-term Airbnb rental cleaning services, spatial reorganizations, and delicate detailing options designed to keep your spaces pristine.
          </p>
        </div>

        {/* Elegant Grid List of Premium Services */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((svc) => {
            const IconComponent = svc.icon;
            return (
              <motion.div
                key={svc.id}
                variants={itemVariants}
                className="bg-white border border-[#EBEBEB] p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:border-[#687C63] hover:shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between text-left group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#FAF9F5] text-[#687C63] border border-[#EBEBEB]/55 rounded-2xl group-hover:bg-[#EAECE8] transition-colors">
                      <IconComponent className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2D2D2D]">
                      {svc.title}
                    </h3>
                  </div>
                  
                  <p className="text-[12px] sm:text-[13px] text-[#7A7A7A] font-light leading-relaxed">
                    {svc.description}
                  </p>
                  
                  {/* Subtle Elegant Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {svc.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[10px] sm:text-[11px] font-sans tracking-wide text-[#4E4E4E] bg-[#FAF9F5] px-2.5 py-1 rounded-full border border-[#EBEBEB]/50 leading-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
