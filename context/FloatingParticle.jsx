import { createContext, useContext, useState, useCallback } from "react";
import FloatingParticle from "../app/components/FloatingParticle";
import { View, StyleSheet } from "react-native";

const FloatContext = createContext(null);

export default function FloatingParticleProvider({ children }) {
  const [particles, setParticles] = useState([]);

  const spawnParticles = useCallback((emojiChar) => {
    const burst = [];
    for (let i = 0; i < 100; i++) {
      burst.push({ id: `${Date.now()}${i}`, char: emojiChar });
    }
    setParticles((prev) => [...prev, ...burst]);
  }, []);

  const removeParticle = useCallback((id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <FloatContext.Provider value={spawnParticles}>
      {children}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {particles.map((p) => (
          <FloatingParticle
            key={p.id}
            emoji={p.char}
            onComplete={() => removeParticle(p.id)}
          />
        ))}
      </View>
    </FloatContext.Provider>
  );
}

export function useSpawnParticles() {
  return useContext(FloatContext);
}
