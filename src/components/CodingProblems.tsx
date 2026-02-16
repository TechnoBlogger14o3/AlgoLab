import { useState, useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';
import { BLIND_75_PROBLEMS, Problem } from '../data/blind75Problems';
import { Language } from '../types';
import ProblemVisualizer from './ProblemVisualizer';
import { executeProblemCode, ExecutionStep } from '../utils/problemExecutor';

interface CodingProblemsProps {
  onBack?: () => void;
}

export default function CodingProblems({ onBack }: CodingProblemsProps) {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(BLIND_75_PROBLEMS[0]);
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{
    passed: boolean;
    input: unknown;
    expected: unknown;
    actual: unknown;
  }> | null>(null);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const getDefaultCode = () => {
    return selectedProblem.functionSignature[language] || selectedProblem.functionSignature.javascript;
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    const newCode = selectedProblem.functionSignature[newLanguage] || selectedProblem.functionSignature.javascript;
    setCode(newCode);
  };

  const getMonacoLanguage = (lang: Language): string => {
    const langMap: Record<Language, string> = {
      javascript: 'javascript',
      python: 'python',
      java: 'java',
      cpp: 'cpp'
    };
    return langMap[lang] || 'javascript';
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      lineNumbers: 'on',
      roundedSelection: false,
      cursorStyle: 'line',
      wordWrap: 'on',
      tabSize: 2,
      insertSpaces: true,
      formatOnPaste: true,
      formatOnType: true,
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem);
    setCode(getDefaultCode());
    setTestResults(null);
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults(null);
    setExecutionSteps([]);
    setCurrentStep(0);
    setIsAnimating(true);

    try {
      let firstTestSteps: ExecutionStep[] = [];

      const results = await Promise.all(
        selectedProblem.testCases.map(async (testCase, index) => {
          try {
            // Execute user code and get visualization steps
            const executionResult = await executeProblemCode(
              selectedProblem.id,
              code || getDefaultCode(),
              language,
              testCase
            );

            // For the first test case, use its execution steps for visualization
            if (index === 0 && executionResult.steps.length > 0) {
              firstTestSteps = executionResult.steps;
            }

            return {
              passed: executionResult.passed,
              input: testCase.input,
              expected: testCase.expectedOutput,
              actual: executionResult.actual,
              error: executionResult.error,
            };
          } catch (error) {
            return {
              passed: false,
              input: testCase.input,
              expected: testCase.expectedOutput,
              actual: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            };
          }
        })
      );

      setTestResults(results);
      setExecutionSteps(firstTestSteps);

      // Animate through visualization steps
      if (firstTestSteps.length > 0) {
        setCurrentStep(0);
        let stepIndex = 0;
        const interval = setInterval(() => {
          stepIndex++;
          if (stepIndex < firstTestSteps.length) {
            setCurrentStep(stepIndex);
          } else {
            clearInterval(interval);
            setIsAnimating(false);
          }
        }, 800); // 800ms per step

        // Store interval ID for cleanup
        return () => clearInterval(interval);
      } else {
        setIsAnimating(false);
      }
    } catch (error) {
      console.error('Error running tests:', error);
      setIsAnimating(false);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">📚 Blind 75 Problems</h1>
            <p className="text-gray-400">Solve LeetCode problems with live visualization</p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to Algorithms
            </button>
          )}
        </div>

        <div className="grid grid-cols-12 gap-4" style={{ height: 'calc(100vh - 180px)' }}>
          {/* Left Panel - Problem List & Description */}
          <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
            {/* Problem List */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <h2 className="text-white font-semibold mb-3">Problems</h2>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {BLIND_75_PROBLEMS.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => handleProblemSelect(problem)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedProblem.id === problem.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{problem.title}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          problem.difficulty === 'Easy'
                            ? 'bg-green-500/20 text-green-400'
                            : problem.difficulty === 'Medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{problem.category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Description */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex-1 overflow-y-auto">
              <h2 className="text-white font-semibold mb-3">{selectedProblem.title}</h2>
              <div className="text-gray-300 text-sm space-y-4">
                <div>
                  <h3 className="text-white font-medium mb-2">Description</h3>
                  <p className="whitespace-pre-line">{selectedProblem.description}</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Examples</h3>
                  {selectedProblem.examples.map((example, idx) => (
                    <div key={idx} className="mb-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="text-gray-400 text-xs mb-1">Example {idx + 1}:</div>
                      <div className="font-mono text-xs">
                        <div className="text-blue-400">Input: {example.input}</div>
                        <div className="text-green-400">Output: {example.output}</div>
                        {example.explanation && (
                          <div className="text-gray-400 mt-1">Explanation: {example.explanation}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Constraints</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    {selectedProblem.constraints.map((constraint, idx) => (
                      <li key={idx} className="text-xs">{constraint}</li>
                    ))}
                  </ul>
                </div>

                {selectedProblem.hints && selectedProblem.hints.length > 0 && (
                  <div>
                    <h3 className="text-white font-medium mb-2">Hints</h3>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {selectedProblem.hints.map((hint, idx) => (
                        <li key={idx} className="text-xs">{hint}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="col-span-5 flex flex-col bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold">Code Editor</h2>
                <div className="flex items-center gap-2">
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value as Language)}
                    className="px-3 py-1 bg-gray-700 text-white rounded-lg text-sm border border-gray-600"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>
                  <button
                    onClick={runTests}
                    disabled={isRunning}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isRunning ? 'Running...' : '▶ Run Tests'}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={getMonacoLanguage(language)}
                value={code || getDefaultCode()}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  cursorStyle: 'line',
                  wordWrap: 'on',
                  tabSize: 2,
                  insertSpaces: true,
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
            </div>
          </div>

          {/* Right Side Panel - Test Results & Visualization */}
          <div className="col-span-4 flex flex-col gap-4 overflow-hidden">
            {/* Test Results */}
            <div className="flex flex-col bg-gray-800 rounded-xl border border-gray-700 overflow-hidden" style={{ flex: '0 0 50%' }}>
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-white font-semibold">Test Results</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {testResults === null ? (
                  <div className="text-gray-400 text-center mt-8">
                    Click "Run Tests" to execute your solution
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border-2 ${
                          result.passed
                            ? 'bg-green-500/10 border-green-500/50'
                            : 'bg-red-500/10 border-red-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium text-sm">Test Case {idx + 1}</span>
                          <span
                            className={`text-xs font-bold ${
                              result.passed ? 'text-green-400' : 'text-red-400'
                            }`}
                          >
                            {result.passed ? '✓ PASSED' : '✗ FAILED'}
                          </span>
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="text-gray-400">
                            <span className="text-blue-400">Input:</span>{' '}
                            {JSON.stringify(result.input)}
                          </div>
                          <div className="text-gray-400">
                            <span className="text-green-400">Expected:</span>{' '}
                            {JSON.stringify(result.expected)}
                          </div>
                          {result.actual !== null && (
                            <div className="text-gray-400">
                              <span className="text-yellow-400">Got:</span>{' '}
                              {JSON.stringify(result.actual)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Visualization */}
            <div className="flex flex-col bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex-1">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-white font-semibold">Visualization</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <ProblemVisualizer
                  problem={selectedProblem}
                  code={code || getDefaultCode()}
                  language={language}
                  testCase={selectedProblem.testCases[0]}
                  executionSteps={executionSteps}
                  currentStep={currentStep}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
