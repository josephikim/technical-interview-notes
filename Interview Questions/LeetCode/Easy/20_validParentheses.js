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
// s consists of brackets only ie '()[]{}'

/***********************************/
/*

O(n) - Use stack-like (array) to store opening brackets
Use map lookups for true O(n)
Otherwise will be slower ie O(n) + O(n) if using Array.includes()

0. Init array to use as stack
2. Init map for complement character lookups
3. For each character in string:
4. If it's opening bracket, push to array
5. If it's closing bracket, pop out last element in array and check if it matches current character's complement.
6. A valid string should result in empty stack at end of loop

*/
/***********************************/

/*
 * @param {string} s
 * @return {boolean}
 */

// Time commplexity = O(n),  n = s.length
// Space complexity = O(1) for bracket map

// use character map for O(1) lookups instead of array.indexOf() or array.includes()

var isValid = function (s) {
	const stack = [];
	const bracketMap = {
		")": "(",
		"]": "[",
		"}": "{",
	};

	for (const char of s) {
		// if closing bracket
		if (bracketMap.hasOwnProperty(char)) {
			const topItemInStack = stack.length === 0 ? "*" : stack.pop();
			if (topItemInStack !== bracketMap[char]) {
				return false;
			}
		} else {
			// if opening bracket
			stack.push(char);
		}
	}

	return stack.length === 0;
};

/***********************************/

// Stack-based solution

// Use an array as a stack (ie a FILO array (first in last out))
// NOT a FIFO array (first in first out) e.g. a BFS queue

// iterate through characters
// if opening bracket, store required closing bracket in stack
// else, pop out last stack element and check if matches current character
// valid string should result in empty stack

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

/************************/

// Same logic as above

// let isBalanced = (input) => {
//   let brackets = "[]{}()";
//   let stack = [];
//   //   iterate through input
//   for (let bracket of input) {
//     let bracketsIndex = brackets.indexOf(bracket);

//     if (bracketsIndex === -1) {
//       continue;
//     }
//     // if the current element is an opening bracket, record the correct closing bracket
//     if (bracketsIndex % 2 === 0) {
//       stack.push(bracketsIndex + 1);
//     } else {
//       //  if the current element is a closing bracket, check the record to make sure it is the correct closing bracket
//       if (stack.pop() !== bracketsIndex) {
//         return false;
//       }
//     }
//   }
//   // if all the opening and closing brackets are matched and in the correct order, return true, otherwise return false
//   return stack.length === 0;
// };
