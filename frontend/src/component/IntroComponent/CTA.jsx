import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
export default function CTA() {
  return (
    <section id="ai" className="relative py-40">
      <div className="mx-auto max-w-[1240px] px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-7xl lg:text-[112px]"
        >
          Go somewhere<br />worth remembering.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-14"
        >
          <a
            href="/explore"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-base font-medium text-black shadow-[0_40px_100px_-20px_rgba(255,255,255,0.5)] transition hover:bg-white/90"
          >
            Start Exploring
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
