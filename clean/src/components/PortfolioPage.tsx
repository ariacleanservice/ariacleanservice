import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, CheckSquare, Sparkles, Building2, Home, X, Maximize2 } from 'lucide-react';
// @ts-ignore
import closethImg from '../assets/images/closeth.JPG';
// @ts-ignore
import closeth2Img from '../assets/images/closeth2.JPG';
// @ts-ignore
import closeth3Img from '../assets/images/closeth3.JPG';
// @ts-ignore
import closeth4Img from '../assets/images/closeth4.JPG';
// @ts-ignore
import organizeImg from '../assets/images/organize.JPG';
// @ts-ignore
import sink1Img from '../assets/images/sink1.JPG';
// @ts-ignore
import abcImg from '../assets/images/abc.jpg';
// @ts-ignore
import bathImg from '../assets/images/bath.jpg';
// @ts-ignore
import bathrImg from '../assets/images/bathr.jpg';
// @ts-ignore
import bathroomImg from '../assets/images/bathroom.jpg';
// @ts-ignore
import livingImg from '../assets/images/living.jpg';
// @ts-ignore
import living2Img from '../assets/images/living2.jpg';
// @ts-ignore
import living3Img from '../assets/images/living3.jpg';
// @ts-ignore
import bedImg from '../assets/images/bed.JPG';
// @ts-ignore
import bed2Img from '../assets/images/bed2.JPG';
// @ts-ignore
import bed3Img from '../assets/images/bed3.JPG';
// @ts-ignore
import oneImg from '../assets/images/one.JPG';
// @ts-ignore
import twoImg from '../assets/images/two.JPG';
// @ts-ignore
import threeeImg from '../assets/images/threee.JPG';
// @ts-ignore
import fourImg from '../assets/images/four.JPG';
// @ts-ignore
import fiveImg from '../assets/images/five.JPG';
// @ts-ignore
import sixImg from '../assets/images/six.JPG';
// @ts-ignore
import sevenImg from '../assets/images/seven.JPG';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'residential' | 'airbnb' | 'commercial' | 'organization';
  categoryLabel: string;
  description: string;
  imageUrl: string;
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'airbnb' | 'organization'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  
  const categories = [
    { id: 'all', label: 'ALL PROJECTS', icon: Grid },
    { id: 'residential', label: 'RESIDENTIAL', icon: Home },
    { id: 'airbnb', label: 'HOTELS & AIRBNB', icon: Building },
    { id: 'organization', label: 'ORGANIZATION', icon: Boxes }
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'port-1',
      title: 'Luxury Residential Cleaning',
      category: 'residential',
      categoryLabel: 'Residential',
      description: 'Immaculate deep cleaning for high-end residential properties. Complete floor-to-ceiling sanitization with attention to premium finishes and delicate surfaces.',
      imageUrl: abcImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-2',
      title: 'Premium Bathroom Restoration',
      category: 'residential',
      categoryLabel: 'Residential',
      description: 'Expert bathroom cleaning and sanitization. Sparkling fixtures, pristine tiles, and luxurious spa-like ambiance.',
      imageUrl: bathImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-3',
      title: 'Master Bath Detailing',
      category: 'residential',
      categoryLabel: 'Residential',
      description: 'Comprehensive bathroom deep clean. Gleaming surfaces, polished hardware, and immaculate grout restoration.',
      imageUrl: bathrImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-13',
      title: 'Spotless Bathroom Sanctuary',
      category: 'residential',
      categoryLabel: 'Residential',
      description: 'Meticulous bathroom transformation. Complete sanitization with attention to corners, fixtures, and tile perfection.',
      imageUrl: bathroomImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-12',
      title: 'Living Room Elegance',
      category: 'residential',
      categoryLabel: 'Residential',
      description: 'Professional living space restoration. Dust-free surfaces, pristine furnishings, and immaculate floors for ultimate comfort.',
      imageUrl: livingImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-11',
      title: 'Luxury Living Space Refresh',
      category: 'residential',
      categoryLabel: 'Residential',
      description: 'Complete living room deep clean. Furniture care, floor restoration, and refined ambient cleanliness.',
      imageUrl: living2Img,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-10',
      title: 'Contemporary Living Room Detail',
      category: 'residential',
      categoryLabel: 'Residential',
      description: 'Sophisticated living area transformation. Premium surface treatment, fabric care, and architectural detail cleaning.',
      imageUrl: living3Img,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-4',
      title: 'Master Closet Styling & Assembly',
      category: 'organization',
      categoryLabel: 'Organization',
      description: 'Sophisticated closet layout arrangement. Sorting garments by season, palette grouping, and organizing footwear to optimize spatial harmony and functional mornings.',
      imageUrl: closethImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-5',
      title: 'Luxury Closet Organization',
      category: 'organization',
      categoryLabel: 'Organization',
      description: 'Expert wardrobe curation and closet design. Hangers arranged by color palette, seasonal sorting, and premium storage solutions.',
      imageUrl: closeth2Img,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-6',
      title: 'Premium Closet & Wardrobe Styling',
      category: 'organization',
      categoryLabel: 'Organization',
      description: 'Professional closet transformation. Complete organization system with color-coordinated garments and optimized hanging solutions.',
      imageUrl: closeth3Img,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-7',
      title: 'Walk-In Closet Refinement',
      category: 'organization',
      categoryLabel: 'Organization',
      description: 'Full walk-in closet reorganization. Systematic arrangement of clothing, accessories, and footwear for effortless daily selection.',
      imageUrl: closeth4Img,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-8',
      title: 'Bespoke Spatial Organization',
      category: 'organization',
      categoryLabel: 'Organization',
      description: 'Custom organization solutions. Strategic layout planning and detailed arrangement for maximum functionality and elegance.',
      imageUrl: organizeImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-9',
      title: 'Luxury Bathroom Organization',
      category: 'organization',
      categoryLabel: 'Organization',
      description: 'Premium bathroom counter and fixture organization. Coordinated storage, gleaming surfaces, and refined arrangement.',
      imageUrl: sink1Img,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-14',
      title: 'Luxury Bedroom Turnover',
      category: 'airbnb',
      categoryLabel: 'Hotels & Airbnb',
      description: 'Premium bedroom preparation for short-term rentals. Fresh linens, spotless surfaces, and luxurious ambiance for guest satisfaction.',
      imageUrl: bedImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-15',
      title: 'Master Suite Deep Clean',
      category: 'airbnb',
      categoryLabel: 'Hotels & Airbnb',
      description: 'Comprehensive master bedroom sanitization. Pristine bedding, dust-free surfaces, and refined guest-ready presentation.',
      imageUrl: bed2Img,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-16',
      title: 'Guest Bedroom Excellence',
      category: 'airbnb',
      categoryLabel: 'Hotels & Airbnb',
      description: 'Expert guest room preparation. Immaculate surfaces, fresh linens, and welcoming cleanliness for premium rental experience.',
      imageUrl: bed3Img,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-17',
      title: 'Airbnb Property Turnover',
      category: 'airbnb',
      categoryLabel: 'Hotels & Airbnb',
      description: 'Complete property reset between guests. Thorough sanitization, fresh staging, and five-star cleanliness standards.',
      imageUrl: oneImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-18',
      title: 'Short-Term Rental Refresh',
      category: 'airbnb',
      categoryLabel: 'Hotels & Airbnb',
      description: 'Professional turnover cleaning for vacation rentals. Deep clean, detailed sanitization, and guest-ready excellence.',
      imageUrl: twoImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-19',
      title: 'Boutique Airbnb Detailing',
      category: 'airbnb',
      categoryLabel: 'Hotels & Airbnb',
      description: 'Meticulous cleaning for luxury short-term properties. Premium presentation and impeccable guest experience preparation.',
      imageUrl: threeeImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-20',
      title: 'High-End Rental Property Care',
      category: 'airbnb',
      categoryLabel: 'Hotels & Airbnb',
      description: 'Expert care for premium vacation rentals. Complete sanitization with attention to luxury finishes and guest comfort.',
      imageUrl: fourImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-21',
      title: 'Seamless Guest Transition',
      category: 'airbnb',
      categoryLabel: 'Hotels & Airbnb',
      description: 'Efficient property turnovers between guests. Rapid deep clean with five-star quality and attention to detail.',
      imageUrl: fiveImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-22',
      title: 'Luxury Vacation Rental Polish',
      category: 'airbnb',
      categoryLabel: 'Hotels & Airbnb',
      description: 'Premium presentation for high-end Airbnb properties. Spotless interiors and refined guest-ready excellence.',
      imageUrl: sixImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    },
    {
      id: 'port-23',
      title: 'Resort-Quality Property Cleaning',
      category: 'airbnb',
      categoryLabel: 'Hotels & Airbnb',
      description: 'Professional hotel-standard cleaning for short-term rentals. Complete sanitization and luxury presentation.',
      imageUrl: sevenImg,
      status: 'COMPLETED',
      location: 'Miami Area'
    }
  ];

  const filteredItems = filter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === filter);

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
