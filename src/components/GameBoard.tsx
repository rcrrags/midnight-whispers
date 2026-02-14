import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Lock, Heart } from "lucide-react";
import { TASKS } from "@/data/tasks";
import TaskModal from "./TaskModal";
import FloatingHearts from "./FloatingHearts";
import { playClickSound } from "@/lib/soundEffects";

interface GameBoardProps {
  player1: string;
  player2: string;
  onGameOver: () => void;
  onRestart: () => void;
}

const GameBoard = ({ player1, player2, onGameOver, onRestart }: GameBoardProps) => {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [clickedBlocks, setClickedBlocks] = useState<Set<number>>(new Set());
  const [availableTasks, setAvailableTasks] = useState<string[]>([...TASKS]);
  const [modal, setModal] = useState<{ task: string; block: number } | null>(null);

  const currentName = currentPlayer === 1 ? player1 : player2;

  const handleBlockClick = useCallback(
    (block: number) => {
      if (clickedBlocks.has(block) || modal) return;
      playClickSound('block');
      const taskIndex = Math.floor(Math.random() * availableTasks.length);
      const task = availableTasks[taskIndex];
      setAvailableTasks((prev) => prev.filter((_, i) => i !== taskIndex));
      setModal({ task, block });
    },
    [clickedBlocks, modal, availableTasks]
  );

  const handleCloseModal = () => {
    if (!modal) return;
    const newClicked = new Set(clickedBlocks);
    newClicked.add(modal.block);
    setClickedBlocks(newClicked);
    setModal(null);

    if (newClicked.size >= 30) {
      setTimeout(onGameOver, 300);
    } else {
      setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    }
  };

  const progress = (clickedBlocks.size / 30) * 100;

  return (
    <div className="relative min-h-screen p-4 pb-8">
      <FloatingHearts />
      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <motion.span
              key={`p1-${currentPlayer}`}
              animate={currentPlayer === 1 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.4 }}
              className={`rounded-2xl px-4 py-2 font-display text-sm font-semibold tracking-wider transition-all duration-300 ${
                currentPlayer === 1
                  ? "glass-card border-crimson text-crimson glow-crimson"
                  : "bg-muted/30 text-muted-foreground border border-transparent"
              }`}
            >
              {player1}
            </motion.span>
            <Heart className="h-4 w-4 text-primary/50 fill-primary/30" />
            <motion.span
              key={`p2-${currentPlayer}`}
              animate={currentPlayer === 2 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.4 }}
              className={`rounded-2xl px-4 py-2 font-display text-sm font-semibold tracking-wider transition-all duration-300 ${
                currentPlayer === 2
                  ? "glass-card border-plum text-plum"
                  : "bg-muted/30 text-muted-foreground border border-transparent"
              }`}
              style={currentPlayer === 2 ? { boxShadow: "var(--plum-glow)" } : undefined}
            >
              {player2}
            </motion.span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onRestart}
            className="rounded-xl bg-muted/40 p-2.5 text-muted-foreground hover:text-accent transition-all duration-300 border border-border/50"
          >
            <RotateCcw className="h-4 w-4" />
          </motion.button>
        </motion.div>

        {/* Turn indicator */}
        <motion.div
          key={currentPlayer}
          initial={{ opacity: 0, x: currentPlayer === 1 ? -15 : 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="mb-4 text-center"
        >
          <p className="font-display text-xl italic text-foreground tracking-wide">
            It's{" "}
            <span className={currentPlayer === 1 ? "text-crimson" : "text-plum"}>
              {currentName}
            </span>
            's Turn…
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
            style={{ background: "linear-gradient(90deg, hsl(345 70% 35%), hsl(43 56% 52%))" }}
          />
        </div>

        {/* Grid - 5x6 */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => {
            const isClicked = clickedBlocks.has(num);
            return (
              <motion.button
                key={num}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: num * 0.02, duration: 0.3 }}
                whileHover={!isClicked ? { scale: 1.05, y: -3 } : {}}
                whileTap={!isClicked ? { scale: 0.92 } : {}}
                onClick={() => handleBlockClick(num)}
                disabled={isClicked}
                className={`relative aspect-square rounded-2xl border font-display text-lg font-bold transition-all duration-300 shine-sweep ${
                  isClicked
                    ? "border-border/20 bg-muted/20 text-muted-foreground/15 cursor-not-allowed velvet-pressed opacity-60"
                    : "border-border/40 velvet-card cursor-pointer"
                }`}
                style={!isClicked ? {
                  color: currentPlayer === 1 ? "hsl(350 85% 50%)" : "hsl(290 60% 55%)"
                } : undefined}
              >
                {isClicked ? (
                  <Lock className="h-4 w-4 mx-auto text-accent/20" />
                ) : (
                  num
                )}
              </motion.button>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground tracking-wider">
          {clickedBlocks.size}/30 challenges completed
        </p>
      </div>

      {modal && (
        <TaskModal
          task={modal.task}
          playerName={currentName}
          blockNumber={modal.block}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default GameBoard;
