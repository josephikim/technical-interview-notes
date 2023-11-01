// Node class
class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

// Binary search tree class
class BinarySearchTree {
	constructor() {
		// root of a binary tree
		this.root = null;
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

	// helper method which creates a new node to
	// be inserted and calls insertNode

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

	// Helper method to insert a node in a tree
	//
	// Method 1 - Use recursion over the tree to find the location to insert a node

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

	// Method 2 - Use while loop to abstract away the recursion and update the value of a scoped variable like "currentNode" to designate the node that we're currently checking.
	// THIS IS LESS DESIRABLE bc it's less obvious that its a recursion function, and leads to an overloaded function.

	// insertNode(root, data) {
	//   var currentNode = root;
	//   var newNode = new Node(data);

	//   while (currentNode) {
	//     if (data < currentNode.data) {
	//       if (!currentNode.left) {
	//         currentNode.left = newNode;
	//         break;
	//       } else {
	//         currentNode = currentNode.left;
	//       }
	//     } else {
	//       if (!currentNode.right) {
	//         currentNode.right = newNode;
	//         break;
	//       } else {
	//         currentNode = currentNode.right;
	//       }
	//     }
	//   }
	// }

	// Method to remove node from a tree with a given value
	remove(data) {
		// root is re-initialized with root of a modified tree.
		this.root = this.removeNode(this.root, data);
	}

	// Helper method to remove node with a given value
	// it recurs over the tree to find the data and removes it
	// it returns the modified tree starting with the node that was removed or replaced

	removeNode(node, data) {
		// if the root is null then tree is empty
		if (node === null) {
			return null;
		}
		// if data to be deleted is less than root's data, move to left subtree
		else if (data < node.data) {
			node.left = this.removeNode(node.left, data);
			return node;
		}
		// if data to be deleted is greater than root's data, move to right subtree
		else if (data > node.data) {
			node.right = this.removeNode(node.right, data);
			return node;
		}
		// if data matches the root's data, delete corresponding node
		else {
			// delete node with no children
			if (node.left === null && node.right === null) {
				node = null;
				return node;
			}
			// delete node with one child
			if (node.left === null) {
				node = node.right;
				return node;
			} else if (node.right === null) {
				node = node.left;
				return node;
			}

			// delete node with two children
			// Min node of the right subtree is stored in aux variable

			var aux = this.findMinNode(node.right);
			node.data = aux.data;

			node.right = this.removeNode(node.right, aux.data);
			return node;
		}
	}

	//  finds the minimum node in binary search tree
	// searching starts from given node
	findMinNode(node) {
		// if left of a node is null, it must be the min node
		if (node.left === null) {
			return node;
		} else {
			return this.findMinNode(node.left);
		}
	}

	//  finds the maximum node in binary search tree
	// searching starts from given node
	findMaxNode(node) {
		// if right of a node is null, it must be the max node
		if (node.right === null) {
			return node;
		} else {
			return this.findMaxNode(node.right);
		}
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

	// search for a node with given data using recursive search function.
	// This is similar to POST ORDER traversal but stops when we find the searchData
	search(node, searchData) {
		// if tree is empty return null
		if (node === null) {
			return null;
		}
		console.log("Current node is:", node.data);

		// if data is less than node's data, move left
		if (searchData < node.data) return this.search(node.left, searchData);
		// if data is greater than node's data, move right
		if (searchData > node.data) return this.search(node.right, searchData);

		// if data is equal to the node data, return node
		console.log("found it!");
		return node;
	}
}

const bst = new BinarySearchTree();

bst.insert(9);
bst.insert(2);
bst.insert(4);
bst.insert(5);
bst.insert(1);
bst.insert(8);
bst.insert(11);
bst.insert(15);
bst.insert(10);
bst.insert(19);
bst.insert(21);

const root = bst.getRootNode();

bst.preorder(root);
bst.remove(9);
console.log("new root", root);
bst.preorder(root);
// bst.getRootNode();
// bst.search(bst.root, 19);
// bst.breadthFirstSearch(bst.root, 7);
// bst.breadthFirstSearch(bst.root, 19);
// bst.depthFirstSearch(bst.root, 19);
// bst.depthFirstSearch(bst.root, 20);
