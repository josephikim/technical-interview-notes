// You are given the heads of two sorted linked lists list1 and list2.
// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
// Return the head of the merged linked list.

// Example 1:

// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]
// Example 2:

// Input: list1 = [], list2 = []
// Output: []
// Example 3:

// Input: list1 = [], list2 = [0]
// Output: [0]

// Constraints:

// The number of nodes in both lists is in the range [0, 50].
// -100 <= Node.val <= 100
// Both list1 and list2 are sorted in non-decreasing order.

/***********************************/

// Optimal solution
// Time commplexity = O(n) worst case
// ie O(l1.length + l2.length)
//
// Space complexity = O(n) worst case
// ie n = merged.length
//
// Use a pointer node to indicate current location during construction of the merged node
// use while loop to hit every element of the two input lists

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

var mergeTwoLists = function (list1, list2) {
	// dummy head node
	let merged = new ListNode(-1);

	// pointer node
	let current = merged;

	while (list1 && list2) {
		if (list1.val <= list2.val) {
			current.next = list1;
			list1 = list1.next;
		} else {
			current.next = list2;
			list2 = list2.next;
		}
		current = current.next;
	}

	current.next = list1 || list2;

	return merged.next;
};
