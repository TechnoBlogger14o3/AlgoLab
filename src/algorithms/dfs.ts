import { AlgorithmState } from '../types';
import { Graph } from '../utils/graphUtils';

interface DFSState extends AlgorithmState {
  graph?: Graph;
  stack?: number[];
  visited?: number[];
  current?: number | null;
  checking?: number | null;
  parent?: Record<number, number>;
  path?: number[];
  message?: string;
}

export function* dfs(
  graph: Graph,
  startNode: number = 0
): Generator<DFSState, number[], unknown> {
  const stack: number[] = [startNode];
  const visited: number[] = [];
  const parent: Record<number, number> = {};
  let current: number | null = null;
  
  yield {
    array: [],
    comparing: [],
    sorted: [],
    graph,
    stack: [...stack],
    visited: [...visited],
    current: null,
    checking: null,
    parent: { ...parent },
    path: [],
    message: `Starting DFS from node ${startNode}`,
    currentLine: 1,
  };
  
  while (stack.length > 0) {
    current = stack.pop()!;
    
    yield {
      array: [],
      comparing: [],
      sorted: [],
      graph,
      stack: [...stack],
      visited: [...visited],
      current: current,
      checking: null,
      parent: { ...parent },
      path: [],
      message: `Popped node ${current} from stack`,
      currentLine: 3, // while (stack.length > 0)
    };
    
    if (!visited.includes(current)) {
      visited.push(current);
      
      yield {
        array: [],
        comparing: [],
        sorted: [],
        graph,
        stack: [...stack],
        visited: [...visited],
        current: current,
        checking: null,
        parent: { ...parent },
        path: [],
        message: `Marked node ${current} as visited`,
        currentLine: 5, // visited.push(current)
      };
      
      const neighbors = graph[current] || [];
      
      // Push neighbors in reverse order for correct visualization
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neighbor = neighbors[i];
        
        yield {
          array: [],
          comparing: [],
          sorted: [],
          graph,
          stack: [...stack],
          visited: [...visited],
          current: current,
          checking: neighbor,
          parent: { ...parent },
          path: [],
          message: `Checking neighbor ${neighbor} of node ${current}`,
          currentLine: 7, // for (const neighbor of neighbors)
        };
        
        if (!visited.includes(neighbor) && !stack.includes(neighbor)) {
          stack.push(neighbor);
          parent[neighbor] = current;
          
          yield {
            array: [],
            comparing: [],
            sorted: [],
            graph,
            stack: [...stack],
            visited: [...visited],
            current: current,
            checking: neighbor,
            parent: { ...parent },
            path: [],
            message: `Pushed node ${neighbor} to stack`,
            currentLine: 9, // stack.push(neighbor)
          };
        }
      }
    }
  }
  
  yield {
    array: [],
    comparing: [],
    sorted: [],
    graph,
    stack: [],
    visited: [...visited],
    current: null,
    checking: null,
    parent: { ...parent },
    path: [],
    message: `DFS complete. Visited ${visited.length} nodes.`,
    currentLine: 12, // return visited
  };
  
  return visited;
}
