// Why Stacks?

// With stacks, what we are really doing is storing a previous state of our work in the memory so that the last state appears first. This action can’t be done using arrays alone, which is where stacks come in handy.

// Imagine a pile of tiles placed in vertical order. If we needed to grab a tile from the middle of the pile, we would need to remove every tile on top of it first. This method is referred to as LIFO (Last In, First Out).

// A stack is a last-in-first-out (LIFO) data structure (as opposed to FIFO for a queue). It has three primitive operations:

// Push: Add an element to the stack
// Pop: Remove an element from the stack
// Peek: Get the topmost element of the stack

/********************************/

// Manual implementation of a JS stack (one array)

var MyStack = function () {
	this.items = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
	return this.items.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
	if (this.items.length > 0) {
		return this.items.pop();
	}
};

/**
 * @return {number}
 */
MyStack.prototype.peek = function () {
	return this.items[this.items.length - 1];
};

/**
 * @return {boolean}
 */
MyStack.prototype.isEmpty = function () {
	return this.items.length == 0;
};

/**
 * @return {number}
 */
MyStack.prototype.size = function () {
	return this.items.length;
};

/**
 * @return {void}
 */
MyStack.prototype.clear = function () {
	this.items = [];
};
