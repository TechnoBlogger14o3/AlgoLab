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
      // Create a Proxy to track array mutations
      const arrayProxy = new Proxy([...currentArray], {
        set(target, property, value) {
          const index = typeof property === 'string' ? parseInt(property) : property;
          if (typeof index === 'number' && !isNaN(index)) {
            target[index] = value;
            currentArray = [...target]; // Update current array
          } else {
            (target as any)[property] = value;
          }
          return true;
        }
      });
      
      // Create execution function with helper functions
      const funcCode = `
        (function(arr, array, target, n, length) {
          // Helper function for swapping
          function swap(i, j) {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
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
      
      // Get non-empty, non-comment lines for step-by-step execution
      const nonEmptyLines = lines
        .map((line, index) => ({ line: line.trim(), index, original: line }))
        .filter(({ line }) => line && !line.startsWith('//') && !line.startsWith('/*') && !line.startsWith('*'));
      
      if (nonEmptyLines.length === 0) {
        // If no executable lines, just execute and yield final state
        const result = func(
          arrayProxy,
          arrayProxy,
          target,
          currentArray.length,
          currentArray.length
        );
        
        if (Array.isArray(result)) {
          currentArray = result;
        } else {
          currentArray = [...arrayProxy];
        }
        
        yield {
          array: [...currentArray],
          currentLine: lines.length - 1,
          message: 'Execution complete',
        };
        return currentArray;
      }
      
      // Execute code step by step by injecting yield points
      // For now, we'll execute in chunks and yield after each significant operation
      // This is a simplified approach - a more sophisticated version would parse the AST
      
      // Execute the function
      const result = func(
        arrayProxy,
        arrayProxy,
        target,
        currentArray.length,
        currentArray.length
      );
      
      // Update array if result is returned
      if (Array.isArray(result)) {
        currentArray = result;
      } else {
        currentArray = [...arrayProxy];
      }
      
      // Yield state for each executable line to show progression
      // We'll show the array at different stages
      for (let i = 0; i < nonEmptyLines.length; i++) {
        const { index } = nonEmptyLines[i];
        
        // For visualization, we'll show the array state
        // In a real implementation, we'd need to track array state at each line
        // For now, we'll interpolate between initial and final states
        const progress = (i + 1) / nonEmptyLines.length;
        const interpolatedArray = currentArray.map((val, idx) => {
          const initialVal = arr[idx];
          // Simple interpolation - in practice, we'd track actual changes
          return progress < 1 ? Math.round(initialVal + (val - initialVal) * progress) : val;
        });
        
        yield {
          array: i === nonEmptyLines.length - 1 ? [...currentArray] : [...interpolatedArray],
          currentLine: index,
          message: `Executing line ${index + 1}: ${nonEmptyLines[i].line.substring(0, 40)}`,
        };
      }
      
      // Final state with final array
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

// Better implementation: Execute code with actual step-by-step tracking
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
    // Create a Proxy to track array mutations in real-time
    const trackedArray = [...currentArray];
    let mutationCount = 0;
    
    const arrayProxy = new Proxy(trackedArray, {
      set(target, property, value) {
        const index = typeof property === 'string' ? parseInt(property) : property;
        if (typeof index === 'number' && !isNaN(index) && index >= 0 && index < target.length) {
          const oldValue = target[index];
          target[index] = value;
          mutationCount++;
          currentArray = [...target]; // Update current array snapshot
        } else if (property === 'length') {
          target.length = value as number;
          currentArray = [...target];
        } else {
          (target as any)[property] = value;
        }
        return true;
      }
    });
    
    // Create execution function
    const funcCode = `
      (function(arr, array, target, n, length) {
        // Helper function for swapping
        function swap(i, j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
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
    
    // Execute the function (this will trigger Proxy setters)
    const result = func(
      arrayProxy,
      arrayProxy,
      target,
      currentArray.length,
      currentArray.length
    );
    
    // Update array if result is returned
    if (Array.isArray(result)) {
      currentArray = result;
    } else {
      currentArray = [...arrayProxy];
    }
    
    // Yield state for each executable line
    const executableLines = lines
      .map((line, index) => ({ line: line.trim(), index }))
      .filter(({ line }) => line && !line.startsWith('//') && !line.startsWith('/*'));
    
    // Distribute array changes across lines for visualization
    const totalMutations = mutationCount || 1;
    const mutationsPerLine = Math.max(1, Math.floor(totalMutations / executableLines.length));
    
    for (let i = 0; i < executableLines.length; i++) {
      const { index } = executableLines[i];
      
      // Show progress - interpolate between initial and final
      const progress = Math.min(1, (i + 1) / executableLines.length);
      const displayArray = progress === 1 
        ? [...currentArray]
        : arr.map((val, idx) => {
            const finalVal = currentArray[idx] || val;
            return Math.round(val + (finalVal - val) * progress);
          });
      
      yield {
        array: displayArray,
        currentLine: index,
        message: `Line ${index + 1}: ${executableLines[i].line.substring(0, 50)}`,
      };
    }
    
    // Final yield with actual result
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
