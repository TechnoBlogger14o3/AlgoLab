import { useEffect, useRef } from 'react';
import { Language } from '../types';

interface CodeEditorProps {
  code: string;
  language: Language;
  onChange: (code: string) => void;
  currentLine?: number;
}

export default function CodeEditor({ code, language, onChange, currentLine = -1 }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      const syncScroll = () => {
        if (lineNumbersRef.current) {
          lineNumbersRef.current.scrollTop = textareaRef.current!.scrollTop;
        }
      };
      textareaRef.current.addEventListener('scroll', syncScroll);
      return () => textareaRef.current?.removeEventListener('scroll', syncScroll);
    }
  }, []);

  const lines = code.split('\n');
  const lineCount = lines.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const getLanguageClass = () => {
    // Basic syntax highlighting classes (can be enhanced)
    return 'font-mono text-sm';
  };

  return (
    <div className="h-full flex bg-gray-900 rounded-lg overflow-hidden">
      {/* Line Numbers */}
      <div
        ref={lineNumbersRef}
        className="bg-gray-800 text-gray-500 text-xs py-3 px-3 text-right select-none overflow-hidden"
        style={{ minWidth: '50px', maxWidth: '50px' }}
      >
        {lines.map((_, index) => (
          <div
            key={index}
            className={`leading-6 ${
              currentLine === index ? 'text-blue-400 font-bold' : ''
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Code Editor */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        className={`flex-1 bg-transparent text-gray-100 py-3 px-4 resize-none outline-none ${getLanguageClass()}`}
        style={{
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          lineHeight: '1.5',
          tabSize: 2,
        }}
        spellCheck={false}
        wrap="off"
      />
    </div>
  );
}
