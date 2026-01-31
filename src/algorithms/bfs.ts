import { AlgorithmState } from '../types';
import { Graph } from '../utils/graphUtils';

interface BFSState extends AlgorithmState {
  graph?: Graph;
  queue?: number[];
  visited?: number[];
  current?: number | null;
  checking?: number | null;
  parent?: Record<number, number>;
  level?: Record<number, number>;
  path?: number[];
  message?: string;
}

export function* bfs(
  graph: Graph,
  startNode: number = 0
): Generator<BFSState, number[], unknown> {
  const queue: number[] = [startNode];
  const visited: number[] = [];
  const parent: Record<number, number> = {};
  const level: Record<number, number> = { [startNode]: 0 };
  let current: number | null = null;
  
  yield {
    array: [],
    comparing: [],
    sorted: [],
    graph,
    queue: [...queue],
    visited: [...visited],
    current: null,
    checking: null,
    parent: { ...parent },
    level: { ...level },
    path: [],
    message: `Starting BFS from node ${startNode}`,
    currentLine: 1,
  };
  
  while (queue.length > 0) {
    current = queue.shift()!;
    
    yield {
      array: [],
      comparing: [],
      sorted: [],
      graph,
      queue: [...queue],
      visited: [...visited],
      current: current,
      checking: null,
      parent: { ...parent },
      level: { ...level },
      path: [],
      message: `Processing node ${current}`,
      currentLine: 3, // while (queue.length > 0)
    };
    
    if (!visited.includes(current)) {
      visited.push(current);
      
      yield {
        array: [],
        comparing: [],
        sorted: [],
        graph,
        queue: [...queue],
        visited: [...visited],
        current: current,
        checking: null,
        parent: { ...parent },
        level: { ...level },
        path: [],
        message: `Marked node ${current} as visited`,
        currentLine: 5, // visited.push(current)
      };
      
      const neighbors = graph[current] || [];
      
      for (const neighbor of neighbors) {
        yield {
          array: [],
          comparing: [],
          sorted: [],
          graph,
          queue: [...queue],
          visited: [...visited],
          current: current,
          checking: neighbor,
          parent: { ...parent },
          level: { ...level },
          path: [],
          message: `Checking neighbor ${neighbor} of node ${current}`,
          currentLine: 7, // for (const neighbor of neighbors)
        };
        
        if (!visited.includes(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor);
          parent[neighbor] = current;
          level[neighbor] = (level[current] || 0) + 1;
          
          yield {
            array: [],
            comparing: [],
            sorted: [],
            graph,
            queue: [...queue],
            visited: [...visited],
            current: current,
            checking: neighbor,
            parent: { ...parent },
            level: { ...level },
            path: [],
            message: `Added node ${neighbor} to queue (level ${level[neighbor]})`,
            currentLine: 9, // queue.push(neighbor)
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
    queue: [],
    visited: [...visited],
    current: null,
    checking: null,
    parent: { ...parent },
    level: { ...level },
    path: [],
    message: `BFS complete. Visited ${visited.length} nodes.`,
    currentLine: 12, // return visited
  };
  
  return visited;
}
