import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-md p-8 text-center shadow-lg">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
          >
            <Heart className="h-8 w-8 text-primary fill-primary/40" />
          </motion.div>

          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight mb-2">
            Game Complete! 🎉
          </h1>
          <p className="text-muted-foreground text-sm mb-1">
            Beautiful game,{" "}
            <span className="text-crimson font-semibold">{player1}</span> &{" "}
            <span className="text-plum font-semibold">{player2}</span> 💋
          </p>
          <p className="text-muted-foreground text-xs mb-6">
            Ready for another round?
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground tracking-wide hover:opacity-90 transition-all duration-200 shadow-md"
          >
            <RotateCcw className="h-4 w-4" />
            Play Again
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default GameOver;
