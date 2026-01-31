import { AlgorithmState } from '../types';

export function* binarySearch(
  arr: number[],
  target: number
): Generator<AlgorithmState, number, unknown> {
  const array = [...arr].sort((a, b) => a - b); // Binary search requires sorted array
  let left = 0;
  let right = array.length - 1;
  
  yield { 
    array: [...array], 
    comparing: [], 
    target: target,
    left: left,
    right: right,
    mid: -1,
    found: false,
    currentLine: 1, // function binarySearch
  };
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    yield { 
      array: [...array], 
      comparing: [mid], 
      target: target,
      left: left,
      right: right,
      mid: mid,
      found: false,
      currentLine: 3, // while (left <= right)
    };
    
    yield { 
      array: [...array], 
      comparing: [mid], 
      target: target,
      left: left,
      right: right,
      mid: mid,
      found: false,
      currentLine: 4, // const mid = Math.floor((left + right) / 2);
    };
    
    if (array[mid] === target) {
      yield { 
        array: [...array], 
        comparing: [mid], 
        target: target,
        left: left,
        right: right,
        mid: mid,
        found: true,
        currentLine: 6, // if (arr[mid] === target)
      };
      
      yield { 
        array: [...array], 
        comparing: [mid], 
        target: target,
        left: left,
        right: right,
        mid: mid,
        found: true,
        currentLine: 7, // return mid;
      };
      
      return mid;
    }
    
    if (array[mid] < target) {
      yield { 
        array: [...array], 
        comparing: [mid], 
        target: target,
        left: left,
        right: right,
        mid: mid,
        found: false,
        currentLine: 9, // if (arr[mid] < target)
      };
      
      left = mid + 1;
      
      yield { 
        array: [...array], 
        comparing: [], 
        target: target,
        left: left,
        right: right,
        mid: mid,
        found: false,
        currentLine: 10, // left = mid + 1;
      };
    } else {
      yield { 
        array: [...array], 
        comparing: [mid], 
        target: target,
        left: left,
        right: right,
        mid: mid,
        found: false,
        currentLine: 12, // else
      };
      
      right = mid - 1;
      
      yield { 
        array: [...array], 
        comparing: [], 
        target: target,
        left: left,
        right: right,
        mid: mid,
        found: false,
        currentLine: 13, // right = mid - 1;
      };
    }
  }
  
  yield { 
    array: [...array], 
    comparing: [], 
    target: target,
    left: left,
    right: right,
    mid: -1,
    found: false,
    currentLine: 16, // return -1;
  };
  
  return -1;
}
