// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Example 1:

// Input: s = "()"
// Output: true
// Example 2:

// Input: s = "()[]{}"
// Output: true
// Example 3:

// Input: s = "(]"
// Output: false

// Constraints:

// 1 <= s.length <= 104
// s consists of parentheses only '()[]{}'./**

/***********************************/

/*
 * @param {string} s
 * @return {boolean}
 */

// Time commplexity = O(n) worst case
// Space complexity = O(n) worst case
// ie n = s.length
// stack = O(n), bracketMap = O(1)
//
// use map to access character matches instead of switch cases or array.includes
// use arr as a 'stack' to track opening brackets
var isValid = function (s) {
	const stack = [];
	const bracketMap = {
		")": "(",
		"]": "[",
		"}": "{",
	};

	for (const char of s) {
		if (bracketMap.hasOwnProperty(char)) {
			const topItem = stack.length === 0 ? "*" : stack.pop();
			if (topItem !== bracketMap[char]) {
				return false;
			}
		} else {
			stack.push(char);
		}
	}

	return stack.length === 0;
};

// Naive solution

// use an array to track opening brackets, and pop them out as closing brackets are encountered
// var isValidBasic = function(s) {
//     if (s.length % 2 !== 0 ) return false

//     const stack = []

//     for (const ch of s) {
//         switch(ch) {
//             case '(':
//                 stack.push(')')
//                 break;
//             case '{':
//                 stack.push('}')
//                 break;
//             case '[':
//                 stack.push(']')
//                 break
//         }

//         if ([')', '}', ']'].includes(ch)) {
//             if (stack.pop() !== ch) return false
//         }

//     }
//     return stack.length == 0

//     // to loop through a string, can also use ES6: convert string to arr
//     // [...s].forEach(c => {
//     //     console.log(c)
//     // })
// };

// Another naive solution

// Need to use "stack" data structure
// A Stack is basically a FILO array (first in last out)
// As opposed to FIFO array (first in first out) e.g. the queue array in binary search tree BFS

// let isBalanced = (input) => {
//   let brackets = "[]{}()<>";
//   let stack = [];
//   //   iterate through input
//   for (let bracket of input) {
//     let bracketsIndex = brackets.indexOf(bracket);

//     if (bracketsIndex === -1) {
//       continue;
//     }
//     // 	 if the current element is an opening bracket, record the correct closing bracket
//     if (bracketsIndex % 2 === 0) {
//       stack.push(bracketsIndex + 1);
//     } else {
//       //     if the current element is a closing bracket, check the record to make sure it is the correct closing bracket
//       if (stack.pop() !== bracketsIndex) {
//         return false;
//       }
//     }
//   }
//   //   if all the opening and closing brackets are matched and in the correct order, return true, otherwise return false
//   return stack.length === 0;
// };
