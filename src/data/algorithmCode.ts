// Algorithm code in different languages
export const algorithmCode: Record<string, Record<string, string>> = {
  bubble: {
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
    java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`
  },
  quick: {
    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
    cpp: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`
  },
  merge: {
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]`,
    java: `public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));
    return merge(left, right);
}

private static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result[k++] = left[i++];
        } else {
            result[k++] = right[j++];
        }
    }
    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];
    return result;
}`,
    cpp: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}`
  },
  insertion: {
    javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
  },
  selection: {
    javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr`,
    java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}`,
    cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            swap(arr[i], arr[minIndex]);
        }
    }
}`
  },
  heap: {
    javascript: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    java: `public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}

private static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}`,
    cpp: `void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}`
  },
  shell: {
    javascript: `function shellSort(arr) {
  const n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
  return arr;
}`,
    python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,
    java: `public static void shellSort(int[] arr) {
    int n = arr.length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`,
    cpp: `void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`
  },
  counting: {
    javascript: `function countingSort(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);
  
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }
  
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
  return arr;
}`,
    python: `def counting_sort(arr):
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    count = [0] * range_val
    output = [0] * len(arr)
    
    for i in range(len(arr)):
        count[arr[i] - min_val] += 1
    
    for i in range(1, range_val):
        count[i] += count[i - 1]
    
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    for i in range(len(arr)):
        arr[i] = output[i]
    return arr`,
    java: `public static void countingSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    int min = Arrays.stream(arr).min().getAsInt();
    int range = max - min + 1;
    int[] count = new int[range];
    int[] output = new int[arr.length];
    
    for (int i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
    
    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    for (int i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    for (int i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}`,
    cpp: `void countingSort(int arr[], int n) {
    int max = *max_element(arr, arr + n);
    int min = *min_element(arr, arr + n);
    int range = max - min + 1;
    int count[range] = {0};
    int output[n];
    
    for (int i = 0; i < n; i++) {
        count[arr[i] - min]++;
    }
    
    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}`
  },
  linear: {
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    java: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    cpp: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`
  },
  binary: {
    javascript: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,
    python: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    java: `public static int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
    cpp: `int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`
  },
  bfs: {
    javascript: `function bfs(graph, startNode) {
  const queue = [startNode];
  const visited = [];
  const parent = {};
  const level = { [startNode]: 0 };
  
  while (queue.length > 0) {
    const current = queue.shift();
    
    if (!visited.includes(current)) {
      visited.push(current);
      
      const neighbors = graph[current] || [];
      for (const neighbor of neighbors) {
        if (!visited.includes(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor);
          parent[neighbor] = current;
          level[neighbor] = level[current] + 1;
        }
      }
    }
  }
  
  return visited;
}`,
    python: `def bfs(graph, start_node):
    queue = [start_node]
    visited = []
    parent = {}
    level = {start_node: 0}
    
    while queue:
        current = queue.pop(0)
        
        if current not in visited:
            visited.append(current)
            
            neighbors = graph.get(current, [])
            for neighbor in neighbors:
                if neighbor not in visited and neighbor not in queue:
                    queue.append(neighbor)
                    parent[neighbor] = current
                    level[neighbor] = level[current] + 1
    
    return visited`,
    java: `public static List<Integer> bfs(Map<Integer, List<Integer>> graph, int startNode) {
    Queue<Integer> queue = new LinkedList<>();
    List<Integer> visited = new ArrayList<>();
    Map<Integer, Integer> parent = new HashMap<>();
    Map<Integer, Integer> level = new HashMap<>();
    
    queue.offer(startNode);
    level.put(startNode, 0);
    
    while (!queue.isEmpty()) {
        int current = queue.poll();
        
        if (!visited.contains(current)) {
            visited.add(current);
            
            List<Integer> neighbors = graph.getOrDefault(current, new ArrayList<>());
            for (int neighbor : neighbors) {
                if (!visited.contains(neighbor) && !queue.contains(neighbor)) {
                    queue.offer(neighbor);
                    parent.put(neighbor, current);
                    level.put(neighbor, level.get(current) + 1);
                }
            }
        }
    }
    
    return visited;
}`,
    cpp: `vector<int> bfs(map<int, vector<int>> graph, int startNode) {
    queue<int> q;
    vector<int> visited;
    map<int, int> parent;
    map<int, int> level;
    
    q.push(startNode);
    level[startNode] = 0;
    
    while (!q.empty()) {
        int current = q.front();
        q.pop();
        
        if (find(visited.begin(), visited.end(), current) == visited.end()) {
            visited.push_back(current);
            
            vector<int> neighbors = graph[current];
            for (int neighbor : neighbors) {
                if (find(visited.begin(), visited.end(), neighbor) == visited.end() &&
                    find(queue.begin(), queue.end(), neighbor) == queue.end()) {
                    q.push(neighbor);
                    parent[neighbor] = current;
                    level[neighbor] = level[current] + 1;
                }
            }
        }
    }
    
    return visited;
}`
  },
  dfs: {
    javascript: `function dfs(graph, startNode) {
  const stack = [startNode];
  const visited = [];
  const parent = {};
  
  while (stack.length > 0) {
    const current = stack.pop();
    
    if (!visited.includes(current)) {
      visited.push(current);
      
      const neighbors = graph[current] || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neighbor = neighbors[i];
        if (!visited.includes(neighbor) && !stack.includes(neighbor)) {
          stack.push(neighbor);
          parent[neighbor] = current;
        }
      }
    }
  }
  
  return visited;
}`,
    python: `def dfs(graph, start_node):
    stack = [start_node]
    visited = []
    parent = {}
    
    while stack:
        current = stack.pop()
        
        if current not in visited:
            visited.append(current)
            
            neighbors = graph.get(current, [])
            for neighbor in reversed(neighbors):
                if neighbor not in visited and neighbor not in stack:
                    stack.append(neighbor)
                    parent[neighbor] = current
    
    return visited`,
    java: `public static List<Integer> dfs(Map<Integer, List<Integer>> graph, int startNode) {
    Stack<Integer> stack = new Stack<>();
    List<Integer> visited = new ArrayList<>();
    Map<Integer, Integer> parent = new HashMap<>();
    
    stack.push(startNode);
    
    while (!stack.isEmpty()) {
        int current = stack.pop();
        
        if (!visited.contains(current)) {
            visited.add(current);
            
            List<Integer> neighbors = graph.getOrDefault(current, new ArrayList<>());
            Collections.reverse(neighbors);
            for (int neighbor : neighbors) {
                if (!visited.contains(neighbor) && !stack.contains(neighbor)) {
                    stack.push(neighbor);
                    parent.put(neighbor, current);
                }
            }
        }
    }
    
    return visited;
}`,
    cpp: `vector<int> dfs(map<int, vector<int>> graph, int startNode) {
    stack<int> s;
    vector<int> visited;
    map<int, int> parent;
    
    s.push(startNode);
    
    while (!s.empty()) {
        int current = s.top();
        s.pop();
        
        if (find(visited.begin(), visited.end(), current) == visited.end()) {
            visited.push_back(current);
            
            vector<int> neighbors = graph[current];
            reverse(neighbors.begin(), neighbors.end());
            for (int neighbor : neighbors) {
                if (find(visited.begin(), visited.end(), neighbor) == visited.end()) {
                    s.push(neighbor);
                    parent[neighbor] = current;
                }
            }
        }
    }
    
    return visited;
}`
  },
  'linkedlist-search': {
    javascript: `function linkedListSearch(head, target) {
  let current = head;
  let index = 0;
  
  while (current !== null) {
    if (current.value === target) {
      return index;
    }
    current = current.next;
    index++;
  }
  
  return -1;
}`,
    python: `def linked_list_search(head, target):
    current = head
    index = 0
    
    while current is not None:
        if current.value == target:
            return index
        current = current.next
        index += 1
    
    return -1`,
    java: `public static int linkedListSearch(ListNode head, int target) {
    ListNode current = head;
    int index = 0;
    
    while (current != null) {
        if (current.value == target) {
            return index;
        }
        current = current.next;
        index++;
    }
    
    return -1;
}`,
    cpp: `int linkedListSearch(ListNode* head, int target) {
    ListNode* current = head;
    int index = 0;
    
    while (current != nullptr) {
        if (current->value == target) {
            return index;
        }
        current = current->next;
        index++;
    }
    
    return -1;
}`
  },
  'linkedlist-insert': {
    javascript: `function linkedListInsertAtHead(head, value) {
  const newNode = { value, next: head };
  return newNode;
}`,
    python: `def linked_list_insert_at_head(head, value):
    new_node = ListNode(value)
    new_node.next = head
    return new_node`,
    java: `public static ListNode linkedListInsertAtHead(ListNode head, int value) {
    ListNode newNode = new ListNode(value);
    newNode.next = head;
    return newNode;
}`,
    cpp: `ListNode* linkedListInsertAtHead(ListNode* head, int value) {
    ListNode* newNode = new ListNode(value);
    newNode->next = head;
    return newNode;
}`
  },
  'linkedlist-delete': {
    javascript: `function linkedListDelete(head, value) {
  if (head === null) return null;
  
  if (head.value === value) {
    return head.next;
  }
  
  let current = head;
  while (current.next !== null) {
    if (current.next.value === value) {
      current.next = current.next.next;
      return head;
    }
    current = current.next;
  }
  
  return head;
}`,
    python: `def linked_list_delete(head, value):
    if head is None:
        return None
    
    if head.value == value:
        return head.next
    
    current = head
    while current.next is not None:
        if current.next.value == value:
            current.next = current.next.next
            return head
        current = current.next
    
    return head`,
    java: `public static ListNode linkedListDelete(ListNode head, int value) {
    if (head == null) return null;
    
    if (head.value == value) {
        return head.next;
    }
    
    ListNode current = head;
    while (current.next != null) {
        if (current.next.value == value) {
            current.next = current.next.next;
            return head;
        }
        current = current.next;
    }
    
    return head;
}`,
    cpp: `ListNode* linkedListDelete(ListNode* head, int value) {
    if (head == nullptr) return nullptr;
    
    if (head->value == value) {
        ListNode* temp = head->next;
        delete head;
        return temp;
    }
    
    ListNode* current = head;
    while (current->next != nullptr) {
        if (current->next->value == value) {
            ListNode* temp = current->next;
            current->next = current->next->next;
            delete temp;
            return head;
        }
        current = current->next;
    }
    
    return head;
}`
  },
  'linkedlist-reverse': {
    javascript: `function linkedListReverse(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}`,
    python: `def linked_list_reverse(head):
    prev = None
    current = head
    
    while current is not None:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev`,
    java: `public static ListNode linkedListReverse(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    
    while (current != null) {
        ListNode next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}`,
    cpp: `ListNode* linkedListReverse(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* current = head;
    
    while (current != nullptr) {
        ListNode* next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}`
  },
  'tree-search': {
    javascript: `function binaryTreeSearch(root, target) {
  if (root === null) return false;
  
  if (root.value === target) return true;
  
  if (target < root.value) {
    return binaryTreeSearch(root.left, target);
  } else {
    return binaryTreeSearch(root.right, target);
  }
}`,
    python: `def binary_tree_search(root, target):
    if root is None:
        return False
    
    if root.value == target:
        return True
    
    if target < root.value:
        return binary_tree_search(root.left, target)
    else:
        return binary_tree_search(root.right, target)`,
    java: `public static boolean binaryTreeSearch(TreeNode root, int target) {
    if (root == null) return false;
    
    if (root.value == target) return true;
    
    if (target < root.value) {
        return binaryTreeSearch(root.left, target);
    } else {
        return binaryTreeSearch(root.right, target);
    }
}`,
    cpp: `bool binaryTreeSearch(TreeNode* root, int target) {
    if (root == nullptr) return false;
    
    if (root->value == target) return true;
    
    if (target < root->value) {
        return binaryTreeSearch(root->left, target);
    } else {
        return binaryTreeSearch(root->right, target);
    }
}`
  },
  'tree-inorder': {
    javascript: `function inorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node === null) return;
    traverse(node.left);
    result.push(node.value);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}`,
    python: `def inorder_traversal(root):
    result = []
    
    def traverse(node):
        if node is None:
            return
        traverse(node.left)
        result.append(node.value)
        traverse(node.right)
    
    traverse(root)
    return result`,
    java: `public static List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    traverse(root, result);
    return result;
}

private static void traverse(TreeNode node, List<Integer> result) {
    if (node == null) return;
    traverse(node.left, result);
    result.add(node.value);
    traverse(node.right, result);
}`,
    cpp: `vector<int> inorderTraversal(TreeNode* root) {
    vector<int> result;
    traverse(root, result);
    return result;
}

void traverse(TreeNode* node, vector<int>& result) {
    if (node == nullptr) return;
    traverse(node->left, result);
    result.push_back(node->value);
    traverse(node->right, result);
}`
  },
  'tree-preorder': {
    javascript: `function preorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node === null) return;
    result.push(node.value);
    traverse(node.left);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}`,
    python: `def preorder_traversal(root):
    result = []
    
    def traverse(node):
        if node is None:
            return
        result.append(node.value)
        traverse(node.left)
        traverse(node.right)
    
    traverse(root)
    return result`,
    java: `public static List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    traverse(root, result);
    return result;
}

private static void traverse(TreeNode node, List<Integer> result) {
    if (node == null) return;
    result.add(node.value);
    traverse(node.left, result);
    traverse(node.right, result);
}`,
    cpp: `vector<int> preorderTraversal(TreeNode* root) {
    vector<int> result;
    traverse(root, result);
    return result;
}

void traverse(TreeNode* node, vector<int>& result) {
    if (node == nullptr) return;
    result.push_back(node->value);
    traverse(node->left, result);
    traverse(node->right, result);
}`
  },
  'tree-postorder': {
    javascript: `function postorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node === null) return;
    traverse(node.left);
    traverse(node.right);
    result.push(node.value);
  }
  
  traverse(root);
  return result;
}`,
    python: `def postorder_traversal(root):
    result = []
    
    def traverse(node):
        if node is None:
            return
        traverse(node.left)
        traverse(node.right)
        result.append(node.value)
    
    traverse(root)
    return result`,
    java: `public static List<Integer> postorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    traverse(root, result);
    return result;
}

private static void traverse(TreeNode node, List<Integer> result) {
    if (node == null) return;
    traverse(node.left, result);
    traverse(node.right, result);
    result.add(node.value);
}`,
    cpp: `vector<int> postorderTraversal(TreeNode* root) {
    vector<int> result;
    traverse(root, result);
    return result;
}

void traverse(TreeNode* node, vector<int>& result) {
    if (node == nullptr) return;
    traverse(node->left, result);
    traverse(node->right, result);
    result.push_back(node->value);
}`
  }
};

export function getCode(algorithmId: string, language: string): string {
  return algorithmCode[algorithmId]?.[language] || algorithmCode[algorithmId]?.javascript || '';
}
