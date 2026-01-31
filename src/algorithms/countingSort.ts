import { AlgorithmState } from '../types';

interface CountingInfo {
  value?: number;
  count: number[];
  index?: number;
  output?: number[];
  outputIndex?: number;
}

export function* countingSort(arr: number[]): Generator<AlgorithmState, number[], unknown> {
  const array = [...arr];
  const n = array.length;
  
  if (n === 0) {
    yield {
      array: [...array],
      comparing: [],
      counting: {},
      sorted: Array.from({ length: n }, (_, idx) => idx),
    };
    return array;
  }
  
  // Find the maximum element
  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min + 1;
  
  // Initialize count array
  const count = new Array(range).fill(0);
  const output = new Array(n);
  
  yield { array: [...array], comparing: [], sorted: [], currentLine: 1 }; // const array = [...arr];
  
  // Store count of each element
  for (let i = 0; i < n; i++) {
    count[array[i] - min]++;
    
    yield {
      array: [...array],
      comparing: [i],
      counting: { 
        value: array[i],
        count: [...count],
        index: array[i] - min,
      } as CountingInfo,
      sorted: [],
      currentLine: 7, // for (let i = 0; i < arr.length; i++)
    };
  }
  
  // Change count[i] so that count[i] contains actual position
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
    
    yield {
      array: [...array],
      comparing: [],
      counting: { 
        count: [...count],
        index: i,
      } as CountingInfo,
      sorted: [],
      currentLine: 10, // for (let i = 1; i < range; i++)
    };
  }
  
  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const value = array[i];
    const index = count[value - min] - 1;
    output[index] = value;
    count[value - min]--;
    
    yield {
      array: [...array],
      comparing: [i],
      counting: { 
        value: value,
        count: [...count],
        output: [...output],
        outputIndex: index,
      } as CountingInfo,
      sorted: [],
      currentLine: 13, // for (let i = arr.length - 1; i >= 0; i--)
    };
  }
  
  // Copy output array to original array
  for (let i = 0; i < n; i++) {
    array[i] = output[i];
    
    yield {
      array: [...array],
      comparing: [i],
      counting: {},
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      currentLine: 16, // for (let i = 0; i < n; i++)
    };
  }
  
  // Final state - all sorted
  yield {
    array: [...array],
    comparing: [],
    counting: {},
    sorted: Array.from({ length: n }, (_, idx) => idx),
  };
  
  return array;
}
