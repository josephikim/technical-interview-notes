// This class is for GENERIC binary trees (INCLUDING the more specific Binary Search Tree)

// Node class
class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

// Binary tree class
class BinaryTree {
	constructor() {
		// root of a binary tree
		this.root = null;
		this.minValue = 1000000000;
		this.maxValue = -100000000;
	}

	// function to insert a node by level order using FIFO queue
	insert(data) {
		const q = [];
		if (this.root === null) {
			this.root = new Node(data);
		} else {
			q.push(this.root);
			while (q.length !== 0) {
				const node = q.shift();
				if (node.left === null) {
					node.left = new Node(data);
					break;
				} else {
					q.push(node.left);
				}
				if (node.right === null) {
					node.right = new Node(data);
					break;
				} else {
					q.push(node.right);
				}
			}
		}
	}

	// Recursive function to find height of a tree (expl: https://www.youtube.com/watch?v=AWIJwNf0ZQE)

	// NOTE: if node doesn't exist, tree height is -1; if only root exists, tree height is 0

	// iterate each node starting at root, and compare the left subtree height and right subtree height
	// find greater of the two subtree heights and add 1 (for the edge from node to subtree node)
	getHeight(node) {
		if (node == null) return -1;
		let lh = this.getHeight(node.left);
		let rh = this.getHeight(node.right);
		return lh > rh ? lh + 1 : rh + 1;
	}

	// Recursive function to find a maximum and minimum element in a tree using preorder traversal
	// NOTE: works for ANY binary tree (ie not just BSTs)
	findMinMax(root) {
		if (root == null) {
			return;
		}

		if (root.data > this.maxValue) {
			this.maxValue = root.data;
		}
		if (root.data < this.minValue) {
			this.minValue = root.data;
		}

		this.findMinMax(root.left);
		this.findMinMax(root.right);

		return {
			min: this.minValue,
			max: this.maxValue,
		};
	}

	// DEPTH FIRST SEARCH
	//
	// There are different types of DFS (preorder, inorder, postorder) depending on the implementation.
	// This implementation is preorder (most common DFS for binary trees) and it follows:
	// 1. visit node first
	// 2. walk left subtree
	// 3. walk right subtree
	depthFirstSearch(rootNode, searchData) {
		if (!rootNode) {
			return null;
		}

		if (rootNode.data === searchData) {
			console.log("found it!");
		} else {
			return this.dfsPreorder(rootNode, searchData);
		}
	}

	dfsPreorder(node, searchData) {
		if (node) {
			// check if node value matches
			console.log("Current node is:", node.data);
			if (node.data === searchData) {
				console.log("Found it!");
				return node;
			}
			// check left child
			this.dfsPreorder(node.left, searchData);
			// check right child
			this.dfsPreorder(node.right, searchData);
		}
	}

	// BREADTH FIRST SEARCH
	//
	// Resembles movement of ripples in a pond
	// Often used to find SHORTEST PATH between two nodes

	breadthFirstSearch(rootNode, searchData) {
		// make a queue array
		let queue = [];
		// populate it with the node that will be the root of your search
		queue.push(rootNode);

		// search the queue until it is empty
		while (queue.length > 0) {
			// assign the top of the queue to variable currentNode
			let currentNode = queue[0];
			console.log("Current node is:" + currentNode.data);

			// if currentNode is the node we're searching for, break & alert
			// NOTE you don't have to return anything - or just return boolean if found.
			if (currentNode.data === searchData) {
				console.log("Found it!");
				return;
			}

			// if currentNode has a left child node, add it to the queue.
			if (currentNode.left !== null) {
				queue.push(currentNode.left);
			}

			// if currentNode has a right child node, add it to the queue.
			if (currentNode.right !== null) {
				queue.push(currentNode.right);
			}
			// remove the currentNode from the queue.
			queue.shift();
		}
		console.log("Sorry, no such node found :(");
	}

	// Morris traversal to find min and max (ie without recursion or stack)
	// BEST Explanation: https://takeuforward.org/data-structure/morris-inorder-traversal-of-a-binary-tree/
	// This version of Morris uses in-order traversal. (There are other versions ie preorder https://takeuforward.org/data-structure/morris-preorder-traversal-of-a-binary-tree/)
	// NOTE: works for any binary tree (ie not just BSTs)
	//
	// Advantage: does not require recursion or stack
	// Disadvantage: IS NOT THREAD-SAFE (multiple threads calling this function will lead to errors since the algo temporarily alters the links between nodes) ie not practical for real world use;
	//
	// Time complexity: O(n) - hits every node (at most 3 times each) => O(3n) = O(n)
	// Space complexity: O(1) - no data structures or stack required

	findMinMaxMorris(root) {
		if (root == null) {
			console.log("Tree is empty");
			return;
		}

		let current = root;
		let pre;

		// Max variable for storing maximum value
		let max_value = -1000000000;

		// Min variable for storing minimum value
		let min_value = 1000000000;

		while (current != null) {
			// If left child does not exist
			if (current.left == null) {
				max_value = Math.max(max_value, current.data);
				min_value = Math.min(min_value, current.data);

				current = current.right;
			} else {
				// Find the ordered predecessor of current
				pre = current.left;
				while (pre.right != null && pre.right != current) pre = pre.right;

				// Make current as the right child of its ordered predecessor
				if (pre.right == null) {
					pre.right = current;
					current = current.left;
				} else {
					// Revert the changes made in the 'if' part to restore the original tree
					// i.e., fix the right child of predecessor
					pre.right = null;

					max_value = Math.max(max_value, current.data);
					min_value = Math.min(min_value, current.data);

					current = current.right;
				} // End of if condition pre.right == null
			} // End of if condition current.left == null
		} // End of while

		// Finally print max and min value
		console.log("Max Value is : " + max_value);
		console.log("Min Value is : " + min_value);
		return {
			min: min_value,
			max: max_value,
		};
	}

	// returns root of the tree
	getRootNode() {
		console.log("root node is:", this.root.data);
		return this.root;
	}

	// traverse tree in preorder
	preorder(node) {
		if (node !== null) {
			// Visit root
			console.log(node.data);
			// Traverse the left subtree
			this.preorder(node.left);

			// Traverse the right subtree
			this.preorder(node.right);
		}
	}

	// traverse tree in inorder
	inorder(node) {
		if (node !== null) {
			// Traverse the left subtree
			this.inorder(node.left);
			// Visit node
			console.log(node.data);
			// Traverse the right subtree
			this.inorder(node.right);
		}
	}

	// traverse tree in postorder
	postorder(node) {
		if (node !== null) {
			// Traverse the left subtree
			this.postorder(node.left);

			// Traverse the right subtree
			this.postorder(node.right);
			// Visit root
			console.log(node.data);
		}
	}
}

const bt = new BinaryTree();

bt.insert(9);
bt.insert(2);
bt.insert(4);
bt.insert(5);
bt.insert(-1);
// bt.insert(8);
// bt.insert(11);
// bt.insert(15);
// bt.insert(10);
// bt.insert(19);
// bt.insert(21);
const root = bt.getRootNode();

bt.inorder(root);
console.log(bt.findMinMax(root));

// bt.getRootNode();
// bt.breadthFirstSearch(bt.root, 7);
// bt.breadthFirstSearch(bt.root, 19);
// bt.depthFirstSearch(bt.root, 19);
// bt.depthFirstSearch(bt.root, 20);
