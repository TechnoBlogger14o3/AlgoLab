import { motion } from 'framer-motion';
import { TreeNode } from '../types';

interface BinaryTreeVisualizerProps {
  tree: TreeNode | null;
  visited?: number[];
  current?: number | null;
  comparing?: number[];
  message?: string;
  traversal?: 'inorder' | 'preorder' | 'postorder' | null;
}

export default function BinaryTreeVisualizer({
  tree,
  visited = [],
  current = null,
  comparing = [],
  message = '',
  traversal = null,
}: BinaryTreeVisualizerProps) {
  if (!tree) {
    return (
      <div className="flex items-center justify-center p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl min-h-[400px] border border-gray-700/50">
        <div className="text-center">
          <div className="text-6xl mb-4">🌳</div>
          <p className="text-gray-400 text-lg">Tree is empty</p>
        </div>
      </div>
    );
  }

  const getMaxLevel = (node: TreeNode | null, level = 0): number => {
    if (!node) return level;
    return Math.max(
      getMaxLevel(node.left, level + 1),
      getMaxLevel(node.right, level + 1)
    );
  };

  const maxLevel = Math.max(1, getMaxLevel(tree));
  const svgWidth = Math.max(800, Math.pow(2, maxLevel) * 120);
  const svgHeight = maxLevel * 120 + 100;

  const renderNode = (
    node: TreeNode | null,
    level: number,
    position: number,
    parentX?: number,
    parentY?: number
  ): JSX.Element[] => {
    if (!node) return [];

    const elements: JSX.Element[] = [];
    
    const isVisited = visited.includes(node.value);
    const isCurrent = current === node.value;
    const isComparing = comparing.includes(node.value);

    const nodeX = position;
    const nodeY = level * 120 + 50;

    // Draw line to parent
    if (parentX !== undefined && parentY !== undefined) {
      elements.push(
        <motion.line
          key={`line-${node.value}-${level}`}
          x1={parentX}
          y1={parentY}
          x2={nodeX}
          y2={nodeY}
          stroke="#6b7280"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3 }}
        />
      );
    }

    // Draw node
    elements.push(
      <motion.g key={`node-${node.value}-${level}`}>
        <motion.circle
          cx={nodeX}
          cy={nodeY}
          r={25}
          fill={
            isCurrent
              ? '#fbbf24'
              : isVisited
              ? '#10b981'
              : isComparing
              ? '#3b82f6'
              : '#374151'
          }
          stroke={
            isCurrent
              ? '#f59e0b'
              : isVisited
              ? '#059669'
              : isComparing
              ? '#2563eb'
              : '#4b5563'
          }
          strokeWidth="3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.text
          x={nodeX}
          y={nodeY + 5}
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {node.value}
        </motion.text>
      </motion.g>
    );

    // Recursively render children
    // Adjust position calculation for better tree layout
    const spacing = Math.pow(2, maxLevel - level - 1) * 60;
    const leftPosition = position - spacing;
    const rightPosition = position + spacing;

    if (node.left) {
      const leftElements = renderNode(node.left, level + 1, leftPosition, nodeX, nodeY);
      elements.push(...leftElements);
    }

    if (node.right) {
      const rightElements = renderNode(node.right, level + 1, rightPosition, nodeX, nodeY);
      elements.push(...rightElements);
    }

    return elements;
  };

  const rootX = svgWidth / 2;
  const rootY = 50;

  return (
    <div className="space-y-4">
      {/* Message Display */}
      {message && (
        <div className="bg-gradient-to-r from-blue-900/80 via-blue-800/80 to-indigo-900/80 border border-blue-600/50 rounded-xl p-3 shadow-lg backdrop-blur-sm">
          <p className="text-white text-sm font-medium">{message}</p>
        </div>
      )}

      {/* Tree Visualization */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 shadow-2xl overflow-x-auto">
        <svg width={svgWidth} height={svgHeight} className="w-full" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
          {renderNode(tree, 0, svgWidth / 2)}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-600 border-2 border-gray-500"></div>
          <span>Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-400"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-yellow-300"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-400"></div>
          <span>Visited</span>
        </div>
      </div>
    </div>
  );
}
