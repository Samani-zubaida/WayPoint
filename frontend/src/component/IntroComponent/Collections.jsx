import SectionEyebrow from "./SectionEyebrow";
import SectionTitle from "./SectionTitle";
import { MapPin } from "lucide-react";
import {motion} from "framer-motion"
const COLLECTIONS = [
  { city: "Faroe Islands", country: "Denmark", h: 420, img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80" },
  { city: "Kyoto", country: "Japan", h: 280, img: "https://images.unsplash.com/photo-1478436127897-769e1538f1a2?auto=format&fit=crop&w=800&q=80" },
  { city: "Dolomites", country: "Italy", h: 360, img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80" },
  { city: "Lofoten", country: "Norway", h: 480, img: "https://images.unsplash.com/photo-1520962880247-cfaf541c8724?auto=format&fit=crop&w=800&q=80" },
  { city: "Amalfi", country: "Italy", h: 320, img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=800&q=80" },
  { city: "Bagan", country: "Myanmar", h: 260, img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80" },
  { city: "Tuscany", country: "Italy", h: 400, img: "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?auto=format&fit=crop&w=800&q=80" },
  { city: "Iceland", country: "Highlands", h: 340, img: "https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?auto=format&fit=crop&w=800&q=80" },
];

export default function Collections() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionEyebrow>Section 03 · Collections</SectionEyebrow>
        <SectionTitle sub="Loose, personal. The way you'd actually save a place.">
          Your private atlas.
        </SectionTitle>

        <div className="columns-2 gap-5 sm:columns-3 lg:columns-4">
          {COLLECTIONS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.06 }}
              className="group relative mb-5 break-inside-avoid overflow-hidden rounded-[28px] border border-white/10"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <div style={{ height: c.h }} className="relative w-full">
                <img src={c.img} alt={c.city} className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 transition group-hover:opacity-100" />
                <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-90 transition group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                    <MapPin className="h-3 w-3" /> {c.country}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">{c.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}