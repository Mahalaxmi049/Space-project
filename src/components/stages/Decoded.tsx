import { motion } from "framer-motion";
import { usePlayer } from "../../contexts/PlayerContext";

export default function Decoded() {
  const { player } = usePlayer();
  return (
    <div style={{ minHeight: "100vh", background: "black", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[...Array(100)].map((_, i) => (
          <motion.div key={i} style={{ position: "absolute", borderRadius: "50%", background: "white", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }} />
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} style={{ position: "relative", zIndex: 10, maxWidth: 500, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ fontSize: "4rem" }}>🌌</motion.div>
        <motion.p style={{ color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>Mission Complete</motion.p>
        <h1 style={{ color: "white", fontSize: "2.5rem", fontWeight: "bold" }}>Signal Decoded, {player.name}!</h1>
        <p style={{ color: "#9ca3af", lineHeight: 1.8 }}>
          You've successfully identified a <strong style={{ color: "#60a5fa" }}>Pulsar Star</strong> — 
          a rapidly spinning neutron star sending radio beams across the galaxy. 
          As a <strong style={{ color: "white" }}>{player.scientistClass}</strong>, 
          you've made a discovery that would take real scientists months to confirm!
        </p>
        <div style={{ background: "rgba(96,165,250,0.05)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: "1rem", padding: "1.5rem", width: "100%" }}>
          <h3 style={{ color: "#60a5fa", marginBottom: "0.75rem" }}>What You Learned:</h3>
          <p style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
            ⚡ Pulsars spin up to 716 times per second<br />
            📡 They emit radio beams like a lighthouse<br />
            🌟 They are formed from exploding stars (supernovas)<br />
            🔬 Scientists use them to test Einstein's theory of relativity
          </p>
        </div>
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ padding: "1rem 2rem", background: "linear-gradient(to right, #1d4ed8, #4f46e5)", color: "white", borderRadius: "0.75rem", fontWeight: "bold" }}>
          🏆 {player.scientistClass} — Mission Accomplished!
        </motion.div>
      </motion.div>
    </div>
  );
}