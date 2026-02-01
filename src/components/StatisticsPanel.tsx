import { motion } from 'framer-motion';
import { AlgorithmState } from '../types';

interface StatisticsPanelProps {
  visualizationState: AlgorithmState;
  stepCount: number;
  startTime: number | null;
  algorithmName: string;
  totalComparisons?: number;
  totalSwaps?: number;
}

export default function StatisticsPanel({
  visualizationState,
  stepCount,
  startTime,
  algorithmName,
  totalComparisons,
  totalSwaps,
}: StatisticsPanelProps) {
  // Calculate statistics
  const comparisons = totalComparisons !== undefined ? totalComparisons : (visualizationState.comparing?.length || 0);
  const swaps = totalSwaps !== undefined ? totalSwaps : (visualizationState.swapping?.length || 0);
  const sortedCount = visualizationState.sorted?.length || 0;
  const arrayLength = visualizationState.array.length;
  const progress = arrayLength > 0 ? Math.round((sortedCount / arrayLength) * 100) : 0;
  
  // Calculate time elapsed
  const timeElapsed = startTime ? Date.now() - startTime : 0;
  const timeElapsedSeconds = (timeElapsed / 1000).toFixed(2);
  
  // Get time complexity based on algorithm
  const getTimeComplexity = (): { best: string; average: string; worst: string } => {
    const complexities: Record<string, { best: string; average: string; worst: string }> = {
      bubble: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      quick: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      merge: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      insertion: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      selection: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      heap: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      shell: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      counting: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)' },
      linear: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      binary: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    };
    return complexities[algorithmName.toLowerCase().replace(' ', '')] || { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' };
  };
  
  const complexity = getTimeComplexity();
  
  const stats = [
    {
      label: 'Steps',
      value: stepCount,
      icon: '📊',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Comparisons',
      value: comparisons,
      icon: '🔍',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      label: 'Swaps',
      value: swaps,
      icon: '🔄',
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Sorted',
      value: `${sortedCount}/${arrayLength}`,
      icon: '✅',
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Progress',
      value: `${progress}%`,
      icon: '📈',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      label: 'Time',
      value: `${timeElapsedSeconds}s`,
      icon: '⏱️',
      color: 'from-orange-500 to-red-500',
    },
  ];
  
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-xl border border-gray-700/50 shadow-xl p-4">
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        <span>📊</span>
        Statistics
      </h3>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-3 shadow-lg`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{stat.icon}</span>
              <span className="text-white/80 text-xs font-medium">{stat.label}</span>
            </div>
            <div className="text-white text-xl font-bold">{stat.value}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Complexity Info */}
      <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600/50">
        <h4 className="text-white font-semibold text-sm mb-2">Time Complexity</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <span className="text-gray-400">Best:</span>
            <span className="text-green-400 font-mono ml-1">{complexity.best}</span>
          </div>
          <div>
            <span className="text-gray-400">Average:</span>
            <span className="text-yellow-400 font-mono ml-1">{complexity.average}</span>
          </div>
          <div>
            <span className="text-gray-400">Worst:</span>
            <span className="text-red-400 font-mono ml-1">{complexity.worst}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
