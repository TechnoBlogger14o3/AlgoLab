import { AlgorithmState } from '../types';

export function* selectionSort(arr: number[]): Generator<AlgorithmState, number[], unknown> {
  const array = [...arr];
  const n = array.length;
  
  yield { array: [...array], comparing: [], sorted: [], currentLine: 1 }; // const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    yield { array: [...array], comparing: [], sorted: [], currentLine: 2 }; // for (let i = 0; i < n - 1; i++)
    let minIndex = i;
    yield { array: [...array], comparing: [], sorted: [], currentLine: 3 }; // let minIndex = i;
    
    // Find the minimum element in remaining unsorted array
    for (let j = i + 1; j < n; j++) {
      yield {
        array: [...array],
        comparing: [j, minIndex],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        minIndex: minIndex,
        currentLine: 5, // for (let j = i + 1; j < n; j++)
      };
      
      if (array[j] < array[minIndex]) {
        minIndex = j;
        
        yield {
          array: [...array],
          comparing: [j, minIndex],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          minIndex: minIndex,
          currentLine: 6, // if (arr[j] < arr[minIndex])
        };
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      yield { array: [...array], comparing: [i, minIndex], sorted: Array.from({ length: i }, (_, idx) => idx), minIndex: -1, currentLine: 9 }; // if (minIndex !== i)
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      
      yield {
        array: [...array],
        comparing: [i, minIndex],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        minIndex: -1,
        currentLine: 10, // [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      };
    }
    
    yield {
      array: [...array],
      comparing: [],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      minIndex: -1,
      currentLine: 13, // end of loop
    };
  }
  
  // Final state - all sorted
  yield {
    array: [...array],
    comparing: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    minIndex: -1,
    currentLine: 15, // return arr;
  };
  
  return array;
}
