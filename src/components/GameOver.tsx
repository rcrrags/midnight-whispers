import { motion } from "framer-motion";
import { Trophy, RotateCcw } from "lucide-react";

interface GameOverProps {
  player1: string;
  player2: string;
  onRestart: () => void;
}

const GameOver = ({ player1, player2, onRestart }: GameOverProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="w-full max-w-md card-gradient rounded-2xl border border-border p-8 text-center glow-secondary"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20"
        >
          <Trophy className="h-10 w-10 text-secondary" />
        </motion.div>

        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          Game Over! 🎉
        </h1>
        <p className="text-muted-foreground mb-2">
          Great job, <span className="text-primary font-semibold">{player1}</span> &{" "}
          <span className="text-secondary font-semibold">{player2}</span>!
        </p>
        <p className="text-muted-foreground mb-8 text-sm">
          All 30 challenges completed!
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-3.5 font-display text-lg font-semibold text-secondary-foreground transition-all"
        >
          <RotateCcw className="h-5 w-5" />
          Play Again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GameOver;
