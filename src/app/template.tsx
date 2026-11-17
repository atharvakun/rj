"use client";

import { motion } from "framer-motion";

/**
 * Entrance for every route. Pairs with the curtain in TransitionProvider.
 * Opacity only: a transform here would become the containing block for
 * every `position: fixed` element below it and break ScrollTrigger pinning.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{ willChange: "auto" }}
    >
      {children}
    </motion.div>
  );
}
