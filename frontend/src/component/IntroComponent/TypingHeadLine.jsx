import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TypingHeadline({ onDone }) {
  const HERO_WORDS = ["Discover", "Places", "Worth", "Remembering."];
  const full = HERO_WORDS.join(" ");
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= full.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setI(i + 1), 55);
    return () => clearTimeout(t);
  }, [i, full.length, onDone]);

  return (
    <h1 className="text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
      {full.slice(0, i)}
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
        className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.12em] bg-white align-middle"
      />
    </h1>
  );
}
