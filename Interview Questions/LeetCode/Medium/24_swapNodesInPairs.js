// Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

// Example 1:

// Input: head = [1,2,3,4]
// Output: [2,1,4,3]

// Example 2:

// Input: head = []
// Output: []

// Example 3:

// Input: head = [1]
// Output: [1]

// Constraints:

// The number of nodes in the list is in the range [0, 100].
// 0 <= Node.val <= 100

/**********************************

O(n) - Iterative with pointers

1. Handle base case (!head || !head.next)
2. Init pointer newHead and point to head.next (this will be the new head)
3. Init pointer currNode and point it to head 
4. Init pointer prevNode = null
5. Each while loop will essentially process two nodes at a time:
6. Create pointer clone of node 2, attach node1 to node3, attach clone to node1, attach prev node to clone, 
7. set prev to curr and curr to curr.next // This moves while loop forward by two nodes

O(n) - Recursion with pointer

1. Handle base case (!head || !head.next)
2. Init pointer as new ListNode (make a clone of head) and point it to head.next.next
3. Make head.next the new head and point it to the pointer
4. Swap next pair of nodes after pointer node and attach to head.next.next
(Recurrence relationship: head.next.next = swapPairsRecursive(head.next.next))
5. return head

***********************************/

// Iterative solution - This is more efficient space-wise than recursive solution

// Time complexity = O(N/2) == O(N)
// Space complexity = O(1)

// use while loop and swap each pair of nodes within the pair's scope

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var swapPairs = function (head) {
	if (!head || !head.next) {
		return head;
	}

	let newHead = head.next;

	let currNode = head;
	let prevNode = null;

	while (currNode && currNode.next) {
		// currNode = [1], currNode.next = [2]
		let nextNode = currNode.next; // nextNode = [2]
		currNode.next = nextNode.next; // [1].next = [3]
		nextNode.next = currNode; // [2].next = [1]

		if (prevNode) {
			prevNode.next = nextNode; // attach prevNode to 'new' nextNode
		}

		prevNode = currNode; // update prevNode pointer
		currNode = currNode.next; // update currentNode pointer
	}

	return newHead;
};

/***********************************/

// Recursive solution (may cause stack overflow)

// Time complexity = O(N/2) == O(N)
// Space complexity = O(N/2) == O(N)

// use recursion to swap each set of two nodes and attached swapped pair to previous swapped pair

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairsRecursive = function (head) {
	if (!head || !head.next) return head;
	// Make a clone of head and point it to head.next.next
	let pointer = new ListNode(head.val, head.next);
	pointer.next = head.next.next;

	// Make head.next the new head and point it to the pointer
	head = head.next;
	head.next = pointer;

	// swap next pair of nodes after pointer node
	head.next.next = swapPairsRecursive(head.next.next);
	return head;
};
