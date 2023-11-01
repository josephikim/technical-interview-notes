/*
Insertion sort (default sort used in Array.sort())

NOTE: Performs better than selection sort or bubble sort for small arrays or for mostly sorted arrays, but otherwise not great. Mainly used for teaching purposes.

Algo:
1. The iteration starts at the second element. We consider the first element sorted by default. For each iteration, we keep track of the current element.

2. Each current element will be the first element of the unsorted array - and each element before it will belong to the sorted array.

3. Through a while loop, we go through the sorted array and shift elements to the right, opening up a space for the current element to be inserted.

4. Once we find the proper place for it, the current element is inserted into the newly-opened slot. This process is repeated for each iteration until the array is sorted.

Stable: Y
In-place: Y
Incremental-type: Y

Time Complexity

Best: O(n)
Worst: O(n^2)
Average: O((n / 2) * n) = O(n^2 / 2) = O(n^2)

Space Complexity

O(1)
*/

function insertionSort(inputArr) {
  let i, current, j;
  let n = inputArr.length;
  for (i = 1; i < n; i++) {
    // Choosing the first element in our unsorted subarray
    current = inputArr[i];
    // The last element of our sorted subarray
    j = i - 1;
    while (j > -1 && current < inputArr[j]) {
      inputArr[j + 1] = inputArr[j];
      j--;
    }
    inputArr[j + 1] = current;
  }
  return inputArr;
}

let inputArr = [5, 2, 4, 6, 1, 3];
insertionSort(inputArr);
console.log(inputArr);

// BINARY INSERTION SORT
// Can reduce sorting at i'th iteration from O(i) to O(logi). But algo as a whole still has worst case complixity of O(n^2)

function binaryInsertionSort(arr) {
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    let x = array[i];

    // Find location to insert
    // using binary search
    let loc = Math.abs(binarySearch(array, x, 0, j));

    // Shifting array to one
    // location right

    while (j >= loc) {
      array[j + 1] = array[j];
      j--;
    }

    // Placing element at its
    // correct location
    array[j + 1] = x;
  }
}

function binarySearch(a, item, low, high) {
  if (high <= low) return item > a[low] ? low + 1 : low;

  mid = Math.floor((low + high) / 2);

  if (item == a[mid]) return mid + 1;

  if (item > a[mid]) return binarySearch(a, item, mid + 1, high);

  return binarySearch(a, item, low, mid - 1);
}

// INSERTION SORT FOR LINKED LIST
// Disadvantages: Compared to other sorting algorithms, insertion sort is slower for large-sized input data.

/* Algo: 

Basically we remove nodes one-by-one from the left of the linkedList, and place them in a new 'sorted' linked list in proper order

Divide the unsorted list into three groups: 

1. A fixed sorted subset (a linked list starting with “sorted”)
2. The current unsorted item (the node pointed by “current”)
3. A subset containing remaining unsorted items (the linked list starting from the next node of “current”)



Complexity: same as default

Space complexity: same as default
*/

//Node class
class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

//Main function
let insertionSortLL = (head) => {
  let result = null;
  let current = head;
  let next;

  //Iterate the loop
  while (current !== null) {
    next = current.next;

    //Sort the linked list till the current element and store it
    result = sortedInsertLL(result, current);
    current = next;
  }

  //Return the sorted list
  return result;
};

//Function to sort the list
let sortedInsertLL = (sorted, newNode) => {
  //Temporary node to swap the elements
  let temp = new ListNode();
  let current = temp;
  temp.next = sorted;

  //Sort the list based on the specified order
  while (current.next !== null && current.next.element < newNode.element) {
    current = current.next;
  }

  //Swap the elements
  newNode.next = current.next;
  current.next = newNode;

  //Return the sorted list.
  return temp.next;
};
