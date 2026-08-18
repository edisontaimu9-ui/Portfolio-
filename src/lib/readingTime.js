// Estimates reading time from raw markdown content.
// Strips markdown syntax before counting words so headings/links/code
// fences don't inflate the count, then assumes ~200 words per minute.
export function readingTime(markdown = '') {
  const plain = String(markdown)
    .replace(/```[\s\S]*?```/g, ' ')      // code blocks
    .replace(/`[^`]*`/g, ' ')             // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')  // links (keep nothing, just strip syntax)
    .replace(/[#>*_~\-]/g, ' ')            // markdown punctuation
    .replace(/\s+/g, ' ')
    .trim()

  const words = plain ? plain.split(' ').length : 0
  const minutes = Math.max(1, Math.round(words / 200))
  return minutes
}
