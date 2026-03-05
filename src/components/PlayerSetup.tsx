import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Gamepad2, BookOpen, Shield } from "lucide-react";
import FloatingHearts from "./FloatingHearts";

interface PlayerSetupProps {
  onStart: (p1: string, p2: string) => void;
}

const tabs = [
  { id: "play", label: "Play", icon: Gamepad2 },
  { id: "how", label: "How It Works", icon: BookOpen },
  { id: "rules", label: "Rules", icon: Shield },
] as const;

type TabId = typeof tabs[number]["id"];

const PlayerSetup = ({ onStart }: PlayerSetupProps) => {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("play");

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
        {/* Tabs */}
        <div className="mb-3 flex items-center gap-1 rounded-xl bg-muted/40 p-1 backdrop-blur-md border border-border/30">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold font-body tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-primary shadow-lg"
                    style={{
                      boxShadow: "0 4px 14px hsl(var(--primary) / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.1)",
                    }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "play" && (
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
          )}

          {activeTab === "how" && (
            <div className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-md p-8 shadow-lg">
              <h2 className="font-display text-2xl font-bold text-foreground tracking-tight mb-5">
                How It Works
              </h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Enter Names", desc: "Both players enter their names to personalize the experience." },
                  { step: "2", title: "Take Turns", desc: "Players alternate picking numbered blocks from a 5×6 grid." },
                  { step: "3", title: "Complete Challenges", desc: "Each block reveals a fun, flirty, or romantic challenge to complete together." },
                  { step: "4", title: "Finish All 30", desc: "Complete all 30 challenges to finish the game — and keep the spark alive!" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "rules" && (
            <div className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-md p-8 shadow-lg">
              <h2 className="font-display text-2xl font-bold text-foreground tracking-tight mb-5">
                Rules
              </h2>
              <ul className="space-y-3">
                {[
                  "Each player takes turns selecting a block.",
                  "Once a block is selected, it cannot be chosen again.",
                  "Complete the challenge before moving to the next turn.",
                  "Be honest, have fun, and respect each other's boundaries.",
                  "The game ends when all 30 blocks have been completed.",
                  "No skipping — every challenge must be attempted!",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlayerSetup;
