function emojiLookup(string) {
  let reaction = "";
  const lookup = {
    angry: "😡",
    laughing: "😂",
    sad: "😢",
    fire: "🔥",
    dead: "💀",
    heart: "🩷",
  };

  reaction = lookup[string];

  return reaction;
}
