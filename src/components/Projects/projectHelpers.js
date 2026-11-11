// * Helpers that turn the raw projects.json fields into what the modal renders

// Two-digit counter: 1 -> "01"
export const pad = (n) => String(n).padStart(2, "0");

// "Name: description" -> { name, text }, splitting on the first ": " only
export function splitEntry(entry) {
  const at = entry.indexOf(": ");
  if (at === -1) return { name: entry, text: "" };
  return { name: entry.slice(0, at), text: entry.slice(at + 2) };
}

// Screenshot path -> button label and alt text, derived from the file name.
// homePage -> HOME, orderOnlinePage -> ORDER ONLINE, darkTheme -> DARK THEME,
// topIMDBPage -> TOP IMDB
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
    label: name.toUpperCase(),
    alt: `${projectTitle} ${name.toLowerCase()} ${isPage ? "page" : "screenshot"}`,
  };
}
