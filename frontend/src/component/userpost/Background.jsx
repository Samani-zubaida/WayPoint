import { motion } from "framer-motion";

export default function Background() {
  return (
    <>
      {/* Main background */}
      <div className="fixed inset-0 -z-50 bg-[#070B14]" />

      {/* Aurora */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        fixed
        top-[-220px]
        left-[-180px]
        w-[650px]
        h-[650px]
        rounded-full
        bg-cyan-500/20
        blur-[160px]
        -z-40
      "
      />

      <motion.div
        animate={{
          x: [0, -70, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        fixed
        bottom-[-200px]
        right-[-150px]
        w-[700px]
        h-[700px]
        rounded-full
        bg-indigo-500/20
        blur-[180px]
        -z-40
      "
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="
        fixed
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[500px]
        h-[500px]
        rounded-full
        bg-purple-500/10
        blur-[160px]
        -z-40
      "
      />
    </>
  );
}