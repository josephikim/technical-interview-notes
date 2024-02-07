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

/**********************************

O(n) - Iterative

1. Init curr = head and prev = null
2. For each node, REVERSE the linkage from curr to curr.next (by pointing curr to prev node)

//    1 -> 2 -> 3 -> 4
// <- 1    2 -> 3 -> 4
// <- 1 <- 2    3 -> 4
// <- 1 <- 2 <- 3    4
// <- 1 <- 2 <- 3 <- 4

O(n) - Recursive reversal starting at last node

1. base case returns last node as 'rest' (ie beginning of reversed linked list)
2. For each recursion: Reverse all nodes starting with head.next, point head.next.next back to head, point head.next to null.
3. Now you have incremented the reversed linked list with an additional node (ie head)
4. Return the 'head' of the incremented reversed linked list ie 'rest'
5. Once recursions are finished, return final 'rest'

***********************************/

// Iterative solution (optimal)

// Time commplexity = O(n) worst case
// Space complexity = O(1) worst case
//
// loop through nodes, with curr and prev node pointers
// in each loop, REVERSE the linkage from curr to curr.next (by attaching curr to prev node)
//    1 -> 2 -> 3 -> 4
// <- 1    2 -> 3 -> 4
// <- 1 <- 2    3 -> 4
// <- 1 <- 2 <- 3    4
// <- 1 <- 2 <- 3 <- 4
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
		let next = curr.next; // init next pointer
		curr.next = prev; // reverse curr.next
		// update pointers
		prev = curr;
		curr = next;
	}
	return prev; // prev points to the head of reversed list after looping
};

/***********************************/

// Recursive solution

// Time commplexity = O(N) worst case
// Space complexity = O(N) worst case
//
// each recursion returns the head of a reversed linked list beginning at the 'final' node of original list
// base case returns last node as 'rest' (ie beginning of reversed linked list)
// in subsequent recursions, head will be pointing to the final node of 'rest'
// 		update head.next (ie last node of rest) to point back to head, then set head.next to null
//    this results in a reversed list one node longer, which you then return as 'rest'
// once recursions are done, return final 'rest'

//    1(h) -> 2 -> 3 -> 4
//    1 -> 2 -> 3(h) <- 4(r)
//    1 -> 2(h) <- 3 <- 4(r)
//    1(h) <- 2 <- 3 <- 4(r)

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
var reverseListRecursive = function (head) {
	if (!head || !head.next) {
		// return node as is
		return head;
	}
	let rest = reverseListRecursive(head.next); // rest points to new reverse linked list starting at last node
	head.next.next = head; // reverse linkage from head to final node of rest
	head.next = null; // remove circular reference from head to final node of rest

	return rest; // return rest ie updated reversed linked list
};
