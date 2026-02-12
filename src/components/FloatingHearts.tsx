import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 4,
    size: 10 + Math.random() * 14,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Soft ambient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 40%, hsl(340 40% 3% / 0.6) 100%)",
        }}
      />
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute bottom-0"
          style={{ left: h.left }}
          animate={{
            y: [0, -window.innerHeight],
            opacity: [0.3, 0.1, 0],
            scale: [1, 1.1, 0.7],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart
            size={h.size}
            className="text-primary/25 fill-primary/15"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
