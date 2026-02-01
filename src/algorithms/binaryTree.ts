import { AlgorithmState, TreeNode } from '../types';

// Helper to build BST from sorted array
function buildBSTFromArray(arr: number[]): TreeNode | null {
  if (arr.length === 0) return null;
  
  const sorted = [...arr].sort((a, b) => a - b);
  
  function buildTree(start: number, end: number): TreeNode | null {
    if (start > end) return null;
    
    const mid = Math.floor((start + end) / 2);
    const node: TreeNode = {
      value: sorted[mid],
      left: buildTree(start, mid - 1),
      right: buildTree(mid + 1, end),
    };
    
    return node;
  }
  
  return buildTree(0, sorted.length - 1);
}

// Binary Tree Search
export function* binaryTreeSearch(
  arr: number[],
  target: number
): Generator<AlgorithmState, boolean, unknown> {
  const tree = buildBSTFromArray(arr);
  const visited: number[] = [];
  
  yield {
    array: arr,
    tree: tree as any,
    visited: [],
    current: null,
    comparing: [],
    message: `Searching for ${target} in binary search tree`,
    currentLine: 1,
  };
  
  function* searchHelper(node: TreeNode | null): Generator<AlgorithmState, boolean, unknown> {
    if (!node) {
      yield {
        array: arr,
        tree: tree as any,
        visited: [...visited],
        current: null,
        comparing: [],
        message: 'Reached null node. Value not found.',
        currentLine: 3,
      };
      return false;
    }
    
    yield {
      array: arr,
      tree: tree as any,
      visited: [...visited],
      current: node.value,
      comparing: [node.value],
      message: `Checking node ${node.value}`,
      currentLine: 4,
    };
    
    if (node.value === target) {
      visited.push(node.value);
      yield {
        array: arr,
        tree: tree as any,
        visited: [...visited],
        current: node.value,
        comparing: [node.value],
        message: `Found ${target}!`,
        currentLine: 5,
      };
      return true;
    }
    
    visited.push(node.value);
    
    if (target < node.value) {
      yield {
        array: arr,
        tree: tree as any,
        visited: [...visited],
        current: node.value,
        comparing: [node.value],
        message: `${target} < ${node.value}, going left`,
        currentLine: 7,
      };
      yield* searchHelper(node.left);
    } else {
      yield {
        array: arr,
        tree: tree as any,
        visited: [...visited],
        current: node.value,
        comparing: [node.value],
        message: `${target} > ${node.value}, going right`,
        currentLine: 9,
      };
      yield* searchHelper(node.right);
    }
    
    return false;
  }
  
  const result = yield* searchHelper(tree);
  return result;
}

// Inorder Traversal
export function* binaryTreeInorder(
  arr: number[]
): Generator<AlgorithmState, number[], unknown> {
  const tree = buildBSTFromArray(arr);
  const visited: number[] = [];
  
  yield {
    array: arr,
    tree: tree as any,
    visited: [],
    current: null,
    comparing: [],
    message: 'Starting Inorder Traversal (Left, Root, Right)',
    currentLine: 1,
    traversal: 'inorder',
  };
  
  function* inorderHelper(node: TreeNode | null): Generator<AlgorithmState, void, unknown> {
    if (!node) return;
    
    yield* inorderHelper(node.left);
    
    visited.push(node.value);
    yield {
      array: arr,
      tree: tree as any,
      visited: [...visited],
      current: node.value,
      comparing: [],
      message: `Visiting node ${node.value}`,
      currentLine: 4,
      traversal: 'inorder',
    };
    
    yield* inorderHelper(node.right);
  }
  
  yield* inorderHelper(tree);
  
  yield {
    array: arr,
    tree: tree as any,
    visited: [...visited],
    current: null,
    comparing: [],
    message: `Inorder traversal complete: [${visited.join(', ')}]`,
    currentLine: 6,
    traversal: 'inorder',
  };
  
  return visited;
}

// Preorder Traversal
export function* binaryTreePreorder(
  arr: number[]
): Generator<AlgorithmState, number[], unknown> {
  const tree = buildBSTFromArray(arr);
  const visited: number[] = [];
  
  yield {
    array: arr,
    tree: tree as any,
    visited: [],
    current: null,
    comparing: [],
    message: 'Starting Preorder Traversal (Root, Left, Right)',
    currentLine: 1,
    traversal: 'preorder',
  };
  
  function* preorderHelper(node: TreeNode | null): Generator<AlgorithmState, void, unknown> {
    if (!node) return;
    
    visited.push(node.value);
    yield {
      array: arr,
      tree: tree as any,
      visited: [...visited],
      current: node.value,
      comparing: [],
      message: `Visiting node ${node.value}`,
      currentLine: 4,
      traversal: 'preorder',
    };
    
    yield* preorderHelper(node.left);
    yield* preorderHelper(node.right);
  }
  
  yield* preorderHelper(tree);
  
  yield {
    array: arr,
    tree: tree as any,
    visited: [...visited],
    current: null,
    comparing: [],
    message: `Preorder traversal complete: [${visited.join(', ')}]`,
    currentLine: 6,
    traversal: 'preorder',
  };
  
  return visited;
}

// Postorder Traversal
export function* binaryTreePostorder(
  arr: number[]
): Generator<AlgorithmState, number[], unknown> {
  const tree = buildBSTFromArray(arr);
  const visited: number[] = [];
  
  yield {
    array: arr,
    tree: tree as any,
    visited: [],
    current: null,
    comparing: [],
    message: 'Starting Postorder Traversal (Left, Right, Root)',
    currentLine: 1,
    traversal: 'postorder',
  };
  
  function* postorderHelper(node: TreeNode | null): Generator<AlgorithmState, void, unknown> {
    if (!node) return;
    
    yield* postorderHelper(node.left);
    yield* postorderHelper(node.right);
    
    visited.push(node.value);
    yield {
      array: arr,
      tree: tree as any,
      visited: [...visited],
      current: node.value,
      comparing: [],
      message: `Visiting node ${node.value}`,
      currentLine: 4,
      traversal: 'postorder',
    };
  }
  
  yield* postorderHelper(tree);
  
  yield {
    array: arr,
    tree: tree as any,
    visited: [...visited],
    current: null,
    comparing: [],
    message: `Postorder traversal complete: [${visited.join(', ')}]`,
    currentLine: 6,
    traversal: 'postorder',
  };
  
  return visited;
}
