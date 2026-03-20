import { PlayerProvider, usePlayer } from "./contexts/PlayerContext";
import Onboarding from "./components/stages/Onboarding";
import RadioRoom from "./components/stages/RadioRoom";

const StageRenderer = () => {
  const { player } = usePlayer();
  const stages = [<Onboarding />, <RadioRoom />];
  return <div>{stages[player.stage]}</div>;
};

export default function App() {
  return (
    <PlayerProvider>
      <StageRenderer />
    </PlayerProvider>
  );
}