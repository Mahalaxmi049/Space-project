import { PlayerProvider } from "./contexts/PlayerContext";
import { usePlayer } from "./contexts/usePlayer";
import Onboarding from "./components/stages/Onboarding";

const classThemes: Record<string, string> = {
  "Radio Astronomer": "from-indigo-950 via-blue-950 to-black",
  Physicist: "from-violet-950 via-purple-950 to-black",
  Explorer: "from-emerald-950 via-teal-950 to-black",
};

const StageRenderer = () => {
  const { player } = usePlayer();
  const theme = classThemes[player.scientistClass ?? "Radio Astronomer"];

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme} text-white transition-all duration-1000`}>
      <Onboarding />
    </div>
  );
};

export default function App() {
  return (
    <PlayerProvider>
      <StageRenderer />
    </PlayerProvider>
  );
}