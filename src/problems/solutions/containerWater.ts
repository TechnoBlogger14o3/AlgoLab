// Container With Most Water - Step by step visualization
export function* containerWater(
  height: number[]
): Generator<Record<string, unknown>, number, unknown> {
  const array = [...height];
  let left = 0;
  let right = array.length - 1;
  let maxArea = 0;
  let bestLeft = -1;
  let bestRight = -1;
  
  yield {
    array: [...array],
    left: left,
    right: right,
    maxArea: maxArea,
    bestLeft: bestLeft,
    bestRight: bestRight,
    message: 'Starting Container With Most Water algorithm with two pointers...',
  };
  
  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(array[left], array[right]);
    const area = width * minHeight;
    
    yield {
      array: [...array],
      left: left,
      right: right,
      maxArea: maxArea,
      bestLeft: bestLeft,
      bestRight: bestRight,
      currentArea: area,
      width: width,
      minHeight: minHeight,
      message: `Left=${left} (height=${array[left]}), Right=${right} (height=${array[right]}), Area=${width} × ${minHeight} = ${area}`,
    };
    
    if (area > maxArea) {
      maxArea = area;
      bestLeft = left;
      bestRight = right;
      
      yield {
        array: [...array],
        left: left,
        right: right,
        maxArea: maxArea,
        bestLeft: bestLeft,
        bestRight: bestRight,
        currentArea: area,
        width: width,
        minHeight: minHeight,
        message: `New maximum area found: ${maxArea} (between indices ${left} and ${right})`,
      };
    }
    
    // Move the pointer with smaller height
    if (array[left] < array[right]) {
      left++;
      yield {
        array: [...array],
        left: left,
        right: right,
        maxArea: maxArea,
        bestLeft: bestLeft,
        bestRight: bestRight,
        message: `Moving left pointer (smaller height)`,
      };
    } else {
      right--;
      yield {
        array: [...array],
        left: left,
        right: right,
        maxArea: maxArea,
        bestLeft: bestLeft,
        bestRight: bestRight,
        message: `Moving right pointer (smaller height)`,
      };
    }
  }
  
  yield {
    array: [...array],
    left: left,
    right: right,
    maxArea: maxArea,
    bestLeft: bestLeft,
    bestRight: bestRight,
    message: `Final result: Maximum water = ${maxArea}`,
  };
  
  return maxArea;
}
