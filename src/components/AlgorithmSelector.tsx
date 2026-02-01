import { Algorithm } from '../types';

interface AlgorithmSelectorProps {
  selectedAlgorithm: string;
  onAlgorithmChange: (id: string) => void;
  algorithms: Algorithm[];
}

export default function AlgorithmSelector({
  selectedAlgorithm,
  onAlgorithmChange,
  algorithms,
}: AlgorithmSelectorProps) {
  const sortingAlgorithms = algorithms.filter((algo) => algo.type === 'sort');
  const searchAlgorithms = algorithms.filter((algo) => algo.type === 'search');
  const linkedListAlgorithms = algorithms.filter((algo) => algo.type === 'linkedlist');
  const treeAlgorithms = algorithms.filter((algo) => algo.type === 'tree');

  return (
    <div className="space-y-4">
      {/* Sorting Algorithms */}
      <div>
        <h3 className="text-white font-semibold mb-2 text-sm">Sorting Algorithms</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
          {sortingAlgorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => onAlgorithmChange(algo.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selectedAlgorithm === algo.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {algo.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search Algorithms */}
      <div>
        <h3 className="text-white font-semibold mb-2 text-sm">Search Algorithms</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
          {searchAlgorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => onAlgorithmChange(algo.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selectedAlgorithm === algo.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {algo.name}
            </button>
          ))}
        </div>
      </div>

      {/* Linked List Algorithms */}
      {linkedListAlgorithms.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-2 text-sm">Linked List Operations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
            {linkedListAlgorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => onAlgorithmChange(algo.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedAlgorithm === algo.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {algo.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tree Algorithms */}
      {treeAlgorithms.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-2 text-sm">Binary Tree Operations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
            {treeAlgorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => onAlgorithmChange(algo.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedAlgorithm === algo.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {algo.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
