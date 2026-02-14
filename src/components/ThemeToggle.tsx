import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-9 h-9 rounded-full border border-border/50 bg-muted/40 hover:bg-muted/70 transition-all duration-300 group"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {theme === "dark" ? (
          <Sun size={18} className="text-accent group-hover:drop-shadow-[0_0_6px_hsl(43_56%_52%/0.6)] transition-all" />
        ) : (
          <Moon size={18} className="text-primary group-hover:drop-shadow-[0_0_6px_hsl(215_70%_50%/0.5)] transition-all" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
