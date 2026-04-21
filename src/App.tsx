import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard, ProductCardSkeleton, Footer } from './components/ProductCard';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { cn } from './lib/utils';
import { useWishlist } from './context/WishlistContext';
import { ComparisonTool } from './components/ComparisonTool';
import { WhatsAppButton } from './components/WhatsAppButton';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'Technology',
    price: 1199,
    monthlyPrice: 55,
    emoji: '📱',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1695048133137-0248ad68765e?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    specs: {
      "Display": "6.7\" ProMotion",
      "Process": "A17 Pro",
      "Optics": "48MP Triple",
      "Finish": "Titanium"
    }
  },
  {
    id: '2',
    name: 'MacBook Pro M3 Max',
    category: 'Laptop',
    price: 3499,
    monthlyPrice: 145,
    emoji: '💻',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-71ce4eaa4766?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515248173870-85bc8853775b?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    specs: {
      "Display": "16.2\" Liquid XDR",
      "Process": "M3 Max",
      "Memory": "Up to 128GB",
      "Battery": "22 Hours"
    }
  },
  {
    id: '3',
    name: 'Rolex Cosmograph Daytona',
    category: 'Horology',
    price: 14800,
    monthlyPrice: 620,
    emoji: '⌚',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587836374828-4dbaba94ee0e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: false,
    specs: {
      "Material": "Oystersteel",
      "Bezel": "Ceramic",
      "Movement": "4131 Calibre",
      "Reserve": "72 Hours"
    }
  },
  {
    id: '4',
    name: 'Tesla Model S Plaid',
    category: 'Automotive',
    price: 89990,
    monthlyPrice: 1450,
    emoji: '🏎️',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620803134981-67ca0819169a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612810806695-30f7a8258391?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    specs: {
      "0-60 mph": "1.99s",
      "Range": "396 miles",
      "Power": "1,020 hp",
      "Drive": "Tri Motor AWD"
    }
  },
  {
    id: '5',
    name: 'Nerman Rose Gold Fountain',
    category: 'Lifestyle',
    price: 850,
    monthlyPrice: 40,
    emoji: '✒️',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585336139118-1356ee74cdaf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    specs: {
      "Nib": "18K Rose Gold",
      "Body": "Precious Resin",
      "System": "Piston Filler",
      "Weight": "32g"
    }
  },
  {
    id: '6',
    name: 'Hermès Birkin 30',
    category: 'Fashion',
    price: 12500,
    monthlyPrice: 580,
    emoji: '👜',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    specs: {
      "Leather": "Togo",
      "Hardware": "Gold-plated",
      "Origin": "France",
      "Size": "30 x 22 x 16 cm"
    }
  },
  {
    id: '7',
    name: 'Steinway & Sons B-211',
    category: 'Musical',
    price: 115000,
    monthlyPrice: 2800,
    emoji: '🎹',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566834015697-3f364023246a?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: false,
    specs: {
      "Length": "211 cm",
      "Keys": "Ivory Feel",
      "Board": "Sitka Spruce",
      "Action": "Accelerated"
    }
  },
  {
    id: '8',
    name: 'Leica M11 Silver',
    category: 'Optics',
    price: 8995,
    monthlyPrice: 380,
    emoji: '📷',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    specs: {
      "Sensor": "60MP CMOS",
      "Buffer": "3GB",
      "ISO": "64 - 50,000",
      "Mount": "Leica M"
    }
  },
  {
    id: '9',
    name: 'HP ProBook 450 G3',
    category: 'Laptop',
    price: 34000,
    monthlyPrice: 2850,
    emoji: '💻',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    specs: {
      "Processor": "Intel i3 6th Gen",
      "Display": "15.6\" HD Anti-Glare",
      "Memory": "8GB DDR4 RAM",
      "Storage": "256GB SSD"
    }
  },
  {
    id: '10',
    name: 'Samsung Bespoke AI Fridge',
    category: 'Home Appliances',
    price: 4500,
    monthlyPrice: 195,
    emoji: '🧊',
    image: 'https://images.unsplash.com/photo-1571175484658-51214bdb932d?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571175484658-51214bdb932d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    specs: {
      "Capacity": "24 cu. ft.",
      "Cooling": "Triple Cooling",
      "Display": "21.5\" Touchscreen",
      "AI": "Vision Inside"
    }
  },
  {
    id: '11',
    name: 'Dior Sauvage Elixir',
    category: 'Cosmetic',
    price: 180,
    monthlyPrice: 12,
    emoji: '🧴',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563170351-be82bc888bb4?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    specs: {
      "Volume": "60ml",
      "Scent": "Woody Spicy",
      "Note": "Cinnamon, Nutmeg",
      "Longevity": "12+ Hours"
    }
  },
  {
    id: '12',
    name: 'Dermacos Facial Kit',
    category: 'Cosmetic',
    price: 3500,
    monthlyPrice: 295,
    emoji: '🧖‍♀️',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1000&auto=format&fit=crop'
    ],
    inStock: true,
    caption: 'Set of 6',
    specs: {
      "Package": "Set of 6",
      "Kit Type": "Full Facial System",
      "Skin Type": "Professional Grade",
      "Origin": "Beauty Laboratories"
    }
  }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [view, setView] = useState<'all' | 'wishlist'>('all');

  const { wishlist } = useWishlist();

  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

  const filteredProducts = (view === 'all' ? MOCK_PRODUCTS : wishlist).filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const availabilityMatch = !showOnlyInStock || product.inStock;
    return categoryMatch && priceMatch && availabilityMatch;
  });

  return (
    <div className="min-h-screen font-sans selection:bg-gold selection:text-black">
      <Navbar />
      
      <main className="flex flex-col p-10 gap-10">
        <Hero />
        
        <section className="px-6">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-xl"
              >
                <h2 className="text-4xl serif mb-4">
                  {view === 'all' ? 'Curated ' : 'Reserved '}
                  <span className="text-gold italic">{view === 'all' ? 'Selections' : 'Insights'}</span>
                </h2>
                <p className="text-white/40 font-light text-sm">
                  {view === 'all' 
                    ? 'Hand-picked architectural and lifestyle assets, vetted for the discerning collector.'
                    : 'Personalized gallery of your most desired acquisitions.'}
                </p>
              </motion.div>
              
              <div className="flex flex-col gap-6 w-full lg:w-auto">
                {/* View Switcher */}
                <div className="flex space-x-6 text-[11px] uppercase tracking-[0.2em] font-bold text-white/40 mb-4 self-end">
                  <button 
                    onClick={() => setView('all')}
                    className={cn("transition-all pb-1", view === 'all' ? "text-gold border-b border-gold" : "hover:text-white")}
                  >
                    Collections
                  </button>
                  <button 
                    onClick={() => setView('wishlist')}
                    className={cn("transition-all pb-1 flex items-center gap-2", view === 'wishlist' ? "text-gold border-b border-gold" : "hover:text-white")}
                  >
                    Wishlist
                    {wishlist.length > 0 && <span className="bg-gold/10 text-gold px-1.5 rounded-sm">{wishlist.length}</span>}
                  </button>
                </div>

                {/* Enhanced Filtering Controls */}
                <div className="flex flex-wrap gap-8 items-center bg-white/5 border border-white/10 p-6 rounded-2xl w-full lg:w-auto">
                {/* Category Filter */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold text-gold/60 tracking-widest block">Collection</span>
                  <div className="flex gap-4">
                    <select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-transparent border-b border-white/20 text-[11px] uppercase tracking-widest font-bold text-white/80 py-1 outline-none cursor-pointer focus:border-gold transition-colors appearance-none pr-6 relative"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-luxury-navy text-white">{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold text-gold/60 tracking-widest block">Price Range (Up to)</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="150000" 
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="accent-gold w-32 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[10px] text-white/40 font-mono">
                    MAX: ${priceRange[1].toLocaleString()}
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold text-gold/60 tracking-widest block">Availability</span>
                  <button 
                    onClick={() => setShowOnlyInStock(!showOnlyInStock)}
                    className={cn(
                      "flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold transition-all",
                      showOnlyInStock ? "text-gold" : "text-white/40 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "w-3 h-3 rounded-full border border-current flex items-center justify-center p-0.5",
                      showOnlyInStock && "bg-gold"
                    )}>
                      {showOnlyInStock && <div className="w-full h-full bg-black rounded-full" />}
                    </div>
                    In Stock Only
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={`skeleton-${i}`} />
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-white/30 serif italic text-xl">No assets matching your criteria were found.</p>
                </div>
              )}
            </div>
            
            <div className="mt-16 text-center">
              <button className="bg-white/5 border border-white/10 hover:border-gold/50 text-white/50 hover:text-white py-4 px-12 rounded-full transition-all uppercase tracking-widest text-[10px] font-bold">
                View All Assets
              </button>
            </div>
          </div>
        </section>

        {/* Philosophy Section - Sleek Adjustment */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-12 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gold/5 blur-[100px] pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h3 className="text-4xl md:text-5xl serif leading-tight">
                  Discreet Financing <br />
                  <span className="text-gold italic">Global Access.</span>
                </h3>
                <p className="text-white/50 text-lg font-light leading-relaxed">
                  Our platform bypasses traditional banking complexities, providing a streamlined path to ownership for the world's most desired objects.
                </p>
                <div className="grid grid-cols-2 gap-8 text-[11px] uppercase tracking-widest font-bold">
                  <div className="space-y-2">
                    <div className="h-px w-8 bg-gold" />
                    <span className="text-white/80">Instant Approval</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-px w-8 bg-gold" />
                    <span className="text-white/80">Insured Transit</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-64 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1549497538-30122aaade8e?w=800" className="w-full h-full object-cover grayscale opacity-50" referrerPolicy="no-referrer" />
                </div>
                <div className="h-64 rounded-2xl bg-white/5 border border-white/10 overflow-hidden mt-8">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" className="w-full h-full object-cover grayscale opacity-50" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ComparisonTool />
      <WhatsAppButton />
    </div>
  );
}
