import { motion } from 'framer-motion';

interface HashMapVisualizerProps {
  map: Map<number, number>;
  currentKey?: number;
  currentValue?: number;
  highlightKey?: number;
}

export default function HashMapVisualizer({
  map,
  currentKey,
  currentValue,
  highlightKey,
}: HashMapVisualizerProps) {
  const entries = Array.from(map.entries());

  if (entries.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="text-gray-400 text-sm mb-2">HashMap (empty)</div>
        <div className="text-gray-500 text-xs">No entries yet</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="text-white text-sm font-semibold mb-3">HashMap</div>
      <div className="space-y-2">
        {entries.map(([key, value], index) => {
          const isHighlighted = highlightKey === key || currentKey === key;
          return (
            <motion.div
              key={`${key}-${value}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${
                isHighlighted
                  ? 'bg-blue-600/30 border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'bg-gray-700/50 border-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">Key:</span>
                <span className={`font-mono font-bold ${isHighlighted ? 'text-blue-300' : 'text-white'}`}>
                  {key}
                </span>
              </div>
              <div className="text-gray-500">→</div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">Value:</span>
                <span className={`font-mono font-bold ${isHighlighted ? 'text-blue-300' : 'text-white'}`}>
                  {value}
                </span>
              </div>
            </motion.div>
          );
        })}
        {currentKey !== undefined && currentValue !== undefined && !map.has(currentKey) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-2 rounded-lg border border-yellow-500 bg-yellow-500/20"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">Adding:</span>
              <span className="font-mono font-bold text-yellow-300">
                {currentKey}
              </span>
            </div>
            <div className="text-gray-500">→</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">Value:</span>
              <span className="font-mono font-bold text-yellow-300">
                {currentValue}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
