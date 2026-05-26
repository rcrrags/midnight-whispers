import { motion } from "framer-motion";
import { Lock, Sparkles, Heart, Flame, RotateCcw } from "lucide-react";
import { CATEGORIES, type CategoryId } from "@/data/categories";

interface Props {
  player1: string;
  player2: string;
  chemistry: number;
  streak: number;
  onPick: (id: CategoryId) => void;
  onRestart: () => void;
}

const CategoryDashboard = ({ player1, player2, chemistry, streak, onPick, onRestart }: Props) => {
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] px-4 pb-16 pt-4">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--crimson-p1) / 0.7), transparent 60%)" }}
        />
        <div
          className="absolute -bottom-40 -right-32 h-[460px] w-[460px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--plum-p2) / 0.7), transparent 60%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Couple header */}
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 rounded-3xl border border-white/5 p-5 backdrop-blur-2xl"
          style={{ background: "var(--gradient-glass)", boxShadow: "var(--glow-soft)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar name={player1} colorVar="--crimson-p1" />
              <Heart className="h-4 w-4 fill-white/30 text-white/40" />
              <Avatar name={player2} colorVar="--plum-p2" />
            </div>
            <motion.button
              whileHover={{ scale: 1.08, rotate: -90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRestart}
              className="rounded-full p-2.5 text-muted-foreground hover:bg-white/5 hover:text-foreground"
              aria-label="Restart"
            >
              <RotateCcw className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Chemistry meter */}
          <div className="mt-5">
            <div className="mb-1.5 flex items-end justify-between">
              <div className="flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-[hsl(var(--crimson-p1))]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Chemistry
                </span>
              </div>
              <span className="font-display text-2xl leading-none text-foreground">
                {Math.min(chemistry, 100)}
                <span className="text-sm text-muted-foreground">/100</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(chemistry, 100)}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--crimson-p1)), hsl(var(--plum-p2)))",
                  boxShadow: "0 0 20px hsl(var(--crimson-p1) / 0.5)",
                }}
              />
            </div>
            {streak > 1 && (
              <p className="mt-2 text-[11px] text-[hsl(var(--accent))]">
                <Sparkles className="mr-1 inline h-3 w-3" />
                {streak}-card streak — keep it going
              </p>
            )}
          </div>
        </motion.div>

        {/* Title */}
        <div className="mb-5 px-1">
          <h1 className="font-display text-4xl leading-[0.95] text-foreground sm:text-5xl">
            Choose your <em className="italic text-[hsl(var(--accent))]">mood</em>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Each card opens a cinematic moment. Swipe, react, unlock more.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, i) => {
            const locked = chemistry < cat.unlockAt;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={!locked ? { y: -4, scale: 1.015 } : {}}
                whileTap={!locked ? { scale: 0.97 } : {}}
                onClick={() => !locked && onPick(cat.id)}
                disabled={locked}
                className="group relative aspect-[5/6] overflow-hidden rounded-3xl border border-white/5 p-4 text-left backdrop-blur-xl transition-all sm:aspect-[5/6]"
                style={{
                  background:
                    "linear-gradient(160deg, hsl(0 0% 9% / 0.85), hsl(0 0% 5% / 0.95))",
                  boxShadow: locked
                    ? "inset 0 1px 0 hsl(0 0% 100% / 0.03)"
                    : `inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 20px 50px -25px hsl(${cat.hue} 80% 55% / 0.5)`,
                  opacity: locked ? 0.55 : 1,
                  cursor: locked ? "not-allowed" : "pointer",
                }}
              >
                {/* Color glow */}
                <div
                  aria-hidden
                  className="absolute -top-12 -right-10 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                  style={{
                    background: `radial-gradient(circle, hsl(${cat.hue} 85% 60% / 0.55), transparent 65%)`,
                    opacity: locked ? 0.15 : 0.4,
                  }}
                />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="text-3xl sm:text-4xl">{cat.emoji}</div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl leading-tight text-foreground sm:text-2xl">
                      {cat.label}
                    </h3>
                    <p className="mt-1 text-[11px] text-muted-foreground">{cat.tagline}</p>

                    {locked ? (
                      <div className="mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
                        <Lock className="h-3 w-3" />
                        unlock at {cat.unlockAt}
                      </div>
                    ) : (
                      <div
                        className="mt-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.15em]"
                        style={{
                          borderColor: `hsl(${cat.hue} 80% 60% / 0.35)`,
                          color: `hsl(${cat.hue} 90% 75%)`,
                          background: `hsl(${cat.hue} 80% 50% / 0.08)`,
                        }}
                      >
                        Open
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Avatar = ({ name, colorVar }: { name: string; colorVar: string }) => (
  <div className="flex items-center gap-2">
    <div
      className="flex h-9 w-9 items-center justify-center rounded-2xl font-display text-base"
      style={{
        background: `hsl(var(${colorVar}) / 0.15)`,
        color: `hsl(var(${colorVar}))`,
        border: `1px solid hsl(var(${colorVar}) / 0.3)`,
        boxShadow: `0 0 18px hsl(var(${colorVar}) / 0.25)`,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
    <span className="text-sm font-medium text-foreground">{name}</span>
  </div>
);

export default CategoryDashboard;
