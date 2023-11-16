/* Modify a linked list

// const list = {
//   head: {
//       value: 6
//       next: {
//           value: 10
//           next: {
//               value: 12
//               next: {
//                   value: 3
//                   next: null
//                   }
//               }
//           }
//       }
//   }
// };


LINKED LIST TYPES

// Singly Linked Lists: Each node contains only one pointer to the next node. This is what we have been talking about so far.

// Doubly Linked Lists: Each node contains two pointers, a pointer to the next node and a pointer to the previous node.

// Circular Linked Lists: Circular linked lists are a variation of a linked list in which the last node points to the first node or any other node before it, thereby forming a loop.


PROS

-Fast operations on the ends. Adding elements at either end of a linked list is O(1). Removing the first element is also O(1).

-Flexible size. There's no need to specify how many elements you're going to store ahead of time. You can keep adding elements as long as there's enough space on the machine.


CONS

-Costly lookups. To access or edit an item in a linked list, you have to take O(n) time to walk from the head of the list to the nth item.

-Uses more memory than arrays because of the storage of the pointers.

IDEAL USE CASE

Stack and Queues - These only need fast ops on the ends


MEMORY 

-Unlike an array, consecutive items in a linked list are not necessarily next to each other in memory.
-Unlike an array, linked lists are NOT indexed e.g. from 0 to N-1
-Unlike an array, random access is NOT allowed (must use a getter method i.e. list.get(index) )

COMPLEXITIES

Worst Case

// insertion methods
unshift	O(1)
push	O(1)

// deletion methods
shift O(1)
pop	O(1)

// search-based methods (within the list)
get 	O(n)
insert 	O(n)
delete 	O(n)

*/

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null; // tail already references the last node
		this.length = 0;
	}
}

// Adds new node at the end of the list, increments list length, return updated list
LinkedList.prototype.push = function (val) {
	let newNode = new Node(val);

	if (!this.head) {
		this.head = newNode;
		this.tail = this.head;
	} else {
		this.tail.next = newNode; // refers to the 'old' tail
		this.tail = newNode; // updates tail reference to newNode
	}
	this.length++;
	return this;
};

// Remove node from end of list, decrement list length, return deleted node
LinkedList.prototype.pop = function () {
	if (!this.head) return undefined;

	// Establish a temp pointer to identify the newTail
	let pointer = this.head;
	let newTail = pointer;

	// if list is greater than length 1, traverse list until second to last node is assigned to newTail
	while (pointer.next) {
		newTail = pointer;
		pointer = pointer.next;
	}

	this.tail = newTail; // Update this.tail with newTail
	this.tail.next = null; // Set tail.next = null which 'disconnects' the last node
	this.length--; // decrement list length

	// If original list was length 1, head AND tail need to be nullified
	if (this.length === 0) {
		this.head = null;
		this.tail = null;
	}
	// return deleted node
	return pointer;
};

// Remove node from head of list, decrement list length, return deleted node
LinkedList.prototype.shift = function () {
	if (!this.head) return undefined;

	// Establish temp pointer for currentHead
	let currentHead = this.head;

	// Update head to currentHead's next reference (which is null if list length is 1)
	this.head = currentHead.next;

	// decrement list length
	this.length--;

	// If list length is now 0, it implies this.head === null;
	if (this.length === 0) {
		this.tail = null; // update this.tail
	}
	// return deleted node
	return currentHead;
};

// Insert node at beginning of list, increment list length, return updated list
LinkedList.prototype.unshift = function (val) {
	let newNode = new Node(val);

	// handle case where list length is 0
	if (this.head === null) {
		this.tail = newNode;
	}

	// connect newNode to current head
	newNode.next = this.head;

	// update this.head with newNode
	this.head = newNode;

	this.length++;

	return this;
};

// Return node at given index
LinkedList.prototype.get = function (index) {
	if (index < 0 || index >= this.length) return undefined;

	let currentIndex = 0;
	let pointer = this.head;

	while (currentIndex !== index) {
		pointer = pointer.next;
		currentIndex++;
	}

	return pointer;
};

// Given index and val, update val of that node, return true/false
LinkedList.prototype.update = function (index, val) {
	let foundNode = this.get(index);

	if (foundNode) {
		foundNode.val = val;
		return true;
	}
	return false;
};

// inserts a new node with given index and value, return true/false
LinkedList.prototype.insert = function (index, val) {
	if (index < 0 || index > this.length) return false; // given invalid index (neg index or n + 2)
	if (index === this.length) return !!this.push(val); // given index of n + 1
	if (index === 0) return !!this.unshift(val); // given index of 0

	let newNode = new Node(val);
	let prevNode = this.get(index - 1);
	let temp = prevNode.next;

	// insert new node at given index, connect it to node previously located there
	newNode.next = temp;
	prevNode.next = newNode;

	// increment list length
	this.length++;

	return true;
};

// Remove node at given index, return deleted node
LinkedList.prototype.remove = function (index) {
	if (index < 0 || index >= this.length) return undefined; // given invalid index
	if (index === 0) return this.shift();
	if (index === this.length - 1) return this.pop();

	// find previous node, create pointer for node to be removed
	let prevNode = this.get(index - 1);
	let removed = prevNode.next;

	// connect previous node to the node following removal candidate
	// NOTE: Dont need to further process removed node after this step
	prevNode.next = removed.next;

	// decrement list length
	this.length--;

	return removed;
};

// Function to print linkedList
LinkedList.prototype.iterate = function () {
	// First we will check whether linked list is empty
	if (this.head === null) return null;

	// If list is not empty, iterate from each Node and print its val stored in “data” property
	let node = this.head;

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
};

let node1 = new Node(5);
let node2 = new Node(2);
node1.next = node2;

let list = new LinkedList(node1);

list.push(7);
list.push(4);
list.push(13);
list.push(1);

list.iterate();

console.log("----------------");
// list.insert(-1, 3);
// list.insert(0, 3);
// list.insert(1, 3);
// list.insert(2, 3);
list.insert(3, 3);
list.insert(4, 5);

list.iterate();
