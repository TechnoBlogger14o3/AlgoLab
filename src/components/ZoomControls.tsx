import { motion } from 'framer-motion';

interface ZoomControlsProps {
  scale: number;
  onScaleChange: (scale: number) => void;
}

export default function ZoomControls({ scale, onScaleChange }: ZoomControlsProps) {
  const scales = [
    { value: 0.5, label: '0.5x', description: 'Zoom Out' },
    { value: 1.0, label: '1.0x', description: 'Normal' },
    { value: 1.5, label: '1.5x', description: 'Zoom In' },
  ];
  
  return (
    <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-700/50">
      <div className="flex items-center gap-3">
        <span className="text-gray-300 text-sm font-medium">Zoom:</span>
        <div className="flex gap-2">
          {scales.map((s) => (
            <button
              key={s.value}
              onClick={() => onScaleChange(s.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                scale === s.value
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title={s.description}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
