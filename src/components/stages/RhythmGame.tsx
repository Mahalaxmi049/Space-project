import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayer } from "../../contexts/PlayerContext";

function RhythmTap({ onPass, onFail }: { onPass: () => void; onFail: () => void }) {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef<any>(null);
  const totalRounds = 6;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 600);
    }, 1500);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleTap = () => {
    if (gameOver) return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (pulseActive) { setScore((s) => s + 1); setFeedback("⚡ Perfect!"); }
    else setFeedback("❌ Too Early!");
    setTimeout(() => setFeedback(""), 600);
    if (newAttempts >= totalRounds) { clearInterval(intervalRef.current); setGameOver(true); }
  };

  const passed = score >= 3;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center" }}>
      <h3 style={{ color: "white", fontSize: "1.5rem", fontWeight: 800 }}>Match The Pulsar Beat!</h3>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Tap when the pulsar <strong style={{ color: "white" }}>glows bright!</strong> Score 3/{totalRounds} to win!</p>
      <div style={{ display: "flex", gap: "0.6rem" }}>
        {[...Array(totalRounds)].map((_, i) => (
          <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: i < score ? "#4ade80" : i < attempts ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      {!gameOver && (
        <>
          <motion.p animate={{ opacity: pulseActive ? 1 : 0.3 }} style={{ color: pulseActive ? "#4ade80" : "#475569", fontWeight: 700 }}>
            {pulseActive ? "👆 TAP NOW!" : "Wait for it..."}
          </motion.p>
          <motion.div onClick={handleTap}
            animate={{ scale: pulseActive ? 1.3 : 1, boxShadow: pulseActive ? "0 0 80px rgba(99,102,241,0.9)" : "0 0 20px rgba(99,102,241,0.15)" }}
            style={{ width: 180, height: 180, borderRadius: "50%", border: `3px solid ${pulseActive ? "#818cf8" : "rgba(99,102,241,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "3rem" }}>
            📡
          </motion.div>
        </>
      )}
      <AnimatePresence>
        {feedback && <motion.p key={feedback} initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: feedback.includes("Perfect") ? "#4ade80" : "#ef4444", fontWeight: 700, fontSize: "1.3rem" }}>{feedback}</motion.p>}
      </AnimatePresence>
      <p style={{ color: "#64748b" }}>Score: <strong style={{ color: "white" }}>{score}</strong> / {attempts}</p>
      {gameOver && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontSize: "2rem" }}>{passed ? "🎉" : "😮"}</div>
          <h3 style={{ color: passed ? "#4ade80" : "#ef4444", fontWeight: 700 }}>{passed ? "Signal Decoded!" : "Almost!"}</h3>
          <motion.button onClick={passed ? onPass : onFail} whileHover={{ scale: 1.05 }} style={{ padding: "0.9rem 2rem", background: passed ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
            {passed ? "See Results →" : "Try Again →"}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

function FormulaGame({ onPass, onFail }: { onPass: () => void; onFail: () => void }) {
  const questions = [
    { q: "What makes a pulsar spin so fast?", options: ["Conservation of Angular Momentum", "Solar Wind", "Gravity Waves", "Dark Matter"], answer: 0 },
    { q: "What type of star becomes a pulsar?", options: ["White Dwarf", "Red Giant", "Neutron Star", "Black Hole"], answer: 2 },
    { q: "How do we detect pulsars on Earth?", options: ["Visible Light", "Radio Waves", "X-Rays only", "Sound waves"], answer: 1 },
  ];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [done, setDone] = useState(false);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[current].answer;
    if (correct) { setScore((s) => s + 1); setFeedback("✅ Correct!"); }
    else setFeedback(`❌ Answer: ${questions[current].options[questions[current].answer]}`);
    setTimeout(() => {
      setFeedback(""); setSelected(null);
      if (current + 1 >= questions.length) setDone(true);
      else setCurrent((c) => c + 1);
    }, 1500);
  };

  const passed = score >= 2;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center", width: "100%" }}>
      <h3 style={{ color: "white", fontSize: "1.5rem", fontWeight: 800 }}>Physicist Challenge!</h3>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Answer 2/3 questions correctly!</p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {questions.map((_, i) => (
          <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: i < current ? "#4ade80" : i === current ? "#818cf8" : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      {!done && (
        <>
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "1rem", padding: "1.25rem", width: "100%" }}>
            <p style={{ color: "white", fontWeight: 600, margin: 0 }}>{questions[current].q}</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", width: "100%" }}>
            {questions[current].options.map((opt, idx) => (
              <motion.button key={idx} onClick={() => handleAnswer(idx)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ padding: "0.9rem", borderRadius: "0.75rem", border: selected === idx ? (idx === questions[current].answer ? "1px solid #4ade80" : "1px solid #ef4444") : "1px solid rgba(255,255,255,0.1)", background: selected === idx ? (idx === questions[current].answer ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)") : "rgba(255,255,255,0.04)", color: "white", cursor: "pointer", fontSize: "0.85rem" }}>
                {opt}
              </motion.button>
            ))}
          </div>
          {feedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: feedback.includes("Correct") ? "#4ade80" : "#ef4444", fontWeight: 700 }}>{feedback}</motion.p>}
        </>
      )}
      {done && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontSize: "2rem" }}>{passed ? "🎉" : "🤔"}</div>
          <h3 style={{ color: passed ? "#4ade80" : "#ef4444", fontWeight: 700 }}>{passed ? `${score}/3 Correct!` : `${score}/3 — Try Again!`}</h3>
          <motion.button onClick={passed ? onPass : onFail} whileHover={{ scale: 1.05 }} style={{ padding: "0.9rem 2rem", background: passed ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
            {passed ? "See Results →" : "Try Again →"}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

function ExplorerGame({ onPass }: { onPass: () => void; onFail: () => void }) {
  const steps = ["🌍 Earth", "🪐 Saturn", "⭐ Nearby Star", "🌌 Deep Space", "📡 Pulsar!"];
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  const handleStep = () => {
    if (current + 1 >= steps.length) { setDone(true); return; }
    setCurrent((c) => c + 1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center", width: "100%" }}>
      <h3 style={{ color: "white", fontSize: "1.5rem", fontWeight: 800 }}>Navigate To The Pulsar!</h3>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Chart your course through deep space. Tap <strong style={{ color: "white" }}>LAUNCH</strong> at each waypoint!</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <motion.div
              animate={{ scale: i === current ? [1, 1.2, 1] : 1, boxShadow: i === current ? "0 0 20px rgba(99,102,241,0.8)" : "none" }}
              transition={{ repeat: i === current ? Infinity : 0, duration: 1 }}
              style={{ background: i < current ? "rgba(74,222,128,0.2)" : i === current ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.05)", border: `1px solid ${i < current ? "#4ade80" : i === current ? "#818cf8" : "rgba(255,255,255,0.1)"}`, borderRadius: "0.75rem", padding: "0.5rem 0.75rem", color: i < current ? "#4ade80" : i === current ? "white" : "#475569", fontSize: "0.8rem", fontWeight: 600 }}>
              {step}
            </motion.div>
            {i < steps.length - 1 && <span style={{ color: "#475569" }}>→</span>}
          </div>
        ))}
      </div>
      {!done && (
        <>
          <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "1rem", padding: "1.25rem", width: "100%" }}>
            <p style={{ color: "#a5b4fc", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.5rem" }}>Current Location</p>
            <p style={{ color: "white", fontWeight: 700, fontSize: "1.2rem", margin: 0 }}>{steps[current]}</p>
            {current < steps.length - 1 && <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: "0.5rem 0 0" }}>Next stop: {steps[current + 1]}</p>}
          </motion.div>
          <motion.button onClick={handleStep} whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }} whileTap={{ scale: 0.95 }}
            style={{ padding: "1rem 2.5rem", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>
            🚀 LAUNCH →
          </motion.button>
        </>
      )}
      {done && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontSize: "2.5rem" }}>🎉</div>
          <h3 style={{ color: "#4ade80", fontWeight: 700 }}>You reached the Pulsar!</h3>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>You navigated {steps.length} waypoints across 1,000 light-years!</p>
          <motion.button onClick={onPass} whileHover={{ scale: 1.05 }} style={{ padding: "0.9rem 2rem", background: "linear-gradient(135deg, #059669, #10b981)", color: "white", border: "none", borderRadius: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
            See Results →
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

export default function RhythmGame() {
  const { player, nextStage } = usePlayer();
  const [retry, setRetry] = useState(0);

  const renderGame = () => {
    const props = { onPass: nextStage, onFail: () => setRetry((r) => r + 1) };
    if (player.scientistClass === "Physicist") return <FormulaGame key={retry} {...props} />;
    if (player.scientistClass === "Explorer") return <ExplorerGame key={retry} {...props} />;
    return <RhythmTap key={retry} {...props} />;
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at center, #0d0d1f 0%, #000 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[...Array(80)].map((_, i) => (
          <motion.div key={i} style={{ position: "absolute", borderRadius: "50%", background: "white", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }} />
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: "relative", zIndex: 10, maxWidth: 520, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "2rem", padding: "0.4rem 1rem", color: "#a5b4fc", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {player.scientistClass} Challenge
        </motion.div>
        {renderGame()}
        <motion.button onClick={() => window.history.back()} whileHover={{ scale: 1.03 }} style={{ marginTop: "0.5rem", padding: "0.6rem 1.5rem", background: "transparent", color: "#475569", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", cursor: "pointer", fontSize: "0.8rem" }}>
          ← Go Back
        </motion.button>
      </motion.div>
    </div>
  );
}