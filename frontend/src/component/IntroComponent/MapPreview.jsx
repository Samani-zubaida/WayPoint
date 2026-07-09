import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import SectionTitle from "./SectionTitle";
import { Navigation } from "lucide-react";


export default function MapPreview() {
  const pins = [
    { x: 18, y: 30 }, { x: 34, y: 55 }, { x: 52, y: 22 }, { x: 68, y: 62 }, { x: 82, y: 40 },
  ];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionEyebrow>Section 07 · Live map</SectionEyebrow>
        <SectionTitle sub="Routes that draw themselves. Pins that breathe.">
          Navigation, distilled.
        </SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-[40px] border border-white/10 shadow-[0_60px_120px_-40px_rgba(59,130,246,0.4)]"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(59,130,246,0.25), transparent 55%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.2), transparent 55%), #0b0b0f",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <svg viewBox="0 0 100 56" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <motion.path
              d="M 18 30 Q 26 42, 34 55 T 52 22 T 68 62 T 82 40"
              stroke="url(#route)"
              strokeWidth="0.4"
              fill="none"
              strokeDasharray="1.4 1.4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="route" x1="0" x2="1">
                <stop offset="0" stopColor="#60a5fa" />
                <stop offset="1" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>

          {pins.map((p, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 180 }}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-400/40"
                  animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
                  style={{ width: 16, height: 16, left: -8, top: -8 }}
                />
                <div className="h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(96,165,250,0.9)]" />
              </div>
            </motion.div>
          ))}

          <motion.div
            className="absolute bottom-6 left-6 right-6 max-w-sm rounded-2xl border border-white/10 p-4 backdrop-blur-xl sm:right-auto"
            style={{ background: "rgba(20,20,22,0.6)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-300">
              <Navigation className="h-3.5 w-3.5" /> Route active
            </div>
            <div className="mt-2 text-lg font-semibold text-white">Reykjavík → Vík</div>
            <div className="mt-1 text-xs text-white/50">186 km · 5 stops · offline ready</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}