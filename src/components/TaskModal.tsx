import { motion, AnimatePresence } from "framer-motion";

interface TaskModalProps {
  task: string;
  playerName: string;
  blockNumber: number;
  onClose: () => void;
}

const TaskModal = ({
  task,
  playerName,
  blockNumber,
  onClose,
}: TaskModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Remove this if you want FULLY transparent */}
        <div className="absolute inset-0 bg-black/20" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 18, stiffness: 250 }}
          className="relative w-full max-w-sm rounded-2xl p-7 bg-gradient-to-br from-[#141622] to-[#0e101a] border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center space-y-4">
            <p className="text-sm tracking-widest text-yellow-400 font-semibold">
              ✦ Block #{blockNumber} ✦
            </p>

            <p className="text-sm text-gray-400">
              {playerName}'s Challenge
            </p>

            <h3 className="text-lg font-semibold italic text-yellow-300">
              Your Challenge 😈
            </h3>

            <p className="text-lg text-gray-200">
              {task}
            </p>

            <button
              onClick={onClose}
              className="w-full mt-4 rounded-xl py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              That Felt Nice… 😏💦
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;
