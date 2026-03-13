export function cleanText(str) {
  if (!str) return "";
  const cleanText = str.replace(/<[^>]+>/g, "");
  return cleanText;
}
