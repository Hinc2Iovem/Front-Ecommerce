export const isNonEmptyMatrix = (matrix: string[][]) =>
  Array.isArray(matrix) &&
  matrix.length > 0 &&
  matrix.every(
    (row) =>
      Array.isArray(row) && row.length > 0 && row.every((cell) => Boolean(cell))
  );
