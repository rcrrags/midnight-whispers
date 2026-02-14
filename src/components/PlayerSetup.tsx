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

  const sanitizeName = (name: string) => {
    return name.replace(/[<>"'&\\/]/g, '').trim();
  };

  const handleStart = () => {
    const name1 = sanitizeName(p1);
    const name2 = sanitizeName(p2);
    if (!name1 || !name2) {
      setError("Both names are needed to start the night!");
      return;
    }
    if (name1.length > 20 || name2.length > 20) {
      setError("Names must be 20 characters or less.");
      return;
    }
    if (!/^[a-zA-Z0-9\s._-]+$/.test(name1) || !/^[a-zA-Z0-9\s._-]+$/.test(name2)) {
      setError("Names can only contain letters, numbers, spaces, dots, hyphens and underscores.");
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
        className="relative z-10 w-full max-w-md glass-card rounded-3xl border border-gold p-8 glow-soft animate-breathe"
      >
        <div className="mb-8 text-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg, hsl(345 70% 35% / 0.25), hsl(43 56% 52% / 0.15))" }}
          >
            <Heart className="h-8 w-8 text-accent fill-accent/40" />
          </motion.div>
          <h1 className="font-display text-4xl font-bold text-foreground italic tracking-wide">
            The Love Lobby
          </h1>
          <div className="gold-divider mx-auto mt-3 w-24" />
          <p className="mt-3 text-muted-foreground text-sm tracking-wider">
            Let the fun begin 😈
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-accent tracking-wider">
              Player 1
            </label>
            <input
              type="text"
              value={p1}
              onChange={(e) => { setP1(e.target.value); setError(""); }}
              placeholder="Enter name..."
              maxLength={20}
              className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:glow-gold transition-all duration-300"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-rose-gold tracking-wider">
              Player 2
            </label>
            <input
              type="text"
              value={p2}
              onChange={(e) => { setP2(e.target.value); setError(""); }}
              placeholder="Enter name..."
              maxLength={20}
              className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-rose-gold/50 transition-all duration-300"
              style={{ boxShadow: "none" }}
              onFocus={(e) => e.target.style.boxShadow = "0 0 15px hsl(350 30% 60% / 0.25)"}
              onBlur={(e) => e.target.style.boxShadow = "none"}
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
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(43 56% 52% / 0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="w-full rounded-xl py-3.5 font-display text-xl font-semibold text-foreground tracking-wider transition-all duration-300 border border-accent/30"
            style={{ background: "linear-gradient(135deg, hsl(345 70% 30%), hsl(345 60% 38%))" }}
          >
            🔥 Enter the Night 😍
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerSetup;
