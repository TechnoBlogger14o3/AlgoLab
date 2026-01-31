import { AlgorithmState } from '../types';

export function* insertionSort(arr: number[]): Generator<AlgorithmState, number[], unknown> {
  const array = [...arr];
  const n = array.length;
  
  yield { array: [...array], comparing: [], sorted: [], currentLine: 1 }; // const array = [...arr];
  
  for (let i = 1; i < n; i++) {
    yield { array: [...array], comparing: [], sorted: [], currentLine: 3 }; // for (let i = 1; i < arr.length; i++)
    const key = array[i];
    let j = i - 1;
    
    yield {
      array: [...array],
      comparing: [i],
      inserting: i,
      sorted: Array.from({ length: i }, (_, idx) => idx),
      currentLine: 4, // const key = arr[i];
    };
    
    // Move elements greater than key one position ahead
    while (j >= 0 && array[j] > key) {
      yield {
        array: [...array],
        comparing: [j, j + 1],
        inserting: i,
        sorted: Array.from({ length: i }, (_, idx) => idx),
        currentLine: 6, // while (j >= 0 && arr[j] > key)
      };
      
      array[j + 1] = array[j];
      j--;
      
      yield {
        array: [...array],
        comparing: [j + 1],
        inserting: i,
        sorted: Array.from({ length: i }, (_, idx) => idx),
        currentLine: 7, // arr[j + 1] = arr[j];
      };
    }
    
    array[j + 1] = key;
    
    yield {
      array: [...array],
      comparing: [],
      inserting: -1,
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      currentLine: 10, // arr[j + 1] = key;
    };
  }
  
  // Final state - all sorted
  yield {
    array: [...array],
    comparing: [],
    inserting: -1,
    sorted: Array.from({ length: n }, (_, idx) => idx),
    currentLine: 12, // return arr;
  };
  
  return array;
}
