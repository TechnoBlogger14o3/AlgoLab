import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  title: string;
  content: string;
  points?: string[];
}

interface ELectureModeProps {
  algorithmId: string;
  algorithmName: string;
  isOpen: boolean;
  onClose: () => void;
}

const lectureContent: Record<string, Slide[]> = {
  bubble: [
    {
      title: 'Introduction to Bubble Sort',
      content: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      points: [
        'Named because smaller elements "bubble" to the top',
        'One of the simplest sorting algorithms',
        'Good for educational purposes',
      ],
    },
    {
      title: 'How It Works',
      content: 'The algorithm compares each pair of adjacent items and swaps them if they are in the wrong order. This process repeats until no more swaps are needed.',
      points: [
        'Pass through the list multiple times',
        'Compare adjacent elements',
        'Swap if they are in wrong order',
        'Continue until no swaps needed',
      ],
    },
    {
      title: 'Time Complexity',
      content: 'Bubble Sort has different time complexities depending on the input:',
      points: [
        'Best Case: O(n) - when array is already sorted',
        'Average Case: O(n²) - random array',
        'Worst Case: O(n²) - reversed array',
      ],
    },
    {
      title: 'Space Complexity',
      content: 'Bubble Sort is an in-place sorting algorithm, meaning it requires only a constant amount of extra memory.',
      points: ['Space Complexity: O(1)', 'No additional data structures needed'],
    },
  ],
  quick: [
    {
      title: 'Introduction to Quick Sort',
      content: 'Quick Sort is a highly efficient sorting algorithm that uses the divide-and-conquer strategy.',
      points: [
        'One of the fastest sorting algorithms',
        'Uses pivot element to partition array',
        'Recursive algorithm',
      ],
    },
    {
      title: 'How It Works',
      content: 'Quick Sort picks a pivot element and partitions the array around the pivot, placing smaller elements before it and larger elements after it.',
      points: [
        'Choose a pivot element',
        'Partition array around pivot',
        'Recursively sort left and right partitions',
      ],
    },
    {
      title: 'Time Complexity',
      content: 'Quick Sort performance depends on pivot selection:',
      points: [
        'Best Case: O(n log n) - balanced partitions',
        'Average Case: O(n log n)',
        'Worst Case: O(n²) - unbalanced partitions',
      ],
    },
  ],
  merge: [
    {
      title: 'Introduction to Merge Sort',
      content: 'Merge Sort is a stable, divide-and-conquer sorting algorithm that divides the array into halves, sorts them, and merges them back.',
      points: [
        'Stable sorting algorithm',
        'Always O(n log n) time complexity',
        'Uses extra space for merging',
      ],
    },
    {
      title: 'How It Works',
      content: 'Merge Sort divides the array into two halves, recursively sorts them, and then merges the sorted halves.',
      points: [
        'Divide array into two halves',
        'Recursively sort both halves',
        'Merge sorted halves',
      ],
    },
    {
      title: 'Time Complexity',
      content: 'Merge Sort has consistent performance:',
      points: [
        'Best Case: O(n log n)',
        'Average Case: O(n log n)',
        'Worst Case: O(n log n)',
      ],
    },
  ],
  insertion: [
    {
      title: 'Introduction to Insertion Sort',
      content: 'Insertion Sort builds the sorted array one item at a time, similar to how you might sort playing cards.',
      points: [
        'Simple and intuitive',
        'Efficient for small datasets',
        'Stable sorting algorithm',
      ],
    },
    {
      title: 'How It Works',
      content: 'The algorithm maintains a sorted subarray and inserts each new element into its correct position.',
      points: [
        'Start with first element (already sorted)',
        'Take next element and insert in correct position',
        'Shift elements to make room',
      ],
    },
  ],
  selection: [
    {
      title: 'Introduction to Selection Sort',
      content: 'Selection Sort finds the minimum element and places it at the beginning, repeating for remaining elements.',
      points: [
        'Simple algorithm',
        'In-place sorting',
        'Not stable',
      ],
    },
  ],
  heap: [
    {
      title: 'Introduction to Heap Sort',
      content: 'Heap Sort uses a binary heap data structure to sort elements efficiently.',
      points: [
        'Uses heap data structure',
        'In-place sorting',
        'Consistent O(n log n) performance',
      ],
    },
  ],
  shell: [
    {
      title: 'Introduction to Shell Sort',
      content: 'Shell Sort is an optimization of Insertion Sort that allows exchange of far apart elements.',
      points: [
        'Generalization of Insertion Sort',
        'Uses gap sequence',
        'More efficient than Insertion Sort',
      ],
    },
  ],
  counting: [
    {
      title: 'Introduction to Counting Sort',
      content: 'Counting Sort is a non-comparison based sorting algorithm that counts occurrences of each element.',
      points: [
        'Non-comparison based',
        'Works well with small range of values',
        'Linear time complexity',
      ],
    },
  ],
  linear: [
    {
      title: 'Introduction to Linear Search',
      content: 'Linear Search checks each element sequentially until the target is found or the list ends.',
      points: [
        'Simplest search algorithm',
        'Works on unsorted arrays',
        'O(n) time complexity',
      ],
    },
  ],
  binary: [
    {
      title: 'Introduction to Binary Search',
      content: 'Binary Search efficiently finds an element in a sorted array by repeatedly dividing the search space in half.',
      points: [
        'Requires sorted array',
        'Very efficient O(log n)',
        'Divide and conquer approach',
      ],
    },
  ],
};

export default function ELectureMode({ algorithmId, algorithmName, isOpen, onClose }: ELectureModeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = lectureContent[algorithmId] || [
    {
      title: `${algorithmName} Overview`,
      content: `Learn about ${algorithmName} algorithm through interactive visualization.`,
    },
  ];
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-xl border border-gray-700/50 shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <h2 className="text-2xl font-bold text-white">
              📚 e-Lecture: {algorithmName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Slide Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {slides[currentSlide].content}
                </p>
                {slides[currentSlide].points && (
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {slides[currentSlide].points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-between p-6 border-t border-gray-700/50">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentSlide === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              ← Previous
            </button>
            
            <div className="text-gray-400 text-sm">
              Slide {currentSlide + 1} of {slides.length}
            </div>
            
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentSlide === slides.length - 1
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
