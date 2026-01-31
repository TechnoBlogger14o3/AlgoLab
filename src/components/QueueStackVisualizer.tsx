import { motion, AnimatePresence } from 'framer-motion';

interface QueueStackVisualizerProps {
  items: number[];
  type: 'queue' | 'stack';
  label: string;
  maxItems?: number;
}

export default function QueueStackVisualizer({
  items,
  type,
  label,
  maxItems = 10,
}: QueueStackVisualizerProps) {
  const displayItems = type === 'queue' 
    ? items.slice(0, maxItems) // Queue: show first items
    : items.slice(-maxItems).reverse(); // Stack: show last items (reversed for visual)

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-xl border border-gray-700/50 shadow-xl p-4">
      <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
        <span>{type === 'queue' ? '📥' : '📤'}</span>
        {label} ({type === 'queue' ? 'Queue' : 'Stack'})
      </h4>
      
      <div className={`flex ${type === 'queue' ? 'flex-row' : 'flex-col-reverse'} gap-2 min-h-[200px] items-${type === 'queue' ? 'center' : 'end'} justify-${type === 'queue' ? 'start' : 'center'}`}>
        <AnimatePresence>
          {displayItems.length === 0 ? (
            <div className="text-gray-500 text-sm italic py-8">
              {type === 'queue' ? 'Queue is empty' : 'Stack is empty'}
            </div>
          ) : (
            displayItems.map((item, index) => {
              const actualIndex = type === 'queue' 
                ? index 
                : items.length - maxItems + index;
              
              return (
                <motion.div
                  key={`${item}-${actualIndex}`}
                  initial={{ opacity: 0, scale: 0.8, x: type === 'queue' ? -20 : 0, y: type === 'queue' ? 0 : -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: type === 'queue' ? 20 : 0, y: type === 'queue' ? 0 : 20 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg border-2 border-white/20 flex items-center justify-center ${
                    type === 'queue' 
                      ? 'w-16 h-16 text-lg' 
                      : 'w-full h-12 text-base mb-1'
                  }`}
                >
                  {item}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
      
      {items.length > maxItems && (
        <div className="text-gray-400 text-xs mt-2 text-center">
          Showing {maxItems} of {items.length} items
        </div>
      )}
    </div>
  );
}
