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
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "hsl(var(--background) / 0.65)", backdropFilter: "blur(16px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 16 }}
          transition={{ type: "spring", damping: 26, stiffness: 350 }}
          className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-border/20"
          style={{
            background: "var(--gradient-modal)",
            boxShadow: "0 24px 60px hsl(var(--background) / 0.5), var(--glow-soft)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={() => { playClickSound('modal'); onClose(); }}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-muted/20 transition-all duration-200 z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-7 sm:p-8">
            {/* Block badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-3 h-3 text-accent" />
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase font-body px-3 py-1 rounded-full"
                style={{
                  background: "hsl(var(--accent) / 0.08)",
                  color: "hsl(var(--accent))",
                  border: "1px solid hsl(var(--accent) / 0.15)",
                }}
              >
                Block #{blockNumber}
              </span>
              <Sparkles className="w-3 h-3 text-accent" />
            </div>

            {/* Player */}
            <p className="text-center text-xs tracking-[0.15em] uppercase font-body font-semibold text-muted-foreground mb-2">
              {playerName}'s Challenge
            </p>

            <div className="gold-divider my-5" />

            {/* Task */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35 }}
              className="text-center text-base font-medium leading-relaxed mb-7 text-foreground/90 font-body"
            >
              {task}
            </motion.p>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.015, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { playClickSound('modal'); onClose(); }}
              className="w-full rounded-xl py-3.5 text-sm font-bold tracking-wider uppercase font-body transition-all duration-300"
              style={{
                background: "var(--gradient-primary)",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "var(--glow-primary), 0 4px 12px hsl(var(--primary) / 0.15)",
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
