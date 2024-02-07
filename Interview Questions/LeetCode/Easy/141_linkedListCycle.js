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

/**********************************/

// Time complexity = O(n) (n = list length)
// Space complexity = O(1)

// use hare and tortoise algo (hare move twice as fast as tortoise. If a loop exists, guaranteed that tortoise and hare will eventually land on same node)
// init hare and tortoise pointers at head
// move tortoise one node, move hare two nodes
// if tortoise and hare points to same node (loop found)
// if tortoise or hare equals null (reached end of normal linked list => No loop exists)

// Note: Use STRICT EQUALITY check to ensure tortoise and hare is at same node (not two different nodes with same node.val)

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
	// if while loop breaks, fast has reached end of non-looping linked list
	return false;
};

// Same logic as tortoise and hare, just different readability

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
