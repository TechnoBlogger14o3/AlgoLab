// Maximum Subarray (Kadane's Algorithm) - Step by step visualization
export function* maxSubarray(
  nums: number[]
): Generator<Record<string, unknown>, number, unknown> {
  const array = [...nums];
  let maxSum = array[0];
  let currentSum = array[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;
  
  yield {
    array: [...array],
    currentSum: currentSum,
    maxSum: maxSum,
    start: start,
    end: end,
    currentIndex: 0,
    message: `Starting Kadane's algorithm. Initial maxSum = ${maxSum}`,
  };
  
  for (let i = 1; i < array.length; i++) {
    // If current sum becomes negative, reset it
    if (currentSum < 0) {
      currentSum = array[i];
      tempStart = i;
      
      yield {
        array: [...array],
        currentSum: currentSum,
        maxSum: maxSum,
        start: start,
        end: end,
        tempStart: tempStart,
        currentIndex: i,
        message: `Current sum became negative, resetting. New currentSum = ${currentSum}`,
      };
    } else {
      currentSum += array[i];
      
      yield {
        array: [...array],
        currentSum: currentSum,
        maxSum: maxSum,
        start: start,
        end: end,
        tempStart: tempStart,
        currentIndex: i,
        message: `Adding ${array[i]} to current sum. New currentSum = ${currentSum}`,
      };
    }
    
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
      
      yield {
        array: [...array],
        currentSum: currentSum,
        maxSum: maxSum,
        start: start,
        end: end,
        tempStart: tempStart,
        currentIndex: i,
        message: `New maximum sum found: ${maxSum} (subarray from index ${start} to ${end})`,
      };
    }
  }
  
  yield {
    array: [...array],
    currentSum: currentSum,
    maxSum: maxSum,
    start: start,
    end: end,
    currentIndex: -1,
    message: `Final result: Maximum subarray sum = ${maxSum}`,
  };
  
  return maxSum;
}
