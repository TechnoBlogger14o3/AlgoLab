// Blind 75 and popular DSA problems with descriptions and test cases

export interface Problem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: Array<{
    input: Record<string, unknown>;
    output: unknown;
    explanation: string;
  }>;
  constraints: string[];
  approach: string;
}

export const PROBLEMS: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    category: 'Array',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        output: [0, 1],
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: { nums: [3, 2, 4], target: 6 },
        output: [1, 2],
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    approach: 'Use a hash map to store each number and its index. For each number, check if target - current number exists in the map.'
  },
  {
    id: 'best-time-buy-sell',
    title: 'Best Time to Buy and Sell Stock',
    category: 'Array',
    difficulty: 'Easy',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    examples: [
      {
        input: { prices: [7, 1, 5, 3, 6, 4] },
        output: 5,
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
      },
      {
        input: { prices: [7, 6, 4, 3, 1] },
        output: 0,
        explanation: 'In this case, no transactions are done and the max profit = 0.'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    approach: 'Track the minimum price seen so far and calculate profit for each day. Keep track of maximum profit.'
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    category: 'Array',
    difficulty: 'Easy',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    examples: [
      {
        input: { nums: [1, 2, 3, 1] },
        output: true,
        explanation: '1 appears twice.'
      },
      {
        input: { nums: [1, 2, 3, 4] },
        output: false,
        explanation: 'All elements are distinct.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    approach: 'Use a Set to track seen numbers. If a number is already in the set, return true.'
  },
  {
    id: 'max-subarray',
    title: 'Maximum Subarray',
    category: 'Array',
    difficulty: 'Medium',
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    examples: [
      {
        input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
        output: 6,
        explanation: 'The subarray [4, -1, 2, 1] has the largest sum = 6.'
      },
      {
        input: { nums: [1] },
        output: 1,
        explanation: 'The subarray [1] has the largest sum = 1.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    approach: 'Kadane\'s algorithm: Keep track of maximum sum ending at current position and overall maximum sum.'
  },
  {
    id: 'container-water',
    title: 'Container With Most Water',
    category: 'Array',
    difficulty: 'Medium',
    description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    examples: [
      {
        input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
        output: 49,
        explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. The max area of water is between indices 1 and 8.'
      },
      {
        input: { height: [1, 1] },
        output: 1,
        explanation: 'The max area is between indices 0 and 1.'
      }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    approach: 'Use two pointers from both ends. Move the pointer with smaller height and calculate area at each step.'
  }
];
