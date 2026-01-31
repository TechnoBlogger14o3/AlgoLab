import { useState, useRef } from 'react';
import ArrayVisualizer from './ArrayVisualizer';
import CodeDisplay from './CodeDisplay';
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
  const gen1Ref = useRef<Generator<AlgorithmState, number[], unknown> | null>(null);
  const gen2Ref = useRef<Generator<AlgorithmState, number[], unknown> | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const algo1 = algorithms.find(a => a.id === selectedAlgo1);
  const algo2 = algorithms.find(a => a.id === selectedAlgo2);
  
  const startComparison = () => {
    if (!algo1 || !algo2) return;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Reset states
    setState1({ array: [...array] });
    setState2({ array: [...array] });
    
    // Start both visualizations
    gen1Ref.current = algo1.generator([...array]);
    gen2Ref.current = algo2.generator([...array]);
    
    setIsRunning1(true);
    setIsRunning2(true);
    
    // Run both generators in parallel
    intervalRef.current = setInterval(() => {
      let result1 = { done: true, value: null };
      let result2 = { done: true, value: null };
      
      if (gen1Ref.current) {
        result1 = gen1Ref.current.next();
        if (!result1.done) {
          setState1(result1.value as AlgorithmState);
        } else {
          setIsRunning1(false);
        }
      }
      
      if (gen2Ref.current) {
        result2 = gen2Ref.current.next();
        if (!result2.done) {
          setState2(result2.value as AlgorithmState);
        } else {
          setIsRunning2(false);
        }
      }
      
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
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Close
          </button>
        </div>
        
        {/* Algorithm Selectors */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <label className="text-white font-semibold mb-2 block">Algorithm 1:</label>
            <select
              value={selectedAlgo1}
              onChange={(e) => setSelectedAlgo1(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
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
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
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
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          >
            Start Comparison
          </button>
        </div>
        
        {/* Comparison View */}
        <div className="grid grid-cols-2 gap-4">
          {/* Algorithm 1 */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-bold text-lg mb-2">{algo1?.name}</h3>
            <ArrayVisualizer {...state1} />
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
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-bold text-lg mb-2">{algo2?.name}</h3>
            <ArrayVisualizer {...state2} />
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
