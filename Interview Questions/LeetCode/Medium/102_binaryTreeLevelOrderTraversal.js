// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

// Example 1:

// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[9,20],[15,7]]

// Example 2:

// Input: root = [1]
// Output: [[1]]

// Example 3:

// Input: root = []
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 2000].
// -1000 <= Node.val <= 1000

/***********************************/

// Recursive solution

// Time complexity = O(logn) => binary recursion
// Space complexity = O(n) if you count the result array

// Algorithm
// 1. Use a modified recursive dfs that also has a 'level' parameter
// 2. increment the level parameter in the recurrence relation each recursion is called on a node's child
// 3. Use the level parameter as the index in result array to push node's value into.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
	var getLevelsPreorder = function (node, level) {
		if (node) {
			if (!result[level]) result[level] = [];
			result[level].push(node.val);
			// process left child
			getLevelsPreorder(node.left, level + 1);
			// process right child
			getLevelsPreorder(node.right, level + 1);
		}
	};
	let result = [];
	getLevelsPreorder(root, 0);
	return result;
};
