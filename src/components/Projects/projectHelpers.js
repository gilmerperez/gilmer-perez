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

// ["order", "Online"] -> "Order online". Acronyms (IMDB, TV) keep their capitals.
function toSentenceCase(words) {
  const text = words
    .map((w) => {
      if (ACRONYMS.includes(w.toLowerCase())) return w.toUpperCase();
      return w.length > 1 && w === w.toUpperCase() ? w : w.toLowerCase();
    })
    .join(" ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Screenshot path -> button label and alt text, derived from the file name.
// homePage -> Home, orderOnlinePage -> Order online, darkTheme -> Dark theme,
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
    label: toSentenceCase(nameWords),
    alt: `${projectTitle} ${name.toLowerCase()} ${isPage ? "page" : "screenshot"}`,
  };
}
