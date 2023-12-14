// Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

// Example 1:

// Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// Output: 6
// Explanation: The LCA of nodes 2 and 8 is 6.
// Example 2:

// Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// Output: 2
// Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
// Example 3:

// Input: root = [2,1], p = 2, q = 1
// Output: 2

// Constraints:

// The number of nodes in the tree is in the range [2, 105].
// -109 <= Node.val <= 109
// All Node.val are unique.
// p != q
// p and q will exist in the BST.

/***********************************/

// Optimal solution (Recursive)

// Time complexity = worst case O(logN)
// Space complexity = O(1)

// Take advantage of INHERENT QUALITIES of BST (ie all values left of a node will be less than the node val, likewise right side values will be greater than node val)
// Use recursive function to check each node starting from root
// 	  call recursive function only if p and q are both greater than or less than node val
//    if so, move on to node.left or node.right (thus eliminates half of searchable subtree for each iteration))
//    otherwise return current node (ie LCA)
// 	WHY THIS WORKS - If p and q are on opposite sides of a node, or node equals EITHER p or q, that node must be LCA

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

var lowestCommonAncestor = function (root, p, q) {
	if (root.val > p.val && root.val > q.val)
		return lowestCommonAncestor(root.left, p, q);
	if (root.val < p.val && root.val < q.val)
		return lowestCommonAncestor(root.right, p, q);

	return root;
};

/***********************************/

// Optimal solution (Iterative)

// Time complexity = worst case O(logN)
// Space complexity = O(1)

// This utilizes same logic as recursive solution above, but without recurrence relationship

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

const lowestCommonAncestor = (root, p, q) => {
	let node = root;

	while (node) {
		if (p.val < node.val && q.val < node.val) {
			node = node.left; // moving to the left subtree
		} else if (p.val > node.val && q.val > node.val) {
			node = node.right; // moving to the right subtree
		} else {
			return node;
		}
	}

	return null;
};

/***********************************/

// Naive solution (Recursive)

// Time complexity = worst case O(N) where N = tree.length (hits every node)
// Space complexity = O(1)

// run dfsPostOrder recursively to target ancestor nodes
// 	if node is null, return
// 	if pA and qA have been set and are equal, return
// 	if node.val matches p or q, set pA or qA
// 	if node is immediate ancestor of pA or qA, update pA or qA
// return pA

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

// var lowestCommonAncestor = function (root, p, q) {
// 	let pA = null;
// 	let qA = null;

// 	var dfsPostOrder = function (node) {
// 		if (node !== null) {
// 			// Traverse the left subtree
// 			dfsPostOrder(node.left);
// 			// Traverse the right subtree
// 			dfsPostOrder(node.right);
// 			// Visit root
// 			if (pA != null && pA === qA) return;
// 			// node matches p or q
// 			if (node.val === p.val) {
// 				pA = node;
// 			}
// 			if (node.val === q.val) {
// 				qA = node;
// 			}
// 			// node is immediate ancestor of pA or qA
// 			if (
// 				(node.left != null && node.left === pA) ||
// 				(node.right != null && node.right === pA)
// 			)
// 				pA = node;
// 			if (
// 				(node.left != null && node.left === qA) ||
// 				(node.right != null && node.right === qA)
// 			)
// 				qA = node;
// 		}
// 	};

// 	dfsPostOrder(root);
// 	return pA;
// };
