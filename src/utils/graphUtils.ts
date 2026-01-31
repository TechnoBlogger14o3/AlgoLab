// Graph utility functions
export interface Graph {
  [key: number]: number[];
}

export function generateRandomGraph(numNodes: number = 8, numEdges: number | null = null): Graph {
  const graph: Graph = {};
  
  // Initialize all nodes
  for (let i = 0; i < numNodes; i++) {
    graph[i] = [];
  }
  
  // Calculate number of edges (default: 1.5x nodes for a connected graph)
  const edges = numEdges || Math.floor(numNodes * 1.5);
  
  // Create edges
  let edgeCount = 0;
  while (edgeCount < edges) {
    const from = Math.floor(Math.random() * numNodes);
    const to = Math.floor(Math.random() * numNodes);
    
    // Avoid self-loops and duplicate edges
    if (from !== to && !graph[from].includes(to)) {
      graph[from].push(to);
      // For undirected graph, add reverse edge
      if (!graph[to].includes(from)) {
        graph[to].push(from);
      }
      edgeCount++;
    }
  }
  
  return graph;
}

export function generateTreeGraph(numNodes: number = 8): Graph {
  const graph: Graph = {};
  
  // Initialize all nodes
  for (let i = 0; i < numNodes; i++) {
    graph[i] = [];
  }
  
  // Create a tree structure
  for (let i = 1; i < numNodes; i++) {
    const parent = Math.floor(Math.random() * i);
    graph[parent].push(i);
    graph[i].push(parent);
  }
  
  return graph;
}

export function generateGridGraph(rows: number = 3, cols: number = 3): Graph {
  const graph: Graph = {};
  const numNodes = rows * cols;
  
  // Initialize all nodes
  for (let i = 0; i < numNodes; i++) {
    graph[i] = [];
  }
  
  // Create grid connections
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const node = row * cols + col;
      
      // Right neighbor
      if (col < cols - 1) {
        const right = row * cols + (col + 1);
        graph[node].push(right);
        graph[right].push(node);
      }
      
      // Bottom neighbor
      if (row < rows - 1) {
        const bottom = (row + 1) * cols + col;
        graph[node].push(bottom);
        graph[bottom].push(node);
      }
    }
  }
  
  return graph;
}
