import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";

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
      setError("Both player names are required!");
      return;
    }
    if (name1.length > 20 || name2.length > 20) {
      setError("Names must be 20 characters or less.");
      return;
    }
    onStart(name1, name2);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md card-gradient rounded-2xl border border-border p-8 glow-primary"
      >
        <div className="mb-8 text-center">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20"
          >
            <Gamepad2 className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            2 Player Challenge
          </h1>
          <p className="mt-2 text-muted-foreground">Enter your names to begin!</p>
        </div>

        <div className="space-y-4">
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
              className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-secondary">
              Player 2
            </label>
            <input
              type="text"
              value={p2}
              onChange={(e) => { setP2(e.target.value); setError(""); }}
              placeholder="Enter name..."
              maxLength={20}
              className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="w-full rounded-xl bg-primary py-3.5 font-display text-lg font-semibold text-primary-foreground transition-all hover:glow-primary"
          >
            Start Game 🎮
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerSetup;
