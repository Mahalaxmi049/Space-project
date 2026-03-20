// src/components/stages/Onboarding.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import type { ScientistClass } from "../../contexts/PlayerContext";
import { usePlayer } from "../../contexts/usePlayer";

const classes: { label: ScientistClass; icon: string; desc: string }[] = [
  { label: "Radio Astronomer", icon: "📡", desc: "You listen to the cosmos" },
  { label: "Physicist", icon: "⚛️", desc: "You decode the laws of space" },
  { label: "Explorer", icon: "🚀", desc: "You chase the unknown" },
];

export default function Onboarding() {
  const { setName, setScientistClass, nextStage } = usePlayer();
  const [inputName, setInputName] = useState("");
  const [selected, setSelected] = useState<ScientistClass | null>(null);

  const canProceed = inputName.trim().length > 0 && selected !== null;

  const handleStart = () => {
    if (!canProceed) return;
    setName(inputName.trim());
    setScientistClass(selected!);
    nextStage();
  };

  const starParams = (i: number) => {
    // Deterministic pseudo-random values for stable rendering.
    const a = Math.sin(i * 999.123) * 10000;
    const b = Math.sin(i * 111.456) * 10000;
    const c = Math.sin(i * 77.789) * 10000;
    const d = Math.sin(i * 33.333) * 10000;

    const fracA = a - Math.floor(a);
    const fracB = b - Math.floor(b);
    const fracC = c - Math.floor(c);
    const fracD = d - Math.floor(d);

    return {
      leftPct: fracA * 100,
      topPct: fracB * 100,
      duration: 2 + fracC * 3,
      delay: fracD * 3,
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      {/* Starfield dots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => {
          const s = starParams(i);
          return (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${s.leftPct}%`,
                top: `${s.topPct}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
            />
          );
        })}
      </div>

      <motion.div
        className="relative z-10 max-w-lg w-full flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.p
          className="text-blue-400 text-sm tracking-[0.3em] uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Incoming Transmission...
        </motion.p>

        <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight">
          The Last Signal
        </h1>
        <p className="text-gray-400 text-center text-sm md:text-base">
          A mysterious pulse is echoing from 1,000 light-years away.
          Only you can decode it.
        </p>

        {/* Name input */}
        <div className="w-full">
          <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">
            Your Name, Scientist
          </label>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="e.g. Mahalaxmi"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Class selector */}
        <div className="w-full">
          <label className="text-xs text-gray-500 uppercase tracking-widest mb-3 block">
            Choose Your Class
          </label>
          <div className="grid grid-cols-1 gap-3">
            {classes.map((c) => (
              <motion.button
                key={c.label}
                onClick={() => setSelected(c.label)}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                  selected === c.label
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{c.label}</p>
                  <p className="text-gray-500 text-xs">{c.desc}</p>
                </div>
                {selected === c.label && (
                  <motion.span
                    className="ml-auto text-blue-400 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ✓ Selected
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          onClick={handleStart}
          disabled={!canProceed}
          whileHover={canProceed ? { scale: 1.03 } : {}}
          whileTap={canProceed ? { scale: 0.97 } : {}}
          className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all ${
            canProceed
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-white/5 text-gray-600 cursor-not-allowed"
          }`}
        >
          Begin Mission →
        </motion.button>
      </motion.div>
    </div>
  );
}