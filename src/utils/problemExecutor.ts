import { Language } from '../types';

export interface ExecutionStep {
  step: number;
  currentIndex?: number;
  array?: number[];
  map?: Map<number, number>;
  comparing?: number[];
  message: string;
  result?: number[];
  found?: boolean;
}

export interface ExecutionResult {
  passed: boolean;
  actual: unknown;
  steps: ExecutionStep[];
  error?: string;
}

/**
 * Convert code from various languages to executable JavaScript
 */
function convertToJavaScript(code: string, language: Language): string {
  // Remove comments and clean up
  let cleaned = code
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim();

  let jsCode = '';

  if (language === 'java') {
    // Extract method body - handle class wrapper
    let methodBody = '';
    
    // Find the method start
    const methodStart = cleaned.search(/public\s+int\[\]\s+twoSum\s*\([^)]*\)\s*\{/);
    if (methodStart !== -1) {
      // Find the opening brace of the method
      let braceCount = 0;
      let startIdx = cleaned.indexOf('{', methodStart);
      let endIdx = startIdx + 1;
      
      // Find matching closing brace
      for (let i = startIdx; i < cleaned.length; i++) {
        if (cleaned[i] === '{') braceCount++;
        if (cleaned[i] === '}') {
          braceCount--;
          if (braceCount === 0) {
            endIdx = i;
            break;
          }
        }
      }
      
      if (endIdx > startIdx) {
        methodBody = cleaned.substring(startIdx + 1, endIdx).trim();
      }
    }
    
    // Fallback: try regex if manual extraction failed
    if (!methodBody) {
      const methodMatch = cleaned.match(/public\s+int\[\]\s+twoSum\s*\([^)]*\)\s*\{([\s\S]*)\}/);
      if (methodMatch && methodMatch[1]) {
        // Remove the last closing brace if present
        methodBody = methodMatch[1].replace(/\}\s*$/, '').trim();
      }
    }
    
    if (methodBody) {
      let body = methodBody.trim();
      
      // Remove any trailing closing braces that might be from the class
      body = body.replace(/\}\s*$/, '').trim();
      
      console.log('Extracted method body:', body);
      
      // Convert Java HashMap declarations - handle diamond operator <>
      body = body.replace(/HashMap\s*<\s*Integer\s*,\s*Integer\s*>\s+map\s*=\s*new\s+HashMap\s*<\s*Integer\s*,\s*Integer\s*>\s*\(\)\s*;/g, 'const map = new Map();');
      body = body.replace(/HashMap\s*<\s*Integer\s*,\s*Integer\s*>\s+map\s*=\s*new\s+HashMap\s*<>\s*\(\)\s*;/g, 'const map = new Map();');
      body = body.replace(/HashMap\s*<\s*Integer\s*,\s*Integer\s*>\s+map\s*=\s*new\s+HashMap\s*\(\)\s*;/g, 'const map = new Map();');
      body = body.replace(/HashMap\s*<\s*Integer\s*,\s*Integer\s*>/g, 'Map');
      body = body.replace(/new\s+HashMap\s*<\s*Integer\s*,\s*Integer\s*>\s*\(\)/g, 'new Map()');
      body = body.replace(/new\s+HashMap\s*<>\s*\(\)/g, 'new Map()');
      body = body.replace(/new\s+HashMap\s*\(\)/g, 'new Map()');
      
      // Convert Java array return syntax - handle both single line and multi-line
      body = body.replace(/return\s+new\s+int\[\]\s*\{\s*([^}]+)\s*\}\s*;/g, (match, content) => {
        const values = content.split(',').map((v: string) => v.trim()).join(', ');
        return `return [${values}];`;
      });
      
      // Convert method calls
      body = body.replace(/\.containsKey\s*\(/g, '.has(');
      body = body.replace(/\.put\s*\(/g, '.set(');
      body = body.replace(/\.get\s*\(/g, '.get(');
      
      // Convert variable declarations (but not in for loops yet)
      body = body.replace(/\bint\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, 'let $1 =');
      
      // Handle for loop variable declarations separately
      body = body.replace(/for\s*\(\s*int\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, 'for (let $1 =');
      
      // Remove trailing return if we already have one
      const hasReturn = body.includes('return');
      
      jsCode = `function twoSum(nums, target) {
        ${body}
        ${!hasReturn ? 'return [-1, -1];' : ''}
      }`;
      
      console.log('Converted JavaScript:', jsCode);
    } else {
      // If extraction failed, try a more lenient approach
      console.warn('Failed to extract method body, trying fallback conversion');
      // Fallback: try to convert the entire code block
      let body = cleaned;
      body = body.replace(/class\s+\w+\s*\{/g, '');
      body = body.replace(/public\s+int\[\]\s+twoSum\s*\([^)]*\)\s*\{/g, 'function twoSum(nums, target) {');
      body = body.replace(/HashMap\s*<\s*Integer\s*,\s*Integer\s*>\s+map\s*=\s*new\s+HashMap\s*<>\s*\(\)\s*;/g, 'const map = new Map();');
      body = body.replace(/\.containsKey\s*\(/g, '.has(');
      body = body.replace(/\.put\s*\(/g, '.set(');
      body = body.replace(/\.get\s*\(/g, '.get(');
      body = body.replace(/return\s+new\s+int\[\]\s*\{\s*([^}]+)\s*\}\s*;/g, (match, content) => {
        const values = content.split(',').map((v: string) => v.trim()).join(', ');
        return `return [${values}];`;
      });
      body = body.replace(/\bint\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, 'let $1 =');
      body = body.replace(/for\s*\(\s*int\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, 'for (let $1 =');
      jsCode = body;
    }
  } else if (language === 'python') {
    // Extract function body
    const funcMatch = cleaned.match(/def\s+twoSum\s*\([^)]*\)\s*:([\s\S]*)/);
    if (funcMatch) {
      let body = funcMatch[1];
      
      // Convert Python dict to JavaScript Map
      body = body.replace(/\{\}/g, 'new Map()');
      body = body.replace(/dict\s*\(\)/g, 'new Map()');
      body = body.replace(/\.get\s*\(/g, '.get(');
      body = body.replace(/in\s+/g, '.has(');
      body = body.replace(/\[/g, '.get(');
      body = body.replace(/\]\s*=/g, '.set(');
      
      // Convert indentation
      body = body.replace(/^\s{4}/gm, '');
      body = body.replace(/^\s{8}/gm, '  ');
      
      jsCode = `function twoSum(nums, target) {
        const map = new Map();
        ${body}
        return [-1, -1];
      }`;
    }
  } else if (language === 'javascript') {
    // Extract function body
    const funcMatch = cleaned.match(/function\s+twoSum\s*\([^)]*\)\s*\{([\s\S]*)\}/);
    if (funcMatch) {
      jsCode = `function twoSum(nums, target) {
        ${funcMatch[1]}
      }`;
    } else {
      // Try arrow function
      const arrowMatch = cleaned.match(/const\s+twoSum\s*=\s*\([^)]*\)\s*=>\s*\{([\s\S]*)\}/);
      if (arrowMatch) {
        jsCode = `function twoSum(nums, target) {
          ${arrowMatch[1]}
        }`;
      }
    }
  } else if (language === 'cpp') {
    // Extract function body
    const funcMatch = cleaned.match(/vector\s*<\s*int\s*>\s*twoSum\s*\([^)]*\)\s*\{([\s\S]*)\}/);
    if (funcMatch) {
      let body = funcMatch[1];
      body = body.replace(/unordered_map\s*<\s*int\s*,\s*int\s*>/g, 'Map');
      body = body.replace(/\.count\s*\(/g, '.has(');
      body = body.replace(/\[/g, '.get(');
      body = body.replace(/\]\s*=/g, '.set(');
      
      jsCode = `function twoSum(nums, target) {
        const map = new Map();
        ${body}
        return [-1, -1];
      }`;
    }
  }

  return jsCode;
}

/**
 * Actually execute the user's code and get the result
 */
function executeUserCode(
  code: string,
  language: Language,
  nums: number[],
  target: number
): { result: number[] | null; error?: string } {
  try {
    const jsCode = convertToJavaScript(code, language);
    
    if (!jsCode) {
      return { 
        result: null, 
        error: `Failed to parse ${language} code. Please check your function signature.` 
      };
    }

    // Log the converted code for debugging
    console.log('Converted JavaScript code:', jsCode);

    // Create a safe execution context
    const func = new Function('nums', 'target', `
      ${jsCode}
      return twoSum(nums, target);
    `);

    const result = func(nums, target);
    
    console.log('Execution result:', result, 'Type:', typeof result, 'IsArray:', Array.isArray(result));
    
    if (Array.isArray(result) && result.length === 2 && 
        typeof result[0] === 'number' && typeof result[1] === 'number') {
      return { result };
    }
    
    return { 
      result: null, 
      error: `Code returned invalid result: ${JSON.stringify(result)}. Expected array of two numbers.` 
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error executing code:', error);
    console.error('Error stack:', errorStack);
    return { 
      result: null, 
      error: `Execution error: ${errorMessage}` 
    };
  }
}

/**
 * Execute two-sum algorithm step by step with visualization
 * First executes the actual code to get the result, then generates visualization steps
 */
export function* executeTwoSum(
  code: string,
  language: Language,
  nums: number[],
  target: number
): Generator<ExecutionStep, ExecutionResult, unknown> {
  const steps: ExecutionStep[] = [];
  let stepNumber = 0;
  let map = new Map<number, number>();
  let result: number[] | null = null;
  let error: string | undefined;

  try {
    // First, actually execute the user's code to get the real result
    const executionResult = executeUserCode(code, language, nums, target);
    
    if (executionResult.result === null) {
      error = executionResult.error || 'Failed to execute code or code returned invalid result';
      return {
        passed: false,
        actual: null,
        steps: steps,
        error: error,
      };
    }

    result = executionResult.result;

    // Now generate visualization steps based on hash map approach (most common)
    // We'll simulate the algorithm execution for visualization
    for (let i = 0; i < nums.length; i++) {
      stepNumber++;
      const currentNum = nums[i];
      const complement = target - currentNum;

      const checkStep: ExecutionStep = {
        step: stepNumber,
        currentIndex: i,
        array: [...nums],
        map: new Map(map),
        message: `Checking index ${i}: nums[${i}] = ${currentNum}, looking for complement ${complement}`,
      };
      steps.push(checkStep);
      yield checkStep;

      if (map.has(complement)) {
        const complementIndex = map.get(complement)!;
        
        stepNumber++;
        const foundStep: ExecutionStep = {
          step: stepNumber,
          currentIndex: i,
          array: [...nums],
          map: new Map(map),
          comparing: [complementIndex, i],
          message: `Found! nums[${complementIndex}] + nums[${i}] = ${nums[complementIndex]} + ${nums[i]} = ${target}`,
          result: [complementIndex, i],
          found: true,
        };
        steps.push(foundStep);
        yield foundStep;

        // Return with actual result (comparison will be done in executeProblemCode)
        return {
          passed: true, // Will be overridden by actual comparison
          actual: result,
          steps: steps,
        };
      } else {
        map.set(currentNum, i);
        stepNumber++;
        const addStep: ExecutionStep = {
          step: stepNumber,
          currentIndex: i,
          array: [...nums],
          map: new Map(map),
          message: `Adding nums[${i}] = ${currentNum} to map`,
        };
        steps.push(addStep);
        yield addStep;
      }
    }

    // If we get here, no solution was found in visualization
    // But check if the actual result is valid
    const hasValidResult = result && result[0] !== -1 && result[1] !== -1;
    
    return {
      passed: hasValidResult,
      actual: result,
      steps: steps,
    };
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
    return {
      passed: false,
      actual: null,
      steps: steps,
      error: error,
    };
  }
}

/**
 * Execute code and return result
 */
export async function executeProblemCode(
  problemId: string,
  code: string,
  language: Language,
  testCase: { input: Record<string, unknown>; expectedOutput: unknown }
): Promise<ExecutionResult> {
  if (problemId === 'two-sum') {
    const nums = testCase.input.nums as number[];
    const target = testCase.input.target as number;
    const expected = testCase.expectedOutput as number[];

    // First, execute the user's code to get the actual result
    const executionResult = executeUserCode(code, language, nums, target);
    
    if (executionResult.result === null) {
      return {
        passed: false,
        actual: null,
        steps: [],
        error: executionResult.error || 'Failed to execute code. Please check your code syntax.',
      };
    }

    const actualResult = executionResult.result;

    console.log('Comparing results:', {
      actual: actualResult,
      expected: expected,
      actualType: typeof actualResult,
      expectedType: typeof expected,
      isActualArray: Array.isArray(actualResult),
      isExpectedArray: Array.isArray(expected),
    });

    // Compare actual result with expected result
    const passed = 
      Array.isArray(actualResult) && 
      Array.isArray(expected) &&
      expected.length === 2 &&
      actualResult.length === 2 &&
      ((actualResult[0] === expected[0] && actualResult[1] === expected[1]) ||
       (actualResult[0] === expected[1] && actualResult[1] === expected[0]));

    console.log('Comparison result:', passed);

    // Now generate visualization steps
    const generator = executeTwoSum(code, language, nums, target);
    const steps: ExecutionStep[] = [];

    // Collect all visualization steps
    let next = generator.next();
    while (!next.done) {
      if (next.value && 'step' in next.value) {
        steps.push(next.value as ExecutionStep);
      }
      next = generator.next();
    }

    // Get the final result from generator (which includes the actual executed result)
    if (next.value && 'passed' in next.value) {
      const result = next.value as ExecutionResult;
      // Use the actual executed result for comparison
      return {
        passed: passed, // Use comparison with expected, not generator's internal check
        actual: actualResult,
        steps: steps.length > 0 ? steps : result.steps,
        error: result.error,
      };
    }

    return {
      passed: passed,
      actual: actualResult,
      steps: steps,
    };
  }

  // For other problems, return a placeholder
  return {
    passed: false,
    actual: null,
    steps: [],
    error: 'Problem executor not implemented yet',
  };
}
