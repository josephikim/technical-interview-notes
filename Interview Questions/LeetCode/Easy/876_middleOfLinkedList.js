// Given the head of a singly linked list, return the middle node of the linked list.

// If there are two middle nodes, return the second middle node.

// Example 1:

// Input: head = [1,2,3,4,5]
// Output: [3,4,5]
// Explanation: The middle node of the list is node 3.
// Example 2:

// Input: head = [1,2,3,4,5,6]
// Output: [4,5,6]
// Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.

// Constraints:

// The number of nodes in the list is in the range [1, 100].
// 1 <= Node.val <= 100

/***********************************/

// Iterative solution (improved)

// Time complexity = O(N)
// Space complexity = O(1)

// 1. set two pointers slow and fast
// 2. loop through nodes making fast pointer move twice as fast as slow pointer (similar to tortoise and hare algo)
// 3. loop until fast pointer is null
// 4. return slow pointer which should be half as far as fast pointer

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
var middleNode = function (head) {
	if (!head) return head;
	let slow = head;
	let fast = head.next;
	while (fast) {
		slow = slow.next;
		fast = fast.next?.next;
	}
	return slow;
};

// Iterative solution (naive)

// Time complexity = O(N)
// Space complexity = O(1)

// 1. write a function to get length of linkedlist
// 2. get length of list starting at head
// 3. loop until middle node is hit
// 4. return middle node

/***********************************/

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
var middleNode = function (head) {
	let length = getLength(head);
	let middle = head;
	for (let i = 0; i < Math.floor(length / 2); i++) {
		middle = middle.next;
	}
	return middle;
};

var getLength = function (list) {
	let count = 0;
	let node = list;
	while (node) {
		count++;
		node = node.next;
	}
	return count;
};
