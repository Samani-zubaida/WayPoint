import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import SectionTitle from "./SectionTitle";
import { Search, Save, Navigation, Share2 } from "lucide-react";

const TIMELINE = [
  {
    icon: Search,
    label: "Discover",
    copy: "Curated places, quietly surfaced.",
  },
  { icon: Save, label: "Save", copy: "Build your private atlas." },
  { icon: Navigation, label: "Navigate", copy: "Offline maps that just work." },
  { icon: Share2, label: "Share", copy: "Trips your friends actually use." },
];
export default function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const pathLen = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section ref={ref} className="relative py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionEyebrow>Section 04 · Flow</SectionEyebrow>
        <SectionTitle sub="Four moves. That's the whole app.">
          How it feels to use WayPoint.
        </SectionTitle>

        <div className="relative">
          <svg
            className="absolute left-0 top-1/2 hidden h-16 w-full -translate-y-1/2 md:block"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
          >
            <path
              d="M 40 30 Q 250 -10, 500 30 T 960 30"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
              fill="none"
            />
            <motion.path
              d="M 40 30 Q 250 -10, 500 30 T 960 30"
              stroke="url(#gr)"
              strokeWidth="1.8"
              fill="none"
              style={{ pathLength: pathLen }}
            />
            <defs>
              <linearGradient id="gr" x1="0" x2="1">
                <stop offset="0" stopColor="#60a5fa" />
                <stop offset="1" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid gap-8 md:grid-cols-4">
            {TIMELINE.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  className="relative rounded-[30px] border border-white/10 p-6 backdrop-blur-xl"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-white/40">
                    Step 0{i + 1}
                  </div>
                  <div className="mt-1 text-xl font-semibold text-white">
                    {t.label}
                  </div>
                  <p className="mt-2 text-sm text-white/60">{t.copy}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
