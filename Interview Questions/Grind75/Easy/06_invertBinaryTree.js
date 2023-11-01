// Given the root of a binary tree, invert the tree, and return its root.

// Example 1:
// Input: root = [4,2,7,1,3,6,9]
// Output: [4,7,2,9,6,3,1]

// Example 2:
// Input: root = [2,1,3]
// Output: [2,3,1]

// Example 3:
// Input: root = []
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 100].
// -100 <= Node.val <= 100

/***********************************/

// Optimal solution
// Time complexity = O(n) ie tree.length
// Space complexity = O(1) ie at most O(height of tree)
// log base2 (n+1) = height
// NOTE: log notation with no base is assumed to be log base 10
// NOTE: log base e is commonly notated as ln (natural log)
//
// key is using a recursive function with a temp node used to facilitate switching the left and right children on each iteration
//
// Note: binary trees are the perfect use case for recursion.
// BUT DONT PREFER recursion over more efficient alternative if possible ie. a while loop with two pointers

/**
 * @param {string} s
 * @return {boolean}
 */
var invertTree = function (root) {
	if (!root) {
		return null;
	}

	let temp = root.left;
	root.left = root.right;
	root.right = temp;

	invertTree(root.left);
	invertTree(root.right);

	return root;
};
