// A queue is an ordered list of elements where an element is inserted at the end of the queue and is removed from the front of the queue.

// A queue works based on the first-in, first-out (FIFO) principle, which is different from a stack, which works based on the last-in, first-out (LIFO) principle.

// A queue has two main operations:

// Insert a new element at the end of the queue, which is called ENQUEUE.
// Remove an element from the front of the queue, which is called DEQUEUE.

// Image - https://www.javascripttutorial.net/wp-content/uploads/2016/08/JavaScript-Queue-Illustration.png

// Another important operation of a queue is getting the element at the front called PEEK. Different from the DEQUEUE operation, the peek operation returns the element at the front without modifying the queue.

// The name queue comes from the analogy to a queue of customers at a bank. The customer who comes first will be served first, and the one who comes later is queued at the end of the queue and will be served later.

// Examples

// NOTE: Following is an object-based implementation. Javascript object are hash tables with O(1) amortized access
// For alternate implementation of queue using 2 stacks, see 232_implementQueueUsingStacks.js

class Queue {
	constructor() {
		this.elements = {};
		this.head = 0;
		this.tail = 0;
	}
	enqueue(element) {
		this.elements[this.tail] = element;
		this.tail++;
	}
	dequeue() {
		const item = this.elements[this.head];
		delete this.elements[this.head];
		this.head++;
		return item;
	}
	peek() {
		return this.elements[this.head];
	}
	get length() {
		return this.tail - this.head;
	}
	get isEmpty() {
		return this.length === 0;
	}
}
