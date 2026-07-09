import { motion } from "framer-motion";
import { MessageCircle,MapPin,Heart} from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";
import SectionTitle from "./SectionTitle";

const FEED = [
  { user: "@amaraskies", loc: "Faroe Islands", likes: "12.4k", img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=700&q=80" },
  { user: "@leonwanders", loc: "Kyoto, Japan", likes: "8.9k", img: "https://images.unsplash.com/photo-1478436127897-769e1538f1a2?auto=format&fit=crop&w=700&q=80" },
  { user: "@nadiaroams", loc: "Chefchaouen", likes: "22.1k", img: "https://images.unsplash.com/photo-1531761535209-180857e963b9?auto=format&fit=crop&w=700&q=80" },
  { user: "@theomiles", loc: "Patagonia, AR", likes: "5.6k", img: "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?auto=format&fit=crop&w=700&q=80" },
  { user: "@yumafields", loc: "Banff, CA", likes: "14.8k", img: "https://images.unsplash.com/photo-1609825488888-3a766db05542?auto=format&fit=crop&w=700&q=80" },
  { user: "@iselaven", loc: "Positano, IT", likes: "9.2k", img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=700&q=80" },
  { user: "@rowanlee", loc: "Reykjavík", likes: "6.4k", img: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=700&q=80" },
  { user: "@marasees", loc: "Bali, ID", likes: "18.0k", img: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=700&q=80" },
];
export default function CommunityFeed() {
  const col = (arr, dur, delay = 0) => (
    <div className="relative h-[560px] overflow-hidden">
      <motion.div
        className="flex flex-col gap-5"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: dur, repeat: Infinity, ease: "linear", delay }}
      >
        {[...arr, ...arr].map((p, i) => (
          <div
            key={i}
            className="rounded-[26px] border border-white/10 p-3 backdrop-blur-xl"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div className="relative aspect-square overflow-hidden rounded-[18px]">
              <img src={p.img} alt={p.loc} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">{p.user}</div>
                <div className="mt-0.5 flex items-center gap-1 text-[11px] text-white/50">
                  <MapPin className="h-3 w-3" /> {p.loc}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-white/60">
                <div className="flex items-center gap-1 text-xs">
                  <Heart className="h-3.5 w-3.5" /> {p.likes}
                </div>
                <MessageCircle className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section id="community" className="relative py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionEyebrow>Section 06 · Community</SectionEyebrow>
        <SectionTitle sub="A softer feed. Places, not personalities.">
          Where travellers share, quietly.
        </SectionTitle>

        <div className="relative grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {col(FEED.slice(0, 4), 30)}
          {col(FEED.slice(4, 8), 36, -4)}
          <div className="hidden sm:block">{col([...FEED].reverse().slice(0, 4), 32, -2)}</div>
          <div className="hidden lg:block">{col(FEED.slice(2, 6), 38, -6)}</div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#09090B] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#09090B] to-transparent" />
        </div>
      </div>
    </section>
  );
}
