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

/***********************************/

// Non-recursive solution - This is more efficient space-wise than recursive solution (may avoid stack overflow)

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

	let newNode = head.next;

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

	return newNode;
};

/***********************************/

// Recursive solution

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
	let pointer = new ListNode(head.val, head.next);
	pointer.next = head.next.next;
	head = head.next;
	head.next = pointer;
	head.next.next = swapPairsRecursive(head.next.next);
	return head;
};
