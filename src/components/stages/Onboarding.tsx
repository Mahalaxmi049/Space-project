import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayer } from "../../contexts/PlayerContext";
import type { ScientistClass } from "../../contexts/PlayerContext";

const classes: { label: ScientistClass; icon: string; desc: string; color: string }[] = [
  { label: "Radio Astronomer", icon: "📡", desc: "You listen to the cosmos", color: "#3b82f6" },
  { label: "Physicist", icon: "⚛️", desc: "You decode the laws of space", color: "#8b5cf6" },
  { label: "Explorer", icon: "🚀", desc: "You chase the unknown", color: "#10b981" },
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

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", background: "radial-gradient(ellipse at top, #0f0c29, #302b63, #24243e)", position: "relative", overflow: "hidden" }}>
      
      {/* Animated stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[...Array(120)].map((_, i) => (
          <motion.div key={i}
            style={{ position: "absolute", borderRadius: "50%", background: "white", width: Math.random() * 3 + 1, height: Math.random() * 3 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* Glowing orb background */}
      <div style={{ position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 10, maxWidth: 500, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
      >
        {/* Badge */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.4)", borderRadius: "2rem", padding: "0.4rem 1rem" }}
        >
          <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: "50%", background: "#818cf8" }} />
          <span style={{ color: "#a5b4fc", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Incoming Transmission</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 900, textAlign: "center", background: "linear-gradient(135deg, #e0e7ff, #818cf8, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1, margin: 0 }}
        >
          The Last Signal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ color: "#94a3b8", textAlign: "center", lineHeight: 1.7, fontSize: "1rem" }}
        >
          A mysterious pulse echoes from <strong style={{ color: "#e0e7ff" }}>1,000 light-years away</strong>. 
          The universe is calling. Only you can decode it.
        </motion.p>

        {/* Name input */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} style={{ width: "100%" }}>
          <label style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: "0.5rem" }}>Your Name, Scientist</label>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            placeholder="e.g. Mahalaxmi"
            style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.75rem", padding: "0.9rem 1.2rem", color: "white", outline: "none", fontSize: "1rem", boxSizing: "border-box", transition: "border-color 0.3s" }}
            onFocus={(e) => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
            onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
          />
        </motion.div>

        {/* Class selector */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }} style={{ width: "100%" }}>
          <label style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: "0.75rem" }}>Choose Your Class</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {classes.map((c) => (
              <motion.button
                key={c.label}
                onClick={() => setSelected(c.label)}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.2rem", borderRadius: "0.75rem", border: selected === c.label ? `1px solid ${c.color}` : "1px solid rgba(255,255,255,0.08)", background: selected === c.label ? `rgba(${c.color === "#3b82f6" ? "59,130,246" : c.color === "#8b5cf6" ? "139,92,246" : "16,185,129"},0.12)` : "rgba(255,255,255,0.03)", color: "white", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
              >
                <span style={{ fontSize: "1.5rem", minWidth: 32 }}>{c.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, margin: 0, fontSize: "0.95rem" }}>{c.label}</p>
                  <p style={{ color: "#64748b", fontSize: "0.78rem", margin: 0 }}>{c.desc}</p>
                </div>
                <AnimatePresence>
                  {selected === c.label && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ width: 20, height: 20, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}>✓</motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={handleStart}
          disabled={!canProceed}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={canProceed ? { scale: 1.03, boxShadow: "0 0 30px rgba(99,102,241,0.4)" } : {}}
          whileTap={canProceed ? { scale: 0.97 } : {}}
          style={{ width: "100%", padding: "1.1rem", borderRadius: "0.75rem", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase", background: canProceed ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : "rgba(255,255,255,0.05)", color: canProceed ? "white" : "#475569", border: "none", cursor: canProceed ? "pointer" : "not-allowed", transition: "all 0.3s" }}
        >
          {canProceed ? `Begin Mission, ${inputName} →` : "Enter your name & choose a class"}
        </motion.button>
      </motion.div>
    </div>
  );
}