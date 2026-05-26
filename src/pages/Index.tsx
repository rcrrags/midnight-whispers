import { useState } from "react";
import PlayerSetup from "@/components/PlayerSetup";
import CategoryDashboard from "@/components/CategoryDashboard";
import TaskExperience from "@/components/TaskExperience";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { CategoryId } from "@/data/categories";

type Screen = "setup" | "dashboard" | "task";
type Reaction = "like" | "fire" | "skip" | "wild";

const REACTION_POINTS: Record<Reaction, number> = {
  like: 3,
  fire: 5,
  skip: 0,
  wild: 2,
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("setup");
  const [players, setPlayers] = useState({ p1: "", p2: "" });
  const [chemistry, setChemistry] = useState(0);
  const [streak, setStreak] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const [turn, setTurn] = useState<1 | 2>(1);

  const handleStart = (p1: string, p2: string) => {
    setPlayers({ p1, p2 });
    setScreen("dashboard");
  };

  const handleRestart = () => {
    setPlayers({ p1: "", p2: "" });
    setChemistry(0);
    setStreak(0);
    setActiveCategory(null);
    setTurn(1);
    setScreen("setup");
  };

  const handlePick = (id: CategoryId) => {
    setActiveCategory(id);
    setScreen("task");
  };

  const handleReact = (r: Reaction) => {
    setChemistry((c) => Math.min(100, c + REACTION_POINTS[r]));
    setStreak((s) => (r === "skip" ? 0 : s + 1));
    setTurn((t) => (t === 1 ? 2 : 1));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {screen === "setup" && <PlayerSetup onStart={handleStart} />}
        {screen === "dashboard" && (
          <CategoryDashboard
            player1={players.p1}
            player2={players.p2}
            chemistry={chemistry}
            streak={streak}
            onPick={handlePick}
            onRestart={handleRestart}
          />
        )}
        {screen === "task" && activeCategory && (
          <TaskExperience
            categoryId={activeCategory}
            currentPlayer={turn === 1 ? players.p1 : players.p2}
            partnerPlayer={turn === 1 ? players.p2 : players.p1}
            onReact={handleReact}
            onBack={() => setScreen("dashboard")}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
