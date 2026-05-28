import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, CheckSquare, Sparkles, Building2, Home, X, Maximize2 } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'residential' | 'airbnb' | 'commercial' | 'detailing' | 'organization';
  categoryLabel: string;
  description: string;
  imageUrl: string;
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'airbnb' | 'commercial' | 'detailing' | 'organization'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects', icon: LayoutGrid },
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'airbnb', label: 'Hotels & Airbnb', icon: Sparkles },
    { id: 'commercial', label: 'Commercial Offices', icon: Building2 },
    { id: 'organization', label: 'Organization', icon: CheckSquare },
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'port-1',
      title: 'Waterfront Penthouse Deep Clean',
      category: 'residential',
      categoryLabel: 'Residential',
      description: 'An immaculate move-in cleaning for a luxury high-rise penthouse, detailing floor-to-ceiling baseboards, marble floor polishing, and sanitizing every surface to absolute perfection.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'port-2',
      title: 'Boutique Airbnb Turnover',
      category: 'airbnb',
      categoryLabel: 'Hotels & Airbnb',
      description: 'Flawless 5-star hotel standard turnover for a premier short-term rental. Neatly pressed bed linens, replenished premium toiletries, and comprehensive sanitization between guest placements.',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'port-3',
      title: 'Modern Architecture Window Detailing',
      category: 'detailing',
      categoryLabel: 'Detailing',
      description: 'Exterior and interior glass panes restoration on a luxury oceanfront mansion. Reclaiming panoramic crystal clarity from salt spray, water spots, and atmospheric dust.',
      imageUrl: 'https://images.unsplash.com/photo-1603796846097-bee99e4a60c9?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'port-4',
      title: 'Master Closet Styling & Assembly',
      category: 'organization',
      categoryLabel: 'Organization',
      description: 'Sophisticated closet layout arrangement. Sorting garments by season, palette grouping, and organizing footwear to optimize spatial harmony and functional mornings.',
      imageUrl: 'https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'port-5',
      title: 'Tech Headquarters Commercial Clean',
      category: 'commercial',
      categoryLabel: 'Commercial Offices',
      description: 'Detailed office sanitization for a high-traffic executive workspace. Disinfecting conference desks, sanitizing ventilation pathways, and leaving a completely fresh commercial environment.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'port-6',
      title: 'Chef\'s Kitchen & Appliance Restore',
      category: 'detailing',
      categoryLabel: 'Detailing',
      description: 'Intense interior oven carbon extraction and complete refrigerator breakdown wash. Restoring food-grade hygiene and brilliant steel luster to heavy-use gourmet kitchens.',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'port-7',
      title: 'Walk-In Pantry Custom Alignment',
      category: 'organization',
      categoryLabel: 'Organization',
      description: 'Restructured double-door kitchen pantry. Clear glass container tracking, precise spice sorting, and accessibility configuration for everyday ingredients.',
      imageUrl: 'https://images.unsplash.com/photo-1590311825124-73ec52331a44?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'port-8',
      title: 'Oceanfront Villa Recovery Service',
      category: 'residential',
      categoryLabel: 'Residential',
      description: 'An exhaustive, high-standard seasonal restoration of a 6,000 sq ft residential estate. Restoring luxury wood floors, delicate upholstery cleaning, and deep crown molding dusting.',
      imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter || (filter === 'detailing' && item.category === 'detailing'));

  return (
    <div className="py-24 bg-[#FDFCFB] min-h-[85vh] flex flex-col justify-start">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Portfolio Intro Wording and Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-[11px] sm:text-xs tracking-widest uppercase font-bold text-[#A8B5A2] block mb-3">
            Ours in action
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2D2D2D] font-semibold tracking-tight mb-5">
            Our Work Portfolio
          </h1>
          <div className="w-12 h-[1px] bg-[#A8B5A2] mx-auto my-5" />
          <p className="font-sans text-[13px] sm:text-[15px] text-[#5A5A5A] font-light leading-relaxed max-w-2xl mx-auto">
            Discover visual proof of our impeccable standards. Browse through real, meticulously completed projects across high-end homes, luxury short-term Airbnb properties, and commercial executive offices in Miami.
          </p>
        </div>

        {/* Categories / Filter Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-full font-sans text-[11px] tracking-wider uppercase font-bold border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#2D2D2D] text-white border-transparent shadow-sm' 
                    : 'bg-white text-[#7A7A7A] border-[#EBEBEB] hover:border-[#A8B5A2] hover:text-[#2D2D2D]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Masonry/Grid of Finished Work */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-[#EBEBEB] rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#A8B5A2]/60 transition-all flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F4F0]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  
                  {/* Plus/Maximize Indicator Overlay */}
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md font-sans text-[9px] tracking-wider uppercase font-bold text-[#2D2D2D] py-1 px-3 border border-[#EBEBEB]/40 rounded-full">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Card Content Wrap */}
                <div className="p-5 text-left flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-sans font-bold text-xs uppercase tracking-wide text-[#2D2D2D] line-clamp-1 group-hover:text-[#A8B5A2] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11.5px] text-[#7A7A7A] font-light leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#FAF9F5] mt-4 flex items-center justify-between">
                    <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-[#A8B5A2]">
                      Completed
                    </span>
                    <span className="font-mono text-[9px] text-[#7A7A7A]/60">
                      Miami Area
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-[#FAF9F5] border border-dashed border-[#EBEBEB] rounded-2xl">
            <span className="text-[#7A7A7A] font-sans text-xs">No project showcases matching this category.</span>
          </div>
        )}

        {/* Sophisticated Quality Footer Note */}
        <div className="mt-16 py-8 border-t border-[#EBEBEB] text-center max-w-xl mx-auto">
          <h4 className="font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-[#2D2D2D] mb-2">
            Every Image represents our genuine work
          </h4>
          <p className="font-sans text-[11px] text-[#7A7A7A] font-light leading-relaxed">
            We do not use stock mock-ups or artificial results. These are real properties transformed by our elite local vetting and custom multi-step checklists.
          </p>
        </div>

      </div>

      {/* Lightbox / Focus Overlap Modal (Sophisticated style overview) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2D2D2D]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-left flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Large Image */}
              <div className="md:w-3/5 aspect-photo relative bg-[#F5F4F0] min-h-[250px] md:min-h-[450px]">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Right Side: Description / Details */}
              <div className="md:w-2/5 p-8 flex flex-col justify-between bg-[#FAF9F5] relative">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 text-[#7A7A7A] hover:text-[#2D2D2D] hover:bg-[#EAECE8] rounded-full transition-all cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6 pt-4">
                  <div>
                    <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-[#A8B5A2] bg-[#EAECE8]/60 px-2.5 py-1 rounded-full">
                      {selectedItem.categoryLabel}
                    </span>
                    <h2 className="font-serif text-2xl text-[#2D2D2D] font-semibold tracking-tight mt-3">
                      {selectedItem.title}
                    </h2>
                  </div>

                  <div className="w-8 h-[1px] bg-[#2D2D2D]/20" />

                  <p className="font-sans text-xs sm:text-[13px] text-[#5A5A5A] font-light leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-2 pt-2 text-xs">
                    <div className="flex justify-between border-b border-[#EBEBEB]/60 pb-1.5">
                      <span className="text-[#7A7A7A] font-light">Service Area:</span>
                      <span className="font-semibold text-[#2D2D2D]">Miami, FL</span>
                    </div>
                    <div className="flex justify-between border-b border-[#EBEBEB]/60 pb-1.5">
                      <span className="text-[#7A7A7A] font-light">Service Type:</span>
                      <span className="font-semibold text-[#2D2D2D] uppercase tracking-wider text-[10px]">{selectedItem.categoryLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      // Trigger scroll to booking form
                      setTimeout(() => {
                        window.dispatchEvent(new Event('reset-booking-step'));
                        const el = document.getElementById('square-footage-calculator-anchor');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }}
                    className="w-full text-center font-sans text-[11px] tracking-widest uppercase font-bold bg-[#2D2D2D] hover:bg-[#404040] text-white py-4 rounded-xl transition-all cursor-pointer"
                  >
                    Request Similar Service
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
