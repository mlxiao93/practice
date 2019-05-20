var arr = Array(10).fill().map(() => Math.ceil(Math.random() * 10))
// arr = [6, 3, 8, 1, 5, 2, 9, 7, 3, 4];
console.log(arr)
console.log('~~~~~~~~~~~');

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
  console.log(arr);
}

// 简单选择排序：  稳定排序  O(n^2)
function selectSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) swap(arr, i, min)
  }
}

// 直接插入排序：  不稳定排序  O(n^2)
function insertSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] < arr[j]) swap(arr, i, j);
    }
  }
}

// 冒泡排序：  稳定排序  O(n^2)
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j + 1] < arr[j]) swap(arr, j + 1, j)
    }
  }
}

var now = Date.now();

// 快速排序：  不稳定排序  O(n*lgn)
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return;
  let mid = low;
  const midVal = arr[mid];

  let left = low + 1, right = high, newMid;
  while (true) {
    if (Date.now() - now > 200) throw '死循坏';
    while (arr[left] <= midVal) {
      if (left === right) {
        if (left === high) newMid = high;    // 所有元素都比第一个元素大
        break;
      }
      left++;
    }
    while (arr[right] >= midVal) {
      if (right === left) break;
      right--;
    }
    if (left < right) {
      swap(arr, left, right)
    } else {
      break;
    }
  }

  if (newMid === undefined) newMid = left - 1;

  mid !== newMid && swap(arr, newMid, mid);
  mid = newMid;

  quickSort(arr, low, mid - 1);
  quickSort(arr, mid + 1, high);
}

function mergeSort(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return;
  let mid = Math.floor((low + high) / 2);
  mergeSort(arr, low, mid);
  mergeSort(arr, mid + 1, high);

  const aux = [...arr];
  let l = low, r = mid + 1;
  for (let i = low; i <= high; i++) {
    if (l > mid) {
      arr[i] = aux[r++];
    } else if (r > high) {
      arr[i] = aux[l++];
    } else if (aux[r] < aux[l]) {
      arr[i] = aux[r++];
    } else {
      arr[i] = aux[l++];
    }
  }
}

function heapSort(arr) {
  function maxHeap(arr, top = 0, last = arr.length - 1) {
    if  (top >= last) return;
    let l = 2 * top + 1, r = 2 * top + 2;
    maxHeap(arr, l, last);
    maxHeap(arr, r, last);
    let max = top;
    if (l <= last && arr[l] > arr[max]) max = l;
    if (r <= last && arr[r] > arr[max]) max = r;
    max !== top && swap(arr, max, top)
  }
  for (let last = arr.length - 1; last >= 0; last--) {
    maxHeap(arr, 0, last);
    swap(arr, 0, last);
  }
}

heapSort(arr);