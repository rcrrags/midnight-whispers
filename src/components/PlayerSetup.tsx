import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
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
    <div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
      <FloatingHearts />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-md p-8 shadow-lg">
          <div className="mb-8 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
            >
              <Heart className="h-7 w-7 text-primary fill-primary/30" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
              The Love Lobby
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Enter your names to begin 😈
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Player 1
              </label>
              <input
                type="text"
                value={p1}
                onChange={(e) => { setP1(e.target.value); setError(""); }}
                placeholder="Enter name..."
                maxLength={20}
                className="w-full rounded-xl border border-border bg-input/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Player 2
              </label>
              <input
                type="text"
                value={p2}
                onChange={(e) => { setP2(e.target.value); setError(""); }}
                placeholder="Enter name..."
                maxLength={20}
                className="w-full rounded-xl border border-border bg-input/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all duration-200"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-destructive font-medium"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-body text-sm font-semibold text-primary-foreground tracking-wide hover:opacity-90 transition-all duration-200 shadow-md"
            >
              Enter the Night
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerSetup;
