import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, Gamepad2, BookOpen, Shield, Sparkles, Users } from "lucide-react";
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
  const [focusedInput, setFocusedInput] = useState<1 | 2 | null>(null);

  const sanitizeName = (name: string) => name.replace(/[<>"'&\\/]/g, '').trim();

  const handleStart = () => {
    const name1 = sanitizeName(p1);
    const name2 = sanitizeName(p2);
    if (!name1 || !name2) { setError("Both names are needed to start the night!"); return; }
    if (name1.length > 20 || name2.length > 20) { setError("Names must be 20 characters or less."); return; }
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
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* Tab Navigation */}
        <div className="mb-4 flex items-center rounded-2xl bg-muted/30 p-1.5 backdrop-blur-xl border border-border/20">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold font-body tracking-wider uppercase transition-all duration-300 ${
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground/70"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "var(--gradient-primary)",
                      boxShadow: "var(--glow-primary), inset 0 1px 0 hsl(0 0% 100% / 0.12)",
                    }}
                    transition={{ type: "spring", damping: 28, stiffness: 350 }}
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

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab === "play" && (
              <div
                className="rounded-2xl border border-border/30 backdrop-blur-xl p-8 shadow-2xl"
                style={{ background: "var(--gradient-card)" }}
              >
                {/* Header */}
                <div className="mb-8 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--secondary) / 0.15))",
                      boxShadow: "var(--glow-soft)",
                    }}
                  >
                    <Heart className="h-8 w-8 text-primary fill-primary/30" />
                  </motion.div>
                  <h1 className="font-display text-4xl font-bold text-foreground tracking-tight leading-none">
                    The Love Lobby
                  </h1>
                  <p className="mt-3 text-muted-foreground text-sm font-body">
                    Enter your names to begin the night 😈
                  </p>
                </div>

                {/* Decorative divider */}
                <div className="gold-divider mb-7" />

                {/* Inputs */}
                <div className="space-y-5">
                  {[
                    { label: "Player 1", value: p1, set: setP1, num: 1 as const, icon: "💋" },
                    { label: "Player 2", value: p2, set: setP2, num: 2 as const, icon: "🔥" },
                  ].map(({ label, value, set, num, icon }) => (
                    <div key={num}>
                      <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground font-body">
                        <Users className="w-3 h-3" />
                        {label}
                        <span className="text-[10px]">{icon}</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => { set(e.target.value); setError(""); }}
                          onFocus={() => setFocusedInput(num)}
                          onBlur={() => setFocusedInput(null)}
                          placeholder={`Enter ${label.toLowerCase()} name...`}
                          maxLength={20}
                          className="w-full rounded-xl border bg-input/40 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-300 font-body"
                          style={{
                            borderColor: focusedInput === num
                              ? num === 1 ? "hsl(var(--crimson-p1) / 0.5)" : "hsl(var(--plum-p2) / 0.5)"
                              : "hsl(var(--border) / 0.4)",
                            boxShadow: focusedInput === num
                              ? num === 1 ? "0 0 0 3px hsl(var(--crimson-p1) / 0.1), 0 0 20px hsl(var(--crimson-p1) / 0.08)" : "0 0 0 3px hsl(var(--plum-p2) / 0.1), 0 0 20px hsl(var(--plum-p2) / 0.08)"
                              : "none",
                          }}
                        />
                        {value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                            style={{
                              background: num === 1 ? "hsl(var(--crimson-p1))" : "hsl(var(--plum-p2))",
                              boxShadow: num === 1
                                ? "0 0 8px hsl(var(--crimson-p1) / 0.5)"
                                : "0 0 8px hsl(var(--plum-p2) / 0.5)",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      className="text-center text-xs text-destructive font-medium font-body py-2 px-3 rounded-lg bg-destructive/8 border border-destructive/15"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleStart}
                    className="group w-full flex items-center justify-center gap-2.5 rounded-xl py-4 font-body text-sm font-bold text-primary-foreground tracking-wider uppercase transition-all duration-300 shine-sweep"
                    style={{
                      background: "var(--gradient-primary)",
                      boxShadow: "var(--glow-primary), 0 4px 15px hsl(var(--primary) / 0.25)",
                    }}
                  >
                    <Sparkles className="w-4 h-4 opacity-70" />
                    Enter the Night
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === "how" && (
              <div
                className="rounded-2xl border border-border/30 backdrop-blur-xl p-8 shadow-2xl"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
                    How It Works
                  </h2>
                </div>
                <div className="gold-divider mb-6" />
                <div className="space-y-5">
                  {[
                    { step: "01", title: "Enter Names", desc: "Both players enter their names to personalize the experience.", icon: "✍️" },
                    { step: "02", title: "Take Turns", desc: "Players alternate picking numbered blocks from a 5×6 grid.", icon: "🎲" },
                    { step: "03", title: "Complete Challenges", desc: "Each block reveals a fun, flirty, or romantic challenge.", icon: "💕" },
                    { step: "04", title: "Finish All 30", desc: "Complete all challenges to finish — keep the spark alive!", icon: "🔥" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/20 transition-colors duration-200"
                    >
                      <span
                        className="flex-shrink-0 w-10 h-10 rounded-xl text-xs font-bold font-body flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.1))",
                          color: "hsl(var(--primary))",
                          border: "1px solid hsl(var(--primary) / 0.2)",
                        }}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-foreground font-body">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-body">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "rules" && (
              <div
                className="rounded-2xl border border-border/30 backdrop-blur-xl p-8 shadow-2xl"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
                    Rules
                  </h2>
                </div>
                <div className="gold-divider mb-6" />
                <ul className="space-y-3">
                  {[
                    "Each player takes turns selecting a block.",
                    "Once a block is selected, it cannot be chosen again.",
                    "Complete the challenge before moving to the next turn.",
                    "Be honest, have fun, and respect each other's boundaries.",
                    "The game ends when all 30 blocks have been completed.",
                    "No skipping — every challenge must be attempted!",
                  ].map((rule, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 text-sm text-foreground/80 p-2.5 rounded-lg hover:bg-muted/15 transition-colors duration-200"
                    >
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-lg text-[10px] font-bold font-body flex items-center justify-center mt-0.5"
                        style={{
                          background: "hsl(var(--primary) / 0.12)",
                          color: "hsl(var(--primary))",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="leading-relaxed font-body">{rule}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PlayerSetup;
