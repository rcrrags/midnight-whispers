import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Lock, Heart, Sparkles } from "lucide-react";
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
    <div className="relative min-h-[calc(100vh-3.5rem)] p-4 pb-8">
      <FloatingHearts />
      <div className="relative z-10 mx-auto max-w-lg">
        {/* Player badges */}
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 rounded-2xl border border-border/20 backdrop-blur-xl p-3"
          style={{ background: "var(--gradient-glass)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {[
                { name: player1, num: 1 as const, color: "--crimson-p1" },
                { name: player2, num: 2 as const, color: "--plum-p2" },
              ].map(({ name, num, color }) => (
                <motion.span
                  key={num}
                  animate={currentPlayer === num ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="rounded-xl px-4 py-2 text-xs font-bold font-body tracking-wider uppercase transition-all duration-300"
                  style={
                    currentPlayer === num
                      ? {
                          background: `hsl(var(${color}) / 0.15)`,
                          color: `hsl(var(${color}))`,
                          border: `1px solid hsl(var(${color}) / 0.3)`,
                          boxShadow: `0 0 15px hsl(var(${color}) / 0.15)`,
                        }
                      : {
                          background: "hsl(var(--muted) / 0.3)",
                          color: "hsl(var(--muted-foreground))",
                          border: "1px solid transparent",
                        }
                  }
                >
                  {name}
                </motion.span>
              ))}
              <Heart className="h-3 w-3 text-muted-foreground/30 fill-muted-foreground/15 mx-1" />
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: -90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRestart}
              className="rounded-xl p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-200"
            >
              <RotateCcw className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Turn indicator */}
        <motion.div
          key={currentPlayer}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3 h-3 text-muted-foreground/40" />
          <p className="text-center text-sm text-muted-foreground font-body">
            <span
              className="font-bold"
              style={{ color: currentPlayer === 1 ? "hsl(var(--crimson-p1))" : "hsl(var(--plum-p2))" }}
            >
              {currentName}
            </span>
            <span className="opacity-70">'s turn to pick</span>
          </p>
          <Sparkles className="w-3 h-3 text-muted-foreground/40" />
        </motion.div>

        {/* Progress bar */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-muted/30 overflow-hidden border border-border/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gradient-primary)" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-body font-bold tabular-nums bg-muted/20 px-2 py-1 rounded-lg">
            {clickedBlocks.size}/30
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-2.5">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => {
            const isClicked = clickedBlocks.has(num);
            const playerColor = currentPlayer === 1 ? "--crimson-p1" : "--plum-p2";
            return (
              <motion.button
                key={num}
                initial={{ scale: 0, opacity: 0, rotateY: 90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ delay: num * 0.02, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileHover={!isClicked ? { scale: 1.08, y: -3 } : {}}
                whileTap={!isClicked ? { scale: 0.92 } : {}}
                onClick={() => handleBlockClick(num)}
                disabled={isClicked}
                className={`aspect-square rounded-xl font-body text-sm font-bold transition-all duration-300 ${
                  isClicked
                    ? "cursor-not-allowed opacity-30"
                    : "cursor-pointer hover:shadow-lg"
                }`}
                style={
                  isClicked
                    ? {
                        background: "hsl(var(--muted) / 0.15)",
                        border: "1px solid hsl(var(--border) / 0.08)",
                      }
                    : {
                        background: "var(--gradient-block)",
                        border: "1px solid hsl(var(--border) / 0.3)",
                        color: `hsl(var(${playerColor}))`,
                        boxShadow: "0 2px 8px hsl(var(--background) / 0.3)",
                      }
                }
              >
                {isClicked ? (
                  <Lock className="h-3.5 w-3.5 mx-auto text-muted-foreground/25" />
                ) : (
                  num
                )}
              </motion.button>
            );
          })}
        </div>
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
