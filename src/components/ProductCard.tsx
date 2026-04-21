import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { ArrowRight, Star, MessageSquare, Send, ChevronDown, ChevronUp, Heart, Facebook, Twitter, Instagram, Share2, CreditCard, Check, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';

interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

interface ProductCardProps {
  id?: string;
  name?: string;
  category?: string;
  price?: number;
  monthlyPrice?: number;
  image?: string;
  images?: string[];
  emoji?: string;
  inStock?: boolean;
  specs?: Record<string, string>;
  isLoading?: boolean;
  caption?: string;
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-luxury-navy-light/40 border border-white/5 rounded-3xl p-6 relative flex flex-col h-full animate-pulse overflow-hidden">
      {/* Top Bar Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="w-20 h-4 bg-white/5 rounded-full" />
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-white/5" />
          <div className="w-8 h-8 rounded-full bg-white/5" />
        </div>
      </div>
      
      {/* Image Skeleton */}
      <div className="h-48 bg-white/5 rounded-xl mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
      
      {/* Gallery Skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="w-12 h-12 rounded-lg bg-white/5" />
        <div className="w-12 h-12 rounded-lg bg-white/5" />
        <div className="w-12 h-12 rounded-lg bg-white/5" />
      </div>
      
      {/* Title & Reviews Skeleton */}
      <div className="flex justify-between items-start mb-1">
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="w-3/4 h-5 bg-white/5 rounded" />
          <div className="w-1/4 h-2.5 bg-white/5 rounded" />
        </div>
        <div className="w-10 h-4 bg-white/5 rounded" />
      </div>
      
      {/* Category Skeleton */}
      <div className="w-1/3 h-3 bg-white/5 rounded mb-6" />
      
      {/* Price & Buy Button Skeleton */}
      <div className="mt-auto flex justify-between items-center pb-4 border-b border-white/5 mb-4 gap-4">
        <div className="flex flex-col gap-1">
          <div className="w-20 h-8 bg-white/5 rounded" />
          <div className="w-16 h-2 bg-white/5 rounded" />
        </div>
        <div className="flex-1 h-11 bg-white/5 rounded-xl" />
      </div>

      {/* Footer Features Skeleton */}
      <div className="flex justify-between items-center">
        <div className="w-20 h-3 bg-white/5 rounded" />
        <div className="w-8 h-8 bg-white/5 rounded-full" />
      </div>
    </div>
  );
}

export function ProductCard(props: ProductCardProps) {
  const { id = '', name = '', category = '', monthlyPrice = 0, emoji = '', image = '', images = [], inStock = true, isLoading = false, caption = '' } = props;
  
  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isComparing } = useComparison();
  
  const [activeImage, setActiveImage] = useState(image);
  const [zoomStyle, setZoomStyle] = useState({ transform: 'scale(1)', transformOrigin: 'center' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      transform: 'scale(2)',
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center' });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    const currentIndex = images.indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setActiveImage(images[nextIndex]);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    const currentIndex = images.indexOf(activeImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setActiveImage(images[prevIndex]);
  };

  const isWishlisted = isInWishlist(id);
  const isCompared = isComparing(id);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  React.useEffect(() => {
    setIsImageLoading(true);
  }, [activeImage]);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsCheckoutOpen(false);
      }, 2000);
    }, 1500);
  };

  const shareUrl = window.location.href;
  const shareText = `Check out the ${name} on QistPremium Ehsania!`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    instagram: `https://www.instagram.com/` // Instagram doesn't support direct link sharing via URL as easily, usually manual post
  };

  const [expandedSection, setExpandedSection] = useState<'specs' | 'reviews' | null>(null);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'r1',
      rating: 5,
      comment: "Absolutely breathtaking. The financing process was seamless.",
      author: "Julian V.",
      date: "2024-03-12"
    }
  ]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      rating: newRating,
      comment: newComment,
      author: "Client",
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewComment("");
    setNewRating(5);
  };

  return (
    <motion.div 
      layout
      whileHover={inStock && expandedSection !== 'reviews' ? { scale: 1.01 } : {}}
      className={cn(
        "bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col transition-all h-full relative overflow-hidden",
        inStock ? "hover:border-gold/40" : "opacity-60 grayscale"
      )}
    >
      {!inStock && (
        <div className="absolute top-4 right-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-full z-10">
          Reserved
        </div>
      )}

      {/* Social Sharing */}
      {inStock && (
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-20">
          <button 
            onClick={() => setIsShareOpen(!isShareOpen)}
            className={cn(
              "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all bg-white/5 text-white/30 hover:text-gold hover:border-gold/30",
              isShareOpen && "text-gold border-gold/30 bg-gold/5"
            )}
            title="Share Asset"
          >
            <Share2 className="w-4 h-4" />
          </button>
          
          <AnimatePresence>
            {isShareOpen && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex flex-col gap-2"
              >
                <a 
                  href={shareLinks.facebook} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-all"
                  title="Share on Facebook"
                >
                  <Facebook className="w-3 h-3" />
                </a>
                <a 
                  href={shareLinks.twitter} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-all"
                  title="Share on X"
                >
                  <Twitter className="w-3 h-3" />
                </a>
                <a 
                  href={shareLinks.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#E4405F] hover:border-[#E4405F]/30 transition-all"
                  title="Follow on Instagram"
                >
                  <Instagram className="w-3 h-3" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Actions */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({ ...props, inStock: inStock as any });
          }}
          className={cn(
            "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all",
            isWishlisted ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-white/5 text-white/30 hover:text-white"
          )}
        >
          <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare({ ...props, inStock: inStock as any });
          }}
          className={cn(
            "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all",
            isCompared ? "bg-gold/10 border-gold/30 text-gold shadow-lg shadow-gold/10" : "bg-white/5 text-white/30 hover:text-white"
          )}
          title="Compare Asset"
        >
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-current rounded-full" />
            <div className="w-0.5 h-3 bg-current rounded-full opacity-40" />
            <div className="w-0.5 h-3 bg-current rounded-full" />
          </div>
        </button>
      </div>
      
      <div className="space-y-4 mb-4">
        {/* Main Image with Zoom */}
        <div 
          className="h-48 bg-white/5 rounded-xl overflow-hidden relative group/zoom cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {activeImage ? (
            <>
              {isImageLoading && (
                <div className="absolute inset-0 bg-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
              )}
              <motion.img 
                src={activeImage} 
                alt={name}
                style={zoomStyle}
                onLoad={() => setIsImageLoading(false)}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500 ease-out",
                  isImageLoading ? "scale-110 blur-xl opacity-0" : "scale-100 blur-0 opacity-100"
                )}
                referrerPolicy="no-referrer"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              {emoji || '✨'}
            </div>
          )}
          
          {/* Overlay to help visibility on dark images */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-0 group-hover/zoom:opacity-100 transition-opacity" />

          {/* Caption Badge */}
          {caption && (
            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] uppercase font-bold tracking-widest text-gold shadow-lg shadow-black/20">
              {caption}
            </div>
          )}

          {/* Carousel Controls */}
          {images && images.length > 1 && (
            <>
              <div className="absolute inset-y-0 left-0 flex items-center px-2 z-10 opacity-0 group-hover/zoom:opacity-100 transition-opacity">
                <button 
                  onClick={prevImage}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 z-10 opacity-0 group-hover/zoom:opacity-100 transition-opacity">
                <button 
                  onClick={nextImage}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* Pagination Dots */}
          {images && images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 p-1.5 bg-black/20 backdrop-blur-lg rounded-full border border-white/5 opacity-0 group-hover/zoom:opacity-100 transition-opacity">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(img);
                  }}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    activeImage === img ? "bg-gold w-4" : "bg-white/40 hover:bg-white"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Keeping original thumbnails but styled specifically for quick selection below the main carousel */}
        {images && images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(img);
                }}
                className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-lg border-2 overflow-hidden transition-all",
                  activeImage === img ? "border-gold shadow-sm shadow-gold/20" : "border-transparent opacity-40 hover:opacity-100 hover:border-white/20"
                )}
              >
                <img src={img} alt={`${name} ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-start mb-1">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-medium text-white/90">{name}</h3>
          <div className="flex items-center gap-1.5">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-500",
              inStock ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]"
            )} />
            <span className={cn(
              "text-[8px] uppercase font-bold tracking-[0.1em]",
              inStock ? "text-emerald-500/60" : "text-red-500/60"
            )}>
              {inStock ? "In Stock" : "Sold Out"}
            </span>
          </div>
        </div>
        <button 
          onClick={() => setExpandedSection(expandedSection === 'reviews' ? null : 'reviews')}
          className={cn(
            "transition-colors flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest",
            expandedSection === 'reviews' ? "text-gold" : "text-gold/60 hover:text-gold"
          )}
        >
          <MessageSquare className="w-3 h-3" />
          {reviews.length}
        </button>
      </div>
      
      <p className="text-xs text-white/40 mb-3 uppercase tracking-tighter">{category}</p>
      
      <div className="mt-auto flex justify-between items-center pb-4 border-b border-white/5 mb-4 gap-4">
        <div className="flex flex-col">
          <span className="text-gold text-2xl font-bold">
            ${monthlyPrice}
            <span className="text-xs font-normal text-white/50">/mo</span>
          </span>
          <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium whitespace-nowrap">12 Month Plan</span>
        </div>
        <button 
          disabled={!inStock}
          onClick={() => setIsCheckoutOpen(true)}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all",
            inStock 
              ? "bg-gold text-black hover:brightness-110 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] active:scale-95" 
              : "bg-white/5 text-white/20 cursor-not-allowed border border-white/10"
          )}
        >
          {inStock ? (
            <>
              Buy Now
              <CreditCard className="w-3.5 h-3.5" />
            </>
          ) : (
            "Sold Out"
          )}
        </button>
      </div>

      {/* Specifications Section Toggle */}
      {props.specs && Object.keys(props.specs).length > 0 && (
        <div className="border-b border-white/5 last:border-0">
          <button 
            onClick={() => setExpandedSection(expandedSection === 'specs' ? null : 'specs')}
            className={cn(
              "w-full flex items-center justify-between py-3 text-[10px] uppercase tracking-[0.25rem] font-bold transition-all group",
              expandedSection === 'specs' ? "text-gold" : "text-white/20 hover:text-gold/60"
            )}
          >
            <span>Technical Specifications</span>
            {expandedSection === 'specs' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          
          <AnimatePresence>
            {expandedSection === 'specs' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pb-6 space-y-4">
                  <div className="grid grid-cols-1 gap-y-3">
                    {Object.entries(props.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-baseline gap-4 group/spec">
                        <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold group-hover/spec:text-gold/40 transition-colors">{key}</span>
                        <div className="flex-1 border-b border-dotted border-white/10 group-hover/spec:border-gold/20 transition-colors" />
                        <span className="text-xs text-white/80 font-medium italic serif lowercase tracking-tight group-hover/spec:text-white transition-colors">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <p className="text-[8px] text-white/20 italic leading-relaxed uppercase tracking-tighter">
                      * All specifications are verified by Ehsania's luxury auditing department.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Review Section Toggle */}
      <div className="border-b border-white/5 last:border-0 text-center">
        <button 
          onClick={() => setExpandedSection(expandedSection === 'reviews' ? null : 'reviews')}
          className={cn(
            "w-full flex items-center justify-between py-3 text-[10px] uppercase tracking-[0.25rem] font-bold transition-all group",
            expandedSection === 'reviews' ? "text-gold" : "text-white/20 hover:text-gold/60"
          )}
        >
          <span>Reviews & Insights</span>
          {expandedSection === 'reviews' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

      <AnimatePresence>
        {expandedSection === 'reviews' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-6">
              {/* Review Form */}
              <form onSubmit={handleAddReview} className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase font-bold text-white/40 tracking-widest">Share Sentiment</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={cn(
                          "transition-colors",
                          star <= newRating ? "text-gold" : "text-white/10 hover:text-gold/40"
                        )}
                      >
                        <Star className="w-3 h-3 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Enter your experience..."
                    className="w-full bg-black/40 border border-white/5 rounded-lg py-2 px-3 text-xs text-white/80 placeholder:text-white/20 focus:outline-none focus:border-gold/30 min-h-[60px] resize-none"
                  />
                  <button 
                    type="submit"
                    className="absolute bottom-2 right-2 p-1.5 bg-gold/10 text-gold rounded-md hover:bg-gold hover:text-black transition-all"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>

              {/* Review List */}
              <div className="space-y-4 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-1.5 border-l border-gold/20 pl-3">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn("w-2 h-2 fill-current", i < review.rating ? "text-gold" : "text-white/10")} />
                        ))}
                      </div>
                      <span className="text-[8px] text-white/30 font-mono italic">{review.date}</span>
                    </div>
                    <p className="text-[11px] text-white/60 font-light leading-relaxed italic">"{review.comment}"</p>
                    <p className="text-[9px] text-gold/60 uppercase font-bold tracking-tighter">— {review.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

      {/* Checkout Overlay */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-luxury-navy flex flex-col items-center justify-center p-6 text-center"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <h4 className="text-xl serif italic text-white">Acquisition Secured</h4>
                <p className="text-[10px] uppercase tracking-widest text-white/40">Our concierge will contact you shortly.</p>
              </motion.div>
            ) : (
              <div className="w-full space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-black">Checkout</span>
                  <h4 className="text-xl serif leading-tight text-white/90">{name}</h4>
                  <p className="text-xs text-white/40 italic">{category}</p>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-white/40">Acquisition</span>
                    <span className="text-white">${monthlyPrice.toLocaleString()} /mo</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-white/40">Term</span>
                    <span className="text-white">12 Months</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span className="text-gold">Commitment</span>
                    <span className="text-gold">${monthlyPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-gold text-black py-4 rounded-xl text-[10px] uppercase font-black tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      "Confirm Acquisition"
                    )}
                  </button>
                  <button 
                    onClick={() => setIsCheckoutOpen(false)}
                    disabled={isProcessing}
                    className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Footer() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '923102626478';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}`;

  return (
    <footer className="px-10 py-12 border-t border-white/5 flex flex-col items-center gap-10">
      {/* WhatsApp Quick Link */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 text-gold hover:text-white transition-colors group"
      >
        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-black uppercase tracking-[0.3em]">Concierge Chat: {whatsappNumber}</span>
      </a>

      <div className="w-full flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30 uppercase tracking-[0.2em] gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gold font-bold">QistPremium</span>
          <span>© 2026 Ehsania Finance</span>
        </div>
        <div className="flex gap-8">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
          <span className="hidden sm:inline">Verified Secure Checkout</span>
        </div>
      </div>
    </footer>
  );
}
