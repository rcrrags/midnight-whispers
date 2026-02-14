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
        style={{
          background: "hsl(230 25% 6% / 0.20)",
          backdropFilter: "blur(10px)"
        }}

        // style={{ background: "hsl(230 25% 6% / 0.92)", backdropFilter: "blur(18px)" }} 
        onClick={onClose}
      >
        {/* Ambient diagonal glow */}
        <div
          className="absolute pointer-events-none inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(345 60% 25% / 0.08) 0%, transparent 40%, transparent 60%, hsl(230 40% 30% / 0.06) 100%)",
          }}
        />

        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 18, stiffness: 250 }}
          className="relative w-full max-w-sm rounded-[20px] p-7 overflow-hidden"
          style={{
            background: "linear-gradient(145deg, hsl(230 20% 14% / 0.95), hsl(230 18% 10% / 0.9))",
            border: "1px solid hsl(230 15% 25% / 0.4)",
            boxShadow: "0 0 20px hsl(43 56% 52% / 0.08), 0 20px 60px hsl(230 25% 5% / 0.7), inset 0 1px 0 hsl(230 15% 30% / 0.3)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle inner glass shine */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[20px]"
            style={{
              background: "linear-gradient(160deg, hsl(230 15% 35% / 0.08) 0%, transparent 40%)",
            }}
          />

          <div className="relative z-10">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="text-sm font-semibold tracking-widest font-display" style={{ color: "hsl(43 56% 62%)" }}>
                ✦ Block #{blockNumber} ✦
              </span>
            </div>

            <p className="mb-1 text-center text-sm tracking-wider" style={{ color: "hsl(230 15% 55%)" }}>
              {playerName}'s Challenge
            </p>

            <div className="mx-auto my-3 w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43 56% 52% / 0.3), transparent)" }} />

            <h3 className="mb-2 text-center font-display text-lg font-semibold italic tracking-wide" style={{ color: "hsl(43 56% 62%)" }}>
              Your Challenge 😈
            </h3>

            <div className="mx-auto my-3 w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43 56% 52% / 0.3), transparent)" }} />

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
              className="mb-7 text-center font-body text-lg font-medium leading-relaxed"
              style={{ color: "hsl(30 25% 85%)" }}
            >
              {task}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(340 60% 55% / 0.35)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                playClickSound('modal');
                onClose();
              }}
              className="w-full rounded-2xl py-3.5 font-display text-lg font-semibold tracking-wider transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(340 65% 50%), hsl(330 70% 60%), hsl(340 60% 55%))",
                color: "hsl(0 0% 100%)",
                boxShadow: "0 4px 20px hsl(340 65% 50% / 0.3), inset 0 1px 0 hsl(330 70% 70% / 0.3)",
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
