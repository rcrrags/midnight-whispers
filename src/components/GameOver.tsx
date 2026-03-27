import { motion } from "framer-motion";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import FloatingHearts from "./FloatingHearts";

interface GameOverProps {
  player1: string;
  player2: string;
  onRestart: () => void;
}

const GameOver = ({ player1, player2, onRestart }: GameOverProps) => {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
      <FloatingHearts />
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 220 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div
          className="rounded-2xl border border-border/30 backdrop-blur-xl p-10 text-center shadow-2xl"
          style={{ background: "var(--gradient-card)" }}
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-6 flex h-18 w-18 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--secondary) / 0.15))",
              boxShadow: "var(--glow-primary)",
              width: "72px",
              height: "72px",
            }}
          >
            <Heart className="h-9 w-9 text-primary fill-primary/40" />
          </motion.div>

          <h1 className="font-display text-4xl font-bold text-foreground tracking-tight mb-3 leading-none">
            Game Complete! 🎉
          </h1>

          <div className="gold-divider my-5" />

          <p className="text-foreground/80 text-sm mb-1 font-body">
            Beautiful game,{" "}
            <span className="font-bold" style={{ color: "hsl(var(--crimson-p1))" }}>{player1}</span> &{" "}
            <span className="font-bold" style={{ color: "hsl(var(--plum-p2))" }}>{player2}</span> 💋
          </p>
          <p className="text-muted-foreground text-xs mb-7 font-body">
            Ready for another round?
          </p>

          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onRestart}
            className="inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-body text-sm font-bold text-primary-foreground tracking-wider uppercase transition-all duration-300 shine-sweep"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "var(--glow-primary)",
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Play Again
            <Sparkles className="h-3.5 w-3.5 opacity-70" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default GameOver;
