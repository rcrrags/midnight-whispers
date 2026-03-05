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
    <div className="relative min-h-[calc(100vh-3.5rem)] p-4 pb-8">
      <FloatingHearts />
      <div className="relative z-10 mx-auto max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold font-body tracking-wide transition-all duration-200 ${
                currentPlayer === 1
                  ? "bg-primary/15 text-crimson border border-primary/30"
                  : "bg-muted/30 text-muted-foreground"
              }`}
            >
              {player1}
            </span>
            <Heart className="h-3.5 w-3.5 text-muted-foreground/40 fill-muted-foreground/20" />
            <span
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold font-body tracking-wide transition-all duration-200 ${
                currentPlayer === 2
                  ? "bg-secondary/15 text-plum border border-secondary/30"
                  : "bg-muted/30 text-muted-foreground"
              }`}
            >
              {player2}
            </span>
          </div>
          <button
            onClick={onRestart}
            className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Turn indicator */}
        <motion.p
          key={currentPlayer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-3 text-center text-sm text-muted-foreground"
        >
          <span className={currentPlayer === 1 ? "text-crimson font-semibold" : "text-plum font-semibold"}>
            {currentName}
          </span>
          's turn
        </motion.p>

        {/* Progress */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-body tabular-nums">
            {clickedBlocks.size}/30
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => {
            const isClicked = clickedBlocks.has(num);
            return (
              <motion.button
                key={num}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: num * 0.015, duration: 0.25 }}
                whileHover={!isClicked ? { scale: 1.06, y: -2 } : {}}
                whileTap={!isClicked ? { scale: 0.94 } : {}}
                onClick={() => handleBlockClick(num)}
                disabled={isClicked}
                className={`aspect-square rounded-xl font-body text-sm font-bold transition-all duration-200 ${
                  isClicked
                    ? "bg-muted/20 text-muted-foreground/20 cursor-not-allowed border border-border/10"
                    : "bg-card border border-border/40 hover:border-primary/40 hover:shadow-md cursor-pointer"
                }`}
                style={!isClicked ? {
                  color: currentPlayer === 1 ? "hsl(var(--crimson-p1))" : "hsl(var(--plum-p2))"
                } : undefined}
              >
                {isClicked ? (
                  <Lock className="h-3.5 w-3.5 mx-auto text-muted-foreground/20" />
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
