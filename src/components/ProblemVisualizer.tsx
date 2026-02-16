import { useEffect, useState } from 'react';
import { Problem } from '../data/blind75Problems';
import { Language } from '../types';
import ArrayVisualizer from './ArrayVisualizer';
import HashMapVisualizer from './HashMapVisualizer';
import { ExecutionStep } from '../utils/problemExecutor';

interface ProblemVisualizerProps {
  problem: Problem;
  code: string;
  language: Language;
  testCase: { input: Record<string, unknown>; expectedOutput: unknown };
  executionSteps?: ExecutionStep[];
  currentStep?: number;
}

export default function ProblemVisualizer({
  problem,
  code,
  language,
  testCase,
  executionSteps,
  currentStep,
}: ProblemVisualizerProps) {
  const [visualizationData, setVisualizationData] = useState<{
    array?: number[];
    comparing?: number[];
    sorted?: number[];
    message?: string;
    map?: Map<number, number>;
    currentIndex?: number;
    result?: number[];
    found?: boolean;
  }>({});

  useEffect(() => {
    // Extract array data from test case for visualization
    const input = testCase.input;
    let array: number[] = [];

    if (problem.id === 'two-sum' && Array.isArray(input.nums)) {
      array = input.nums as number[];
    } else if (problem.id === 'best-time-buy-sell' && Array.isArray(input.prices)) {
      array = input.prices as number[];
    } else if (problem.id === 'contains-duplicate' && Array.isArray(input.nums)) {
      array = input.nums as number[];
    } else if (problem.id === 'max-subarray' && Array.isArray(input.nums)) {
      array = input.nums as number[];
    } else if (problem.id === 'container-water' && Array.isArray(input.height)) {
      array = input.height as number[];
    }

    if (array.length > 0) {
      setVisualizationData({
        array,
        comparing: [],
        sorted: [],
        message: executionSteps && executionSteps.length > 0 
          ? 'Click "Run Tests" to see visualization' 
          : `Visualizing: ${problem.title}`,
      });
    }
  }, [problem, testCase, executionSteps]);

  // Update visualization when execution steps change
  useEffect(() => {
    if (executionSteps && executionSteps.length > 0) {
      const stepIndex = currentStep !== undefined && currentStep >= 0 ? currentStep : 0;
      const step = executionSteps[stepIndex];
      if (step) {
        setVisualizationData(prev => ({
          array: step.array || prev.array || [],
          comparing: step.comparing || [],
          sorted: [],
          message: step.message,
          map: step.map,
          currentIndex: step.currentIndex,
          result: step.result,
          found: step.found,
        }));
      }
    }
  }, [executionSteps, currentStep]);

  if (!visualizationData.array || visualizationData.array.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>Visualization will appear here when you run your solution</p>
        <p className="text-sm mt-2">The visualizer shows how your algorithm processes the input data</p>
      </div>
    );
  }

  const isTwoSum = problem.id === 'two-sum';
  const hasMap = visualizationData.map && visualizationData.map.size > 0;

  return (
    <div className="space-y-4">
      {visualizationData.message && (
        <div className={`rounded-lg p-3 border ${
          visualizationData.found 
            ? 'bg-green-900/50 border-green-600/50' 
            : visualizationData.result
            ? 'bg-red-900/50 border-red-600/50'
            : 'bg-blue-900/50 border-blue-600/50'
        }`}>
          <p className="text-white text-sm font-medium">{visualizationData.message}</p>
        </div>
      )}

      {isTwoSum && hasMap && (
        <HashMapVisualizer
          map={visualizationData.map!}
          currentKey={visualizationData.currentIndex !== undefined 
            ? visualizationData.array[visualizationData.currentIndex] 
            : undefined}
          currentValue={visualizationData.currentIndex}
          highlightKey={visualizationData.comparing && visualizationData.comparing.length > 0
            ? visualizationData.array[visualizationData.comparing[0]]
            : undefined}
        />
      )}

      <div className="bg-gray-900 rounded-lg p-4">
        <ArrayVisualizer
          array={visualizationData.array}
          comparing={visualizationData.comparing}
          sorted={visualizationData.sorted}
          currentIndex={visualizationData.currentIndex}
          target={isTwoSum ? (testCase.input.target as number) : undefined}
          found={visualizationData.found}
        />
      </div>

      {visualizationData.result && (
        <div className={`rounded-lg p-3 border ${
          visualizationData.found 
            ? 'bg-green-900/50 border-green-600/50' 
            : 'bg-red-900/50 border-red-600/50'
        }`}>
          <div className="text-white text-sm font-semibold mb-1">
            {visualizationData.found ? '✓ Solution Found!' : '✗ No Solution Found'}
          </div>
          <div className="text-gray-300 text-xs font-mono">
            Result: [{visualizationData.result.join(', ')}]
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Input</div>
          <div className="text-white font-mono text-xs">
            {JSON.stringify(testCase.input, null, 2)}
          </div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Expected Output</div>
          <div className="text-green-400 font-mono text-xs">
            {JSON.stringify(testCase.expectedOutput, null, 2)}
          </div>
        </div>
      </div>
    </div>
  );
}
