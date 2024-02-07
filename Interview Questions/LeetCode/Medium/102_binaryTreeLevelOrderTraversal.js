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

/**********************************

O(n) - BFS

1. Use a BFS queue and a variable to track the current level starting at 0
2. Init the queue with root node.
3. Loop current length of queue, pulling the first node each time using shif()
4. Push the node's val to levels[level]
5. Push any non-null child nodes into queue
6. Once the level has been processed, increment levels variable

O(n) - Recursive DFS

1. Use a modified recursive dfs that also has a 'level' parameter
2. increment the level parameter in the recurrence relation
3. Call the recursions based on preorder (ie apply to node.left then node.right)
r. In each recursion, se the level parameter as the index in result array to push node's value into.

***********************************/

// Recursive solution (DFS)

// Time complexity = O(n) => it is recursive, but processes every node in n, unlike a traditional Depth First Search algo
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
	let result = [];

	var getLevelsPreorder = function (node, level) {
		if (node) {
			// init empty array for level that hasn't been visited
			if (result.length === level) result.push([]);

			// Push node to corresponding level in result (this works because of preorder)
			result[level].push(node.val);
			// process left child
			getLevelsPreorder(node.left, level + 1);
			// process right child
			getLevelsPreorder(node.right, level + 1);
		}
	};

	getLevelsPreorder(root, 0);
	return result;
};

/***********************************/

// Iterative solution (BFS)

// Time complexity = O(n) => it is recursive, but processes every node in n, unlike a Depth First Search algo
// Space complexity = O(n) if you count the result array

// Algorithm
// 1. Use a BFS queue and a variable to track the current level starting at 0
// 2. Init the queue with root node.
// 3. Loop current length of queue, pulling the first node each time using shif()
// 4. Push the node's val to levels[level]
// 5. Push any non-null child nodes into queue
// 6. Once the level has been processed, increment levels variable

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
	if (!root) return [];

	const queue = [root];
	const levels = [];
	let level = 0;

	while (queue.length > 0) {
		const currLength = queue.length;

		for (let i = 0; i < currLength; i++) {
			const currNode = queue.shift();

			if (!levels[level]) {
				levels[level] = [currNode.val];
			} else {
				levels[level].push(currNode.val);
			}

			if (currNode.left) queue.push(currNode.left);
			if (currNode.right) queue.push(currNode.right);
		}

		level += 1;
	}

	return levels;
};
