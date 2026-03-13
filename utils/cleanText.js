export function cleanText(str) {
  const cleanText = str.replace(/<[^>]+>/g, "");
  return cleanText;
}
