import { motion } from "framer-motion";


export default function SectionTitle({ children, sub }) {
  return (
    <div className="mb-14 max-w-2xl">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-semibold tracking-tight text-white sm:text-5xl"
      >
        {children}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 text-base text-white/55 sm:text-lg"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
