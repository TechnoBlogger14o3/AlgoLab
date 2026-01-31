import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { getCode } from '../data/algorithmCode';
import { Language } from '../types';

interface CodeDisplayProps {
  algorithmId: string;
  language: Language;
  currentLine?: number;
  onLanguageChange?: (lang: Language) => void;
}

export default function CodeDisplay({ 
  algorithmId, 
  language, 
  currentLine = -1, 
  onLanguageChange 
}: CodeDisplayProps) {
  const code = getCode(algorithmId, language);
  const lines = code.split('\n');
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to active line
  useEffect(() => {
    if (currentLine >= 0 && activeLineRef.current && codeContainerRef.current) {
      const container = codeContainerRef.current;
      const activeElement = activeLineRef.current;
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeElement.getBoundingClientRect();
      
      if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentLine]);
  
  const getLanguageLabel = (lang: string): string => {
    const labels: Record<string, string> = {
      javascript: 'JavaScript',
      python: 'Python',
      java: 'Java',
      cpp: 'C++'
    };
    return labels[lang] || lang;
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700/50 shadow-xl h-full flex flex-col overflow-hidden">
      {/* Header with language selector */}
      <div className="bg-gray-800/80 border-b border-gray-700/50 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-semibold text-sm">Algorithm Code</h3>
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
      
      {/* Code display */}
      <div ref={codeContainerRef} className="flex-1 overflow-auto p-2 font-mono text-xs">
        <div className="relative">
          {lines.map((line, index) => {
            const isActive = currentLine === index;
            const isEmpty = line.trim() === '';
            
            return (
              <motion.div
                key={index}
                ref={isActive ? activeLineRef : undefined}
                className={`flex items-start gap-2 py-0.5 px-2 rounded transition-colors ${
                  isActive
                    ? 'bg-blue-600/30 border-l-4 border-blue-400 shadow-lg shadow-blue-500/20'
                    : 'hover:bg-gray-800/50'
                }`}
                initial={isActive ? { x: -5 } : {}}
                animate={isActive ? {
                  x: 0,
                  backgroundColor: 'rgba(37, 99, 235, 0.3)',
                } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Line number */}
                <span className={`text-xs select-none min-w-[2rem] text-right font-mono ${
                  isActive ? 'text-blue-400 font-bold' : 'text-gray-500'
                }`}>
                  {index + 1}
                </span>
                {/* Code line */}
                <pre className={`flex-1 overflow-x-auto leading-tight ${
                  isEmpty ? 'text-transparent' : isActive ? 'text-blue-100 font-semibold' : 'text-gray-300'
                }`}>
                  <code className="whitespace-pre">{line || ' '}</code>
                </pre>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
