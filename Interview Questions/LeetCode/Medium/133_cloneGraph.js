// Given a reference of a node in a connected undirected graph.

// Return a deep copy (clone) of the graph.

// Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

// class Node {
//     public int val;
//     public List<Node> neighbors;
// }

// Test case format:

// For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.

// An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

// The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

// Example 1:

// Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
// Output: [[2,4],[1,3],[2,4],[1,3]]
// Explanation: There are 4 nodes in the graph.
// 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
// 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).

// Example 2:

// Input: adjList = [[]]
// Output: [[]]
// Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.

// Example 3:

// Input: adjList = []
// Output: []
// Explanation: This an empty graph, it does not have any nodes.

// Constraints:

// The number of nodes in the graph is in the range [0, 100].
// 1 <= Node.val <= 100
// Node.val is unique for each node.
// There are no repeated edges and no self-loops in the graph.
// The Graph is connected and all nodes can be visited starting from the given node.

/***********************************/

/**
 *
 */
// Special note: When facing the question how to 'deep clone' a complex object eg an instance of class Node() which may contain a neighbors field consisting of an array of other Node instances, potentially including circular references, remember:

// WE DONT HAVE TO CLONE THE ENTIRE THING IN ONE GO

// Not only does this approach introduce complexity of how to properly deep clone, we also have to deal with mapping cloned elements from a nested context. Instead think of the following:

// The solutions below take advantage of the fact that we can 'deep clone' complex objects in a piecemeal fashion ie
// 1. first clone the Node instances using just the primitive fields (ie node.val only)
// 2. store the new clone in a map
// 3. for the clone's 'neighbors' field, push in new cloned Node instances as they become available in the map (ie clone.neighbors.push(clonedNeighbor))

// This approach allows us flexibility in how to build the cloned Node and ensures that anything that gets attached to a clone must come from a pre-existing clone.

/**
 *
 */

/**********************************

O(n) - DFS using Map

1. Init map oldToNew
2. Create DFS function:
	- check map for cloned target, if found, return clone
	- else create new clone using target.val and add to map
	- loop through target node's neighbors and push the result of a recursive dfs call on each into cloned node
	- return cloned node
3. Run DFS function on head node

O(n) - DFS using stack

1. init clone Map<node, cloneNode>
2. init traversed Set()
3. init DFS stack as array
4. use the Set to avoid circular path
5. traverse stack starting with top of stack
6. for each neighbor, if not cloned, create a new node and connect it to the current node
7. if not traversed, push neighbor into stack
8. return cloned input node

***********************************/

// Iterative solution (DFS - optimized)

// Time complexity = O(n) => n nodes * m (constant) neighbors per node
// Space complexity = O(n) => map is O(n)

// 1. Same logic as DFS solution below but without checking for traversed state
// 2. Reduces DFS logic at each node to the following:
// 	- check map for cloned target, if found then return clone
// 	- otherwise create new clone using target.val and add to map
// 	- loop through target node's neighbors and push the result of a recursive dfs call on each into cloned node
// 	- return cloned node

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
	if (node === null) {
		return node;
	}

	const oldToNew = new Map();

	const dfs = (target) => {
		if (oldToNew.has(target)) {
			return oldToNew.get(target);
		}

		const copy = new Node(target.val);
		oldToNew.set(target, copy);

		for (const neighbor of target.neighbors) {
			copy.neighbors.push(dfs(neighbor));
		}

		return copy;
	};

	return dfs(node);
};

/***********************************/

// Iterative solution (DFS using stack)

// Time complexity = O(n) => n = num of nodes
// Space complexity = O(n) => clones and traversed are both O(n)

// 1. init clone Map<node, cloneNode>
// 2. init traversed Set()
// 3. init DFS stack as array
// 4. use the Set to avoid circular path
// 5. traverse stack starting with top of stack
// 6. for each neighbor, if not cloned, create a new node and connect it to the current node
// 7. if not traversed, push neighbor into stack
// 8. return cloned input node

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
	if (!node) return null;

	const clones = new Map();
	const traversed = new Set();
	const stack = [node];

	clones.set(node, new Node(node.val));

	while (stack.length > 0) {
		const top = stack.pop();
		if (traversed.has(top)) {
			continue;
		}
		const clonedHead = clones.get(top);
		for (let neighbor of top.neighbors) {
			if (clones.has(neighbor)) {
				clonedHead.neighbors.push(clones.get(neighbor));
			} else {
				const clonedNeighbor = new Node(neighbor.val);
				clonedHead.neighbors.push(clonedNeighbor);
				clones.set(neighbor, clonedNeighbor);
			}

			if (!traversed.has(neighbor)) {
				stack.push(neighbor);
			}
		}
		traversed.add(top);
	}
	return clones.get(node);
};

/***********************************/

// Iterative solution (BFS)

// Time complexity = O(n) => n = num of nodes
// Space complexity = O(n) => clones and traversed are both O(n)

// 1. init clone Map<node, cloneNode>
// 2. init traversed Set()
// 3. use BFS to traverse the graph
// 4. use the Set to avoid circular path
// 5. traverse queue starting with head
// 6. for each neighbor, if not cloned, create a new node and connect it to the current node
// 7. if not traversed, push neighbor into queue
// 8. return cloned input node

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
	if (!node) return null;

	const clones = new Map();
	const traversed = new Set();
	const queue = [node];

	clones.set(node, new Node(node.val));

	while (queue.length > 0) {
		const head = queue.shift();

		if (traversed.has(head)) {
			continue;
		}
		const clonedHead = clones.get(head);
		for (let neighbor of head.neighbors) {
			if (clones.has(neighbor)) {
				clonedHead.neighbors.push(clones.get(neighbor));
			} else {
				const clonedNeighbor = new Node(neighbor.val);
				clonedHead.neighbors.push(clonedNeighbor);
				clones.set(neighbor, clonedNeighbor);
			}

			if (!traversed.has(neighbor)) {
				queue.push(neighbor);
			}
		}
		traversed.add(head);
	}
	return clones.get(node);
};
