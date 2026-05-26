import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowLeft, Heart, Flame, Hand, Eye } from "lucide-react";
import { CATEGORIES, type CategoryId } from "@/data/categories";
import { playReveal, playSwipe, playReaction } from "@/lib/soundEffects";

type Reaction = "like" | "fire" | "skip" | "wild";

interface Props {
  categoryId: CategoryId;
  currentPlayer: string;
  partnerPlayer: string;
  onReact: (r: Reaction) => void;
  onBack: () => void;
}

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

const TaskExperience = ({ categoryId, currentPlayer, partnerPlayer, onReact, onBack }: Props) => {
  const category = useMemo(() => CATEGORIES.find((c) => c.id === categoryId)!, [categoryId]);
  const [deck, setDeck] = useState<string[]>(() => shuffle(category.tasks));
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<0 | 1>(0); // 0 = current, 1 = partner

  useEffect(() => { playReveal(); }, [index]);

  const task = deck[index];
  const activeName = turn === 0 ? currentPlayer : partnerPlayer;

  const next = (r: Reaction) => {
    playReaction(r);
    onReact(r);
    if (index + 1 >= deck.length) {
      setDeck(shuffle(category.tasks));
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
    setTurn(turn === 0 ? 1 : 0);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 110) {
      playSwipe();
      next(info.offset.x > 0 ? "like" : "skip");
    } else if (info.offset.y < -110) {
      playSwipe();
      next("fire");
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] px-4 pb-12 pt-4">
      {/* Ambient hue blobs based on category */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background: `radial-gradient(circle, hsl(${category.hue} 80% 55% / 0.6), transparent 65%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-md">
        {/* Top bar */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground backdrop-blur-md hover:bg-white/10"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All moods
          </button>
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs backdrop-blur-md">
            <span>{category.emoji}</span>
            <span className="font-medium text-foreground">{category.label}</span>
          </div>
        </div>

        {/* Turn indicator */}
        <motion.div
          key={activeName + index}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Card for
          </p>
          <p
            className="font-display text-2xl leading-none"
            style={{ color: `hsl(${category.hue} 85% 75%)` }}
          >
            {activeName}
          </p>
        </motion.div>

        {/* Card stack */}
        <div className="relative mx-auto h-[460px] w-full">
          {/* Background ghost cards */}
          {[2, 1].map((offset) => (
            <div
              key={offset}
              className="absolute inset-0 rounded-[32px] border border-white/5"
              style={{
                background: "linear-gradient(160deg, hsl(0 0% 8%), hsl(0 0% 5%))",
                transform: `translateY(${offset * 10}px) scale(${1 - offset * 0.04})`,
                opacity: 0.5 - offset * 0.2,
              }}
            />
          ))}

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileDrag={{ rotate: 0, cursor: "grabbing" }}
              className="absolute inset-0 flex cursor-grab flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 p-7"
              style={{
                background:
                  "linear-gradient(160deg, hsl(0 0% 10% / 0.95), hsl(0 0% 5% / 0.98))",
                boxShadow: `inset 0 1px 0 hsl(0 0% 100% / 0.08), 0 40px 80px -30px hsl(${category.hue} 80% 50% / 0.5)`,
              }}
            >
              {/* Glow accents */}
              <div
                className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl"
                style={{
                  background: `radial-gradient(circle, hsl(${category.hue} 85% 60% / 0.6), transparent 65%)`,
                }}
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl"
                style={{
                  background: `radial-gradient(circle, hsl(${(category.hue + 40) % 360} 80% 55% / 0.4), transparent 65%)`,
                }}
              />

              <div className="relative">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-3xl">{category.emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {category.tagline}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  #{(index + 1).toString().padStart(2, "0")} · {deck.length} cards
                </div>
              </div>

              <div className="relative">
                <p className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
                  {task}
                </p>
              </div>

              <div className="relative flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                <span>← skip</span>
                <span>↑ again</span>
                <span>like →</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Reaction bar */}
        <div className="mt-6 grid grid-cols-4 gap-2">
          <ReactionButton label="Liked" emoji={<Heart className="h-4 w-4" />} hue={340} onClick={() => next("like")} />
          <ReactionButton label="Again" emoji={<Flame className="h-4 w-4" />} hue={14} onClick={() => next("fire")} />
          <ReactionButton label="Skip" emoji={<Hand className="h-4 w-4" />} hue={200} onClick={() => next("skip")} />
          <ReactionButton label="Too Wild" emoji={<Eye className="h-4 w-4" />} hue={280} onClick={() => next("wild")} />
        </div>
      </div>
    </div>
  );
};

const ReactionButton = ({
  label,
  emoji,
  hue,
  onClick,
}: {
  label: string;
  emoji: React.ReactNode;
  hue: number;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ y: -2, scale: 1.03 }}
    whileTap={{ scale: 0.94 }}
    onClick={onClick}
    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 px-2 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/85 backdrop-blur-md"
    style={{
      background: `linear-gradient(160deg, hsl(${hue} 60% 14% / 0.6), hsl(${hue} 50% 8% / 0.4))`,
      boxShadow: `inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 8px 24px -12px hsl(${hue} 90% 55% / 0.5)`,
    }}
  >
    <span style={{ color: `hsl(${hue} 90% 75%)` }}>{emoji}</span>
    {label}
  </motion.button>
);

export default TaskExperience;
