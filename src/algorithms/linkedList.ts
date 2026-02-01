import { AlgorithmState, ListNode } from '../types';

// Helper to create a linked list from array
function createLinkedList(arr: number[]): ListNode[] {
  const nodes: ListNode[] = arr.map((val) => ({ value: val, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }
  return nodes;
}

// Linked List Search
export function* linkedListSearch(
  arr: number[],
  target: number
): Generator<AlgorithmState, number, unknown> {
  const nodes = createLinkedList(arr);
  let currentIndex = 0;
  
  yield {
    array: arr,
    nodes: nodes as any,
    head: 0,
    current: null,
    comparing: [],
    message: `Searching for ${target} in linked list`,
    currentLine: 1,
  };
  
  while (currentIndex < nodes.length) {
    yield {
      array: arr,
      nodes: nodes as any,
      head: 0,
      current: currentIndex,
      comparing: [currentIndex],
      message: `Checking node at index ${currentIndex}: ${nodes[currentIndex].value}`,
      currentLine: 3,
    };
    
    if (nodes[currentIndex].value === target) {
      yield {
        array: arr,
        nodes: nodes as any,
        head: 0,
        current: currentIndex,
        comparing: [currentIndex],
        message: `Found ${target} at index ${currentIndex}!`,
        currentLine: 4,
      };
      return currentIndex;
    }
    
    currentIndex++;
  }
  
  yield {
    array: arr,
    nodes: nodes as any,
    head: 0,
    current: null,
    comparing: [],
    message: `${target} not found in linked list`,
    currentLine: 6,
  };
  
  return -1;
}

// Linked List Insert at Beginning
export function* linkedListInsertAtHead(
  arr: number[],
  value: number
): Generator<AlgorithmState, number[], unknown> {
  const nodes = createLinkedList(arr);
  
  yield {
    array: arr,
    nodes: nodes as any,
    head: 0,
    current: null,
    comparing: [],
    message: `Inserting ${value} at the beginning`,
    currentLine: 1,
  };
  
  // Create new node
  const newNode: ListNode = { value, next: nodes[0] || null };
  const newNodes = [newNode, ...nodes];
  
  // Update next pointers
  if (nodes.length > 0) {
    newNode.next = nodes[0];
  }
  
  yield {
    array: [value, ...arr],
    nodes: newNodes as any,
    head: 0,
    current: 0,
    comparing: [0],
    message: `Created new node with value ${value}`,
    currentLine: 2,
  };
  
  yield {
    array: [value, ...arr],
    nodes: newNodes as any,
    head: 0,
    current: 0,
    comparing: [],
    message: `Inserted ${value} at the beginning. New head points to this node.`,
    currentLine: 3,
  };
  
  return [value, ...arr];
}

// Linked List Delete
export function* linkedListDelete(
  arr: number[],
  value: number
): Generator<AlgorithmState, number[], unknown> {
  const nodes = createLinkedList(arr);
  let currentIndex = 0;
  let prevIndex: number | null = null;
  
  yield {
    array: arr,
    nodes: nodes as any,
    head: 0,
    current: null,
    comparing: [],
    message: `Deleting node with value ${value}`,
    currentLine: 1,
  };
  
  // Special case: delete head
  if (nodes.length > 0 && nodes[0].value === value) {
    yield {
      array: arr,
      nodes: nodes as any,
      head: 0,
      current: 0,
      comparing: [0],
      message: `Found ${value} at head. Updating head pointer.`,
      currentLine: 3,
    };
    
    const newArr = arr.slice(1);
    const newNodes = nodes.slice(1);
    
    yield {
      array: newArr,
      nodes: newNodes as any,
      head: 0,
      current: null,
      comparing: [],
      message: `Deleted ${value}. Head now points to next node.`,
      currentLine: 4,
    };
    
    return newArr;
  }
  
  // Find the node to delete
  prevIndex = 0;
  currentIndex = 1;
  
  while (currentIndex < nodes.length) {
    yield {
      array: arr,
      nodes: nodes as any,
      head: 0,
      current: currentIndex,
      comparing: [prevIndex!, currentIndex],
      message: `Checking node at index ${currentIndex}: ${nodes[currentIndex].value}`,
      currentLine: 6,
    };
    
    if (nodes[currentIndex].value === value) {
      // Update previous node's next pointer
      if (prevIndex !== null && nodes[prevIndex]) {
        nodes[prevIndex].next = nodes[currentIndex].next;
      }
      
      yield {
        array: arr,
        nodes: nodes as any,
        head: 0,
        current: currentIndex,
        comparing: [prevIndex!, currentIndex],
        message: `Found ${value}. Updating previous node's next pointer.`,
        currentLine: 8,
      };
      
      const newArr = arr.filter((_, idx) => idx !== currentIndex);
      const newNodes = nodes.filter((_, idx) => idx !== currentIndex);
      
      // Rebuild next pointers
      for (let i = 0; i < newNodes.length - 1; i++) {
        newNodes[i].next = newNodes[i + 1];
      }
      if (newNodes.length > 0) {
        newNodes[newNodes.length - 1].next = null;
      }
      
      yield {
        array: newArr,
        nodes: newNodes as any,
        head: 0,
        current: null,
        comparing: [],
        message: `Deleted ${value} successfully.`,
        currentLine: 9,
      };
      
      return newArr;
    }
    
    prevIndex = currentIndex;
    currentIndex++;
  }
  
  yield {
    array: arr,
    nodes: nodes as any,
    head: 0,
    current: null,
    comparing: [],
    message: `${value} not found in linked list`,
    currentLine: 11,
  };
  
  return arr;
}

// Linked List Reverse
export function* linkedListReverse(
  arr: number[]
): Generator<AlgorithmState, number[], unknown> {
  const nodes = createLinkedList(arr);
  
  yield {
    array: arr,
    nodes: nodes as any,
    head: 0,
    current: null,
    comparing: [],
    message: 'Reversing linked list',
    currentLine: 1,
  };
  
  let prevIndex: number | null = null;
  let currentIndex = 0;
  let nextIndex: number | null = 1;
  
  while (currentIndex < nodes.length) {
    yield {
      array: arr,
      nodes: nodes as any,
      head: prevIndex !== null ? prevIndex : 0,
      current: currentIndex,
      comparing: prevIndex !== null ? [prevIndex, currentIndex] : [currentIndex],
      message: `Processing node at index ${currentIndex}. Reversing pointer.`,
      currentLine: 3,
    };
    
    // Store next before reversing
    const next = nodes[currentIndex].next;
    
    // Reverse the pointer
    nodes[currentIndex].next = prevIndex !== null ? nodes[prevIndex] : null;
    
    // Move to next
    prevIndex = currentIndex;
    currentIndex = nextIndex !== null && nextIndex < nodes.length ? nextIndex : nodes.length;
    nextIndex = next ? nodes.findIndex((n) => n === next) : null;
  }
  
  const reversedArr = [...arr].reverse();
  const reversedNodes = createLinkedList(reversedArr);
  
  yield {
    array: reversedArr,
    nodes: reversedNodes as any,
    head: reversedNodes.length > 0 ? 0 : null,
    current: null,
    comparing: [],
    message: 'Linked list reversed successfully!',
    currentLine: 5,
  };
  
  return reversedArr;
}
