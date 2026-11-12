// * Helpers that turn the raw projects.json fields into what the modal renders

// Two-digit counter: 1 -> "01"
export const pad = (n) => String(n).padStart(2, "0");

// "Name: description" -> { name, text }, splitting on the first ": " only
export function splitEntry(entry) {
  const at = entry.indexOf(": ");
  if (at === -1) return { name: entry, text: "" };
  return { name: entry.slice(0, at), text: entry.slice(at + 2) };
}

// Short acronyms that camelCase file names write in lowercase (tvShowsPage)
const ACRONYMS = ["tv", "ai", "faq", "bbq"];

// Small words that stay lowercase in title case unless they come first
const MINOR_WORDS = ["a", "an", "the", "and", "or", "for", "of", "on", "in", "to", "with"];

// ["order", "Online"] -> "Order Online". Acronyms (IMDB, TV) keep their capitals.
function toTitleCase(words) {
  return words
    .map((w, i) => {
      if (ACRONYMS.includes(w.toLowerCase())) return w.toUpperCase();
      if (w.length > 1 && w === w.toUpperCase()) return w;
      const lower = w.toLowerCase();
      if (i > 0 && MINOR_WORDS.includes(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

// Screenshot path -> button label and alt text, derived from the file name.
// homePage -> Home, orderOnlinePage -> Order Online, darkTheme -> Dark Theme,
// topIMDBPage -> Top IMDB (acronyms keep their capitals)
export function describeScreenshot(src, projectTitle) {
  const fileName = src.split("/").pop().replace(/\.[a-z0-9]+$/i, "");
  const words = fileName
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // camelCase boundaries
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // acronym followed by a word (IMDBPage)
    .split(" ");
  const isPage = words.length > 1 && words[words.length - 1] === "Page";
  const nameWords = isPage ? words.slice(0, -1) : words;
  const name = nameWords.join(" ");

  return {
    src,
    label: toTitleCase(nameWords),
    alt: `${projectTitle} ${name.toLowerCase()} ${isPage ? "page" : "screenshot"}`,
  };
}
