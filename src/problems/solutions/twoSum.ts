// Two Sum - Step by step visualization
export function* twoSum(
  nums: number[],
  target: number
): Generator<Record<string, unknown>, number[], unknown> {
  const map = new Map<number, number>();
  const array = [...nums];
  
  yield {
    array: [...array],
    pointers: [],
    map: {},
    currentIndex: -1,
    found: false,
    message: 'Starting Two Sum algorithm...',
  };
  
  for (let i = 0; i < array.length; i++) {
    const complement = target - array[i];
    
    yield {
      array: [...array],
      pointers: [i],
      map: Object.fromEntries(map),
      currentIndex: i,
      currentValue: array[i],
      complement: complement,
      found: false,
      message: `Checking index ${i}: value = ${array[i]}, looking for complement = ${target} - ${array[i]} = ${complement}`,
    };
    
    if (map.has(complement)) {
      const result = [map.get(complement)!, i];
      
      yield {
        array: [...array],
        pointers: [map.get(complement)!, i],
        map: Object.fromEntries(map),
        currentIndex: i,
        currentValue: array[i],
        complement: complement,
        found: true,
        result: result,
        message: `Found! ${array[map.get(complement)!]} + ${array[i]} = ${target}`,
      };
      
      return result;
    }
    
    map.set(array[i], i);
    
    yield {
      array: [...array],
      pointers: [i],
      map: Object.fromEntries(map),
      currentIndex: i,
      currentValue: array[i],
      complement: complement,
      found: false,
      message: `Adding ${array[i]} to map at index ${i}`,
    };
  }
  
  yield {
    array: [...array],
    pointers: [],
    map: Object.fromEntries(map),
    currentIndex: -1,
    found: false,
    message: 'No solution found',
  };
  
  return [];
}
