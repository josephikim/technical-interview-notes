/* Merge Sort a LinkedList

NOTE: Good choice for sorting linked lists in O(n Log n) time and O(1) space, bc random access in a linked list is slow.

A linked list data structure is used mainly when the size of the data is unknown or dynamic. 

We only know the head pointer and the fact that the last element in the linked list will be pointing to NULL. 

You can remove the head or add an element in O(1) time, but accessing a node at location i takes O(i) linear time.

Stable: Y
In-place: N
Comparison-type: Y

Time Complexity

Best: O( N * log2N ) , where N is the size of the linked list
Worst: O( N * log2N ) , where N is the size of the linked list
Average: O( N * log2N ) , where N is the size of the linked list

Space Complexity

O(1) with linked lists

*/

class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
}

LinkedList.prototype.mergeSortLL = function (list) {
  // handle base cases
  if (list.head === null || list.head.next === null) return list;

  let length = list.size(),
    leftIndex = 0,
    leftList = list,
    leftPointer = list.head,
    rightList;

  // find middle
  let middle = Math.floor(length / 2);

  // find length of left sublist
  // NOTE: Need to subtract 1 from 'middle' assuming list.size() returns total nodes incl. 'head' and 'tail'
  // E.G. if 4 total nodes (thus middle is 2), we want to stop iterating at 2nd node, so leftIndex should iterate from index 0 to 1 only.
  while (leftIndex < middle - 1) {
    leftIndex++;
    leftPointer = leftPointer.next;
  }

  // create new list for right sublist
  rightList = new LinkedList(leftPointer.next);

  // split list at middle node by setting middle node's next pointer to null
  leftPointer.next = null;

  // recursively call mergeSortLinkedList on each half of split list, then merge them;
  return this.mergeLL(this.mergeSortLL(leftList), this.mergeSortLL(rightList));
};

// Merge two LinkedLists in sorted order
LinkedList.prototype.mergeLL = function (leftList, rightList) {
  // init pointers
  let leftPointer = leftList.head,
    rightPointer = rightList.head;

  // create new empty list
  let result = new LinkedList();
  let resultPointer = result.head;

  // Loop input lists until end of one list is hit
  while (leftPointer && rightPointer) {
    let tempData = null;

    // figure out min input list value to append to result list, update pointer in corresponding input list
    if (leftPointer.data < rightPointer.data) {
      tempData = leftPointer.data;
      leftPointer = leftPointer.next;
    } else {
      tempData = rightPointer.data;
      rightPointer = rightPointer.next;
    }

    // Append min input list value to result list and update result list pointer
    if (resultPointer == null) {
      result.head = new ListNode(tempData);
      resultPointer = result.head;
    } else {
      resultPointer.next = new ListNode(tempData);
      resultPointer = resultPointer.next;
    }
  }

  // Append remaining elements from input list(s) to result list

  // append remainder of left list
  resultPointer.next = leftPointer;
  while (resultPointer.next) resultPointer = resultPointer.next;

  // append remainder of right list
  resultPointer.next = rightPointer;

  // Result is the new sorted linked list
  return result;
};

// Returns length of linked list ie size()
LinkedList.prototype.size = function () {
  let count = 0;
  let node = this.head;
  while (node) {
    count++;
    node = node.next;
  }
  return count;
};

// Function to insert a new Node into the linkedList
LinkedList.prototype.insert = function (data) {
  // Check if the linked list is empty. If empty, insert first node as head
  if (this.head === null) {
    this.head = new ListNode(data);
  } else {
    // If linked list is not empty, insert the node
    // at the end of the linked list
    let list = this.head;
    while (list.next) {
      list = list.next;
    }

    // Now here list pointer points to last
    // node let’s insert out new node in it
    list.next = new ListNode(data);
  }
};

// Function to print linkedList
LinkedList.prototype.iterate = function () {
  // First we will check whether linked list is empty
  if (this.head === null) return null;

  // If list is not empty, iterate from each Node and print its value stored in “data” property
  let node = this.head;

  // we will iterate until our list variable
  // contains the “Next” value of the last Node
  // i.e-> null
  while (node) {
    console.log(node.data);
    if (node.next) {
      console.log(" -> ");
    }
    node = node.next;
  }
};

let node1 = new ListNode(5);
let node2 = new ListNode(2);
node1.next = node2;

let list = new LinkedList(node1);
// console.log(list.head.next.data); //returns 5
// console.log(list);

list.insert(7);
list.insert(4);
list.insert(13);
list.insert(1);

list.iterate();
const sortedLL = list.mergeSortLL(list);
sortedLL.iterate();
