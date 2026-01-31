import { AlgorithmState } from '../types';

export function* bubbleSort(arr: number[]): Generator<AlgorithmState, number[], unknown> {
  const array = [...arr];
  const n = array.length;
  
  yield {
    array: [...array],
    comparing: [],
    sorted: [],
    currentLine: 1,
  };
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    yield {
      array: [...array],
      comparing: [],
      sorted: Array.from({ length: n - i - 1 }, (_, idx) => n - 1 - idx),
      currentLine: 3,
    };
    
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        array: [...array],
        comparing: [j, j + 1],
        sorted: Array.from({ length: n - i - 1 }, (_, idx) => n - 1 - idx),
        currentLine: 4,
      };
      
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        
        yield {
          array: [...array],
          comparing: [j, j + 1],
          sorted: Array.from({ length: n - i - 1 }, (_, idx) => n - 1 - idx),
          currentLine: 5,
        };
      }
    }
    
    if (!swapped) break;
  }
  
  yield {
    array: [...array],
    comparing: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    currentLine: 8,
  };
  
  return array;
}
