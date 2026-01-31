import { useState, useEffect, useRef } from 'react';
import ProblemVisualizer from './ProblemVisualizer';
import Controls from './Controls';
import { twoSum } from '../problems/solutions/twoSum';
import { bestTimeBuySell } from '../problems/solutions/bestTimeBuySell';
import { containsDuplicate } from '../problems/solutions/containsDuplicate';
import { maxSubarray } from '../problems/solutions/maxSubarray';
import { containerWater } from '../problems/solutions/containerWater';
import { Problem } from '../problems/problemsData';

interface ProblemViewerProps {
  problem: Problem;
  onBack: () => void;
}

export default function ProblemViewer({ problem, onBack }: ProblemViewerProps) {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(500);
  const [visualizationState, setVisualizationState] = useState<Record<string, unknown> | null>(null);
  const generatorRef = useRef<Generator<Record<string, unknown>, unknown, unknown> | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [testCaseIndex, setTestCaseIndex] = useState<number>(0);
  
  const currentTestCase = problem.examples[testCaseIndex];
  
  const getSolutionGenerator = (): ((...args: unknown[]) => Generator<Record<string, unknown>, unknown, unknown>) | null => {
    // Get solution generator function based on problem ID
    switch (problem.id) {
      case 'two-sum':
        return twoSum as (nums: number[], target: number) => Generator<Record<string, unknown>, number[], unknown>;
      case 'best-time-buy-sell':
        return bestTimeBuySell as (prices: number[]) => Generator<Record<string, unknown>, number, unknown>;
      case 'contains-duplicate':
        return containsDuplicate as (nums: number[]) => Generator<Record<string, unknown>, boolean, unknown>;
      case 'max-subarray':
        return maxSubarray as (nums: number[]) => Generator<Record<string, unknown>, number, unknown>;
      case 'container-water':
        return containerWater as (height: number[]) => Generator<Record<string, unknown>, number, unknown>;
      default:
        return null;
    }
  };
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  const startVisualization = () => {
    if (isPaused && generatorRef.current) {
      setIsPaused(false);
      continueVisualization();
      return;
    }
    
    const generatorFn = getSolutionGenerator();
    if (!generatorFn) {
      console.error('No generator function found for problem:', problem.id);
      return;
    }
    
    const input = currentTestCase.input as Record<string, unknown>;
    let generator: Generator<Record<string, unknown>, unknown, unknown>;
    
    try {
      if (problem.id === 'two-sum') {
        generator = generatorFn(input.nums as number[], input.target as number);
      } else if (problem.id === 'best-time-buy-sell') {
        generator = generatorFn(input.prices as number[]);
      } else if (problem.id === 'contains-duplicate') {
        generator = generatorFn(input.nums as number[]);
      } else if (problem.id === 'max-subarray') {
        generator = generatorFn(input.nums as number[]);
      } else if (problem.id === 'container-water') {
        generator = generatorFn(input.height as number[]);
      } else {
        console.error('Unknown problem ID:', problem.id);
        return;
      }
      
      if (!generator) {
        console.error('Generator is null or undefined');
        return;
      }
      
      generatorRef.current = generator;
      setIsRunning(true);
      setIsPaused(false);
      
      // Set initial state
      const firstResult = generatorRef.current.next();
      if (!firstResult.done) {
        setVisualizationState(firstResult.value as Record<string, unknown>);
      }
      
      intervalRef.current = setInterval(() => {
        if (!generatorRef.current) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return;
        }
        
        const result = generatorRef.current.next();
        
        if (result.done) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsRunning(false);
          setIsPaused(false);
          intervalRef.current = null;
          return;
        }
        
        setVisualizationState(result.value as Record<string, unknown>);
      }, speed);
    } catch (error) {
      console.error('Error starting visualization:', error);
      setIsRunning(false);
      setIsPaused(false);
    }
  };
  
  const continueVisualization = () => {
    if (!generatorRef.current) return;
    
    intervalRef.current = setInterval(() => {
      if (!generatorRef.current) return;
      const result = generatorRef.current.next();
      
      if (result.done) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
        setIsPaused(false);
        intervalRef.current = null;
        return;
      }
      
      setVisualizationState(result.value as Record<string, unknown>);
    }, speed);
  };
  
  const pauseVisualization = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPaused(true);
  };
  
  const resetVisualization = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
    generatorRef.current = null;
    setVisualizationState(null);
  };
  
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (isRunning && !isPaused && intervalRef.current) {
      clearInterval(intervalRef.current);
      continueVisualization();
    }
  };
  
  const getArrayFromInput = (): number[] => {
    const input = currentTestCase.input as Record<string, unknown>;
    if (input.nums) return input.nums as number[];
    if (input.prices) return input.prices as number[];
    if (input.height) return input.height as number[];
    return [];
  };
  
  return (
    <div className="space-y-6">
      {/* Problem Header */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{problem.title}</h2>
            <div className="flex gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {problem.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                {problem.category}
              </span>
            </div>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            ← Back
          </button>
        </div>
        
        <p className="text-gray-300 mb-4">{problem.description}</p>
        
        {/* Test Case Selector */}
        <div className="mb-4">
          <label className="text-white font-medium mb-2 block">Test Case:</label>
          <select
            value={testCaseIndex}
            onChange={(e) => {
              setTestCaseIndex(Number(e.target.value));
              resetVisualization();
            }}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            disabled={isRunning && !isPaused}
          >
            {problem.examples.map((_, idx) => (
              <option key={idx} value={idx}>Test Case {idx + 1}</option>
            ))}
          </select>
        </div>
        
        {/* Current Test Case Info */}
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-300 mb-2">
            <strong className="text-white">Input:</strong> {JSON.stringify(currentTestCase.input)}
          </p>
          <p className="text-sm text-gray-300 mb-2">
            <strong className="text-white">Expected Output:</strong> {JSON.stringify(currentTestCase.output)}
          </p>
          <p className="text-sm text-gray-300">
            <strong className="text-white">Explanation:</strong> {currentTestCase.explanation}
          </p>
        </div>
      </div>
      
      {/* Visualization */}
      <ProblemVisualizer
        {...(visualizationState || {
          array: getArrayFromInput(),
          message: 'Click Play to start visualization',
        })}
      />
      
      {/* Controls */}
      <Controls
        isRunning={isRunning}
        isPaused={isPaused}
        speed={speed}
        onPlay={startVisualization}
        onPause={pauseVisualization}
        onReset={resetVisualization}
        onSpeedChange={handleSpeedChange}
        onGenerateNew={() => {}}
        arraySize={getArrayFromInput().length}
        onArraySizeChange={() => {}}
        arrayType=""
        onArrayTypeChange={() => {}}
        hideArrayControls={true}
      />
    </div>
  );
}
