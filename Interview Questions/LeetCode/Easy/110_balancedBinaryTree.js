// Given a binary tree, determine if it is height-balanced

// A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

// Example 1:

// Input: root = [3,9,20,null,null,15,7]
// Output: true
// Example 2:

// Input: root = [1,2,2,3,3,null,null,4,4]
// Output: false
// Example 3:

// Input: root = []
// Output: true

// Constraints:

// The number of nodes in the tree is in the range [0, 5000].
// -104 <= Node.val <= 104

/***********************************/

// Optimal solution (same as below but with efficient flag return)

// Time complexity = O(N) (getHeight is called once twice for each node, so O(2N) = O(N))
// Space complexity = O(H), where H is height of tree (worst case H = N)

// utilize getHeight method for binary tree
// update boolean flag if subtree height differ by more than 1
// return flag

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
 * @return {boolean}
 */
var isBalanced = function (root) {
	let result = true;

	const tallestSubtree = (node) => {
		if (!node) {
			return 0;
		}

		let left = tallestSubtree(node.left);
		let right = tallestSubtree(node.right);

		if (Math.abs(left - right) > 1) {
			result = false;
		}

		return Math.max(left, right) + 1;
	};

	tallestSubtree(root);

	return result;
};

// Naive solution

// Time complexity = O(N) (getHeight is called twice for each node, so O(2N) => O(N))
// Space complexity = O(H), where H is height of tree (worst case H = N)

// utilize getHeight method for binary tree
// update boolean flag if subtree height differ by more than 1
// return flag

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
 * @return {boolean}
 */
var isBalanced = function (root) {
	let balanced = true;

	// standard getHeight method for binary tree
	var getHeight = function (node) {
		if (node === null) return -1;
		let lh = getHeight(node.left);
		let rh = getHeight(node.right);

		// update boolean flag if difference in subtree heights is greater than 1
		if (Math.abs(lh - rh) > 1) {
			balanced = false;
		}

		return lh > rh ? lh + 1 : rh + 1;
	};

	getHeight(root);
	return balanced;
};
