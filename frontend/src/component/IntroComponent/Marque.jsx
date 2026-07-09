import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import SectionTitle from "./SectionTitle";

const MARQUEE = [
  {
    city: "Lisbon",
    country: "Portugal",
    img: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Oslo",
    country: "Norway",
    img: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Tulum",
    country: "Mexico",
    img: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Seoul",
    country: "Korea",
    img: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Cape Town",
    country: "South Africa",
    img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Positano",
    country: "Italy",
    img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Queenstown",
    country: "New Zealand",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Chefchaouen",
    country: "Morocco",
    img: "https://images.unsplash.com/photo-1531761535209-180857e963b9?auto=format&fit=crop&w=900&q=80",
  },
];
export default function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <section id="explore" className="relative py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionEyebrow>Section 01 · In motion</SectionEyebrow>
        <SectionTitle sub="A never-ending stream of the world's quiet, beautiful corners.">
          Places, streaming by.
        </SectionTitle>
      </div>

      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#09090B] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#09090B] to-transparent" />
        <motion.div
          className="flex gap-6 group-hover:[animation-play-state:paused]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        >
          {row.map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04, y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="relative h-[320px] w-[260px] shrink-0 overflow-hidden rounded-[30px] border border-white/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <img
                src={c.img}
                alt={c.city}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-lg font-semibold text-white">{c.city}</p>
                <p className="text-xs text-white/60">{c.country}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
