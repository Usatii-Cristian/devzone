// Fisher-Yates shuffle — returns a new array with elements in uniform random
// order. Preferred over `arr.sort(() => Math.random() - 0.5)`, which is biased
// and not a uniform shuffle.
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
