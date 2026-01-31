import { motion } from 'framer-motion';

interface ProblemVisualizerProps {
  array?: number[];
  pointers?: number[];
  map?: Record<string, unknown>;
  seen?: number[];
  buyDay?: number;
  sellDay?: number;
  currentDay?: number;
  start?: number;
  end?: number;
  left?: number;
  right?: number;
  bestLeft?: number;
  bestRight?: number;
  currentIndex?: number;
  currentBuyDay?: number;
  tempStart?: number;
  found?: boolean;
  message?: string;
  result?: unknown;
}

export default function ProblemVisualizer({ 
  array = [],
  pointers = [],
  map = {},
  seen = [],
  buyDay = -1,
  sellDay = -1,
  currentDay = -1,
  start = -1,
  end = -1,
  left = -1,
  right = -1,
  bestLeft = -1,
  bestRight = -1,
  currentIndex = -1,
  currentBuyDay = -1,
  tempStart = -1,
  found = false,
  message = '',
  result = null,
}: ProblemVisualizerProps) {
  if (!array || array.length === 0) {
    return (
      <div className="flex items-center justify-center p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl min-h-[400px] border border-gray-700/50">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-400 text-lg">No data to visualize</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...array.map(Math.abs), 1);
  const isNegative = array.some(val => val < 0);
  
  const getBarColor = (index: number): string => {
    // Highlight pointers
    if (pointers.includes(index)) return 'from-yellow-400 to-amber-500 shadow-yellow-500/50';
    if (left === index || right === index) return 'from-yellow-400 to-amber-500 shadow-yellow-500/50';
    if (bestLeft === index || bestRight === index) return 'from-green-400 to-emerald-600 shadow-green-500/50';
    if (buyDay === index || sellDay === index) return 'from-green-400 to-emerald-600 shadow-green-500/50';
    if (start !== -1 && end !== -1 && index >= start && index <= end) return 'from-green-400 to-emerald-500 shadow-green-500/40';
    if (currentIndex === index) return 'from-blue-400 to-indigo-500 shadow-blue-500/50';
    if (seen.includes(array[index])) return 'from-purple-400 to-purple-600 shadow-purple-500/50';
    
    return 'from-blue-500 to-indigo-600 shadow-blue-500/30';
  };
  
  const getBarGlow = (index: number): string => {
    if (pointers.includes(index) || left === index || right === index) return 'shadow-lg shadow-yellow-500/50';
    if (bestLeft === index || bestRight === index || buyDay === index || sellDay === index) return 'shadow-lg shadow-green-500/50';
    if (currentIndex === index) return 'shadow-lg shadow-blue-500/50';
    return '';
  };
  
  const getBarHeight = (value: number): number => {
    if (isNegative) {
      // For arrays with negative values, show bars above and below zero
      return Math.abs(value) / maxValue * 50; // 50% max height for each direction
    }
    return (value / maxValue) * 100;
  };
  
  // Calculate bar width based on array size
  const barWidth = array.length > 40 
    ? Math.max(18, Math.floor(1400 / array.length) - 2)
    : array.length > 30
    ? Math.max(20, Math.floor(1200 / array.length) - 2)
    : array.length > 20
    ? 28
    : 32;
  const barGap = array.length > 40 ? 1.5 : array.length > 30 ? 2 : 2;
  
  return (
    <div className="space-y-6">
      {/* Message display */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-900/80 via-blue-800/80 to-indigo-900/80 border border-blue-600/50 rounded-xl p-5 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <p className="text-white text-sm font-medium leading-relaxed">{message}</p>
          </div>
        </motion.div>
      )}
      
      {/* Array visualization */}
      <div className={`relative flex items-${isNegative ? 'center' : 'end'} justify-center gap-1.5 p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl h-[700px] w-full border border-gray-700/50 shadow-2xl overflow-x-auto overflow-y-hidden ${isNegative ? 'border-t-2 border-gray-600/50' : ''}`}>
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5 min-w-full">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Zero line for negative values */}
        {isNegative && (
          <div className="absolute left-0 right-0 h-0.5 bg-gray-600/50 z-0 min-w-full" style={{ top: '50%' }}></div>
        )}
        
        <div className={`relative flex items-${isNegative ? 'center' : 'end'} justify-center h-full`} style={{ 
          gap: `${barGap * 4}px`,
          minWidth: `${array.length * (barWidth + barGap * 4)}px`,
          padding: '0 8px'
        }}>
          {array.map((value, index) => {
            const height = getBarHeight(value);
            const isHighlighted = pointers.includes(index) || 
                               left === index || right === index ||
                               currentIndex === index ||
                               buyDay === index || sellDay === index ||
                               bestLeft === index || bestRight === index;
            const barColor = getBarColor(index);
            const barGlow = getBarGlow(index);
            const isPositive = value >= 0;
            
            return (
              <motion.div
                key={index}
                className="relative flex flex-col items-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
              >
                <motion.div
                  className={`bg-gradient-to-t ${barColor} ${barGlow} ${isNegative && !isPositive ? 'rounded-b-lg rounded-t-none' : 'rounded-t-lg'} transition-all duration-300 flex flex-col items-center justify-end relative overflow-hidden`}
                  style={{
                    height: isNegative ? `${height}%` : `${Math.max(height, 3)}%`,
                    minHeight: '35px',
                    width: `${barWidth}px`,
                    flexShrink: 0,
                    marginTop: isNegative && !isPositive ? 'auto' : '0',
                    marginBottom: isNegative && isPositive ? 'auto' : '0',
                  }}
                  animate={{
                    scale: isHighlighted ? 1.15 : 1,
                    y: isHighlighted ? (isNegative && !isPositive ? 5 : -5) : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Value label */}
                  <span className="relative text-sm text-white font-bold mb-2 z-10 drop-shadow-lg px-1">
                    {value}
                  </span>
                </motion.div>
                
                {/* Index label */}
                <motion.span 
                  className="text-xs text-gray-400 mt-2 font-medium"
                  animate={{
                    color: isHighlighted ? '#60a5fa' : '#9ca3af',
                    scale: isHighlighted ? 1.1 : 1,
                  }}
                >
                  {index}
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Result display */}
      {result !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-900/80 via-emerald-800/80 to-green-900/80 border border-green-600/50 rounded-xl p-5 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <p className="text-green-200 text-xs font-semibold uppercase tracking-wide mb-1">Result</p>
              <p className="text-white text-lg font-bold">
                {Array.isArray(result) ? `[${result.join(', ')}]` : String(result)}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
