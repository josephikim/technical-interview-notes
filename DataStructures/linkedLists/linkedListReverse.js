// IMPLEMENT SINGLY LINKED LIST
// NOTE: This is BARE BONES implementation with no class properties for tail, list length, or prototyped methods.

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
}

// REVERSE WITH ITERATION (NAIVE)

// time complexity = ??
// space complexity = ??

// This method is suboptimal bc memory needs to store the result list i.e. reversing doesn't happen 'in-place'
// Method reverses linked list, then returns result list
const reverseListNaive = (list) => {
  if (list.head === null) return undefined;
  if (list.head.next === null) return list;

  let result = new LinkedList();
  let pointer = list.head;

  while (pointer) {
    unshift(result, pointer.val);
    pointer = pointer.next;
  }

  console.log({ result });

  return result;
};

// REVERSE WITH ITERATION (IN-PLACE)

// time complexity = O(n)
// space complexity = O(1)

// Method reverses linked list, then returns result list

// Algo:
//  Loop through nodees and reassign the 'next' values of each node to the previous node while keeping track of the disconnected nodes via pointer;

const reverseListIter = (list) => {
  if (list.head === null) return undefined;
  if (list.head.next === null) return list;

  let currNode = list.head;
  let prevNode = null;
  let nextNode = null;

  while (currNode) {
    nextNode = currNode.next;
    currNode.next = prevNode;
    prevNode = currNode;
    currNode = nextNode;
  }

  list.head = prevNode;

  return list;
};

// REVERSE WITH RECURSION

// time complexity = O(n)
// space complexity = O(h) bc recursive functions accumulate on the call stack

// reverses list recursively, then returns first node of result list
const reverseListRecursive = (list) => {
  // if (!head || !head.next) return head;
  // let temp = reverseListRecursive(head.next);
  // head.next.next = head;
  // head.next = undefined;
  // return temp;
};

// returns number of nodes
function size(list) {
  let count = 0;
  let node = list.head;
  while (node) {
    count++;
    node = node.next;
  }
  return count;
}

// empties the list
function clear(list) {
  list.head = null;
}

// returns last node
function getLast(list) {
  let lastNode = list.head;
  if (lastNode) {
    while (lastNode.next) {
      lastNode = lastNode.next;
    }
  }
  return lastNode;
}

// returns first node
function getFirst(list) {
  return list.head;
}

// inserts node at beginning of list, return updated list
function unshift(list, val) {
  let node = new Node(val);

  if (list.head === null) {
    // No nodes exist
    list.head = node;
  } else {
    // At least one node exists
    let currentHead = list.head;

    node.next = currentHead;

    list.head = node;
  }

  return list;
}

// Function to print linked List
function iterate(list) {
  // First we will check whether linked list is empty
  if (list.head === null) return null;

  // If list is not empty, iterate from each Node and print its val stored in “data” property
  let node = list.head;

  // we will iterate until our list variable
  // contains the “Next” val of the last Node
  // i.e-> null
  while (node) {
    console.log(node.val);
    if (node.next) {
      console.log(" -> ");
    }
    node = node.next;
  }
  console.log("-finished iterating list-");
}

let node1 = new Node(2);
let node2 = new Node(5);
node1.next = node2;

let list = new LinkedList(node1);

size(list);
iterate(list);

unshift(list, 3);
unshift(list, 15);
unshift(list, 3);
iterate(list);

const reversed = reverseListIter(list);
iterate(reversed);
