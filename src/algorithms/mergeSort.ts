import { AlgorithmState } from '../types';

interface MergeSortStates {
  sorted?: number[];
}

function* merge(
  arr: number[],
  left: number,
  mid: number,
  right: number,
  states: MergeSortStates
): Generator<AlgorithmState, void, unknown> {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  while (i < leftArr.length && j < rightArr.length) {
    yield {
      array: [...arr],
      comparing: [left + i, mid + 1 + j],
      merging: [left, right],
      sorted: states.sorted || [],
      currentLine: 6, // while (i < left.length && j < right.length)
    };
    
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
    
    yield {
      array: [...arr],
      comparing: [k - 1],
      merging: [left, right],
      sorted: states.sorted || [],
    };
  }
  
  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
    
    yield {
      array: [...arr],
      comparing: [k - 1],
      merging: [left, right],
      sorted: states.sorted || [],
    };
  }
  
  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
    
    yield {
      array: [...arr],
      comparing: [k - 1],
      merging: [left, right],
      sorted: states.sorted || [],
    };
  }
}

function* mergeSortHelper(
  arr: number[],
  left: number,
  right: number,
  states: MergeSortStates
): Generator<AlgorithmState, void, unknown> {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    yield* mergeSortHelper(arr, left, mid, states);
    yield* mergeSortHelper(arr, mid + 1, right, states);
    
    yield* merge(arr, left, mid, right, states);
  } else if (left === right) {
    // Single element is sorted
    if (!states.sorted) states.sorted = [];
    states.sorted.push(left);
    
    yield {
      array: [...arr],
      comparing: [],
      merging: [],
      sorted: [...states.sorted],
    };
  }
}

export function* mergeSort(arr: number[]): Generator<AlgorithmState, number[], unknown> {
  const array = [...arr];
  const states: MergeSortStates = { sorted: [] };
  
  yield { array: [...array], comparing: [], sorted: [], currentLine: 1 }; // function mergeSort
  
  yield* mergeSortHelper(array, 0, array.length - 1, states);
  
  // Final state - all sorted
  yield {
    array: [...array],
    comparing: [],
    merging: [],
    sorted: Array.from({ length: array.length }, (_, idx) => idx),
    currentLine: 5, // return merge(left, right)
  };
  
  return array;
}
