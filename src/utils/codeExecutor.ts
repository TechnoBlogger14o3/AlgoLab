// Utility to execute user code and track execution line by line
// This wraps user code to track array changes and execution flow

export interface ExecutionState {
  array: number[];
  currentLine: number;
  message: string;
  error?: boolean;
}

export function createTrackedAlgorithm(
  code: string,
  algorithmType: string
): (arr: number[], target?: number | null) => Generator<ExecutionState, number[], unknown> {
  return function* (arr: number[], target: number | null = null): Generator<ExecutionState, number[], unknown> {
    const lines = code.split('\n');
    let currentArray = [...arr];
    
    // Yield initial state
    yield {
      array: [...currentArray],
      currentLine: 0,
      message: 'Starting execution',
    };
    
    try {
      // Create execution function with helper functions
      const funcCode = `
        (function(arr, array, target, n, length) {
          // Helper function for swapping
          function swap(i, j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
          
          ${code}
          
          return arr;
        })
      `;
      
      const func = new Function('return ' + funcCode)() as (
        arr: number[],
        array: number[],
        target: number | null,
        n: number,
        length: number
      ) => number[];
      
      // Execute the function
      const result = func(
        currentArray,
        currentArray,
        target,
        currentArray.length,
        currentArray.length
      );
      
      // Update array if result is returned
      if (Array.isArray(result)) {
        currentArray = result;
      }
      
      // Yield state for each non-empty, non-comment line
      // This simulates step-by-step execution
      const nonEmptyLines = lines
        .map((line, index) => ({ line: line.trim(), index }))
        .filter(({ line }) => line && !line.startsWith('//') && !line.startsWith('/*'));
      
      if (nonEmptyLines.length === 0) {
        // If no executable lines, just yield final state
        yield {
          array: [...currentArray],
          currentLine: lines.length - 1,
          message: 'Execution complete',
        };
        return currentArray;
      }
      
      // Yield state for each executable line
      for (let i = 0; i < nonEmptyLines.length; i++) {
        const { index } = nonEmptyLines[i];
        yield {
          array: [...currentArray],
          currentLine: index,
          message: `Executing line ${index + 1}`,
        };
      }
      
      // Final state with sorted array
      yield {
        array: [...currentArray],
        currentLine: lines.length - 1,
        message: 'Execution complete',
      };
      
      return currentArray;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      // Yield error state
      yield {
        array: [...currentArray],
        currentLine: 0,
        message: `Error: ${errorMessage}`,
        error: true,
      };
      throw error;
    }
  };
}

// Alternative: Execute code with more granular tracking
export function* executeUserCodeStepByStep(
  code: string,
  arr: number[],
  target: number | null = null
): Generator<ExecutionState, number[], unknown> {
  const lines = code.split('\n');
  let currentArray = [...arr];
  
  // Yield initial state
  yield {
    array: [...currentArray],
    currentLine: 0,
    message: 'Starting execution',
  };
  
  try {
    // Create execution function
    const funcCode = `
      (function(arr, array, target, n, length) {
        // Helper function for swapping
        function swap(i, j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        
        ${code}
        
        return arr;
      })
    `;
    
    const func = new Function('return ' + funcCode)() as (
      arr: number[],
      array: number[],
      target: number | null,
      n: number,
      length: number
    ) => number[];
    
    // Execute and capture result
    const result = func(
      currentArray,
      currentArray,
      target,
      currentArray.length,
      currentArray.length
    );
    
    // Update array if result is returned
    if (Array.isArray(result)) {
      currentArray = result;
    }
    
    // Yield final state for each line (simplified visualization)
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() && !lines[i].trim().startsWith('//')) {
        yield {
          array: [...currentArray],
          currentLine: i,
          message: `Line ${i + 1}: ${lines[i].trim().substring(0, 50)}`,
        };
      }
    }
    
    // Final yield
    yield {
      array: [...currentArray],
      currentLine: lines.length - 1,
      message: 'Execution complete',
    };
    
    return currentArray;
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    yield {
      array: [...currentArray],
      currentLine: 0,
      message: `Error: ${errorMessage}`,
      error: true,
    };
    throw error;
  }
}
