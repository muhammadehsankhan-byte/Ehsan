import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative h-[280px] rounded-3xl overflow-hidden bg-gradient-to-br from-luxury-navy-light to-luxury-navy border border-white/10 flex flex-col justify-center px-12">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_70%)] pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="text-4xl md:text-6xl mb-4 leading-tight serif">
          Refined Luxury.<br />
          <span className="italic text-gold">Managed Payments.</span>
        </h1>
        <p className="text-white/60 max-w-md text-lg mb-8">
          Experience the extraordinary with zero interest installment plans tailored for connoisseurs of fine living.
        </p>
        <div>
          <button className="bg-gold text-black font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:brightness-110 transition-all">
            Explore Luxury Tier
          </button>
        </div>
      </motion.div>
    </section>
  );
}
