export default function emojiLookup(string) {
  let reaction = "";
  const lookup = {
    angry: "😡",
    laughing: "😂",
    sad: "😢",
    crying: "😢",
    fire: "🔥",
    dead: "💀",
    heart: "🩷",
  };

  reaction = lookup[string];

  return reaction;
}
