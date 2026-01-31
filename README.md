# 🎨 AlgoLab - Interactive DSA Visualizer

<div align="center">

![AlgoLab](https://img.shields.io/badge/AlgoLab-DSA%20Visualizer-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Visualize sorting & search algorithms with real-time code animation synchronized with visualization. Includes practice mode to write & test your own algorithms.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Algorithms](#-algorithms) • [Tech Stack](#-tech-stack)

</div>

---

## ✨ Features

- 🎯 **10+ Algorithms**: Visualize 8 sorting algorithms and 2 search algorithms
- 💻 **Code Animation**: Real-time code highlighting synchronized with algorithm execution
- 🌍 **Multi-language Support**: View algorithm code in JavaScript, Python, Java, and C++
- 🎮 **Practice Mode**: Write and test your own algorithms with live visualization
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations using Framer Motion
- ⚡ **Interactive Controls**: Play, pause, reset, and adjust animation speed
- 📊 **Array Customization**: Generate random, sorted, reversed, or nearly sorted arrays
- 🔍 **Search Visualization**: Visualize Linear Search and Binary Search with target highlighting

## 🎬 Demo

<div align="center">

![AlgoLab Demo](./src/screenshots/1.png)

*Visualize algorithms step-by-step with synchronized code animation*

![Practice Mode](./src/screenshots/2.png)

*Write and test your own algorithms in Practice Mode*

</div>

## 🚀 Installation

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/TechnoBlogger14o3/AlgoLab.git
   cd AlgoLab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 Usage

### Visualizing Algorithms

1. **Select an Algorithm**: Choose from the algorithm selector (Bubble Sort, Quick Sort, Merge Sort, etc.)
2. **Customize Array**: 
   - Adjust array size (max 40)
   - Choose array type (Random, Sorted, Reversed, Nearly Sorted)
   - Click "Generate New Array" to create a new array
3. **Start Visualization**: Click the "Play" button to start the animation
4. **Control Animation**:
   - **Play/Pause**: Control the animation
   - **Reset**: Start over
   - **Speed Slider**: Adjust animation speed (0ms to 2000ms)
5. **View Code**: Watch the code highlight as the algorithm executes

### Practice Mode

1. **Switch to Practice**: Click the "Practice" tab
2. **Select Algorithm Type**: Choose between "Sort" or "Search"
3. **Write Your Code**: Write your algorithm in the editor
4. **Test**: Click "Play" to visualize your algorithm
5. **Language**: Switch between JavaScript, Python, Java, or C++ to see code examples

## 🔢 Algorithms

### Sorting Algorithms

| Algorithm | Time Complexity (Best) | Time Complexity (Worst) | Space Complexity |
|-----------|------------------------|--------------------------|------------------|
| **Bubble Sort** | O(n) | O(n²) | O(1) |
| **Quick Sort** | O(n log n) | O(n²) | O(log n) |
| **Merge Sort** | O(n log n) | O(n log n) | O(n) |
| **Insertion Sort** | O(n) | O(n²) | O(1) |
| **Selection Sort** | O(n²) | O(n²) | O(1) |
| **Heap Sort** | O(n log n) | O(n log n) | O(1) |
| **Shell Sort** | O(n log n) | O(n²) | O(1) |
| **Counting Sort** | O(n + k) | O(n + k) | O(k) |

### Search Algorithms

| Algorithm | Time Complexity (Best) | Time Complexity (Worst) | Space Complexity |
|-----------|------------------------|--------------------------|------------------|
| **Linear Search** | O(1) | O(n) | O(1) |
| **Binary Search** | O(1) | O(log n) | O(1) |

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion 12.29
- **Code Highlighting**: Custom implementation with line-by-line animation

## 📁 Project Structure

```
AlgoLab/
├── src/
│   ├── algorithms/          # Algorithm implementations (generators)
│   │   ├── bubbleSort.ts
│   │   ├── quickSort.ts
│   │   ├── mergeSort.ts
│   │   ├── insertionSort.ts
│   │   ├── selectionSort.ts
│   │   ├── heapSort.ts
│   │   ├── shellSort.ts
│   │   ├── countingSort.ts
│   │   ├── linearSearch.ts
│   │   └── binarySearch.ts
│   ├── components/          # React components
│   │   ├── ArrayVisualizer.tsx
│   │   ├── CodeDisplay.tsx
│   │   ├── Controls.tsx
│   │   ├── AlgorithmSelector.tsx
│   │   └── PracticeEditor.tsx
│   ├── utils/               # Utility functions
│   │   ├── arrayUtils.ts
│   │   ├── codeExecutor.ts
│   │   └── graphUtils.ts
│   ├── data/                # Algorithm code snippets
│   │   └── algorithmCode.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
└── package.json
```

## 🎯 Key Features Explained

### Real-time Code Animation
The code display highlights the current line being executed, making it easy to follow the algorithm's logic step-by-step.

### Practice Mode
Write your own sorting or search algorithms and see them visualized in real-time. The practice mode includes:
- Code editor with syntax highlighting
- Live error detection
- Array state visualization
- Step-by-step execution

### Multi-language Support
View algorithm implementations in:
- **JavaScript**: Modern ES6+ syntax
- **Python**: Clean, readable Python code
- **Java**: Object-oriented Java implementation
- **C++**: Efficient C++ code

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**TechnoBlogger14o3**

- GitHub: [@TechnoBlogger14o3](https://github.com/TechnoBlogger14o3)

## 🙏 Acknowledgments

- Inspired by various algorithm visualization tools
- Built with love for the DSA community
- Special thanks to all contributors and users

---

<div align="center">

**Made with ❤️ using React, TypeScript, and Framer Motion**

⭐ Star this repo if you find it helpful!

</div>
