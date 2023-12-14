// Given the root of a binary tree, return the length of the diameter of the tree.

// The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

// The length of a path between two nodes is represented by the number of edges between them.

// Example 1:

// Input: root = [1,2,3,4,5]
// Output: 3
// Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

// Example 2:

// Input: root = [1,2]
// Output: 1

// Constraints:

// The number of nodes in the tree is in the range [1, 104].
// -100 <= Node.val <= 100

/***********************************/

// Iterative solution

// Time complexity = O(n)
// Space complexity = O(1)

// 1. use a recursive function that calculates heights of subtrees (ie longest path)
// 2. init longestPath = 0
// 3. at any node in recursion, if both subtree path lengths added together are greater than current longestPath, update longestPath before returning max subtree path + 1 (for edge leading to node in question)

var diameterOfBinaryTree = function (root) {
	if (!root) return 0;

	let longestPath = 0;

	function findLongestPath(node) {
		if (!node) return 0;

		const leftPath = findLongestPath(node.left);
		const rightPath = findLongestPath(node.right);
		longestPath = Math.max(longestPath, leftPath + rightPath);

		// returns path length of longest subtree NOT longest diameter
		return Math.max(leftPath, rightPath) + 1;
	}

	findLongestPath(root);
	return longestPath;
};

// same logic as above but using comparisons instead of Math.max

// var diameterOfBinaryTree = function (root) {
// 	let diameter = 0;
// 	var heightSubtree = function (node) {
// 		if (!node) return 0;
// 		let lh = heightSubtree(node.left);
// 		let rh = heightSubtree(node.right);
// 		if (lh + rh > diameter) diameter = lh + rh;
// 		return lh - rh > 0 ? lh + 1 : rh + 1;
// 	};

// 	heightSubtree(root);
// 	return diameter;
// };
