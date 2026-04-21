import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { cn } from '../lib/utils';

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '923102626478'; // Set provided number as default
  const message = encodeURIComponent("Hello! I'm interested in QistPremium's luxury collections. I have a query.");
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;

  return (
    <div className="fixed bottom-10 right-10 z-[150] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-luxury-navy-light/95 backdrop-blur-xl border border-gold/30 rounded-2xl p-6 shadow-2xl w-72 mb-2"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-gold font-bold uppercase tracking-widest text-[10px] mb-1">Direct Concierge</h4>
                <p className="text-xl serif italic text-white/90">Ehsania Chat</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/20 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-white/50 leading-relaxed mb-6">
              Connect directly with our luxury acquisition specialists via WhatsApp for instant queries and personalized assistance.
            </p>

            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Chat Now</span>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Phone className="w-3 h-3 opacity-60" />
              </motion.div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all border",
          isOpen 
            ? "bg-luxury-navy border-gold/50 text-gold" 
            : "bg-[#25D366] border-white/20 text-white hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
        
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white/10"
          />
        )}
      </motion.button>
    </div>
  );
}
