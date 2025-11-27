import { motion } from 'framer-motion';

export default function BeamsBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-purple-50/30 via-transparent to-transparent dark:from-purple-950/10 dark:via-transparent dark:to-transparent" />
      
      {/* Animated beams with framer motion */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px h-full bg-linear-to-b from-transparent via-purple-500/10 dark:via-purple-400/5 to-transparent"
          style={{ left: `${20 + i * 15}%` }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleY: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[4rem_4rem] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]" />
      
      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,white_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#0a0a0a_100%)]" />
    </div>
  );
}
