import { useState, useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Language, AlgorithmType } from '../types';
import type * as monaco from 'monaco-editor';

interface PracticeEditorProps {
  algorithmType?: AlgorithmType;
  onCodeChange?: (code: string) => void;
  initialCode?: string;
  currentLine?: number;
  onLanguageChange?: (lang: Language) => void;
  language?: Language;
}

export default function PracticeEditor({ 
  algorithmType = 'sort', 
  onCodeChange, 
  initialCode = '',
  currentLine = -1,
  onLanguageChange,
  language = 'javascript'
}: PracticeEditorProps) {
  const [code, setCode] = useState<string>(initialCode);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(code);
    }
  }, [code, onCodeChange]);

  // Highlight current line
  useEffect(() => {
    if (editorRef.current && currentLine >= 0) {
      const editor = editorRef.current;
      const model = editor.getModel();
      if (model) {
        const lineCount = model.getLineCount();
        if (currentLine < lineCount) {
          // Remove previous decorations
          editor.deltaDecorations([], []);
          
          // Add new decoration for current line
          const decorations = editor.deltaDecorations([], [{
            range: {
              startLineNumber: currentLine + 1,
              startColumn: 1,
              endLineNumber: currentLine + 1,
              endColumn: 1000,
            },
            options: {
              isWholeLine: true,
              className: 'bg-blue-600/30',
              glyphMarginClassName: 'bg-blue-400',
            }
          }]);
          
          // Scroll to line
          editor.revealLineInCenter(currentLine + 1);
        }
      }
    }
  }, [currentLine]);

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
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const getLanguageLabel = (lang: string): string => {
    const labels: Record<string, string> = {
      javascript: 'JavaScript',
      python: 'Python',
      java: 'Java',
      cpp: 'C++'
    };
    return labels[lang] || lang;
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

  const defaultCode = `// Write your ${algorithmType === 'sort' ? 'sorting' : 'search'} algorithm here
// Use 'arr' as the array variable
// For sorting: Modify 'arr' in place or return sorted array
// For search: Use 'target' variable, return index or -1
// Example variables available: arr, array, target, n, length
// Helper: swap(i, j) function available for swapping elements

function ${algorithmType === 'sort' ? 'sort' : 'search'}(arr, target) {
  // Your code here
  return arr;
}`;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700/50 shadow-xl h-full flex flex-col overflow-hidden">
      {/* Header with language selector */}
      <div className="bg-gray-800/80 border-b border-gray-700/50 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-semibold text-sm">Write Your Algorithm</h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">Language:</span>
          <div className="flex gap-1">
            {(['javascript', 'python', 'java', 'cpp'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange && onLanguageChange(lang)}
                className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                  language === lang
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {lang === 'javascript' ? 'JS' : lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={code || defaultCode}
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
  );
}
