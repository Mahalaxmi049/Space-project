import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { usePlayer } from "../../contexts/PlayerContext";

function PulsarSphere({ frequency }: { frequency: number }) {
  const meshRef = useRef<any>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * frequency;
      meshRef.current.rotation.x += 0.005 * frequency;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * frequency * 3) * 0.15;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={0.8} wireframe />
    </mesh>
  );
}

function BeamRings({ frequency }: { frequency: number }) {
  const ring1 = useRef<any>(null);
  const ring2 = useRef<any>(null);
  const ring3 = useRef<any>(null);
  useFrame((state) => {
    if (ring1.current) ring1.current.rotation.z = state.clock.elapsedTime * frequency * 0.5;
    if (ring2.current) ring2.current.rotation.z = -state.clock.elapsedTime * frequency * 0.3;
    if (ring3.current) ring3.current.rotation.x = state.clock.elapsedTime * frequency * 0.2;
  });
  return (
    <>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.04, 8, 64]} />
        <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3, 0.03, 8, 64]} />
        <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 8, 64]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={1} />
      </mesh>
    </>
  );
}

export default function PulsarCore() {
  const { player, nextStage } = usePlayer();
  const [frequency, setFrequency] = useState(1);
  const [tuned, setTuned] = useState(false);

  const handleFrequency = (val: number) => {
    setFrequency(val);
    setTuned(val >= 4 && val <= 6);
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at center, #0d0d1f 0%, #000 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", overflow: "hidden" }}>

      {/* Stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[...Array(100)].map((_, i) => (
          <motion.div key={i} style={{ position: "absolute", borderRadius: "50%", background: "white", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>

        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "2rem", padding: "0.4rem 1rem" }}>
          <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: "50%", background: "#818cf8" }} />
          <span style={{ color: "#a5b4fc", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Pulsar Detected</span>
        </motion.div>

        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, color: "white", textAlign: "center", margin: 0 }}>
          Tune Your Frequency,{" "}
          <span style={{ background: "linear-gradient(135deg, #818cf8, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{player.name}</span>
        </h2>

        <p style={{ color: "#94a3b8", textAlign: "center", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 480 }}>
          A Pulsar spins hundreds of times per second sending out radio beams like a cosmic lighthouse. 
          Drag the slider to match its rotation frequency and lock on!
        </p>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={{ width: "100%", height: 320, borderRadius: "1rem", overflow: "hidden", border: `1px solid ${tuned ? "rgba(74,222,128,0.3)" : "rgba(99,102,241,0.2)"}`, boxShadow: tuned ? "0 0 40px rgba(74,222,128,0.1)" : "0 0 40px rgba(99,102,241,0.1)", transition: "all 0.5s" }}
        >
          <Canvas camera={{ position: [0, 0, 7] }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
            <pointLight position={[-10, -10, -10]} color="#60a5fa" intensity={0.8} />
            <pointLight position={[0, 10, 0]} color="#a78bfa" intensity={0.5} />
            <PulsarSphere frequency={frequency} />
            <BeamRings frequency={frequency} />
          </Canvas>
        </motion.div>

        {/* Frequency slider */}
        <div style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Frequency: <strong style={{ color: "white" }}>{frequency.toFixed(1)} Hz</strong></span>
            <motion.span
              animate={{ opacity: tuned ? 1 : [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: tuned ? 0 : Infinity }}
              style={{ color: tuned ? "#4ade80" : "#f59e0b", fontSize: "0.85rem", fontWeight: 600 }}
            >
              {tuned ? "✓ Signal Locked!" : "⟳ Searching..."}
            </motion.span>
          </div>
          <input type="range" min="1" max="10" step="0.1" value={frequency} onChange={(e) => handleFrequency(parseFloat(e.target.value))} style={{ width: "100%", accentColor: tuned ? "#4ade80" : "#818cf8", height: 6 }} />
          <div style={{ display: "flex", justifyContent: "space-between", color: "#475569", fontSize: "0.75rem", marginTop: "0.5rem" }}>
            <span>1 Hz — Slow</span><span>10 Hz — Fast</span>
          </div>
        </div>

        {/* Fun fact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "0.75rem", padding: "1rem 1.25rem", width: "100%" }}
        >
          <p style={{ color: "#a5b4fc", fontSize: "0.82rem", margin: 0, lineHeight: 1.6 }}>
            ⚡ <strong>Fun Fact:</strong> The fastest pulsar spins 716 times per second — faster than a kitchen blender! It's called PSR J1748-2446ad and is 18,000 light-years away.
          </p>
        </motion.div>

        <motion.button
          onClick={nextStage}
          disabled={!tuned}
          whileHover={tuned ? { scale: 1.05, boxShadow: "0 0 30px rgba(74,222,128,0.3)" } : {}}
          whileTap={tuned ? { scale: 0.95 } : {}}
          style={{ width: "100%", padding: "1.1rem", background: tuned ? "linear-gradient(135deg, #059669, #10b981)" : "rgba(255,255,255,0.05)", color: tuned ? "white" : "#475569", border: "none", borderRadius: "0.75rem", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: tuned ? "pointer" : "not-allowed", transition: "all 0.3s" }}
        >
          {tuned ? "Signal Locked — Take The Challenge →" : "Tune The Frequency To Lock On..."}
        </motion.button>
      </motion.div>
    </div>
  );
}