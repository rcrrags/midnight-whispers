import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";

interface TaskModalProps {
  task: string;
  playerName: string;
  blockNumber: number;
  onClose: () => void;
}

const TaskModal = ({ task, playerName, blockNumber, onClose }: TaskModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "hsl(340 30% 4% / 0.85)", backdropFilter: "blur(12px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 18, stiffness: 250 }}
          className="w-full max-w-sm modal-gradient rounded-3xl border border-primary/25 p-7 glow-primary"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <Flame className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Block #{blockNumber}
            </span>
            <Flame className="h-5 w-5 text-accent" />
          </div>

          <p className="mb-1 text-center text-sm text-muted-foreground">
            {playerName}'s Challenge
          </p>

          <h3 className="mb-2 text-center font-display text-sm font-semibold text-primary italic">
            Your Challenge 😈
          </h3>

          <p className="mb-7 text-center font-body text-lg font-medium text-foreground leading-relaxed">
            {task}
          </p>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px hsl(280 60% 45% / 0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="w-full rounded-2xl py-3 font-display font-semibold text-secondary-foreground transition-all"
            style={{ background: "linear-gradient(135deg, hsl(280 60% 45%), hsl(300 60% 50%))" }}
          >
            Done… 😏
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;
