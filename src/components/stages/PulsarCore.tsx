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
      <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.5} wireframe />
    </mesh>
  );
}

function BeamRings({ frequency }: { frequency: number }) {
  const ring1 = useRef<any>(null);
  const ring2 = useRef<any>(null);
  useFrame((state) => {
    if (ring1.current) ring1.current.rotation.z = state.clock.elapsedTime * frequency;
    if (ring2.current) ring2.current.rotation.z = -state.clock.elapsedTime * frequency * 0.7;
  });
  return (
    <>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 8, 64]} />
        <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3, 0.03, 8, 64]} />
        <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={1} />
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
    if (val >= 4 && val <= 6) setTuned(true);
    else setTuned(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "black", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative" }}>
      {/* Stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[...Array(80)].map((_, i) => (
          <motion.div key={i} style={{ position: "absolute", borderRadius: "50%", background: "white", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <motion.p style={{ color: "#60a5fa", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          Pulsar Detected
        </motion.p>

        <h2 style={{ color: "white", fontSize: "1.8rem", fontWeight: "bold", textAlign: "center" }}>
          Tune Your Frequency, <span style={{ color: "#60a5fa" }}>{player.name}</span>
        </h2>

        <p style={{ color: "#9ca3af", textAlign: "center", fontSize: "0.9rem" }}>
          A Pulsar spins hundreds of times per second sending out radio beams. 
          Adjust the frequency slider to match its rotation and lock on!
        </p>

        {/* 3D Canvas */}
        <div style={{ width: "100%", height: 300, borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(96,165,250,0.2)" }}>
          <Canvas camera={{ position: [0, 0, 6] }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#818cf8" intensity={0.5} />
            <PulsarSphere frequency={frequency} />
            <BeamRings frequency={frequency} />
          </Canvas>
        </div>

        {/* Frequency slider */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#9ca3af", fontSize: "0.8rem" }}>
            <span>Frequency: {frequency.toFixed(1)} Hz</span>
            <span style={{ color: tuned ? "#4ade80" : "#f59e0b" }}>{tuned ? "✓ Signal Locked!" : "Searching..."}</span>
          </div>
          <input
            type="range" min="1" max="10" step="0.1"
            value={frequency}
            onChange={(e) => handleFrequency(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#60a5fa" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", color: "#4b5563", fontSize: "0.75rem" }}>
            <span>Slow</span><span>Fast</span>
          </div>
        </div>

        {/* Fun fact */}
        <div style={{ background: "rgba(96,165,250,0.05)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: "0.75rem", padding: "1rem", width: "100%" }}>
          <p style={{ color: "#93c5fd", fontSize: "0.8rem", margin: 0 }}>
            ⚡ <strong>Fun Fact:</strong> The fastest pulsar spins 716 times per second — 
            faster than a kitchen blender! It's called PSR J1748-2446ad.
          </p>
        </div>

        <motion.button
          onClick={nextStage}
          disabled={!tuned}
          whileHover={tuned ? { scale: 1.05 } : {}}
          whileTap={tuned ? { scale: 0.95 } : {}}
          style={{ padding: "1rem 2rem", background: tuned ? "#2563eb" : "rgba(255,255,255,0.05)", color: tuned ? "white" : "#4b5563", border: "none", borderRadius: "0.75rem", fontWeight: "bold", fontSize: "0.875rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: tuned ? "pointer" : "not-allowed" }}
        >
          {tuned ? "Signal Locked — Decode It →" : "Tune The Frequency First..."}
        </motion.button>
      </motion.div>
    </div>
  );
}