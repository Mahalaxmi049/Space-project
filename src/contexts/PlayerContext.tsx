import { useState } from "react";
import type { ReactNode } from "react";
import { PlayerContext, type PlayerContextType, type PlayerState, type ScientistClass } from "./PlayerContextState";

export type { ScientistClass, PlayerState, PlayerContextType };

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<PlayerState>({
    name: "",
    scientistClass: null,
    stage: 0,
    pulsarFrequency: 1,
    rhythmScore: 0,
  });

  const setName = (name: string) => setPlayer((p) => ({ ...p, name }));
  const setScientistClass = (scientistClass: ScientistClass) => setPlayer((p) => ({ ...p, scientistClass }));
  const nextStage = () => setPlayer((p) => ({ ...p, stage: p.stage + 1 }));
  const setPulsarFrequency = (pulsarFrequency: number) => setPlayer((p) => ({ ...p, pulsarFrequency }));
  const setRhythmScore = (rhythmScore: number) => setPlayer((p) => ({ ...p, rhythmScore }));

  return (
    <PlayerContext.Provider
      value={{
        player,
        setName,
        setScientistClass,
        nextStage,
        setPulsarFrequency,
        setRhythmScore,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};