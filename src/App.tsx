import { useState, useEffect, useRef } from 'react';
import ArrayVisualizer from './components/ArrayVisualizer';
import Controls from './components/Controls';
import AlgorithmSelector from './components/AlgorithmSelector';
import CodeDisplay from './components/CodeDisplay';
import StatisticsPanel from './components/StatisticsPanel';
import ELectureMode from './components/ELectureMode';
import ComparisonMode from './components/ComparisonMode';
import ZoomControls from './components/ZoomControls';
import { generateRandomArray, generateSortedArray, generateReversedArray, generateNearlySortedArray } from './utils/arrayUtils';
import { bubbleSort } from './algorithms/bubbleSort';
import { quickSort } from './algorithms/quickSort';
import { mergeSort } from './algorithms/mergeSort';
import { insertionSort } from './algorithms/insertionSort';
import { selectionSort } from './algorithms/selectionSort';
import { heapSort } from './algorithms/heapSort';
import { shellSort } from './algorithms/shellSort';
import { countingSort } from './algorithms/countingSort';
import { linearSearch } from './algorithms/linearSearch';
import { binarySearch } from './algorithms/binarySearch';
import { Algorithm, AlgorithmState, ArrayType, Language, AlgorithmType } from './types';
import './App.css';

const ALGORITHMS: Algorithm[] = [
  { id: 'bubble', name: 'Bubble Sort', generator: bubbleSort, type: 'sort' },
  { id: 'quick', name: 'Quick Sort', generator: quickSort, type: 'sort' },
  { id: 'merge', name: 'Merge Sort', generator: mergeSort, type: 'sort' },
  { id: 'insertion', name: 'Insertion Sort', generator: insertionSort, type: 'sort' },
  { id: 'selection', name: 'Selection Sort', generator: selectionSort, type: 'sort' },
  { id: 'heap', name: 'Heap Sort', generator: heapSort, type: 'sort' },
  { id: 'shell', name: 'Shell Sort', generator: shellSort, type: 'sort' },
  { id: 'counting', name: 'Counting Sort', generator: countingSort, type: 'sort' },
  { id: 'linear', name: 'Linear Search', generator: linearSearch, type: 'search' },
  { id: 'binary', name: 'Binary Search', generator: binarySearch, type: 'search' },
];

function App() {
  const [array, setArray] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('bubble');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(500);
  const [arraySize] = useState<number>(20); // Fixed at 20
  const [arrayType, setArrayType] = useState<ArrayType>('random');
  const [language, setLanguage] = useState<Language>('javascript');
  const [currentLine, setCurrentLine] = useState<number>(-1);
  const [searchTarget, setSearchTarget] = useState<number>(50);
  // Phase 2 features
  const [stepCount, setStepCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalComparisons, setTotalComparisons] = useState<number>(0);
  const [totalSwaps, setTotalSwaps] = useState<number>(0);
  const [isELectureOpen, setIsELectureOpen] = useState<boolean>(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const zoomScale = 1.0; // Fixed at 1.0x
  const [visualizationState, setVisualizationState] = useState<AlgorithmState>({
    array: [],
    comparing: [],
    sorted: [],
    pivot: -1,
    merging: [],
    inserting: -1,
    partition: [],
    minIndex: -1,
    heap: null,
    gap: 0,
    counting: null,
    swapping: [],
    currentLine: -1,
    target: null,
    found: false,
    left: -1,
    right: -1,
    mid: -1,
    currentIndex: -1,
  });
  const previousArrayRef = useRef<number[]>([]);
  const generatorRef = useRef<Generator<AlgorithmState, number[], unknown> | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateNewArray = () => {
    const selectedAlgo = ALGORITHMS.find((algo) => algo.id === selectedAlgorithm);
    
    // Handle array-based algorithms
    let newArray: number[];
    switch (arrayType) {
      case 'sorted':
        newArray = generateSortedArray(arraySize);
        break;
      case 'reversed':
        newArray = generateReversedArray(arraySize);
        break;
      case 'nearlySorted':
        newArray = generateNearlySortedArray(arraySize);
        break;
      default:
        newArray = generateRandomArray(arraySize);
    }
    
    // For binary search, ensure array is sorted
    if (selectedAlgo?.type === 'search' && selectedAlgorithm === 'binary') {
      // Binary search requires sorted array
      newArray = [...newArray].sort((a, b) => a - b);
    }
    
    setArray(newArray);
    
    // Set target to a value that exists in the array for better visualization
    if (selectedAlgo?.type === 'search' && newArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * newArray.length);
      setSearchTarget(newArray[randomIndex]);
    }
    
    previousArrayRef.current = [...newArray];
    setVisualizationState({
      array: newArray,
      comparing: [],
      sorted: [],
      pivot: -1,
      merging: [],
      inserting: -1,
      partition: [],
      minIndex: -1,
      heap: null,
      gap: 0,
      counting: null,
      swapping: [],
      currentLine: -1,
      target: null,
      found: false,
      left: -1,
      right: -1,
      mid: -1,
      currentIndex: -1,
    });
    setCurrentLine(-1);
    resetVisualization();
  };

  // Generate initial array
  useEffect(() => {
    generateNewArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize, arrayType, selectedAlgorithm]);

  const resetVisualization = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
    generatorRef.current = null;
    if (array.length > 0) {
      previousArrayRef.current = [...array];
      // Reset visualization state to initial array
      setVisualizationState(prev => ({
        ...prev,
        array: [...array],
        comparing: [],
        sorted: [],
        currentLine: -1,
      }));
    }
    setCurrentLine(-1);
    setStepCount(0);
    setStartTime(null);
    setTotalComparisons(0);
    setTotalSwaps(0);
  };

  const startVisualization = () => {
    if (isPaused && generatorRef.current) {
      // Resume from pause
      setIsPaused(false);
      continueVisualization();
      return;
    }

    // Start new visualization
    const selectedAlgo = ALGORITHMS.find((algo) => algo.id === selectedAlgorithm);
    if (!selectedAlgo) return;

    // For search algorithms, pass target value
    if (selectedAlgo.type === 'search') {
      generatorRef.current = selectedAlgo.generator([...array], searchTarget);
    } 
    // For sorting algorithms, use array
    else {
      generatorRef.current = selectedAlgo.generator([...array]);
    }
    
    setIsRunning(true);
    setIsPaused(false);
    setStartTime(Date.now());
    setStepCount(0);
    setTotalComparisons(0);
    setTotalSwaps(0);
    continueVisualization();
  };

  const continueVisualization = () => {
    if (!generatorRef.current) return;

    intervalRef.current = setInterval(() => {
      if (!generatorRef.current) return;
      const result = generatorRef.current.next();
      
      if (result.done) {
        // Algorithm completed - stop but keep statistics
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsRunning(false);
        setIsPaused(false);
        generatorRef.current = null;
        return;
      }

      // Handle practice mode - ensure array is always present
      // Check if result.value has array property (ExecutionState or AlgorithmState)
      let newArray: number[] = [];
      if (result.value && 'array' in result.value && Array.isArray(result.value.array)) {
        newArray = result.value.array;
      } else if (result.value && 'arr' in result.value && Array.isArray(result.value.arr)) {
        newArray = result.value.arr;
      } else if (visualizationState.array && visualizationState.array.length > 0) {
        newArray = visualizationState.array;
      } else if (array.length > 0) {
        newArray = array;
      } else {
        // Fallback: generate a random array
        newArray = generateRandomArray(20);
        setArray(newArray);
      }
      
      // Detect swaps by comparing with previous array
      const swapping: number[][] = [];
      if (previousArrayRef.current.length > 0 && newArray.length === previousArrayRef.current.length) {
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i] !== previousArrayRef.current[i]) {
            // Find where this value came from
            for (let j = 0; j < previousArrayRef.current.length; j++) {
              if (previousArrayRef.current[j] === newArray[i] && j !== i && 
                  newArray[j] === previousArrayRef.current[i]) {
                // This is a swap
                swapping.push([j, i]);
                break;
              }
            }
          }
        }
        // Update previous array
        previousArrayRef.current = [...newArray];
      } else if (previousArrayRef.current.length === 0) {
        // Initialize previous array for practice mode
        previousArrayRef.current = [...newArray];
      }

      // Handle both AlgorithmState (from built-in algorithms) and ExecutionState (from practice mode)
      const isExecutionState = result.value && 'message' in result.value && !('comparing' in result.value);
      
      const newCurrentLine = result.value.currentLine !== undefined ? result.value.currentLine : currentLine;
      setCurrentLine(newCurrentLine);
      setStepCount(prev => prev + 1);
      
      // Track cumulative comparisons and swaps
      if (result.value.comparing && result.value.comparing.length > 0) {
        setTotalComparisons(prev => prev + result.value.comparing!.length);
      }
      if (swapping.length > 0) {
        setTotalSwaps(prev => prev + swapping.length);
      }
      
      if (isExecutionState) {
        // Practice mode - ExecutionState
        setVisualizationState({
          array: newArray,
          comparing: [],
          sorted: [],
          pivot: -1,
          merging: [],
          inserting: -1,
          partition: [],
          minIndex: -1,
          heap: null,
          gap: 0,
          counting: null,
          swapping: swapping,
          currentLine: newCurrentLine,
          target: null,
          found: false,
          left: -1,
          right: -1,
          mid: -1,
          currentIndex: -1,
        });
      } else {
        // Built-in algorithms - AlgorithmState
        setVisualizationState({
          array: newArray,
          comparing: result.value.comparing || [],
          sorted: result.value.sorted || [],
          pivot: result.value.pivot !== undefined ? result.value.pivot : -1,
          merging: result.value.merging || [],
          inserting: result.value.inserting !== undefined ? result.value.inserting : -1,
          partition: result.value.partition || [],
          minIndex: result.value.minIndex !== undefined ? result.value.minIndex : -1,
          heap: result.value.heap || null,
          gap: result.value.gap !== undefined ? result.value.gap : 0,
          counting: result.value.counting || null,
          swapping: swapping,
          currentLine: newCurrentLine,
          target: result.value.target !== undefined ? result.value.target : null,
          found: result.value.found !== undefined ? result.value.found : false,
          left: result.value.left !== undefined ? result.value.left : -1,
          right: result.value.right !== undefined ? result.value.right : -1,
          mid: result.value.mid !== undefined ? result.value.mid : -1,
          currentIndex: result.value.currentIndex !== undefined ? result.value.currentIndex : -1,
        });
      }
    }, speed);
  };

  const pauseVisualization = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPaused(true);
  };

  const handleReset = () => {
    resetVisualization();
    generateNewArray();
  };

  useEffect(() => {
    if (isRunning && !isPaused && intervalRef.current) {
      clearInterval(intervalRef.current);
      continueVisualization();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-4 max-w-[1600px]">
        <header className="text-center mb-3">
          <h1 className="text-3xl font-bold mb-0.5 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            DSA Visualizer
          </h1>
          <p className="text-gray-400 text-xs">Visualize Data Structures and Algorithms</p>
        </header>

        <div className="space-y-3 w-full">
            {/* Phase 2: Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setIsELectureOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all"
              >
                📚 e-Lecture
              </button>
              <button
                onClick={() => setIsComparisonOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-700 transition-all"
              >
                🔀 Compare
              </button>
            </div>

            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={setSelectedAlgorithm}
              algorithms={ALGORITHMS}
            />

            {/* Code Display - Reduced height */}
            <div className="h-[400px]">
              <CodeDisplay 
                algorithmId={selectedAlgorithm} 
                language={language}
                currentLine={currentLine}
                onLanguageChange={setLanguage}
              />
            </div>

            {/* Visualization - Reduced height */}
            {/* Search Target Input (only for search algorithms) */}
            {ALGORITHMS.find(algo => algo.id === selectedAlgorithm)?.type === 'search' && (
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <label className="text-white font-medium text-sm">Search Target:</label>
                  <input
                    type="number"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(Number(e.target.value))}
                    className="px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 w-24"
                    disabled={isRunning && !isPaused}
                    min={array.length > 0 ? Math.min(...array) : 0}
                    max={array.length > 0 ? Math.max(...array) : 100}
                  />
                  <span className="text-gray-400 text-xs">
                    {array.length > 0 && `(Range: ${Math.min(...array)} - ${Math.max(...array)})`}
                  </span>
                </div>
              </div>
            )}

            {/* Statistics Panel */}
            <StatisticsPanel
              visualizationState={visualizationState}
              stepCount={stepCount}
              startTime={startTime}
              algorithmName={ALGORITHMS.find(a => a.id === selectedAlgorithm)?.name || ''}
              totalComparisons={totalComparisons}
              totalSwaps={totalSwaps}
            />

            {/* Array Visualizer */}
            <div className="w-full" style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top center' }}>
              <ArrayVisualizer
                array={visualizationState.array.length > 0 ? visualizationState.array : array}
                comparing={visualizationState.comparing}
                sorted={visualizationState.sorted}
                pivot={visualizationState.pivot}
                merging={visualizationState.merging}
                inserting={visualizationState.inserting}
                partition={visualizationState.partition}
                minIndex={visualizationState.minIndex}
                heap={visualizationState.heap}
                gap={visualizationState.gap}
                counting={visualizationState.counting}
                swapping={visualizationState.swapping || []}
                previousArray={previousArrayRef.current}
                target={visualizationState.target}
                found={visualizationState.found}
                left={visualizationState.left}
                right={visualizationState.right}
                mid={visualizationState.mid}
                currentIndex={visualizationState.currentIndex}
                stepCount={stepCount}
                algorithmId={selectedAlgorithm}
                startTime={startTime}
                comparisons={totalComparisons}
                totalSwaps={totalSwaps}
              />
            </div>

            <Controls
              isRunning={isRunning}
              isPaused={isPaused}
              speed={speed}
              onPlay={startVisualization}
              onPause={pauseVisualization}
              onReset={handleReset}
              onSpeedChange={setSpeed}
              onGenerateNew={generateNewArray}
              arraySize={20}
              onArraySizeChange={() => {}}
              arrayType={arrayType}
              onArrayTypeChange={setArrayType}
            />
          </div>

        {/* Phase 2: e-Lecture Mode */}
        <ELectureMode
          algorithmId={selectedAlgorithm}
          algorithmName={ALGORITHMS.find(a => a.id === selectedAlgorithm)?.name || ''}
          isOpen={isELectureOpen}
          onClose={() => setIsELectureOpen(false)}
        />

        {/* Phase 2: Comparison Mode */}
        {isComparisonOpen && (
          <ComparisonMode
            algorithms={ALGORITHMS}
            array={array}
            onClose={() => setIsComparisonOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
