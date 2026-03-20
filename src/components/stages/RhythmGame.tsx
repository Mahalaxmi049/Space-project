import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePlayer } from "../../contexts/PlayerContext";

export default function RhythmGame() {
  const { player, nextStage } = usePlayer();
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef<any>(null);
  const totalRounds = 8;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 300);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleTap = () => {
    if (gameOver) return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (pulseActive) {
      setScore((s) => s + 1);
      setFeedback("⚡ Perfect!");
    } else {
      setFeedback("❌ Missed!");
    }

    setTimeout(() => setFeedback(""), 500);

    if (newAttempts >= totalRounds) {
      clearInterval(intervalRef.current);
      setGameOver(true);
    }
  };

  const passed = score >= 5;

  return (
    <div style={{ minHeight: "100vh", background: "black", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      {/* Stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[...Array(60)].map((_, i) => (
          <motion.div key={i} style={{ position: "absolute", borderRadius: "50%", background: "white", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: "relative", zIndex: 10, maxWidth: 500, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", textAlign: "center" }}>

        <motion.p style={{ color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          Knowledge Check
        </motion.p>

        <h2 style={{ color: "white", fontSize: "1.8rem", fontWeight: "bold" }}>
          Match The Pulsar Beat!
        </h2>

        <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          Tap the button exactly when the pulsar flashes. Score {5}/{totalRounds} to decode the signal!
        </p>

        {/* Score */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[...Array(totalRounds)].map((_, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: i < score ? "#4ade80" : i < attempts ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
          ))}
        </div>

        {/* Pulse button */}
        {!gameOver && (
          <motion.div
            animate={{ scale: pulseActive ? 1.3 : 1, background: pulseActive ? "#60a5fa" : "rgba(96,165,250,0.1)" }}
            transition={{ duration: 0.1 }}
            onClick={handleTap}
            style={{ width: 160, height: 160, borderRadius: "50%", border: "2px solid #60a5fa", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "2rem" }}
          >
            📡
          </motion.div>
        )}

        {/* Feedback */}
        {feedback && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ color: feedback.includes("Perfect") ? "#4ade80" : "#ef4444", fontWeight: "bold", fontSize: "1.2rem" }}>
            {feedback}
          </motion.p>
        )}

        {/* Score display */}
        <p style={{ color: "#9ca3af" }}>Score: {score} / {attempts}</p>

        {/* Game over */}
        {gameOver && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <h3 style={{ color: passed ? "#4ade80" : "#ef4444", fontSize: "1.5rem", fontWeight: "bold" }}>
              {passed ? "🎉 Signal Decoded!" : "📡 Try Again!"}
            </h3>
            <p style={{ color: "#9ca3af" }}>
              {passed ? `Amazing work, ${player.name}! You matched the pulsar's rhythm.` : "The pulsar was too fast! Try tapping closer to the flash."}
            </p>
            <motion.button
              onClick={passed ? nextStage : () => { setScore(0); setAttempts(0); setGameOver(false); intervalRef.current = setInterval(() => { setPulseActive(true); setTimeout(() => setPulseActive(false), 300); }, 1000); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: "1rem 2rem", background: "#2563eb", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: "bold", fontSize: "0.875rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
            >
              {passed ? "See Your Results →" : "Try Again →"}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}