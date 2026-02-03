export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  functionSignature: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
  testCases: Array<{
    input: Record<string, unknown>;
    expectedOutput: unknown;
  }>;
  hints?: string[];
}

export const BLIND_75_PROBLEMS: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Array',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    functionSignature: {
      javascript: 'function twoSum(nums, target) {\n  // Your code here\n}',
      python: 'def twoSum(nums, target):\n    # Your code here\n    pass',
      java: 'public int[] twoSum(int[] nums, int target) {\n    // Your code here\n}',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n}',
    },
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, expectedOutput: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, expectedOutput: [0, 1] },
    ],
    hints: [
      'Use a hash map to store numbers and their indices',
      'For each number, check if target - number exists in the map',
    ],
  },
  {
    id: 'best-time-buy-sell',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Array',
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.',
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.',
      },
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4',
    ],
    functionSignature: {
      javascript: 'function maxProfit(prices) {\n  // Your code here\n}',
      python: 'def maxProfit(prices):\n    # Your code here\n    pass',
      java: 'public int maxProfit(int[] prices) {\n    // Your code here\n}',
      cpp: 'int maxProfit(vector<int>& prices) {\n    // Your code here\n}',
    },
    testCases: [
      { input: { prices: [7, 1, 5, 3, 6, 4] }, expectedOutput: 5 },
      { input: { prices: [7, 6, 4, 3, 1] }, expectedOutput: 0 },
    ],
    hints: [
      'Keep track of the minimum price seen so far',
      'Calculate profit for each day and keep the maximum',
    ],
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'Array',
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: 'true',
      },
      {
        input: 'nums = [1,2,3,4]',
        output: 'false',
      },
      {
        input: 'nums = [1,1,1,3,3,4,3,2,4,2]',
        output: 'true',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9',
    ],
    functionSignature: {
      javascript: 'function containsDuplicate(nums) {\n  // Your code here\n}',
      python: 'def containsDuplicate(nums):\n    # Your code here\n    pass',
      java: 'public boolean containsDuplicate(int[] nums) {\n    // Your code here\n}',
      cpp: 'bool containsDuplicate(vector<int>& nums) {\n    // Your code here\n}',
    },
    testCases: [
      { input: { nums: [1, 2, 3, 1] }, expectedOutput: true },
      { input: { nums: [1, 2, 3, 4] }, expectedOutput: false },
      { input: { nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2] }, expectedOutput: true },
    ],
    hints: [
      'Use a Set or Hash Set to track seen numbers',
      'If a number is already in the set, return true',
    ],
  },
  {
    id: 'max-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Array',
    description: `Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.`,
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: '[4,-1,2,1] has the largest sum = 6.',
      },
      {
        input: 'nums = [1]',
        output: '1',
      },
      {
        input: 'nums = [5,4,-1,7,8]',
        output: '23',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    functionSignature: {
      javascript: 'function maxSubArray(nums) {\n  // Your code here\n}',
      python: 'def maxSubArray(nums):\n    # Your code here\n    pass',
      java: 'public int maxSubArray(int[] nums) {\n    // Your code here\n}',
      cpp: 'int maxSubArray(vector<int>& nums) {\n    // Your code here\n}',
    },
    testCases: [
      { input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, expectedOutput: 6 },
      { input: { nums: [1] }, expectedOutput: 1 },
      { input: { nums: [5, 4, -1, 7, 8] }, expectedOutput: 23 },
    ],
    hints: [
      'Use Kadane\'s algorithm',
      'Keep track of the maximum sum ending at each position',
    ],
  },
  {
    id: 'container-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: 'Array',
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.`,
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.',
      },
      {
        input: 'height = [1,1]',
        output: '1',
      },
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4',
    ],
    functionSignature: {
      javascript: 'function maxArea(height) {\n  // Your code here\n}',
      python: 'def maxArea(height):\n    # Your code here\n    pass',
      java: 'public int maxArea(int[] height) {\n    // Your code here\n}',
      cpp: 'int maxArea(vector<int>& height) {\n    // Your code here\n}',
    },
    testCases: [
      { input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }, expectedOutput: 49 },
      { input: { height: [1, 1] }, expectedOutput: 1 },
    ],
    hints: [
      'Use two pointers approach',
      'Start from both ends and move the pointer with smaller height',
    ],
  },
];
