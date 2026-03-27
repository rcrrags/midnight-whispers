import { motion, AnimatePresence } from "framer-motion";
import { playClickSound } from "@/lib/soundEffects";
import { Sparkles, X } from "lucide-react";

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
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "hsl(var(--background) / 0.7)", backdropFilter: "blur(12px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 24, stiffness: 320 }}
          className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-border/30"
          style={{
            background: "var(--gradient-modal)",
            boxShadow: "0 30px 70px hsl(var(--background) / 0.6), var(--glow-soft)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => { playClickSound('modal'); onClose(); }}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-muted/20 transition-all duration-200 z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-8">
            {/* Block number badge */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span
                className="text-[10px] font-bold tracking-[0.25em] uppercase font-body px-3 py-1 rounded-full"
                style={{
                  background: "hsl(var(--accent) / 0.1)",
                  color: "hsl(var(--accent))",
                  border: "1px solid hsl(var(--accent) / 0.2)",
                }}
              >
                Block #{blockNumber}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-accent" />
            </div>

            {/* Player name */}
            <p className="text-center text-xs tracking-[0.2em] uppercase font-body font-semibold text-muted-foreground mb-2">
              {playerName}'s Challenge
            </p>

            {/* Divider */}
            <div className="gold-divider my-5" />

            {/* Task text */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-center text-base font-medium leading-relaxed mb-8 text-foreground/90"
            >
              {task}
            </motion.p>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { playClickSound('modal'); onClose(); }}
              className="w-full rounded-xl py-3.5 text-sm font-bold tracking-wider uppercase font-body transition-all duration-300 shine-sweep"
              style={{
                background: "var(--gradient-primary)",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "var(--glow-primary)",
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
