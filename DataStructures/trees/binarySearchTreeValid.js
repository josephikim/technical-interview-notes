// Node class
class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

// Binary search tree clas
class BinarySearchTree {
	constructor() {
		// root of a binary tree
		this.root = null;
	}

	/**
	 * IMPORTANT QUESTION: VERIFY IF BINARY TREE IS A BINARY SEARCH TREE
	 * ie node values are arranged in order from left to right
	 */

	// MOST EFFICIENT and CORRECT answer
	// simplify method below using NULL pointers instead of INT_MIN and INT_MAX values.
	/**
	 *  Time complexity: O(n)
	 *  Auxiliary space: O(h) where h is height of the tree and the extra space is used due to function call stack.
	 */
	/**
	 * @param {Node} root
	 * @param {Node} l
	 * @param {Node} r
	 * @return {boolean}
	 */

	validateBSTNullPointer(root, l, r) {
		console.log("running BST null pointer with args:", [
			root ? root.data : null,
			l ? l.data : null,
			r ? r.data : null,
		]);
		// Base condition
		if (root == null) return true;

		// if left node exist then check it has
		// correct data or not i.e. left node's data
		// should be less than root's data
		if (l != null && root.data <= l.data) return false;

		// if right node exist then check it has
		// correct data or not i.e. right node's data
		// should be greater than root's data
		if (r != null && root.data >= r.data) return false;

		// check recursively for every node.
		return (
			this.validateBSTNullPointer(root.left, l, root) &&
			this.validateBSTNullPointer(root.right, root, r)
		);
	}

	// LESS EFFICIENT BUT CORRECT answer
	// NOTE: This method is not applicable if there are duplicate elements with value INT_MIN or INT_MAX
	/**
	 *  Time complexity: 0(n)
	 *  Auxiliary space: 0(1) if Function Call stack size is not considered, otherwise O(h) where h is height of the tree
	 */
	/**
	 * @param {Node} root
	 * @return {boolean}
	 */

	isValidBST() {
		const root = this.getRootNode();
		// Find min and max of tree using my own function or just provide it directly in the code.
		// const { min, max } = this.findMinMax(root);
		const min = this.findMinNode(root);
		const max = this.findMaxNode(root);

		return this.isValidBSTSubtree(root, min.data, max.data);
	}

	// Check is a subtree is a valid BST.
	// Used as helper function in isValidBST();
	/**
	 * @param {Node} root
	 * @param {Number} min
	 * @param {Number} max
	 * @return {boolean}
	 */

	isValidBSTSubtree(node, min, max) {
		console.log("running isValidBSTSubtree() with args(node.data, min, max):", [
			node ? node.data : null,
			min,
			max,
		]);
		/* an empty tree is BST */
		if (node == null) return true;

		/* false if this node violates the min/max constraints */
		if (node.data < min || node.data > max) return false;

		/* otherwise check the subtrees recursively tightening the min/max constraints */
		// Allow only distinct values
		return (
			this.isValidBSTSubtree(node.left, min, node.data - 1) &&
			this.isValidBSTSubtree(node.right, node.data + 1, max)
		);
	}

	// ==========================================

	// Inefficient but CORRECT answer
	// For each node, check if max value in left subtree is smaller than the node and min value in right subtree greater than the node.

	//   Time Complexity: O(n^2)
	// As we visit every node just once and our helper method also takes O(n) time, so overall time complexity becomes O(n) * O(n) = O(n^2)

	// Auxiliary Space: O(h)
	// Here h is the height of the tree and the extra space is used due to function call stack.

	isBST(node) {
		if (node == null) return true;

		/* False if the max of the left is > than us */
		if (node.left != null && findMaxNode(node.left).data >= node.data)
			return false;

		/* False if the min of the right is <= than us */
		if (node.right != null && findMinNode(node.right).data <= node.data)
			return false;

		/* False if, recursively, the left or right is not a BST */
		if (!isBST(node.left) || !isBST(node.right)) return false;

		/* Passing all that, it's a BST */
		return true;
	}

	// ==========================================

	// BASIC AND INCORRECT ANSWER (because it doesn't check whether values are less than or greater than the root node)

	//  Time Complexity: O(n)
	//  As we visit every node just once
	//  Auxiliary Space: O(h)
	//  Here h is the height of the tree and the extra space is used due to function call stack.

	incorrectIsBST(node) {
		if (node == null) return true;

		/* False if left is > than node */
		if (node.left != null && node.left.data > node.data) return false;

		/* False if right is < than node */
		if (node.right != null && node.right.data < node.data) return false;

		/* False if, recursively, the left or right is not a BST */
		if (!incorrectIsBST(node.left) || !incorrectIsBST(node.right)) return false;

		/* Passing all that, it's a BST */
		return true;
	}

	//
	// Helper functions
	//

	//  finds the minimum node in tree. Searching starts from given node
	findMinNode(node) {
		// if left of a node is null, it must be the min node
		if (node.left === null) {
			return node;
		} else {
			return this.findMinNode(node.left);
		}
	}

	//  finds the maximum node in tree. Searching starts from given node
	findMaxNode(node) {
		// if left of a node is null, it must be the Max node
		if (node.right === null) {
			return node;
		} else {
			return this.findMaxNode(node.right);
		}
	}

	insert(data) {
		// Creating a node and initialising
		// with data
		const newNode = new Node(data);

		// if root is null, node will be added to the tree and made root.
		if (this.root === null) {
			this.root = newNode;
		} else {
			// find the correct position in the
			// tree and add the node
			this.insertNode(this.root, newNode);
		}
	}

	insertNode(node, newNode) {
		// if the data is less than the node
		// data move left of the tree
		if (newNode.data < node.data) {
			// if left is null insert node here
			if (node.left === null) {
				node.left = newNode;
			} else {
				// if left is not null recur until
				// null is found
				this.insertNode(node.left, newNode);
			}
			// if the data is more than the node
			// data move right of the tree
		} else {
			// if right is null insert node here
			if (node.right === null) {
				node.right = newNode;
			} else {
				// if right is not null recur until
				// null is found
				this.insertNode(node.right, newNode);
			}
		}
	}

	// returns root of the tree
	getRootNode() {
		console.log("root node is:", this.root.data);
		return this.root;
	}
}

const bst = new BinarySearchTree();

bst.insert(4);
bst.insert(2);
bst.insert(1);
bst.insert(3);
bst.insert(5);
bst.insert(6);
// bst.insert(10);
// bst.insert(11);
// bst.insert(10);
// bst.insert(19);
// bst.insert(21);
// console.log("isValidBST:", bst.isValidBST());
console.log(
	"validateBSTNullPointer:",
	bst.validateBSTNullPointer(bst.getRootNode(), null, null)
);

// console.log(
//   "validateBSTNullPointer:",
//   bst.validateBSTNullPointer(
//     bst.getRootNode(),
//     bst.getRootNode().left,
//     bst.getRootNode().right
//   )
// );
// bst.search(bst.root, 19);
// bst.breadthFirstSearch(bst.root, 7);
// bst.breadthFirstSearch(bst.root, 19);
// bst.depthFirstSearch(bst.root, 19);
// bst.depthFirstSearch(bst.root, 20);
