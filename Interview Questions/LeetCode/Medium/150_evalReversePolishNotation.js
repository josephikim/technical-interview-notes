// Definition

// In reverse Polish notation, the operators follow their operands. For example, to add 3 and 4 together, the expression is 3 4 + rather than 3 + 4. The expression 3 − 4 + 5 in conventional notation is 3 4 − 5 + in reverse Polish notation: 4 is first subtracted from 3, then 5 is added to it.

// The concept of a stack, a last-in/first-out construct, is integral to the left-to-right evaluation of RPN. In the example 3 4 −, first the 3 is put onto the stack, then the 4; the 4 is now on top and the 3 below it. The subtraction operator removes the top two items from the stack, performs 3 − 4, and puts the result of −1 onto the stack.

// The common terminology is that added items are pushed on the stack and removed items are popped.

// The advantage of reverse Polish notation is that it removes the need for order of operations and parentheses that are required by infix notation and can be evaluated linearly, left-to-right. For example, the infix expression (3 × 4) + (5 × 6) becomes 3 4 × 5 6 × + in reverse Polish notation.

// Problem

// You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

// Evaluate the expression. Return an integer that represents the value of the expression.

// Note that:

// The valid operators are '+', '-', '*', and '/'.
// Each operand may be an integer or another expression.
// The division between two integers always truncates toward zero.
// There will not be any division by zero.
// The input represents a valid arithmetic expression in a reverse polish notation.
// The answer and all the intermediate calculations can be represented in a 32-bit integer.

// Example 1:

// Input: tokens = ["2","1","+","3","*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9

// Example 2:

// Input: tokens = ["4","13","5","/","+"]
// Output: 6
// Explanation: (4 + (13 / 5)) = 6

// Example 3:

// Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
// Output: 22
// Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// = ((10 * (6 / (12 * -11))) + 17) + 5
// = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 17 + 5
// = 22

// Constraints:

// 1 <= tokens.length <= 104
// tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].

/**********************************

O(n) - Map operations symbols to inline arithmetic functions

1. Map operations symbols to inline arithmetic functions
2. init empty stack
3. Loop through tokens array. ParseInt each token
4. If parsed token is a number, push to stack
5. Otherwise, pop last two elements in stack, apply mapped function, push result to stack
6. return remaining number in stack

O(n) => Map operations symbols to dedicated arithmetic functions

1. create functions for arithmetic ops and a map of operation symbols with corresponding arithmetic function
2. init empty stack
3. loop through token array, for each token:
4. if token not found in map (ie not an operation symbol), push to stack
5. otherwise, pop last two elements in stack, parse using parseInt, apply mapped function using two elements, push result value to stack
6. return remaining number in stack

***********************************/

// Iterative solution

// Time complexity = O(n) => n number of tokens
// Space complexity = O(n) => n number of tokens

// Same logic as below but without extracting arthmetic functions, and stacking parsed ints instead of strings

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
	const stack = [];
	const applyOperator = {
		"/": (x, y) => {
			const res = x / y;
			return parseInt(res.toString().split(".")[0], 10); // could also use Math.trunc()
		},
		"*": (x, y) => x * y,
		"+": (x, y) => x + y,
		"-": (x, y) => x - y,
	};

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		const parsedToken = parseInt(token, 10);

		if (!isNaN(parsedToken)) {
			stack.push(parsedToken);
		} else {
			const y = stack.pop();
			const x = stack.pop();
			const res = applyOperator[token](x, y);
			stack.push(res);
		}
	}

	return stack[0];
};

/***********************************/

// Iterative solution

// Time complexity = O(n) => n number of tokens
// Space complexity = O(n) => n number of tokens

// 1. create functions for arithmetic ops and a map to match operation symbols to their function
// 2. init empty
// 3. loop through token, for each token:
// 4. if no such key exists in map, push to stack,
// 5. otherwise, parseInt last two popped elements from stack and push back to stack the result of the mapped function using popped elements as arguments
// 6. return remaining number in stack

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
	var add = function (a, b) {
		return a + b;
	};
	var subtract = function (a, b) {
		return a - b;
	};
	var multiply = function (a, b) {
		return a * b;
	};
	var divide = function (a, b) {
		return Math.trunc(a / b);
	};
	let ops = {
		"+": add,
		"-": subtract,
		"*": multiply,
		"/": divide,
	};

	let stack = [];

	for (const token of tokens) {
		// process number
		if (!ops[token]) {
			stack.push(token);
		} else {
			// process operation
			let b = parseInt(stack.pop());
			let a = parseInt(stack.pop());
			stack.push(ops[token](a, b));
		}
	}

	return stack[0];
};
