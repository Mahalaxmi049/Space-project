import { useState } from "react";
import { motion } from "framer-motion";
import { usePlayer } from "../../contexts/PlayerContext";
import type { ScientistClass } from "../../contexts/PlayerContext";

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

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", background: "linear-gradient(to bottom, #0a0a2e, #000)" }}>
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(80)].map((_, i) => (
          <motion.div key={i} style={{ position: "absolute", width: 2, height: 2, borderRadius: "50%", background: "white", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }} />
        ))}
      </div>
      <motion.div style={{ position: "relative", zIndex: 10, maxWidth: 480, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <motion.p style={{ color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>Incoming Transmission...</motion.p>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", color: "white" }}>The Last Signal</h1>
        <p style={{ color: "#9ca3af", textAlign: "center" }}>A mysterious pulse is echoing from 1,000 light-years away. Only you can decode it.</p>
        <div style={{ width: "100%" }}>
          <label style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: "0.5rem" }}>Your Name, Scientist</label>
          <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="e.g. Mahalaxmi" style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "white", outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ width: "100%" }}>
          <label style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: "0.75rem" }}>Choose Your Class</label>
          {classes.map((c) => (
            <motion.button key={c.label} onClick={() => setSelected(c.label)} whileTap={{ scale: 0.97 }} style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", borderRadius: "0.75rem", border: selected === c.label ? "1px solid #3b82f6" : "1px solid rgba(255,255,255,0.1)", background: selected === c.label ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.05)", color: "white", cursor: "pointer", marginBottom: "0.75rem", textAlign: "left" }}>
              <span style={{ fontSize: "1.5rem" }}>{c.icon}</span>
              <div><p style={{ fontWeight: 600, margin: 0 }}>{c.label}</p><p style={{ color: "#6b7280", fontSize: "0.75rem", margin: 0 }}>{c.desc}</p></div>
              {selected === c.label && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginLeft: "auto", color: "#60a5fa", fontSize: "0.75rem" }}>✓ Selected</motion.span>}
            </motion.button>
          ))}
        </div>
        <motion.button onClick={handleStart} disabled={!canProceed} whileHover={canProceed ? { scale: 1.03 } : {}} whileTap={canProceed ? { scale: 0.97 } : {}} style={{ width: "100%", padding: "1rem", borderRadius: "0.75rem", fontWeight: "bold", fontSize: "0.875rem", letterSpacing: "0.2em", textTransform: "uppercase", background: canProceed ? "#2563eb" : "rgba(255,255,255,0.05)", color: canProceed ? "white" : "#4b5563", border: "none", cursor: canProceed ? "pointer" : "not-allowed" }}>Begin Mission →</motion.button>
      </motion.div>
    </div>
  );
}