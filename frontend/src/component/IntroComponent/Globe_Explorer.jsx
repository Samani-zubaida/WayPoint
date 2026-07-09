import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe2 } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";
import SectionTitle from "./SectionTitle";

const CONTINENTS = [
  {
    name: "Europe",
    cx: 52,
    cy: 38,
    picks: [
      {
        city: "Paris",
        img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
      },
      {
        city: "Amalfi",
        img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=600&q=80",
      },
      {
        city: "Bruges",
        img: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    name: "Asia",
    cx: 72,
    cy: 44,
    picks: [
      {
        city: "Tokyo",
        img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
      },
      {
        city: "Bali",
        img: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=600&q=80",
      },
      {
        city: "Jaipur",
        img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    name: "Americas",
    cx: 25,
    cy: 50,
    picks: [
      {
        city: "Patagonia",
        img: "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?auto=format&fit=crop&w=600&q=80",
      },
      {
        city: "NYC",
        img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80",
      },
      {
        city: "Havana",
        img: "https://images.unsplash.com/photo-1500043357865-c6b8827edf10?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    name: "Africa",
    cx: 55,
    cy: 60,
    picks: [
      {
        city: "Marrakech",
        img: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=600&q=80",
      },
      {
        city: "Cairo",
        img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=600&q=80",
      },
      {
        city: "Zanzibar",
        img: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    name: "Oceania",
    cx: 85,
    cy: 70,
    picks: [
      {
        city: "Sydney",
        img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80",
      },
      {
        city: "Queenstown",
        img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
      },
      {
        city: "Fiji",
        img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];
export default function GlobeExplorer() {
  const [active, setActive] = useState(CONTINENTS[0]);

  return (
    <section id="map" className="relative py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionEyebrow>Section 02 · Interactive globe</SectionEyebrow>
        <SectionTitle sub="Hover a region. Watch its stories unfold.">
          The world, one hover away.
        </SectionTitle>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div
            className="relative aspect-square w-full overflow-hidden rounded-[40px] border border-white/10 p-4 backdrop-blur-xl sm:p-8"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <motion.div
              className="absolute inset-6 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, rgba(59,130,246,0.35), transparent 55%), radial-gradient(circle at 65% 70%, rgba(16,185,129,0.28), transparent 55%), #0d0d12",
                boxShadow:
                  "inset 0 0 60px rgba(0,0,0,0.9), 0 40px 80px -30px rgba(59,130,246,0.35)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-white/5"
                  style={{ transform: `rotateY(${i * 22.5}deg)` }}
                />
              ))}
            </motion.div>

            <div className="absolute inset-0">
              {CONTINENTS.map((c) => (
                <button
                  key={c.name}
                  onMouseEnter={() => setActive(c)}
                  onFocus={() => setActive(c)}
                  className="group absolute"
                  style={{
                    left: `${c.cx}%`,
                    top: `${c.cy}%`,
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  <span
                    className={`relative flex h-3 w-3 items-center justify-center rounded-full transition ${
                      active.name === c.name ? "bg-emerald-400" : "bg-white/80"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 rounded-full ${
                        active.name === c.name
                          ? "bg-emerald-400"
                          : "bg-white/60"
                      } animate-ping opacity-60`}
                    />
                  </span>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-md">
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-2 text-white/60">
              <Globe2 className="h-4 w-4" />
              <span className="text-sm">Now viewing · {active.name}</span>
            </div>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-3 gap-3"
              >
                {active.picks.map((p, i) => (
                  <motion.div
                    key={p.city}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group relative aspect-[3/4] overflow-hidden rounded-[24px] border border-white/10"
                  >
                    <img
                      src={p.img}
                      alt={p.city}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-sm font-medium text-white">
                      {p.city}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
