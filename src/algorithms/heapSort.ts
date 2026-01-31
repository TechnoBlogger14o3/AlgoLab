import { AlgorithmState } from '../types';

interface HeapSortStates {
  sorted?: number[];
}

interface HeapInfo {
  root: number;
  size: number;
}

function* heapify(
  arr: number[],
  n: number,
  i: number,
  states: HeapSortStates
): Generator<AlgorithmState, void, unknown> {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  yield {
    array: [...arr],
    comparing: [i, left, right].filter(idx => idx < n),
    heap: { root: i, size: n } as HeapInfo,
    sorted: states.sorted || [],
  };
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    yield {
      array: [...arr],
      comparing: [i, largest],
      heap: { root: i, size: n } as HeapInfo,
      sorted: states.sorted || [],
    };
    
    yield* heapify(arr, n, largest, states);
  }
}

function* buildHeap(
  arr: number[],
  states: HeapSortStates
): Generator<AlgorithmState, void, unknown> {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i, states);
  }
}

export function* heapSort(arr: number[]): Generator<AlgorithmState, number[], unknown> {
  const array = [...arr];
  const n = array.length;
  const states: HeapSortStates = { sorted: [] };
  
  yield { array: [...array], comparing: [], sorted: [], currentLine: 1 }; // function heapSort
  
  // Build max heap
  yield* buildHeap(array, states);
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    yield { array: [...array], comparing: [], sorted: [], currentLine: 4 }; // for (let i = n - 1; i > 0; i--)
    // Move current root to end
    [array[0], array[i]] = [array[i], array[0]];
    
    yield {
      array: [...array],
      comparing: [0, i],
      heap: { root: 0, size: i } as HeapInfo,
      sorted: Array.from({ length: n - i - 1 }, (_, idx) => idx + i + 1),
      currentLine: 5, // [arr[0], arr[i]] = [arr[i], arr[0]];
    };
    
    // Call heapify on the reduced heap
    yield* heapify(array, i, 0, states);
    
    states.sorted = Array.from({ length: n - i }, (_, idx) => idx + i);
    
    yield {
      array: [...array],
      comparing: [],
      heap: { root: 0, size: i } as HeapInfo,
      sorted: states.sorted,
      currentLine: 7, // heapify(arr, i, 0)
    };
  }
  
  // Final state - all sorted
  yield {
    array: [...array],
    comparing: [],
    heap: { root: -1, size: 0 } as HeapInfo,
    sorted: Array.from({ length: n }, (_, idx) => idx),
    currentLine: 10, // return arr
  };
  
  return array;
}
