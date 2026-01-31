# TypeScript Migration Guide

This project is being migrated from JavaScript to TypeScript. Here's what has been done and what remains:

## Completed ✅

1. ✅ TypeScript installed (`typescript`, `@types/node`)
2. ✅ `tsconfig.json` and `tsconfig.node.json` created
3. ✅ `vite.config.ts` created
4. ✅ `src/main.tsx` converted
5. ✅ `src/types/index.ts` - Type definitions created
6. ✅ `src/utils/arrayUtils.ts` converted
7. ✅ `src/utils/codeExecutor.ts` converted
8. ✅ `src/components/Controls.tsx` converted
9. ✅ `src/components/AlgorithmSelector.tsx` converted
10. ✅ `src/algorithms/bubbleSort.ts` converted
11. ✅ `src/data/algorithmCode.ts` converted (partial)

## Remaining Files to Convert

### Algorithms (convert .js to .ts)
- [ ] `src/algorithms/quickSort.js`
- [ ] `src/algorithms/mergeSort.js`
- [ ] `src/algorithms/insertionSort.js`
- [ ] `src/algorithms/selectionSort.js`
- [ ] `src/algorithms/heapSort.js`
- [ ] `src/algorithms/shellSort.js`
- [ ] `src/algorithms/countingSort.js`
- [ ] `src/algorithms/linearSearch.js`
- [ ] `src/algorithms/binarySearch.js`
- [ ] `src/algorithms/bfs.js` (if still needed)
- [ ] `src/algorithms/dfs.js` (if still needed)

### Components (convert .jsx to .tsx)
- [ ] `src/components/ArrayVisualizer.jsx`
- [ ] `src/components/CodeDisplay.jsx`
- [ ] `src/components/PracticeEditor.jsx`
- [ ] `src/components/GraphVisualizer.jsx` (if still needed)
- [ ] `src/components/ProblemList.jsx` (if still needed)
- [ ] `src/components/ProblemViewer.jsx` (if still needed)
- [ ] `src/components/ProblemVisualizer.jsx` (if still needed)

### Data & Utils
- [ ] `src/data/algorithmCode.ts` (complete all algorithms)
- [ ] `src/utils/graphUtils.js` (if still needed)
- [ ] `src/problems/problemsData.js` (if still needed)
- [ ] `src/problems/solutions/*.js` (if still needed)

### Main App
- [ ] `src/App.jsx` → `src/App.tsx`

## Conversion Pattern

### For Algorithm Files:

**Before (.js):**
```javascript
export function* bubbleSort(arr) {
  const array = [...arr];
  yield { array: [...array], comparing: [], sorted: [] };
  return array;
}
```

**After (.ts):**
```typescript
import { AlgorithmState } from '../types';

export function* bubbleSort(arr: number[]): Generator<AlgorithmState, number[], unknown> {
  const array = [...arr];
  yield { array: [...array], comparing: [], sorted: [] };
  return array;
}
```

### For Component Files:

**Before (.jsx):**
```javascript
export default function MyComponent({ prop1, prop2 }) {
  return <div>{prop1}</div>;
}
```

**After (.tsx):**
```typescript
interface MyComponentProps {
  prop1: string;
  prop2: number;
}

export default function MyComponent({ prop1, prop2 }: MyComponentProps) {
  return <div>{prop1}</div>;
}
```

## Quick Conversion Script

You can use this to rename files (but you'll still need to add types):

```bash
# Rename all .js files to .ts
find src -name "*.js" -not -path "*/node_modules/*" -exec sh -c 'mv "$1" "${1%.js}.ts"' _ {} \;

# Rename all .jsx files to .tsx  
find src -name "*.jsx" -not -path "*/node_modules/*" -exec sh -c 'mv "$1" "${1%.jsx}.tsx"' _ {} \;
```

## Next Steps

1. Convert `src/App.jsx` to `src/App.tsx` (most critical)
2. Convert remaining algorithm files
3. Convert remaining component files
4. Update imports throughout the codebase
5. Fix any TypeScript errors
6. Remove old .js/.jsx files

## Testing

After conversion, run:
```bash
npm run build  # Check for TypeScript errors
npm run dev    # Test the app
```
