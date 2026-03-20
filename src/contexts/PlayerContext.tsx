import { createContext, useContext, useState, ReactNode } from "react";

export type ScientistClass = "Radio Astronomer" | "Physicist" | "Explorer";

export interface PlayerState {
  name: string;
  scientistClass: ScientistClass | null;
  stage: number;
}

interface PlayerContextType {
  player: PlayerState;
  setName: (name: string) => void;
  setScientistClass: (c: ScientistClass) => void;
  nextStage: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<PlayerState>({
    name: "",
    scientistClass: null,
    stage: 0,
  });

  const setName = (name: string) => setPlayer((p) => ({ ...p, name }));
  const setScientistClass = (scientistClass: ScientistClass) => setPlayer((p) => ({ ...p, scientistClass }));
  const nextStage = () => setPlayer((p) => ({ ...p, stage: p.stage + 1 }));

  return (
    <PlayerContext.Provider value={{ player, setName, setScientistClass, nextStage }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("no provider");
  return ctx;
};