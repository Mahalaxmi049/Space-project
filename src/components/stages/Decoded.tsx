import { motion } from "framer-motion";
import { usePlayer } from "../../contexts/PlayerContext";

const facts = [
  { icon: "⚡", text: "Pulsars spin up to 716 times per second" },
  { icon: "📡", text: "They emit radio beams like a cosmic lighthouse" },
  { icon: "🌟", text: "Formed from exploding stars — supernovas" },
  { icon: "🔬", text: "Used to test Einstein's theory of relativity" },
  { icon: "🧭", text: "Could be used as GPS for future spacecraft" },
];

export default function Decoded() {
  const { player } = usePlayer();

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at top, #0f0c29, #302b63, #000)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", overflow: "hidden" }}>

      {/* Celebration particles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[...Array(150)].map((_, i) => (
          <motion.div key={i}
            style={{ position: "absolute", borderRadius: "50%", background: ["#818cf8", "#60a5fa", "#4ade80", "#fbbf24", "#f472b6"][Math.floor(Math.random() * 5)], width: Math.random() * 4 + 1, height: Math.random() * 4 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0, 1, 0], y: [0, -30, 0] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        style={{ position: "relative", zIndex: 10, maxWidth: 560, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
      >
        {/* Spinning pulsar icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ fontSize: "4rem", filter: "drop-shadow(0 0 20px rgba(99,102,241,0.8))" }}
        >
          🌌
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: "2rem", padding: "0.4rem 1rem", color: "#4ade80", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          ✓ Mission Complete
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 900, background: "linear-gradient(135deg, #e0e7ff, #818cf8, #4ade80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0, lineHeight: 1.1 }}
        >
          Signal Decoded,<br />{player.name}!
        </motion.h1>

        <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "1rem" }}>
          You've successfully identified a <strong style={{ color: "#818cf8" }}>Pulsar Star</strong> — 
          one of the most precise natural clocks in the universe. As a{" "}
          <strong style={{ color: "white" }}>{player.scientistClass}</strong>, 
          you've made a discovery that would take real scientists months to confirm!
        </p>

        {/* Facts */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {facts.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.75rem", padding: "0.75rem 1rem", textAlign: "left" }}
            >
              <span style={{ fontSize: "1.2rem" }}>{fact.icon}</span>
              <span style={{ color: "#cbd5e1", fontSize: "0.875rem" }}>{fact.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: "spring", bounce: 0.5 }}
          whileHover={{ scale: 1.05 }}
          style={{ width: "100%", padding: "1.25rem", background: "linear-gradient(135deg, #4f46e5, #7c3aed, #2563eb)", borderRadius: "1rem", boxShadow: "0 0 40px rgba(99,102,241,0.3)" }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🏆</div>
          <div style={{ color: "white", fontWeight: 700, fontSize: "1.1rem" }}>{player.scientistClass}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>Mission Accomplished — The Last Signal</div>
        </motion.div>
      </motion.div>
    </div>
  );
}