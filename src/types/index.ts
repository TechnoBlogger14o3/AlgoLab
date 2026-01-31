// Common type definitions

export interface AlgorithmState {
  array: number[];
  comparing?: number[];
  sorted?: number[];
  pivot?: number;
  merging?: number[];
  inserting?: number;
  partition?: number[];
  minIndex?: number;
  heap?: { root: number; size: number } | null;
  gap?: number;
  counting?: Record<string, unknown> | null;
  swapping?: number[][];
  currentLine?: number;
  target?: number | null;
  found?: boolean;
  left?: number;
  right?: number;
  mid?: number;
  currentIndex?: number;
}

export interface Algorithm {
  id: string;
  name: string;
  generator: (arr: number[], target?: number | null) => Generator<AlgorithmState, number[], unknown>;
  type: 'sort' | 'search';
}

export type ArrayType = 'random' | 'sorted' | 'reversed' | 'nearlySorted';
export type Language = 'javascript' | 'python' | 'java' | 'cpp';
export type AlgorithmType = 'sort' | 'search';
