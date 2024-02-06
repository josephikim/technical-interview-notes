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

/**********************************

O(n) - Recursive stitching (in place)

1. Handle base cases: reached list1 end or list2 end;
2. Use recursion to stitch sublists together one node at a time.
3. Two different recurrence relationships: 
	- list1.next = merged(list1.next, list2)	
	- list2.next = merged(list2.next, list1)

O(n) - Recursive stitching into new Linked List

1. Init new linked list with dummy head IE new ListNode(-1)
2. Init pointer, set to dummy head
3. Loop through two linked lists and update list1, list2, pointer.next and pointer incrementally
4. append any remaining list1 or list2 to pointer.next

***********************************/

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

/***********************************/

// Recursive solution

// Time commplexity = O(n) worst case (n = list1.length + list2.length)
// Space complexity = O(1)

// Algo:
// Use recursion to stitch sublists together one node at a time.
// The key is the recurrence relationship:
// if list1.val is smaller than list2.val => list1.next = merged(list1.next, list2)

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
	if (!list1) return list2;
	if (!list2) return list1;

	if (list1.val < list2.val) {
		list1.next = mergeTwoLists(list1.next, list2);
		return list1;
	} else {
		list2.next = mergeTwoLists(list1, list2.next);
		return list2;
	}
};
