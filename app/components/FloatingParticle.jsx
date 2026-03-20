import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function FloatingParticle({ emoji, onComplete }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const startX = useRef(Math.random() * SCREEN_WIDTH - 25).current;

  useEffect(() => {
    const drift = (Math.random() - 0.5) * 60;
    const duration = 1500 + Math.random() * 500;
    const delay = Math.random() * 180;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -(SCREEN_HEIGHT * 0.72),
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: drift,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => finished && onComplete());
  }, []);

  return (
    <Animated.Text
      style={[
        styles.particle,
        {
          left: startX,
          transform: [{ translateY }, { translateX }, { scale }],
          opacity,
        },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    fontSize: 35,
    bottom: 0,
    // alignSelf: "center",
    // left: Math.random() * SCREEN_WIDTH,
  },
});
