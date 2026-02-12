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
        className="relative z-10 w-full max-w-md glass-card rounded-3xl border border-accent/20 p-8 text-center animate-breathe"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "linear-gradient(135deg, hsl(345 70% 35% / 0.25), hsl(43 56% 52% / 0.15))" }}
        >
          <Heart className="h-10 w-10 text-accent fill-accent/50" />
        </motion.div>

        <h1 className="font-display text-4xl font-bold text-foreground italic mb-3 tracking-wide">
          The Night Isn't Over…
        </h1>
        <div className="gold-divider mx-auto my-4 w-20" />
        <p className="text-muted-foreground mb-1">
          Beautiful game,{" "}
          <span className="text-accent font-semibold">{player1}</span> &{" "}
          <span className="text-rose-gold font-semibold">{player2}</span> 💋
        </p>
        <p className="text-muted-foreground mb-8 text-sm italic tracking-wider">
          Ready for Round 2?
        </p>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(43 56% 52% / 0.3)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-display text-xl font-semibold text-foreground tracking-wider transition-all duration-300 border border-accent/30"
          style={{ background: "linear-gradient(135deg, hsl(345 70% 28%), hsl(345 60% 35%))" }}
        >
          <RotateCcw className="h-5 w-5" />
          Play Again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GameOver;
