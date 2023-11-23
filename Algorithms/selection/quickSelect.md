# Quick Sort

QuickSelect is a selection algorithm to find the K-th smallest element in an unsorted list or array. The elements to the left of k will be smaller than the kth element, and the elements to the right will be bigger, but the array itself won't be fully sorted.

## Algorithm

1. First select a pivot to partition the list into two parts
2. Swap elements using left and right pointers until every element on the left is less than the pivot and every element on the right is more than the pivot
3. Recur the algorithm only for the part that contains the k-th smallest element. 
4. If the index of the partitioned element (pivot) is more than k, then the algorithm recurs for the left part. 
5. If the index (pivot) is same as k, then we have found the k-th smallest element and it is returned. 
6. If index is less than k, then the algorithm recurs for the right part.

Pseudocode:

```Input : List, left is first position of list, right is last position of list and k is k-th smallest element.
Output : A new list is partitioned.

quickSelect(list, left, right, k)

   if left = right
      return list[left]

   // Select a pivotIndex between left and right

   pivotIndex := partition(list, left, right, 
                                  pivotIndex)
   if k = pivotIndex
      return list[k]
   else if k < pivotIndex
      right := pivotIndex - 1
   else
      left := pivotIndex + 1
```

## Partition

The choice of partition (ie which element to use as the pivot) will affect the implementation and space/time complexity. The two major types of partitioning are Lomuto and Hoare partitions.

### Lomuto Partition

This partition chooses a pivot that is typically the last element in the array. The algorithm maintains a pointer at index i as it scans the array using another index j such that the elements low through i (inclusive) are less than or equal to the pivot, and the elements i+1 through j-1 (inclusive) are greater than the pivot.

This scheme degrades to O(n^2) when the array is already in order.

```
function quickSort(arr, lo, hi) {
    if (lo >= hi || lo < 0) return;
    const p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
}

function partition(arr, lo, hi) {
  const pivot = arr[hi];
  let i = lo;
  for (let j = lo; j < hi; ++j) {
    if (arr[j] <= pivot) {
      swap(arr, i, j);
      i++;
    }
  }

  swap(arr, i, hi);

  return i;
}

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

const arr = [9, 4, 1, 6, 7, 3, 8, 2, 5];
quickSort(arr, 0, arr.length - 1)
```

### Hoare Partition

Hoare uses two indices that start at the ends of the array being partitioned, then move toward each other until they detect an inversion: a pair of elements, one greater than or equal to the pivot, one less than or equal to the pivot, that are in the wrong order relative to each other.

The inverted elements are then swapped. When the indices meet, the algorithm stops and returns the final index. There are many variants of this algorithm.

```
function quickSelect(array, k) {
	var left = 0,
		right = array.length - 1;

	while (true) {
		if (right <= left + 1) {
			if (right === left + 1 && array[right] < array[left])
				swap(array, left, right);
			return array[k];
		} else {
            // establish the middle element as the pivot
			// the unsigned bitshift has the effect of dividing by 2
			// and discarding any remainder
			var middle = (left + right) >>> 1;
			swap(array, middle, left + 1);

			if (array[left] > array[right]) swap(array, left, right);

			if (array[left + 1] > array[right]) swap(array, left + 1, right);

			if (array[left] > array[left + 1]) swap(array, left, left + 1);

			var i = left + 1,
				j = right;
			var pivot = array[i];
			while (true) {
				i++;
				while (array[i] < pivot) i++;

				j--;
				while (array[j] > pivot) j--;

				if (j < i) break;
				swap(array, i, j);
			}
			array[left + 1] = array[j];
			array[j] = pivot;

			if (j >= k) right = j - 1;

			if (j <= k) left = i;
		}
	}
}

function swap(array, i, j) {
	var temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}
```