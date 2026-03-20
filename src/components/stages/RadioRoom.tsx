import { motion } from "framer-motion";
import { usePlayer } from "../../contexts/PlayerContext";

export default function RadioRoom() {
  const { player, nextStage } = usePlayer();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "radial-gradient(ellipse at center, #0a0a1a 0%, #000 100%)", padding: "2rem", position: "relative", overflow: "hidden" }}>

      {/* Stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[...Array(150)].map((_, i) => (
          <motion.div key={i}
            style={{ position: "absolute", borderRadius: "50%", background: "white", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 2 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* Signal waves */}
      <div style={{ width: "100%", maxWidth: 600, marginBottom: "3rem", position: "relative" }}>
        <svg viewBox="0 0 600 100" style={{ width: "100%" }}>
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d="M0,50 Q75,15 150,50 Q225,85 300,50 Q375,15 450,50 Q525,85 600,50"
              fill="none"
              stroke={`rgba(99,102,241,${0.15 + i * 0.15})`}
              strokeWidth={2 - i * 0.3}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            />
          ))}
        </svg>
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 12, height: 12, borderRadius: "50%", background: "#818cf8", boxShadow: "0 0 20px #818cf8" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        style={{ position: "relative", zIndex: 10, maxWidth: 540, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#818cf8", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}
        >
          <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: "50%", background: "#818cf8" }} />
          Signal Detected — 1,000 Light Years Away
        </motion.div>

        <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800, color: "white", margin: 0, lineHeight: 1.2 }}>
          Welcome, <span style={{ background: "linear-gradient(135deg, #818cf8, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{player.name}</span>.<br />
          Something is out there.
        </h2>

        <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "1rem" }}>
          Your instruments are picking up a rhythmic pulse — perfectly timed, impossibly regular. 
          No natural phenomenon works like this. As a <strong style={{ color: "#e0e7ff" }}>{player.scientistClass}</strong>, 
          you know what this could mean.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", width: "100%" }}>
          {[{ label: "Frequency", value: "1.4 GHz", icon: "📡" }, { label: "Distance", value: "1,000 ly", icon: "🌌" }, { label: "Pattern", value: "Regular", icon: "⚡" }].map((stat) => (
            <motion.div key={stat.label} whileHover={{ scale: 1.05 }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.75rem", padding: "0.75rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.3rem" }}>{stat.icon}</div>
              <div style={{ color: "white", fontWeight: 600, fontSize: "0.85rem" }}>{stat.value}</div>
              <div style={{ color: "#475569", fontSize: "0.7rem" }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={nextStage}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
          whileTap={{ scale: 0.95 }}
          style={{ padding: "1.1rem 2.5rem", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
        >
          Trace The Signal →
        </motion.button>
      </motion.div>
    </div>
  );
}