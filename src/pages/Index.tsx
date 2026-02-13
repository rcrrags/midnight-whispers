import { useState } from "react";
import PlayerSetup from "@/components/PlayerSetup";
import GameBoard from "@/components/GameBoard";
import GameOver from "@/components/GameOver";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Screen = "setup" | "game" | "over";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("setup");
  const [players, setPlayers] = useState({ p1: "", p2: "" });

  const handleStart = (p1: string, p2: string) => {
    setPlayers({ p1, p2 });
    setScreen("game");
  };

  const handleRestart = () => {
    setPlayers({ p1: "", p2: "" });
    setScreen("setup");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        {screen === "game" ? (
          <GameBoard
            player1={players.p1}
            player2={players.p2}
            onGameOver={() => setScreen("over")}
            onRestart={handleRestart}
          />
        ) : screen === "over" ? (
          <GameOver
            player1={players.p1}
            player2={players.p2}
            onRestart={handleRestart}
          />
        ) : (
          <PlayerSetup onStart={handleStart} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
