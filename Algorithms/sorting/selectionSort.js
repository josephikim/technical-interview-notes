/*
Selection sort

Algo: Finds the minimum value in the data structure, places it in the first position, finds the second minimum value, places it in the second position, and so on

Advantages: Never makes more than O(n) swaps and can be useful when memory write is a costly operation.

Stable: N for default implementation, Y for stable implementation
In-place: Y
Comparison-type: Y

Time Complexity

Best: O(n^2)
Worst: O(n^2)
Average: O(n^2)

Space Complexity = O(1)

*/

function selectionSortDefault(arr, compare = defaultCompare) {
  let minIndex;
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for (let j = i; j < arr.length; j++) {
      if (compare(arr[minIndex], arr[j]) === Compare.GREATER_THAN) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }
  return arr;
}

function selectionSortStable(arr, compare = defaultCompare) {
  let minIndex;
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for (let j = i; j < arr.length; j++) {
      if (compare(arr[minIndex], arr[j]) === Compare.GREATER_THAN) {
        minIndex = j;
      }
    }
    // Move minimum element at current index i.
    let min = arr[minIndex];
    while (minIndex > i) {
      arr[minIndex] = arr[minIndex - 1];
      minIndex--;
    }
    arr[i] = min;
    console.log(arr);
  }
  return arr;
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

const Compare = {
  LESS_THAN: -1,
  GREATER_THAN: 1,
};

function defaultCompare(a, b) {
  if (a === b) return 0;

  return a > b ? Compare.GREATER_THAN : Compare.LESS_THAN;
}

// const input = [5, 4, 3, 2, 1];
// const input = [1, 2, 3, 4, 5];
const input = [6, 2, 1, 7, 8, 3, 9];

// let result = selectionSort(input);
let resultStable = selectionSortStable(input);

// console.log(result);
console.log(resultStable);
