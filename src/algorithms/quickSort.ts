import { AlgorithmState } from '../types';

interface QuickSortStates {
  sorted?: number[];
}

function* quickSortHelper(
  arr: number[],
  low: number,
  high: number,
  states: QuickSortStates
): Generator<AlgorithmState, void, unknown> {
  if (low < high) {
    // Partition and get pivot index
    const pivotGen = partition(arr, low, high, states);
    let result = pivotGen.next();
    
    while (!result.done) {
      yield result.value;
      result = pivotGen.next();
    }
    
    const pivotIndex = result.value as number;
    
    // Recursively sort elements before and after partition
    yield* quickSortHelper(arr, low, pivotIndex - 1, states);
    yield* quickSortHelper(arr, pivotIndex + 1, high, states);
  }
}

function* partition(
  arr: number[],
  low: number,
  high: number,
  states: QuickSortStates
): Generator<AlgorithmState, number, unknown> {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    yield {
      array: [...arr],
      comparing: [j, high],
      pivot: high,
      partition: [low, high],
      sorted: states.sorted || [],
      currentLine: 8, // for (let j = low; j < high; j++)
    };
    
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      
      yield {
        array: [...arr],
        comparing: [j, high],
        pivot: high,
        partition: [low, high],
        sorted: states.sorted || [],
        currentLine: 9, // if (arr[j] < pivot)
      };
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  yield {
    array: [...arr],
    comparing: [],
    pivot: i + 1,
    partition: [low, high],
    sorted: states.sorted || [],
  };
  
  return i + 1;
}

export function* quickSort(arr: number[]): Generator<AlgorithmState, number[], unknown> {
  const array = [...arr];
  const states: QuickSortStates = { sorted: [] };
  
  yield { array: [...array], comparing: [], sorted: [], currentLine: 2 }; // function quickSort
  
  yield* quickSortHelper(array, 0, array.length - 1, states);
  
  // Mark all as sorted
  yield {
    array: [...array],
    comparing: [],
    pivot: -1,
    partition: [],
    sorted: Array.from({ length: array.length }, (_, idx) => idx),
    currentLine: 4, // return arr
  };
  
  return array;
}
