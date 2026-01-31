import { AlgorithmState } from '../types';

export function* linearSearch(
  arr: number[],
  target: number
): Generator<AlgorithmState, number, unknown> {
  const array = [...arr];
  
  yield { 
    array: [...array], 
    comparing: [], 
    target: target,
    found: false,
    currentIndex: -1,
    currentLine: 1, // function linearSearch
  };
  
  for (let i = 0; i < array.length; i++) {
    yield { 
      array: [...array], 
      comparing: [i], 
      target: target,
      found: false,
      currentIndex: i,
      currentLine: 3, // for (let i = 0; i < arr.length; i++)
    };
    
    if (array[i] === target) {
      yield { 
        array: [...array], 
        comparing: [i], 
        target: target,
        found: true,
        currentIndex: i,
        currentLine: 4, // if (arr[i] === target)
      };
      
      yield { 
        array: [...array], 
        comparing: [i], 
        target: target,
        found: true,
        currentIndex: i,
        currentLine: 5, // return i;
      };
      
      return i;
    }
  }
  
  yield { 
    array: [...array], 
    comparing: [], 
    target: target,
    found: false,
    currentIndex: -1,
    currentLine: 7, // return -1;
  };
  
  return -1;
}
