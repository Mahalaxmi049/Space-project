import { motion } from "framer-motion";
import { usePlayer } from "../../contexts/PlayerContext";

export default function RadioRoom() {
  const { player, nextStage } = usePlayer();
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "black", padding: "2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[...Array(100)].map((_, i) => (
          <motion.div key={i} style={{ position: "absolute", borderRadius: "50%", background: "white", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }} />
        ))}
      </div>
      <svg viewBox="0 0 400 80" style={{ width: "100%", maxWidth: 500, marginBottom: "2rem" }}>
        {[...Array(6)].map((_, i) => (
          <motion.path key={i} d="M0,40 Q50,10 100,40 Q150,70 200,40 Q250,10 300,40 Q350,70 400,40" fill="none" stroke={`rgba(96,165,250,${0.2 + i * 0.15})`} strokeWidth={1.5 - i * 0.2} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
        ))}
      </svg>
      <motion.div style={{ position: "relative", zIndex: 10, maxWidth: 500, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
        <motion.div style={{ color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase" }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>Signal Detected — 1,000 Light Years Away</motion.div>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "white" }}>Welcome, {player.name}.<br /><span style={{ color: "#60a5fa" }}>Something is out there.</span></h2>
        <p style={{ color: "#9ca3af", lineHeight: 1.7 }}>Your instruments are picking up a rhythmic pulse — perfectly timed, impossibly regular. As a <strong style={{ color: "white" }}>{player.scientistClass}</strong>, it's your job to find out what's sending it.</p>
        <motion.div style={{ width: 12, height: 12, borderRadius: "50%", background: "#60a5fa" }} animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        <motion.button onClick={nextStage} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: "1rem 2rem", background: "#2563eb", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: "bold", fontSize: "0.875rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>Trace The Signal →</motion.button>
      </motion.div>
    </div>
  );
}