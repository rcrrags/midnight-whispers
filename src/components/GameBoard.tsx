import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { TASKS } from "@/data/tasks";
import TaskModal from "./TaskModal";

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
    <div className="min-h-screen p-4 pb-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span
              className={`rounded-lg px-3 py-1.5 font-display text-sm font-semibold transition-all ${
                currentPlayer === 1
                  ? "bg-primary/20 text-primary glow-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {player1}
            </span>
            <span className="text-muted-foreground text-xs">vs</span>
            <span
              className={`rounded-lg px-3 py-1.5 font-display text-sm font-semibold transition-all ${
                currentPlayer === 2
                  ? "bg-secondary/20 text-secondary glow-secondary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {player2}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onRestart}
            className="rounded-lg bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </motion.button>
        </motion.div>

        {/* Turn indicator */}
        <motion.div
          key={currentPlayer}
          initial={{ opacity: 0, x: currentPlayer === 1 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4 text-center"
        >
          <p className="font-display text-lg font-bold text-foreground">
            <span className={currentPlayer === 1 ? "text-primary" : "text-secondary"}>
              {currentName}
            </span>
            's Turn
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
            style={{ background: "linear-gradient(90deg, hsl(180 85% 55%), hsl(325 85% 60%))" }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 sm:gap-3">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => {
            const isClicked = clickedBlocks.has(num);
            return (
              <motion.button
                key={num}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: num * 0.02, duration: 0.3 }}
                whileHover={!isClicked ? { scale: 1.08, y: -3 } : {}}
                whileTap={!isClicked ? { scale: 0.92 } : {}}
                onClick={() => handleBlockClick(num)}
                disabled={isClicked}
                className={`aspect-square rounded-xl border font-display text-lg font-bold transition-all ${
                  isClicked
                    ? "border-border/50 bg-muted/50 text-muted-foreground/30 cursor-not-allowed"
                    : "border-border block-gradient text-foreground hover:block-gradient-hover hover:border-primary/30 cursor-pointer"
                }`}
              >
                {num}
              </motion.button>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {clickedBlocks.size}/30 blocks completed
        </p>
      </div>

      {/* Modal */}
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
