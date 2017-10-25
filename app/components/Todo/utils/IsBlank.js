export function removeSpaces(string) {
  return string.replace(/\s{2,}/g, ' ');
}
// Check for input function
export function isBlank(string) {
  string = removeSpaces(string);
  return string !== ' ' && string !== '';
}
