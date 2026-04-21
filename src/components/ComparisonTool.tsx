import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scale, ArrowRight, Minus } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { cn } from '../lib/utils';

export function ComparisonTool() {
  const { compareItems, toggleCompare, clearCompare } = useComparison();
  const [isOpen, setIsOpen] = useState(false);

  if (compareItems.length === 0) return null;

  return (
    <>
      {/* Floating Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-luxury-navy-light/90 backdrop-blur-xl border border-gold/20 rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-8"
      >
        <div className="flex items-center gap-3 pr-8 border-r border-white/10 text-gold">
          <Scale className="w-5 h-5" />
          <span className="text-[10px] uppercase font-black tracking-[0.2em]">Comparison Lab</span>
        </div>

        <div className="flex gap-4">
          {compareItems.map((item) => (
            <motion.div 
              key={item.id}
              layoutId={`compare-${item.id}`}
              className="relative group w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl hover:border-gold/30 transition-all cursor-pointer"
            >
              {item.emoji}
              <button 
                onClick={() => toggleCompare(item)}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-2.5 h-2.5 text-white" />
              </button>
            </motion.div>
          ))}
          {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
            <div key={i} className="w-12 h-12 border border-white/5 dashed-border rounded-xl flex items-center justify-center text-white/5">
              <Minus className="w-4 h-4" />
            </div>
          ))}
        </div>

        <div className="pl-8 border-l border-white/10 flex gap-4">
          <button 
            onClick={() => setIsOpen(true)}
            disabled={compareItems.length < 2}
            className={cn(
              "bg-gold text-black px-6 py-2 rounded-full text-[10px] uppercase font-black tracking-widest transition-all",
              compareItems.length < 2 ? "opacity-50 cursor-not-allowed" : "hover:brightness-110 active:scale-95"
            )}
          >
            Compare Assets
          </button>
          <button 
            onClick={clearCompare}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 md:p-20 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-luxury-navy border border-white/10 rounded-3xl w-full max-w-6xl p-10 relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="mb-12">
                <h2 className="text-4xl serif mb-2 italic text-gold">Asset Correlation</h2>
                <p className="text-white/40 text-sm tracking-widest uppercase font-bold">In-depth feature mapping & financial projections</p>
              </div>

              <div className="grid grid-cols-5 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                {/* Specs Column */}
                <div className="col-span-1 bg-white/[0.02] p-8 flex flex-col gap-12 font-medium">
                  <div className="h-40 flex items-end pb-4 border-b border-white/5">
                    <span className="text-white/20 uppercase tracking-[0.2em] text-[10px]">Matrix</span>
                  </div>
                  <div className="flex flex-col gap-16">
                    <span className="text-xs text-gold uppercase tracking-widest">Financials</span>
                    <span className="text-xs text-white/40 uppercase tracking-widest">Projection</span>
                    <span className="text-xs text-white/40 uppercase tracking-widest">Capabilities</span>
                    <span className="text-xs text-white/40 uppercase tracking-widest">Origin</span>
                  </div>
                </div>

                {/* Data Columns */}
                {compareItems.map((item) => (
                  <div key={item.id} className="col-span-1 bg-luxury-navy p-8 transition-colors hover:bg-white/[0.01]">
                    <div className="h-40 flex flex-col justify-end gap-4 pb-4 border-b border-white/5 mb-12">
                      <div className="text-4xl mb-2">{item.emoji}</div>
                      <h3 className="font-bold text-white/90 leading-tight">{item.name}</h3>
                      <p className="text-[9px] uppercase tracking-widest text-white/30">{item.category}</p>
                    </div>

                    <div className="flex flex-col gap-16">
                      <div className="flex flex-col gap-1">
                        <span className="text-xl font-black text-gold">${item.price.toLocaleString()}</span>
                        <span className="text-[10px] text-white/20 uppercase">Total Acquisition</span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-xl font-black text-white/90">${item.monthlyPrice.toLocaleString()} /mo</span>
                        <span className="text-[10px] text-white/20 uppercase">Tier 1 Strategy</span>
                      </div>

                      <div className="flex flex-col gap-4">
                        {item.specs ? Object.entries(item.specs).slice(0, 3).map(([key, val]) => (
                          <div key={key} className="flex flex-col gap-1">
                            <span className="text-[10px] text-white/40 uppercase tracking-tighter">{key}</span>
                            <span className="text-xs text-white/80 font-medium">{val}</span>
                          </div>
                        )) : (
                          <span className="text-xs text-white/20 italic">Specs Classified</span>
                        )}
                      </div>

                      <div className="pt-8 border-t border-white/5">
                         <button className="w-full bg-white/5 border border-white/10 py-3 rounded-lg text-[9px] uppercase font-black tracking-widest hover:border-gold/50 transition-all flex items-center justify-center gap-2">
                           Initiate <ArrowRight className="w-3 h-3" />
                         </button>
                      </div>
                    </div>
                  </div>
                ))}

                {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                  <div key={i} className="col-span-1 bg-black/20 flex items-center justify-center text-white/5">
                     <span className="text-[10px] uppercase tracking-[0.5em] rotate-90">Reserved Slot</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
