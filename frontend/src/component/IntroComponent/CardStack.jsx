import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bookmark, CloudSun, Star } from "lucide-react";
import MiniMap from "./MiniMap";

const HERO_CARDS = [
  {
    city: "Kyoto",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    weather: "22°  Clear",
    rating: 4.9,
  },
  {
    city: "Reykjavík",
    country: "Iceland",
    img: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=1200&q=80",
    weather: "6°  Aurora",
    rating: 4.8,
  },
  {
    city: "Marrakech",
    country: "Morocco",
    img: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=1200&q=80",
    weather: "28°  Sunny",
    rating: 4.7,
  },
  {
    city: "Santorini",
    country: "Greece",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    weather: "26°  Warm",
    rating: 4.9,
  },
  {
    city: "Banff",
    country: "Canada",
    img: "https://images.unsplash.com/photo-1609825488888-3a766db05542?auto=format&fit=crop&w=1200&q=80",
    weather: "8°  Crisp",
    rating: 4.9,
  },
];
export default function CardStack() {
  const [order, setOrder] = useState(HERO_CARDS);

  useEffect(() => {
    const id = setInterval(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto h-[460px] w-full max-w-[420px] sm:h-[520px]">
      {order.map((c, idx) => {
        const depth = order.length - 1 - idx; // 0 = front
        const isFront = idx === order.length - 1;
        return (
          <motion.div
            key={c.city}
            layout
            initial={false}
            animate={{
              y: isFront ? 0 : -depth * 22,
              scale: isFront ? 1 : 1 - depth * 0.05,
              opacity: depth > 3 ? 0 : 1,
              filter: isFront
                ? "blur(0px)"
                : `blur(${Math.min(depth * 1.2, 4)}px)`,
              zIndex: idx,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            className="absolute inset-x-0 top-0 mx-auto overflow-hidden rounded-[34px] border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div className="relative aspect-[4/5] w-full">
              <img
                src={c.img}
                alt={c.city}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <button
                aria-label="Bookmark"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <Bookmark className="h-4 w-4 text-white" />
              </button>

              <div
                className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 p-4 backdrop-blur-xl"
                style={{ background: "rgba(20,20,22,0.55)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-white">
                      {c.city}
                    </p>
                    <p className="truncate text-xs text-white/60">
                      {c.country}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white">
                    <Star className="h-3 w-3 fill-emerald-400 text-emerald-400" />
                    {c.rating}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/70">
                    <CloudSun className="h-3.5 w-3.5 text-blue-300" />
                    {c.weather}
                  </div>
                  <MiniMap />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
