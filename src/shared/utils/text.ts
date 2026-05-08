export function stripHtml(text: string): string {
  return (text ?? '').replace(/<[^>]*>/g, '').trim();
}

export function estimateReadingTime(text: string): string {
  const words = stripHtml(text).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}
