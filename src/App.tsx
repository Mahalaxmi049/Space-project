import { PlayerProvider, usePlayer } from "./contexts/PlayerContext";
import Onboarding from "./components/stages/Onboarding";
import RadioRoom from "./components/stages/RadioRoom";
import PulsarCore from "./components/stages/PulsarCore";
import RhythmGame from "./components/stages/RhythmGame";
import Decoded from "./components/stages/Decoded";

const StageRenderer = () => {
  const { player } = usePlayer();
  const stages = [<Onboarding />, <RadioRoom />, <PulsarCore />, <RhythmGame />, <Decoded />];
  return <div>{stages[player.stage]}</div>;
};

export default function App() {
  return (
    <PlayerProvider>
      <StageRenderer />
    </PlayerProvider>
  );
}