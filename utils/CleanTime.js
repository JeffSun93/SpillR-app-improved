export function timeAgo(created_at) {
  const now = new Date();
  const created = new Date(created_at);
  const diffMs = now - created;

  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return created.toLocaleDateString();
}
