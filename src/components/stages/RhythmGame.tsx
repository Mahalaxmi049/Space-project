import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayer } from "../../contexts/PlayerContext";

export default function RhythmGame() {
  const { player, nextStage } = usePlayer();
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef<any>(null);
  const totalRounds = 6;

  useEffect(() => {
    startGame();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startGame = () => {
    intervalRef.current = setInterval(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 600); // longer flash = easier
    }, 1500); // slower interval = easier
  };

  const handleTap = () => {
    if (gameOver) return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (pulseActive) {
      setScore((s) => s + 1);
      setFeedback("⚡ Perfect!");
    } else {
      setFeedback("❌ Too Early!");
    }

    setTimeout(() => setFeedback(""), 600);

    if (newAttempts >= totalRounds) {
      clearInterval(intervalRef.current);
      setGameOver(true);
    }
  };

  const passed = score >= 3; // only need 3 out of 6

  const restart = () => {
    setScore(0);
    setAttempts(0);
    setGameOver(false);
    startGame();
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at center, #0d0d1f 0%, #000 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", overflow: "hidden" }}>

      {/* Stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[...Array(80)].map((_, i) => (
          <motion.div key={i} style={{ position: "absolute", borderRadius: "50%", background: "white", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: "relative", zIndex: 10, maxWidth: 500, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center" }}>

        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "2rem", padding: "0.4rem 1rem", color: "#a5b4fc", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Knowledge Check
        </motion.div>

        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800, color: "white", margin: 0 }}>
          Match The Pulsar Beat!
        </h2>

        <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
          Tap the pulsar <strong style={{ color: "white" }}>when it glows bright!</strong><br />
          Score 3 out of {totalRounds} to decode the signal!
        </p>

        {/* Score dots */}
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          {[...Array(totalRounds)].map((_, i) => (
            <motion.div key={i}
              animate={{ scale: i === attempts - 1 ? [1, 1.5, 1] : 1 }}
              style={{ width: 16, height: 16, borderRadius: "50%", background: i < score ? "#4ade80" : i < attempts ? "#ef4444" : "rgba(255,255,255,0.1)", transition: "background 0.3s", boxShadow: i < score ? "0 0 8px #4ade80" : "none" }}
            />
          ))}
        </div>

        {/* BIG hint text */}
        {!gameOver && (
          <motion.p
            animate={{ opacity: pulseActive ? 1 : 0.3 }}
            style={{ color: pulseActive ? "#4ade80" : "#475569", fontWeight: 700, fontSize: "1rem", margin: 0 }}
          >
            {pulseActive ? "👆 TAP NOW!" : "Wait for it..."}
          </motion.p>
        )}

        {/* Pulse button */}
        {!gameOver && (
          <motion.div
            onClick={handleTap}
            animate={{
              scale: pulseActive ? 1.3 : 1,
              boxShadow: pulseActive
                ? "0 0 80px rgba(99,102,241,0.9), 0 0 150px rgba(99,102,241,0.4)"
                : "0 0 20px rgba(99,102,241,0.15)",
              background: pulseActive
                ? "radial-gradient(circle, rgba(99,102,241,0.6), rgba(99,102,241,0.2))"
                : "radial-gradient(circle, rgba(99,102,241,0.1), transparent)"
            }}
            transition={{ duration: 0.15 }}
            style={{ width: 200, height: 200, borderRadius: "50%", border: `3px solid ${pulseActive ? "#818cf8" : "rgba(99,102,241,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "3.5rem", userSelect: "none" }}
          >
            📡
          </motion.div>
        )}

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.p key={feedback} initial={{ opacity: 0, y: -15, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} style={{ color: feedback.includes("Perfect") ? "#4ade80" : "#ef4444", fontWeight: 700, fontSize: "1.5rem", margin: 0 }}>
              {feedback}
            </motion.p>
          )}
        </AnimatePresence>

        <p style={{ color: "#64748b", fontSize: "0.85rem" }}>
          Score: <strong style={{ color: "white" }}>{score}</strong> / {attempts} attempts
        </p>

        {/* Game over */}
        <AnimatePresence>
          {gameOver && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", background: passed ? "rgba(74,222,128,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${passed ? "rgba(74,222,128,0.2)" : "rgba(239,68,68,0.2)"}`, borderRadius: "1rem", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <div style={{ fontSize: "2.5rem" }}>{passed ? "🎉" : "😮"}</div>
              <h3 style={{ color: passed ? "#4ade80" : "#ef4444", fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>
                {passed ? "Signal Decoded!" : "Almost There!"}
              </h3>
              <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem" }}>
                {passed
                  ? `Amazing, ${player.name}! You matched the pulsar's heartbeat with ${score}/${totalRounds} accuracy!`
                  : `You scored ${score}/${totalRounds}. You need at least 3 — try again!`}
              </p>
              <motion.button
                onClick={passed ? nextStage : restart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ padding: "0.9rem 2rem", background: passed ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
              >
                {passed ? "See Your Results →" : "Try Again →"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}