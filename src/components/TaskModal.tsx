import { motion, AnimatePresence } from "framer-motion";
import { playClickSound } from "@/lib/soundEffects";
import { Sparkles } from "lucide-react";

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
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 22, stiffness: 300 }}
          className="relative w-full max-w-sm rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, hsl(230 20% 14% / 0.97), hsl(230 18% 10% / 0.95))",
            border: "1px solid hsl(230 15% 22% / 0.5)",
            boxShadow: "0 25px 60px hsl(230 30% 5% / 0.6)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-7">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5" style={{ color: "hsl(43 56% 62%)" }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "hsl(43 56% 62%)" }}>
                Block #{blockNumber}
              </span>
              <Sparkles className="w-3.5 h-3.5" style={{ color: "hsl(43 56% 62%)" }} />
            </div>

            <p className="text-center text-xs tracking-wider mb-1" style={{ color: "hsl(230 15% 50%)" }}>
              {playerName}'s Challenge
            </p>

            <div className="mx-auto my-4 w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43 56% 52% / 0.3), transparent)" }} />

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-center text-base font-medium leading-relaxed mb-8"
              style={{ color: "hsl(30 25% 88%)" }}
            >
              {task}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playClickSound('modal');
                onClose();
              }}
              className="w-full rounded-xl py-3 text-sm font-semibold tracking-wide transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, hsl(340 65% 50%), hsl(330 70% 58%))",
                color: "hsl(0 0% 100%)",
                boxShadow: "0 4px 16px hsl(340 65% 50% / 0.3)",
              }}
            >
              That Felt Nice… 😏💦
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;
