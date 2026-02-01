// Common type definitions

import { Graph } from '../utils/graphUtils';

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
  // Graph algorithm states
  graph?: Graph;
  queue?: number[];
  stack?: number[];
  visited?: number[];
  current?: number | null;
  checking?: number | null;
  parent?: Record<number, number>;
  level?: Record<number, number>;
  path?: number[];
  message?: string;
  // Linked List states
  nodes?: Array<{ value: number; next: { value: number; next: null } | null }>;
  head?: number | null;
  // Binary Tree states
  tree?: { value: number; left: { value: number; left: null; right: null } | null; right: { value: number; left: null; right: null } | null } | null;
  traversal?: 'inorder' | 'preorder' | 'postorder' | null;
}

// Export types for data structures
export interface ListNode {
  value: number;
  next: ListNode | null;
}

export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface Algorithm {
  id: string;
  name: string;
  generator: (arr: number[] | Graph, target?: number | null) => Generator<AlgorithmState, number[] | number | boolean, unknown>;
  type: 'sort' | 'search' | 'graph' | 'linkedlist' | 'tree';
}

export type ArrayType = 'random' | 'sorted' | 'reversed' | 'nearlySorted';
export type Language = 'javascript' | 'python' | 'java' | 'cpp';
export type AlgorithmType = 'sort' | 'search' | 'graph' | 'linkedlist' | 'tree';
