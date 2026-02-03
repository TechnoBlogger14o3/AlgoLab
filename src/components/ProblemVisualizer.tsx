import { useEffect, useState } from 'react';
import { Problem } from '../data/blind75Problems';
import { Language } from '../types';
import ArrayVisualizer from './ArrayVisualizer';

interface ProblemVisualizerProps {
  problem: Problem;
  code: string;
  language: Language;
  testCase: { input: Record<string, unknown>; expectedOutput: unknown };
}

export default function ProblemVisualizer({
  problem,
  code,
  language,
  testCase,
}: ProblemVisualizerProps) {
  const [visualizationData, setVisualizationData] = useState<{
    array?: number[];
    comparing?: number[];
    sorted?: number[];
    message?: string;
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
        message: `Visualizing: ${problem.title}`,
      });
    }
  }, [problem, testCase]);

  if (!visualizationData.array || visualizationData.array.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>Visualization will appear here when you run your solution</p>
        <p className="text-sm mt-2">The visualizer shows how your algorithm processes the input data</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {visualizationData.message && (
        <div className="bg-blue-900/50 border border-blue-600/50 rounded-lg p-3">
          <p className="text-white text-sm">{visualizationData.message}</p>
        </div>
      )}

      <div className="bg-gray-900 rounded-lg p-4">
        <ArrayVisualizer
          array={visualizationData.array}
          comparing={visualizationData.comparing}
          sorted={visualizationData.sorted}
        />
      </div>

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
