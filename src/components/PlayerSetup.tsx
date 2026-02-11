import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingHearts from "./FloatingHearts";

interface PlayerSetupProps {
  onStart: (p1: string, p2: string) => void;
}

const PlayerSetup = ({ onStart }: PlayerSetupProps) => {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    const name1 = p1.trim();
    const name2 = p2.trim();
    if (!name1 || !name2) {
      setError("Both names are needed to start the night!");
      return;
    }
    if (name1.length > 20 || name2.length > 20) {
      setError("Names must be 20 characters or less.");
      return;
    }
    onStart(name1, name2);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <FloatingHearts />
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md glass-card rounded-3xl border border-primary/20 p-8 glow-soft"
      >
        <div className="mb-8 text-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15"
          >
            <Heart className="h-8 w-8 text-primary fill-primary/40" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-foreground italic">
            Couple Challenge Night
          </h1>
          <p className="mt-2 text-muted-foreground text-sm">
            Let the fun begin 😈
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary">
              Player 1
            </label>
            <input
              type="text"
              value={p1}
              onChange={(e) => { setP1(e.target.value); setError(""); }}
              placeholder="Enter name..."
              maxLength={20}
              className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-primary transition-all"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-accent">
              Player 2
            </label>
            <input
              type="text"
              value={p2}
              onChange={(e) => { setP2(e.target.value); setError(""); }}
              placeholder="Enter name..."
              maxLength={20}
              className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:glow-accent transition-all"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(340 85% 55% / 0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="w-full rounded-2xl py-3.5 font-display text-lg font-semibold text-primary-foreground transition-all"
            style={{ background: "linear-gradient(135deg, hsl(340 85% 55%), hsl(350 90% 60%))" }}
          >
            Start the Night 💋
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerSetup;
