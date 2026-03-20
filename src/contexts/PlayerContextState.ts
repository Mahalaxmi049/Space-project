import { createContext } from "react";

export type ScientistClass = "Radio Astronomer" | "Physicist" | "Explorer";

export interface PlayerState {
  name: string;
  scientistClass: ScientistClass | null;
  stage: number;
  pulsarFrequency: number;
  rhythmScore: number;
}

export interface PlayerContextType {
  player: PlayerState;
  setName: (name: string) => void;
  setScientistClass: (c: ScientistClass) => void;
  nextStage: () => void;
  setPulsarFrequency: (f: number) => void;
  setRhythmScore: (s: number) => void;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);

