import { useState } from "react";
import PlayerSetup from "@/components/PlayerSetup";
import GameBoard from "@/components/GameBoard";
import GameOver from "@/components/GameOver";

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

  if (screen === "game") {
    return (
      <GameBoard
        player1={players.p1}
        player2={players.p2}
        onGameOver={() => setScreen("over")}
        onRestart={handleRestart}
      />
    );
  }

  if (screen === "over") {
    return (
      <GameOver
        player1={players.p1}
        player2={players.p2}
        onRestart={handleRestart}
      />
    );
  }

  return <PlayerSetup onStart={handleStart} />;
};

export default Index;
