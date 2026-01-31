export function generateRandomArray(size: number, min: number = 10, max: number = 100): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

export function generateSortedArray(size: number, min: number = 10, max: number = 100): number[] {
  return generateRandomArray(size, min, max).sort((a, b) => a - b);
}

export function generateReversedArray(size: number, min: number = 10, max: number = 100): number[] {
  return generateSortedArray(size, min, max).reverse();
}

export function generateNearlySortedArray(size: number, min: number = 10, max: number = 100): number[] {
  const array = generateSortedArray(size, min, max);
  // Swap a few random pairs to make it nearly sorted
  for (let i = 0; i < Math.floor(size / 10); i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = Math.floor(Math.random() * size);
    [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
  }
  return array;
}
