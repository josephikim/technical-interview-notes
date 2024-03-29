// Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

// Implement the MyQueue class:

// void push(int x) Pushes element x to the back of the queue.
// int pop() Removes the element from the front of the queue and returns it.
// int peek() Returns the element at the front of the queue.
// boolean empty() Returns true if the queue is empty, false otherwise.

// Notes:

// You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
// Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

// Example 1:

// Input
// ["MyQueue", "push", "push", "peek", "pop", "empty"]
// [[], [1], [2], [], [], []]
// Output
// [null, null, null, 1, 1, false]

// Explanation
// MyQueue myQueue = new MyQueue();
// myQueue.push(1); // queue is: [1]
// myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
// myQueue.peek(); // return 1
// myQueue.pop(); // return 1, queue is [2]
// myQueue.empty(); // return false

// Constraints:

// 1 <= x <= 9
// At most 100 calls will be made to push, pop, peek, and empty.
// All the calls to pop and peek are valid.

// Follow-up: Can you implement the queue such that each operation is amortized O(1) time complexity? In other words, performing n operations will take overall O(n) time even if one of those operations may take longer.

/***********************************/

// NOTE ABOUT STACKS IN JS

// JS spec does not natively have a stack data structure (so we mimic using simple arrays)
// You can implement stack-like structure using arrays, or use a 3rd party library eg Immutable.js or Queue.js
// These library usually include dequeue function that runs in amortized constant time. As a result, for larger queues, it can be significantly faster than using arrays.

/***********************************/

// Optimal solution with 2 arrays

// Allows for amortized O(1) time complexity
// Amortized means, in most cases (ie S2 is non-empty), it's O(1). But, in very few cases (ie S2 is empty), it's O(N). Hence, it is a amortized solution.

// Use two arrays to implement a FIFO queue
// NOTE: We are actually MIMICKING true stacks by using simple arrays. See stacks/definition.js for example of a custom MyStack class. Also see "NOTE ABOUT STACKS IN JS" above.

var MyQueue = function () {
	this.stack1 = [];
	this.stack2 = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
	this.stack1.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
	this.rearrange();
	return this.stack2.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
	this.rearrange();
	return this.stack2[this.stack2.length - 1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
	return this.stack1.length === 0 && this.stack2.length === 0;
};

// Removes items from stack 1 and inserts them in opposite order into stack 2
MyQueue.prototype.rearrange = function () {
	if (this.stack2.length === 0) {
		while (this.stack1.length > 0) {
			this.stack2.push(this.stack1.pop());
		}
	}
};

/***********************************/

// Single-array solution (DOES NOT AMORTIZE)

// Time complexity = O(N) N = list length
// 	push() = O(1)
// 	shift() = O(N)
//  access an element (arr[x]) = O(1)
//  arr.length = O(1)

// var MyQueue = function () {
// 	this.items = [];
// };

// /**
//  * @param {number} x
//  * @return {void}
//  */
// MyQueue.prototype.push = function (x) {
// 	this.items.push(x);
// };

// /**
//  * @return {number}
//  */
// MyQueue.prototype.pop = function () {
// 	return this.items.shift();
// };

// /**
//  * @return {number}
//  */
// MyQueue.prototype.peek = function () {
// 	return this.items[0];
// };

// /**
//  * @return {boolean}
//  */
// MyQueue.prototype.empty = function () {
// 	return this.items.length < 1;
// };

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

var queue = new MyQueue();
queue.push(1);
console.dir(queue);
queue.push(2);
console.dir(queue);
console.dir(queue.pop());
console.dir(queue);
console.dir(queue.empty());
console.dir(queue.peek());
