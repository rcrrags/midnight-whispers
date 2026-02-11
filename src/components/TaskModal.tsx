import { motion, AnimatePresence } from "framer-motion";

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-full max-w-sm card-gradient rounded-2xl border border-border p-6 glow-accent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-2 text-center">
            <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
              Block #{blockNumber}
            </span>
          </div>
          <p className="mb-1 text-center text-sm text-muted-foreground">
            {playerName}'s Challenge
          </p>
          <p className="mb-6 text-center font-display text-xl font-bold text-foreground leading-relaxed">
            {task}
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="w-full rounded-xl bg-accent py-3 font-display font-semibold text-accent-foreground transition-all"
          >
            Done! ✅
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;
