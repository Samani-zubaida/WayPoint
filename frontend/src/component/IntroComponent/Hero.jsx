import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import TypingHeadline from "./TypingHeadLine";
import CardStack from "./CardStack";
import Counter from "./Counter";
import Stat from "./Stat";

export default function Hero() {
  const [typed, setTyped] = useState(false);

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-[1240px] flex-col items-center px-6 pt-36 pb-20 lg:pt-44">
      <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            AI-powered travel discovery
          </motion.div>

          <TypingHeadline onDone={() => setTyped(true)} />

          <AnimatePresence>
            {typed && (
              <>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
                >
                  WayPoint is a quiet, cinematic atlas. Curated destinations, offline maps,
                  and a private space to save the places you actually want to remember.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                >
                  <a
                    href="#"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black shadow-[0_20px_50px_-15px_rgba(255,255,255,0.5)] transition hover:bg-white/90"
                  >
                    Start Exploring
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/5"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <Play className="h-3.5 w-3.5" /> Watch Demo
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-12 grid max-w-md grid-cols-3 gap-6"
                >
                  <Stat n={<Counter to={182} />} label="Countries" />
                  <Stat n={<Counter to={12400} suffix="+" />} label="Places" />
                  <Stat n={<Counter to={98} suffix="%" />} label="Loved" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <CardStack />
        </div>
      </div>
    </section>
  );
}
