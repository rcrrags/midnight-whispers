import { motion, AnimatePresence } from "framer-motion";
import { playClickSound } from "@/lib/soundEffects";

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
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "hsl(340 40% 3% / 0.9)", backdropFilter: "blur(14px)" }}
        onClick={onClose}
      >
        {/* Ambient glow behind modal */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, hsl(345 70% 35% / 0.2), transparent 50%)",
            filter: "blur(10px)",
          }}
        />

        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 18, stiffness: 250 }}
          className="relative w-full max-w-sm velvet-gradient rounded-[18px] border border-accent/25 p-7 animate-breathe"
          style={{
            boxShadow: "0 0 20px hsl(43 56% 52% / 0.12), 0 10px 40px hsl(340 40% 5% / 0.6), inset 0 1px 0 hsl(43 56% 52% / 0.1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="text-sm font-semibold text-accent tracking-widest font-display">
              ✦ Block #{blockNumber} ✦
            </span>
          </div>

          <p className="mb-1 text-center text-sm text-muted-foreground tracking-wider">
            {playerName}'s Challenge
          </p>

          <div className="gold-divider mx-auto my-3 w-16" />

          <h3 className="mb-2 text-center font-display text-lg font-semibold text-accent italic tracking-wide">
            Your Challenge 😈
          </h3>

          <div className="gold-divider mx-auto my-3 w-16" />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            className="mb-7 text-center font-body text-lg font-medium text-cream leading-relaxed"
          >
            {task}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px hsl(43 56% 52% / 0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playClickSound('modal');
              onClose();
            }}
            className="w-full rounded-full py-3 font-display text-lg font-semibold text-foreground tracking-wider transition-all duration-300 border border-accent/30"
            style={{ background: "linear-gradient(135deg, hsl(345 70% 28%), hsl(345 60% 35%))" }}
          >
            That Felt Nice… 😏💦
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;
