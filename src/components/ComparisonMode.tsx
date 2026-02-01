import { useState, useRef } from 'react';
import ArrayVisualizer from './ArrayVisualizer';
import CodeDisplay from './CodeDisplay';
import StatisticsPanel from './StatisticsPanel';
import { AlgorithmState, Algorithm } from '../types';

interface ComparisonModeProps {
  algorithms: Algorithm[];
  array: number[];
  onClose: () => void;
}

export default function ComparisonMode({ algorithms, array, onClose }: ComparisonModeProps) {
  const [selectedAlgo1, setSelectedAlgo1] = useState<string>(algorithms[0]?.id || '');
  const [selectedAlgo2, setSelectedAlgo2] = useState<string>(algorithms[1]?.id || '');
  const [state1, setState1] = useState<AlgorithmState>({ array: [...array] });
  const [state2, setState2] = useState<AlgorithmState>({ array: [...array] });
  const [isRunning1, setIsRunning1] = useState(false);
  const [isRunning2, setIsRunning2] = useState(false);
  const [language, setLanguage] = useState<'javascript' | 'python' | 'java' | 'cpp'>('javascript');
  
  // Statistics tracking
  const [stepCount1, setStepCount1] = useState(0);
  const [stepCount2, setStepCount2] = useState(0);
  const [startTime1, setStartTime1] = useState<number | null>(null);
  const [startTime2, setStartTime2] = useState<number | null>(null);
  const [totalComparisons1, setTotalComparisons1] = useState(0);
  const [totalComparisons2, setTotalComparisons2] = useState(0);
  const [totalSwaps1, setTotalSwaps1] = useState(0);
  const [totalSwaps2, setTotalSwaps2] = useState(0);
  
  const gen1Ref = useRef<Generator<AlgorithmState, number[], unknown> | null>(null);
  const gen2Ref = useRef<Generator<AlgorithmState, number[], unknown> | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousArray1Ref = useRef<number[]>([]);
  const previousArray2Ref = useRef<number[]>([]);
  
  const algo1 = algorithms.find(a => a.id === selectedAlgo1);
  const algo2 = algorithms.find(a => a.id === selectedAlgo2);
  
  const startComparison = () => {
    if (!algo1 || !algo2) return;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Reset states and statistics
    const initialArray = [...array];
    setState1({ array: initialArray, comparing: [], sorted: [], swapping: [] });
    setState2({ array: initialArray, comparing: [], sorted: [], swapping: [] });
    previousArray1Ref.current = [...initialArray];
    previousArray2Ref.current = [...initialArray];
    
    // Reset statistics
    setStepCount1(0);
    setStepCount2(0);
    setStartTime1(Date.now());
    setStartTime2(Date.now());
    setTotalComparisons1(0);
    setTotalComparisons2(0);
    setTotalSwaps1(0);
    setTotalSwaps2(0);
    
    // Start both visualizations
    gen1Ref.current = algo1.generator([...array]);
    gen2Ref.current = algo2.generator([...array]);
    
    setIsRunning1(true);
    setIsRunning2(true);
    
    // Run both generators in parallel
    intervalRef.current = setInterval(() => {
      let result1 = { done: true, value: null };
      let result2 = { done: true, value: null };
      
      // Process algorithm 1
      if (gen1Ref.current) {
        result1 = gen1Ref.current.next();
        if (!result1.done) {
          const newState1 = result1.value as AlgorithmState;
          const newArray1 = newState1.array || state1.array;
          
          // Detect swaps for algorithm 1
          const swapping1: number[][] = [];
          if (previousArray1Ref.current.length > 0 && newArray1.length === previousArray1Ref.current.length) {
            for (let i = 0; i < newArray1.length; i++) {
              if (newArray1[i] !== previousArray1Ref.current[i]) {
                for (let j = 0; j < previousArray1Ref.current.length; j++) {
                  if (previousArray1Ref.current[j] === newArray1[i] && j !== i && 
                      newArray1[j] === previousArray1Ref.current[i]) {
                    swapping1.push([j, i]);
                    break;
                  }
                }
              }
            }
          }
          // Update previous array for next iteration
          previousArray1Ref.current = [...newArray1];
          
          // Update statistics for algorithm 1
          setStepCount1(prev => prev + 1);
          if (newState1.comparing && newState1.comparing.length > 0) {
            setTotalComparisons1(prev => prev + newState1.comparing!.length);
          }
          if (swapping1.length > 0) {
            setTotalSwaps1(prev => prev + swapping1.length);
          }
          
          setState1({
            ...newState1,
            swapping: swapping1.length > 0 ? swapping1 : (newState1.swapping || []),
          });
        } else {
          setIsRunning1(false);
        }
      }
      
      // Process algorithm 2
      if (gen2Ref.current) {
        result2 = gen2Ref.current.next();
        if (!result2.done) {
          const newState2 = result2.value as AlgorithmState;
          const newArray2 = newState2.array || state2.array;
          
          // Detect swaps for algorithm 2
          const swapping2: number[][] = [];
          if (previousArray2Ref.current.length > 0 && newArray2.length === previousArray2Ref.current.length) {
            for (let i = 0; i < newArray2.length; i++) {
              if (newArray2[i] !== previousArray2Ref.current[i]) {
                for (let j = 0; j < previousArray2Ref.current.length; j++) {
                  if (previousArray2Ref.current[j] === newArray2[i] && j !== i && 
                      newArray2[j] === previousArray2Ref.current[i]) {
                    swapping2.push([j, i]);
                    break;
                  }
                }
              }
            }
          }
          // Update previous array for next iteration
          previousArray2Ref.current = [...newArray2];
          
          // Update statistics for algorithm 2
          setStepCount2(prev => prev + 1);
          if (newState2.comparing && newState2.comparing.length > 0) {
            setTotalComparisons2(prev => prev + newState2.comparing!.length);
          }
          if (swapping2.length > 0) {
            setTotalSwaps2(prev => prev + swapping2.length);
          }
          
          setState2({
            ...newState2,
            swapping: swapping2.length > 0 ? swapping2 : (newState2.swapping || []),
          });
        } else {
          setIsRunning2(false);
        }
      }
      
      // Stop interval when both are done
      if (result1.done && result2.done && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 500);
  };
  
  return (
    <div className="fixed inset-0 bg-black/90 z-50 p-4 overflow-y-auto">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">🔀 Side-by-Side Comparison</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Language:</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'javascript' | 'python' | 'java' | 'cpp')}
                className="px-3 py-1 bg-gray-700 text-white rounded-lg text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
        
        {/* Algorithm Selectors */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <label className="text-white font-semibold mb-2 block">Algorithm 1:</label>
            <select
              value={selectedAlgo1}
              onChange={(e) => setSelectedAlgo1(e.target.value)}
              disabled={isRunning1 || isRunning2}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
            >
              {algorithms.map((algo) => (
                <option key={algo.id} value={algo.id}>
                  {algo.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <label className="text-white font-semibold mb-2 block">Algorithm 2:</label>
            <select
              value={selectedAlgo2}
              onChange={(e) => setSelectedAlgo2(e.target.value)}
              disabled={isRunning1 || isRunning2}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
            >
              {algorithms.map((algo) => (
                <option key={algo.id} value={algo.id}>
                  {algo.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Start Button */}
        <div className="text-center mb-4">
          <button
            onClick={startComparison}
            disabled={isRunning1 || isRunning2}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning1 || isRunning2 ? 'Running...' : 'Start Comparison'}
          </button>
        </div>
        
        {/* Comparison View */}
        <div className="grid grid-cols-2 gap-4">
          {/* Algorithm 1 */}
          <div className="bg-gray-800 rounded-lg p-4 space-y-4">
            <h3 className="text-white font-bold text-lg">{algo1?.name}</h3>
            
            {/* Statistics Panel */}
            <StatisticsPanel
              visualizationState={state1}
              stepCount={stepCount1}
              startTime={startTime1}
              algorithmName={algo1?.name || ''}
              totalComparisons={totalComparisons1}
              totalSwaps={totalSwaps1}
            />
            
            <ArrayVisualizer
              array={state1.array}
              comparing={state1.comparing}
              sorted={state1.sorted}
              pivot={state1.pivot}
              merging={state1.merging}
              inserting={state1.inserting}
              partition={state1.partition}
              minIndex={state1.minIndex}
              heap={state1.heap}
              gap={state1.gap}
              counting={state1.counting}
              swapping={state1.swapping}
              previousArray={previousArray1Ref.current}
              target={state1.target}
              found={state1.found}
              left={state1.left}
              right={state1.right}
              mid={state1.mid}
              currentIndex={state1.currentIndex}
              stepCount={stepCount1}
              algorithmId={selectedAlgo1}
              startTime={startTime1}
              comparisons={totalComparisons1}
              totalSwaps={totalSwaps1}
            />
            {algo1 && (
              <div className="mt-4">
                <CodeDisplay
                  algorithmId={algo1.id}
                  language={language}
                  currentLine={state1.currentLine || -1}
                />
              </div>
            )}
          </div>
          
          {/* Algorithm 2 */}
          <div className="bg-gray-800 rounded-lg p-4 space-y-4">
            <h3 className="text-white font-bold text-lg">{algo2?.name}</h3>
            
            {/* Statistics Panel */}
            <StatisticsPanel
              visualizationState={state2}
              stepCount={stepCount2}
              startTime={startTime2}
              algorithmName={algo2?.name || ''}
              totalComparisons={totalComparisons2}
              totalSwaps={totalSwaps2}
            />
            
            <ArrayVisualizer
              array={state2.array}
              comparing={state2.comparing}
              sorted={state2.sorted}
              pivot={state2.pivot}
              merging={state2.merging}
              inserting={state2.inserting}
              partition={state2.partition}
              minIndex={state2.minIndex}
              heap={state2.heap}
              gap={state2.gap}
              counting={state2.counting}
              swapping={state2.swapping}
              previousArray={previousArray2Ref.current}
              target={state2.target}
              found={state2.found}
              left={state2.left}
              right={state2.right}
              mid={state2.mid}
              currentIndex={state2.currentIndex}
              stepCount={stepCount2}
              algorithmId={selectedAlgo2}
              startTime={startTime2}
              comparisons={totalComparisons2}
              totalSwaps={totalSwaps2}
            />
            {algo2 && (
              <div className="mt-4">
                <CodeDisplay
                  algorithmId={algo2.id}
                  language={language}
                  currentLine={state2.currentLine || -1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
