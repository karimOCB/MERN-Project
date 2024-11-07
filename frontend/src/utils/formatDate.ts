export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    minute: "numeric",
    hour: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}