interface ControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onGenerateNew: () => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  arrayType: string;
  onArrayTypeChange: (type: string) => void;
  hideArrayControls?: boolean;
}

export default function Controls({
  isRunning,
  isPaused,
  speed,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  onGenerateNew,
  arraySize,
  onArraySizeChange,
  arrayType,
  onArrayTypeChange,
  hideArrayControls = false,
}: ControlsProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700/50 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Play/Pause Controls */}
        <div className="flex gap-3">
          {!isRunning || isPaused ? (
            <button
              onClick={onPlay}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isRunning && !isPaused}
            >
              ▶ Play
            </button>
          ) : (
            <button
              onClick={onPause}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-700 transition-all transform hover:scale-105"
            >
              ⏸ Pause
            </button>
          )}
          <button
            onClick={onReset}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            ↻ Reset
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-3 bg-gray-700/50 px-4 py-2 rounded-lg border border-gray-600/50">
          <label className="text-gray-300 font-medium text-sm">Speed:</label>
          <input
            type="range"
            min="50"
            max="2000"
            step="50"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-40 accent-blue-500 cursor-pointer"
            disabled={isRunning && !isPaused}
          />
          <span className="text-white text-sm font-semibold w-20 bg-gray-600/50 px-2 py-1 rounded text-center">
            {speed < 1000 ? `${speed}ms` : `${(speed / 1000).toFixed(1)}s`}
          </span>
        </div>

        {!hideArrayControls && (
          <>
            {/* Array Type Selection */}
            <div className="flex items-center gap-3 bg-gray-700/50 px-4 py-2 rounded-lg border border-gray-600/50">
              <label className="text-gray-300 font-medium text-sm">Type:</label>
              <select
                value={arrayType}
                onChange={(e) => onArrayTypeChange(e.target.value)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg border border-gray-500 transition-colors cursor-pointer font-medium"
                disabled={isRunning && !isPaused}
              >
                <option value="random">Random</option>
                <option value="sorted">Sorted</option>
                <option value="reversed">Reversed</option>
                <option value="nearlySorted">Nearly Sorted</option>
              </select>
            </div>

            {/* Generate New Array */}
            <button
              onClick={onGenerateNew}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isRunning && !isPaused}
            >
              🎲 New Array
            </button>
          </>
        )}
      </div>
    </div>
  );
}
