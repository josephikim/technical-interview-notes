// Given head, the head of a linked list, determine if the linked list has a cycle in it.

// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

// Return true if there is a cycle in the linked list. Otherwise, return false.

// Example 1:
// Input: head = [3,2,0,-4], pos = 1
// Output: true
// Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
// Example 2:

// Input: head = [1,2], pos = 0
// Output: true
// Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
// Example 3:

// Input: head = [1], pos = -1
// Output: false
// Explanation: There is no cycle in the linked list.

// Constraints:

// The number of the nodes in the list is in the range [0, 104].
// -105 <= Node.val <= 105
// pos is -1 or a valid index in the linked-list.

// Follow up: Can you solve it using O(1) (i.e. constant) memory?

/***********************************/

// Optimal solution

// Time complexity = O(N) (N = list length)
// Space complexity = O(1)

// use hare and tortoise algo
// check if tortoise and hare equals the same node or if tortoise or hare equals null (reached end of normal linked list)
// use STRICT EQUALITY check to ensure cycle exists (not two different nodes that have same node.val)

// NOTE: hasCycle and hasCycleAlt are the same algo, just different readability
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

var hasCycle = function (head) {
	let fast = head;
	while (fast && fast.next) {
		head = head.next;
		fast = fast.next.next;
		if (head === fast) return true;
	}
	return false;
};

// var hasCycleAlt = function (head) {
// 	if (head === null) return false;
// 	let slow = head;
// 	let fast = head.next?.next;

// 	while (fast != null || fast != undefined) {
// 		if (fast === slow) return true;
// 		slow = slow.next;
// 		fast = fast.next?.next;
// 	}

// 	return false;
// };

/***********************************/

// Naive solution

// Time complexity = O(N) N = list length
// Space complexity = O(N) = map object with N entries

// use a pointer node and keep track of all visited nodes using a map object
// if the pointer reaches a node whose value has already been mapped, you know there's a cycle
// NOTE: This solution is INCOMPLETE because it doesn't handle case of multiple nodes having the same value

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

var hasCycle = function (head) {
	if (!head) return false;
	let map = {};
	let pointer = head;
	let index = 0;

	while (pointer.next && map[pointer.next.val] == undefined) {
		map[pointer.val] = index;
		pointer = pointer.next;
		index++;
	}

	return pointer.next !== null;
};
