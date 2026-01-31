import { AlgorithmState } from '../types';

export function* shellSort(arr: number[]): Generator<AlgorithmState, number[], unknown> {
  const array = [...arr];
  const n = array.length;
  
  yield { array: [...array], comparing: [], sorted: [], currentLine: 1 }; // const array = [...arr];
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    yield { array: [...array], comparing: [], sorted: [], currentLine: 3 }; // for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2))
    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j: number;
      
      yield {
        array: [...array],
        comparing: [i],
        gap: gap,
        sorted: [],
        currentLine: 4, // for (let i = gap; i < n; i++)
      };
      
      // Shift earlier gap-sorted elements up until the correct location for array[i] is found
      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        yield {
          array: [...array],
          comparing: [j, j - gap],
          gap: gap,
          sorted: [],
          currentLine: 7, // for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
        };
        
        array[j] = array[j - gap];
        
        yield {
          array: [...array],
          comparing: [j],
          gap: gap,
          sorted: [],
          currentLine: 8, // arr[j] = arr[j - gap];
        };
      }
      
      // Put temp (the original array[i]) in its correct location
      array[j] = temp;
      
      yield {
        array: [...array],
        comparing: [],
        gap: gap,
        sorted: [],
        currentLine: 11, // arr[j] = temp;
      };
    }
  }
  
  // Final state - all sorted
  yield {
    array: [...array],
    comparing: [],
    gap: 0,
    sorted: Array.from({ length: n }, (_, idx) => idx),
  };
  
  return array;
}
