import { motion } from 'framer-motion';
import { Graph } from '../utils/graphUtils';

interface GraphVisualizerProps {
  graph?: Graph;
  visited?: number[];
  queue?: number[];
  current?: number | null;
  checking?: number | null;
  parent?: Record<number, number>;
  level?: Record<number, number>;
  path?: number[];
  message?: string;
  startNode?: number;
}

export default function GraphVisualizer({
  graph = {},
  visited = [],
  queue = [],
  current = null,
  checking = null,
  parent = {},
  level = {},
  path = [],
  message = '',
  startNode = 0,
}: GraphVisualizerProps) {
  const nodes = Object.keys(graph).map(Number).sort((a, b) => a - b);
  const numNodes = nodes.length;
  
  if (numNodes === 0) {
    return (
      <div className="flex items-center justify-center p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl min-h-[400px] border border-gray-700/50">
        <div className="text-center">
          <div className="text-6xl mb-4">🕸️</div>
          <p className="text-gray-400 text-lg">No graph to visualize</p>
        </div>
      </div>
    );
  }
  
  // Calculate positions in a circular layout
  // Use consistent coordinate system: percentages (0-100) for both SVG and CSS
  const centerX = 50; // Center percentage
  const centerY = 50; // Center percentage
  // Very tight radius - nodes very close together
  const radius = numNodes <= 6 ? 8 : numNodes <= 10 ? 10 : 12; // Much tighter radius
  
  const getNodePosition = (node: number) => {
    const nodeIndex = nodes.indexOf(node);
    const angle = (2 * Math.PI * nodeIndex) / numNodes - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return {
      x: x, // Percentage (0-100) for SVG viewBox
      y: y, // Percentage (0-100) for SVG viewBox
      percentX: x, // Same value for CSS percentage
      percentY: y, // Same value for CSS percentage
    };
  };
  
  const getNodeColor = (node: number): string => {
    if (current === node) return 'from-yellow-400 to-amber-500 shadow-yellow-500/50';
    if (checking === node) return 'from-orange-400 to-red-500 shadow-orange-500/50';
    if (visited.includes(node)) return 'from-green-400 to-emerald-600 shadow-green-500/50';
    if (queue.includes(node)) return 'from-blue-400 to-indigo-500 shadow-blue-500/50';
    return 'from-gray-500 to-gray-600 shadow-gray-500/30';
  };
  
  const getNodeGlow = (node: number): string => {
    if (current === node) return 'shadow-lg shadow-yellow-500/50';
    if (checking === node) return 'shadow-lg shadow-orange-500/50';
    if (visited.includes(node)) return 'shadow-lg shadow-green-500/50';
    if (queue.includes(node)) return 'shadow-lg shadow-blue-500/50';
    return '';
  };
  
  return (
    <div className="space-y-4">
      {/* Message display */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-900/80 via-blue-800/80 to-indigo-900/80 border border-blue-600/50 rounded-xl p-4 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-start gap-3">
            <div className="text-xl">💡</div>
            <p className="text-white text-sm font-medium leading-relaxed">{message}</p>
          </div>
        </motion.div>
      )}
      
      {/* Graph visualization */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl h-[500px] w-full border border-gray-700/50 shadow-2xl overflow-hidden">
        <svg 
          width="100%" 
          height="100%" 
          className="absolute inset-0" 
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Draw edges - avoid duplicates for undirected graphs */}
          {nodes.map((node) => {
            const nodePos = getNodePosition(node);
            const neighbors = graph[node] || [];
            
            return neighbors.map((neighbor) => {
              // For undirected graphs, only draw edge once (from smaller to larger node)
              if (neighbor < node) return null;
              
              const neighborPos = getNodePosition(neighbor);
              const isVisited = visited.includes(node) && visited.includes(neighbor);
              const isCurrent = (current === node && checking === neighbor) || (current === neighbor && checking === node);
              
              return (
                <motion.line
                  key={`${node}-${neighbor}`}
                  x1={nodePos.x}
                  y1={nodePos.y}
                  x2={neighborPos.x}
                  y2={neighborPos.y}
                  stroke={isVisited ? '#10b981' : isCurrent ? '#f59e0b' : '#9ca3af'}
                  strokeWidth={isVisited ? 0.8 : isCurrent ? 0.7 : 0.6}
                  strokeOpacity={isVisited ? 1 : isCurrent ? 0.9 : 0.8}
                  strokeLinecap="round"
                />
              );
            });
          })}
        </svg>
        
        {/* Draw nodes */}
        <div className="relative w-full h-full">
          {nodes.map((node) => {
            const pos = getNodePosition(node);
            const nodeColor = getNodeColor(node);
            const nodeGlow = getNodeGlow(node);
            const isHighlighted = current === node || checking === node || visited.includes(node);
            
            return (
              <motion.div
                key={node}
                className={`absolute bg-gradient-to-br ${nodeColor} ${nodeGlow} rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-xs shadow-lg border-2 border-white/20 z-10`}
                style={{
                  left: `${pos.percentX}%`,
                  top: `${pos.percentY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: isHighlighted ? 1.3 : 1,
                }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                {node}
              </motion.div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-gray-800/90 px-4 py-2 rounded-lg text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-300">Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-300">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-300">Queue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-gray-300">Unvisited</span>
          </div>
        </div>
      </div>
    </div>
  );
}
