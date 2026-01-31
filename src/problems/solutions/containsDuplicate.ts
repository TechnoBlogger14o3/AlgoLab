// Contains Duplicate - Step by step visualization
export function* containsDuplicate(
  nums: number[]
): Generator<Record<string, unknown>, boolean, unknown> {
  const array = [...nums];
  const seen = new Set<number>();
  
  yield {
    array: [...array],
    seen: [],
    currentIndex: -1,
    found: false,
    message: 'Starting Contains Duplicate algorithm...',
  };
  
  for (let i = 0; i < array.length; i++) {
    yield {
      array: [...array],
      seen: Array.from(seen),
      currentIndex: i,
      currentValue: array[i],
      found: false,
      message: `Checking index ${i}: value = ${array[i]}`,
    };
    
    if (seen.has(array[i])) {
      yield {
        array: [...array],
        seen: Array.from(seen),
        currentIndex: i,
        currentValue: array[i],
        found: true,
        duplicateIndex: Array.from(seen).indexOf(array[i]),
        message: `Found duplicate! ${array[i]} was seen before at index ${Array.from(seen).indexOf(array[i])}`,
      };
      
      return true;
    }
    
    seen.add(array[i]);
    
    yield {
      array: [...array],
      seen: Array.from(seen),
      currentIndex: i,
      currentValue: array[i],
      found: false,
      message: `Adding ${array[i]} to seen set`,
    };
  }
  
  yield {
    array: [...array],
    seen: Array.from(seen),
    currentIndex: -1,
    found: false,
    message: 'No duplicates found. All elements are distinct.',
  };
  
  return false;
}
