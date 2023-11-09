// Given the head of a singly linked list, reverse the list, and return the reversed list.

// Example 1:

// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
// Example 2:

// Input: head = [1,2]
// Output: [2,1]
// Example 3:

// Input: head = []
// Output: []

// Constraints:

// The number of nodes in the list is the range [0, 5000].
// -5000 <= Node.val <= 5000

// Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?

/***********************************/

// Iterative solution (optimal)

// Time commplexity = O(n) worst case
// Space complexity = O(1) worst case
//
// loop through nodes, with curr and prev nodes
// in each loop, REVERSE the linkage and attach to prev node

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
var reverseList = function (head) {
	if (!head || !head.next) return head;
	let prev = null;
	let curr = head;

	while (curr) {
		let next = curr.next; // set pointer to next
		curr.next = prev; // reverse linkage from curr
		// update pointers
		prev = curr;
		curr = next;
	}
	return prev; // prev points to the 'finished' list after each loop
};

/***********************************/

// Iterative solution (naive)

// Time commplexity = O(n) worst case
// Space complexity = O(1) worst case
//
// loop through nodes, set pointer to next node
// update linkages and set next node as new head, then return new head

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
// var reverseList = function (head) {
// 	if (!head || !head.next) return null;
// 	let newHead = head;
// 	let current = newHead;

// 	while (current && current.next) {
// 		let next = current.next; // this pointer will become new head
// 		current.next = next.next; // set current.next to node after next
// 		next.next = newHead; // set pointer.next to head (position 0)
// 		newHead = next; // set pointer as new head
// 	}
// 	return newHead;
// };

/***********************************/

// Recusive solution

// Time commplexity = O(N) worst case
// Space complexity = O(N) worst case
//
// each recursion returns the head of a reversed linked list beginning at the 'final' node of original list
// base case returns last node as 'rest' (ie beginning of reversed linked list)
// in subsequent recursions, head will be pointing to the final node of 'rest'
// 		update head.next (ie last node of rest) to point back to head, then set head.next to null
//    this results in a reversed list one node longer, which you then return as 'rest'
// once recursions are done, return final 'rest'

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
// var reverseList = function (head) {
// 	if (!head || !head.next) {
// 		// return last node as is
// 		return head;
// 	}
// 	let rest = reverseList(head.next); // rest points to new reverse linked list starting at last node
// 	head.next.next = head; // reverse linkage from head to final node of rest
// 	head.next = null; // remove circular reference from head to final node of rest

// 	return rest; // return rest ie updated reversed linked list
// };
