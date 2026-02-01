import { motion } from 'framer-motion';
import { ListNode } from '../types';

interface LinkedListVisualizerProps {
  nodes: ListNode[];
  head?: number | null;
  current?: number | null;
  comparing?: number[];
  message?: string;
}

export default function LinkedListVisualizer({
  nodes,
  head = 0,
  current = null,
  comparing = [],
  message = '',
}: LinkedListVisualizerProps) {
  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl min-h-[300px] border border-gray-700/50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔗</div>
          <p className="text-gray-400 text-lg">Linked List is empty</p>
        </div>
      </div>
    );
  }

  // Build linked list structure from nodes array
  const linkedListNodes: Array<{ index: number; value: number; next: number | null }> = [];
  
  // Traverse from head
  let currentIndex: number | null = head !== null && head !== undefined ? head : null;
  const visited = new Set<number>();
  
  // Simple traversal: nodes are connected sequentially by index
  // If head is 0, traverse 0 -> 1 -> 2 -> ... -> n-1
  if (currentIndex !== null && currentIndex >= 0 && currentIndex < nodes.length) {
    for (let i = currentIndex; i < nodes.length; i++) {
      if (visited.has(i)) break;
      visited.add(i);
      
      linkedListNodes.push({
        index: i,
        value: nodes[i].value,
        next: i < nodes.length - 1 ? i + 1 : null,
      });
    }
  }

  return (
    <div className="space-y-4">
      {/* Message Display */}
      {message && (
        <div className="bg-gradient-to-r from-blue-900/80 via-blue-800/80 to-indigo-900/80 border border-blue-600/50 rounded-xl p-3 shadow-lg backdrop-blur-sm">
          <p className="text-white text-sm font-medium">{message}</p>
        </div>
      )}

      {/* Linked List Visualization */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 shadow-2xl overflow-x-auto">
        <div className="flex items-center gap-4 min-w-max">
          {/* Head pointer */}
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-xs mb-1">head</span>
            <div className="w-0 h-0 border-l-[12px] border-l-blue-500 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
          </div>

          {linkedListNodes.map((node, idx) => {
            const isCurrent = current === node.index;
            const isComparing = comparing.includes(node.index);
            const isHead = idx === 0;
            const hasNext = node.next !== null;

            return (
              <div key={node.index} className="flex items-center gap-2">
                {/* Node */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`relative flex items-center gap-0 ${
                    isCurrent
                      ? 'ring-4 ring-yellow-400 ring-opacity-50'
                      : isComparing
                      ? 'ring-4 ring-blue-400 ring-opacity-50'
                      : ''
                  }`}
                >
                  {/* Value box */}
                  <div
                    className={`px-6 py-4 rounded-lg border-2 font-bold text-lg shadow-lg ${
                      isCurrent
                        ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 border-yellow-300'
                        : isComparing
                        ? 'bg-gradient-to-br from-blue-400 to-indigo-500 text-white border-blue-300'
                        : 'bg-gradient-to-br from-gray-700 to-gray-800 text-white border-gray-600'
                    }`}
                  >
                    {node.value}
                  </div>
                  
                  {/* Next pointer */}
                  {hasNext && (
                    <div className="flex items-center">
                      <div className="w-8 h-0.5 bg-gray-500"></div>
                      <div className="w-0 h-0 border-l-[10px] border-l-gray-500 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                    </div>
                  )}
                  
                  {/* Null indicator */}
                  {!hasNext && (
                    <div className="flex items-center gap-1 ml-2">
                      <div className="w-8 h-0.5 bg-gray-500"></div>
                      <div className="text-gray-500 text-sm font-mono">null</div>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Index labels */}
        <div className="flex items-center gap-4 mt-4 min-w-max">
          <div className="w-[60px]"></div>
          {linkedListNodes.map((node, idx) => (
            <div key={node.index} className="flex items-center gap-2">
              <span className="text-gray-500 text-xs font-mono w-[60px] text-center">
                idx: {node.index}
              </span>
              {node.next !== null && <div className="w-[60px]"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
