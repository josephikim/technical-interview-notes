// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Example 1:

// Input: root = [3,9,20,null,null,15,7]
// Output: 3
// Example 2:

// Input: root = [1,null,2]
// Output: 2

// Constraints:

// The number of nodes in the tree is in the range [0, 104].
// -100 <= Node.val <= 100

/***********************************/

// Recursive solution (naive)

// Time complexity = O(2^n)
// Space complexity = O(1)

// Need to check every node bc we know nothing about whether tree is balanced, or total number or nodes
// 1. reach leaf node, return 1 (here 1 represents idea that a non-null node inherently has a height of 1)
// 2. when prior recursion is reached, return the height of tallest subtree plus 1
// 3. repeat until root is reached

// NOTE: This is different from classical definitions of tree height, where empty root is -1, and a tree with only a root node has height of 0

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
 * @return {number}
 */
var maxDepth = function (root) {
	var getHeight = function (node) {
		if (node == null) return 0;
		let lh = getHeight(node.left);
		let rh = getHeight(node.right);
		return lh > rh ? lh + 1 : rh + 1;
	};
	return getHeight(root);
};
