import { motion } from 'framer-motion';
import { AlgorithmState } from '../types';

interface ArrayVisualizerProps {
  array: number[];
  comparing?: number[];
  sorted?: number[];
  pivot?: number;
  merging?: number[];
  inserting?: number;
  partition?: number[];
  minIndex?: number;
  heap?: { root: number; size: number } | null;
  gap?: number;
  counting?: Record<string, unknown> | null;
  swapping?: number[][];
  previousArray?: number[];
  target?: number | null;
  found?: boolean;
  left?: number;
  right?: number;
  mid?: number;
  currentIndex?: number;
}

export default function ArrayVisualizer({ 
  array, 
  comparing = [], 
  sorted = [], 
  pivot = -1, 
  merging = [], 
  inserting = -1, 
  partition = [],
  minIndex = -1,
  heap = null,
  gap = 0,
  counting = null,
  swapping = [],
  previousArray = [],
  target = null,
  found = false,
  left = -1,
  right = -1,
  mid = -1,
  currentIndex = -1,
}: ArrayVisualizerProps) {
  const maxValue = Math.max(...array, 1);
  
  // Use provided swapping array or detect from previous array
  const swapPairs = swapping.length > 0 ? swapping : [];
  
  const getBarColor = (index: number): string => {
    if (found && array[index] === target) return 'from-green-400 to-emerald-600 shadow-green-500/50';
    if (sorted.includes(index)) return 'from-green-400 to-emerald-600 shadow-green-500/50';
    if (mid === index) return 'from-purple-400 to-purple-600 shadow-purple-500/50';
    if (comparing.includes(index)) return 'from-yellow-400 to-amber-500 shadow-yellow-500/50';
    if (pivot === index) return 'from-purple-400 to-purple-600 shadow-purple-500/50';
    if (minIndex === index) return 'from-pink-400 to-rose-500 shadow-pink-500/50';
    if (heap && index < heap.size) return 'from-cyan-400 to-blue-500 shadow-cyan-500/50';
    if (gap > 0 && comparing.includes(index)) return 'from-orange-400 to-orange-500 shadow-orange-500/50';
    if (merging.length > 0 && index >= merging[0] && index <= merging[1]) return 'from-blue-400 to-indigo-500 shadow-blue-500/50';
    if (inserting === index) return 'from-orange-400 to-red-500 shadow-orange-500/50';
    if (partition.length > 0 && index >= partition[0] && index <= partition[1]) return 'from-indigo-400 to-purple-500 shadow-indigo-500/50';
    if (counting && (counting as { outputIndex?: number }).outputIndex === index) return 'from-teal-400 to-cyan-500 shadow-teal-500/50';
    if (left !== -1 && right !== -1 && index >= left && index <= right) return 'from-blue-300 to-blue-400 shadow-blue-400/30';
    if (currentIndex === index) return 'from-yellow-400 to-amber-500 shadow-yellow-500/50';
    return 'from-blue-500 to-indigo-600 shadow-blue-500/30';
  };
  
  const getBarGlow = (index: number): string => {
    if (found && array[index] === target) return 'shadow-lg shadow-green-500/50';
    if (sorted.includes(index)) return 'shadow-lg shadow-green-500/50';
    if (mid === index) return 'shadow-lg shadow-purple-500/50';
    if (comparing.includes(index)) return 'shadow-lg shadow-yellow-500/50';
    if (pivot === index) return 'shadow-lg shadow-purple-500/50';
    if (minIndex === index) return 'shadow-lg shadow-pink-500/50';
    if (heap && index < heap.size) return 'shadow-lg shadow-cyan-500/50';
    if (gap > 0 && comparing.includes(index)) return 'shadow-lg shadow-orange-500/50';
    if (merging.length > 0 && index >= merging[0] && index <= merging[1]) return 'shadow-lg shadow-blue-500/50';
    if (inserting === index) return 'shadow-lg shadow-orange-500/50';
    if (partition.length > 0 && index >= partition[0] && index <= partition[1]) return 'shadow-lg shadow-indigo-500/50';
    if (counting && (counting as { outputIndex?: number }).outputIndex === index) return 'shadow-lg shadow-teal-500/50';
    if (left !== -1 && right !== -1 && index >= left && index <= right) return 'shadow-lg shadow-blue-400/30';
    if (currentIndex === index) return 'shadow-lg shadow-yellow-500/50';
    return '';
  };
  
  const isSwapping = (index: number): boolean => {
    return swapPairs.some(([i, j]) => i === index || j === index);
  };
  
  const getSwapPair = (index: number): number | null => {
    const pair = swapPairs.find(([i, j]) => i === index || j === index);
    return pair ? (pair[0] === index ? pair[1] : pair[0]) : null;
  };
  
  // Calculate dynamic bar width and gap based on array size
  const barWidth = array.length <= 20 ? `calc((100% - ${(array.length - 1) * 8}px) / ${array.length})` : '40px';
  const barGap = array.length <= 20 ? '8px' : '4px';
  
  return (
    <div className="space-y-4">
      {/* Target display for search algorithms */}
      {target !== null && (
        <div className="bg-gradient-to-r from-purple-900/80 via-purple-800/80 to-indigo-900/80 border border-purple-600/50 rounded-xl p-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm">Target: {target}</span>
            {found && <span className="text-green-400 text-sm">✓ Found!</span>}
          </div>
        </div>
      )}
      
      {/* Array visualization */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl h-[150px] p-3 border border-gray-700/50 shadow-2xl overflow-x-auto overflow-y-hidden">
        <div className="flex items-end justify-center gap-2 h-full min-w-max" style={{ gap: barGap }}>
          {array.map((value, index) => {
            const height = (value / maxValue) * 100;
            const barColor = getBarColor(index);
            const barGlow = getBarGlow(index);
            const swappingIndex = isSwapping(index);
            const swapPairIndex = getSwapPair(index);
            const isNegative = value < 0;
            
            return (
              <motion.div
                key={index}
                className="relative flex flex-col items-center"
                style={{ width: barWidth }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: swappingIndex ? 1.1 : 1,
                  opacity: 1,
                  rotate: swappingIndex ? [0, -5, 5, 0] : 0,
                }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                {/* Value label */}
                <div className="mb-2 text-xs font-bold text-white">
                  {value}
                </div>
                
                {/* Bar */}
                <motion.div
                  className={`relative bg-gradient-to-t ${barColor} ${barGlow} rounded-t-lg border-2 border-white/20 shadow-lg`}
                  style={{
                    width: '100%',
                    minHeight: '35px',
                    height: `${Math.max(height, 5)}%`,
                  }}
                  animate={{
                    height: `${Math.max(height, 5)}%`,
                  }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {/* Swap indicator */}
                  {swappingIndex && swapPairIndex !== null && (
                    <motion.div
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ⇄
                    </motion.div>
                  )}
                  
                  {/* Zero line for negative values */}
                  {isNegative && (
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-400"></div>
                  )}
                </motion.div>
                
                {/* Index label */}
                <div className="mt-1 text-xs text-gray-400">
                  {index}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Swap connection lines */}
        {swapPairs.map(([i, j], idx) => (
          <motion.svg
            key={`swap-${i}-${j}-${idx}`}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 10 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.line
              x1={`calc(${i} * (${barWidth} + ${barGap}) + calc(${barWidth} / 2))`}
              y1="50%"
              x2={`calc(${j} * (${barWidth} + ${barGap}) + calc(${barWidth} / 2))`}
              y2="50%"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.svg>
        ))}
      </div>
    </div>
  );
}
