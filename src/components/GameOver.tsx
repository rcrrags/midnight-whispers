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
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <FloatingHearts />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="relative z-10 w-full max-w-md glass-card rounded-3xl border border-primary/20 p-8 text-center glow-primary"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15"
        >
          <Heart className="h-10 w-10 text-primary fill-primary/50" />
        </motion.div>

        <h1 className="font-display text-3xl font-bold text-foreground italic mb-3">
          The Night Isn't Over…
        </h1>
        <p className="text-muted-foreground mb-1">
          Beautiful game,{" "}
          <span className="text-primary font-semibold">{player1}</span> &{" "}
          <span className="text-accent font-semibold">{player2}</span> 💋
        </p>
        <p className="text-muted-foreground mb-8 text-sm italic">
          Ready for Round 2?
        </p>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(340 85% 55% / 0.5)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 font-display text-lg font-semibold text-primary-foreground transition-all"
          style={{ background: "linear-gradient(135deg, hsl(340 85% 55%), hsl(350 90% 60%))" }}
        >
          <RotateCcw className="h-5 w-5" />
          Play Again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GameOver;
