interface Problem {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  examples: Array<{
    input: Record<string, unknown>;
    output: unknown;
    explanation: string;
  }>;
}

interface ProblemListProps {
  onSelectProblem: (problem: Problem) => void;
}

import { PROBLEMS } from '../problems/problemsData';

export default function ProblemList({ onSelectProblem }: ProblemListProps) {
  const problemsByCategory = PROBLEMS.reduce((acc: Record<string, Problem[]>, problem: Problem) => {
    if (!acc[problem.category]) {
      acc[problem.category] = [];
    }
    acc[problem.category].push(problem);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Blind 75 & Popular DSA Problems</h2>
        <p className="text-gray-300 mb-6">
          Select a problem to visualize its solution step by step
        </p>
      </div>

      {Object.entries(problemsByCategory).map(([category, problems]) => (
        <div key={category} className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problems.map((problem) => (
              <button
                key={problem.id}
                onClick={() => onSelectProblem(problem)}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-left transition-all hover:scale-105"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-semibold">{problem.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">{problem.description}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
