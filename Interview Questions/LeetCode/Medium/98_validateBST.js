// Given the root of a binary tree, determine if it is a valid binary search tree (BST).

// A valid BST is defined as follows:

// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.

// Example 1:

// Input: root = [2,1,3]
// Output: true

// Example 2:

// Input: root = [5,1,4,null,null,3,6]
// Output: false
// Explanation: The root node's value is 5 but its right child's value is 4.

// Constraints:

// The number of nodes in the tree is in the range [1, 104].
// -2^31 <= Node.val <= 2^31 - 1

/*******************************/

// Recursive solution (DFS w Null pointers)
// MORE EFFICIENT answer than using hardcoded l and r values in second solution below

// Time complexity = O(n) ie total number of nodes
// Space complexity = O(logn) ie height of balanced tree, O(n) worst case of tree with one branch

// 1. write recursive helper function which checks if a node's value lies between two parameter values l and r ONLY IF l or r is NOT NULL.
// 2. If the condition passes, recursively check left and right child nodes with modified values for l and r
// 3. check every node in tree startin with root node using helper function

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
var isValidBST = function (root) {
	return validateBSTNullPointer(root, null, null);
};

var validateBSTNullPointer = function (node, l, r) {
	// Base condition
	if (node == null) return true;

	// if left node exist then check it has
	// correct data or not i.e. left node's data
	// should be less than node's data
	if (l != null && node.val <= l.val) return false;

	// if right node exist then check it has
	// correct data or not i.e. right node's data
	// should be greater than node's data
	if (r != null && node.val >= r.val) return false;

	// check recursively for every node.
	return (
		validateBSTNullPointer(node.left, l, node) &&
		validateBSTNullPointer(node.right, node, r)
	);
};

/*******************************/

// Recursive solution (DFS)

// Time complexity = O(n) ie total number of nodes
// Space complexity = O(logn) ie height of balanced tree, O(n) worst case of tree with one branch

// 1. write recursive helper function which checks if a node's value lies between two parameter values l and r.
// 2. If the condition passes, recursively check left and right child nodes with modified values for l and r
// 3. check every node in tree startin with root node using helper function

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
var isValidBST = function (root) {
	return isBSTSubtree(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
};

var isBSTSubtree = function (node, l, r) {
	if (!node) return true;
	if (node.val <= l || node.val >= r) return false;

	const leftIsValid = isBSTSubtree(node.left, l, node.val);
	const rightIsValid = isBSTSubtree(node.right, node.val, r);
	return leftIsValid && rightIsValid;
};
