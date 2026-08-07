import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 1100);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-ink"
        >
          <motion.img
            src="/GASTON_VILLA-removebg-preview.png"
            alt="Gaston Villa Loading"
            width={64}
            height={64}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-14 w-14 object-contain"
          />
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute bottom-[38%] h-px bg-primary"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
