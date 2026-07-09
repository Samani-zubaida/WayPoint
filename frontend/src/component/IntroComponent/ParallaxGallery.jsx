import { useRef } from "react";
import SectionEyebrow from "./SectionEyebrow";
import SectionTitle from "./SectionTitle";
import { motion } from "framer-motion";
import { useMotionValue, useSpring,useTransform} from "framer-motion";
export default function ParallaxGallery() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 40);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 40);
  };
  const GALLERY = [
    "https://images.unsplash.com/photo-1520962880247-cfaf541c8724?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80",
  ];

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative overflow-hidden py-24"
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionEyebrow>Section 05 · Cinematic</SectionEyebrow>
        <SectionTitle sub="Move your cursor. Let the images breathe.">
          A gallery that moves with you.
        </SectionTitle>
      </div>

      <div className="relative h-[520px] w-full">
        {GALLERY.map((src, i) => {
          const offset = (i - 2) * 22;
          const depth = 1 + Math.abs(i - 2) * 0.2;
          const w = i === 2 ? 520 : 380;
          const h = i === 2 ? 460 : 340;
          return (
            <motion.div
              key={i}
              style={{
                x: useTransform(px, (v) => v * depth),
                y: useTransform(py, (v) => v * depth * 0.6),
                left: `calc(50% + ${offset}%)`,
                width: w,
                height: h,
                zIndex: 10 - Math.abs(i - 2),
              }}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[34px] border border-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.95)]"
            >
              <motion.img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 12 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                loading="lazy"
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
