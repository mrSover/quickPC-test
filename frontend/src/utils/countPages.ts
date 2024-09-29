export const countPages = (amount: number): number[] => {
  return new Array(Math.ceil(amount / 3))
    .fill(0)
    .map((_, index) => index + 1);
}