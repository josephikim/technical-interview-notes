# Write a function to check that a binary tree is a valid binary search tree.

What it means is check whether the values are placed according to the rules of a binary search tree ie
1. left node value is less than right node value
2. all values left of root node is less than root node value
3. all values right of root node is greater than root node value

## Gotcha #1
<img src="images/binarySearchTreeValidityGotcha.png" width="500"  />

## Gotcha #2

We can do this in O(n) time and O(n) additional space, where n is the number of nodes in our tree. Our additional space is O(log(n)) if our tree is balanced.


## Solution

## Complexity
O(n) time and O(n) space.

The time cost is easy: for valid binary search trees, we’ll have to check all n nodes.

Space is a little more complicated. Because we’re doing a depth first search, nodeAndBoundsStack will hold at most d nodes where d is the depth of the tree (the number of levels in the tree from the root node down to the lowest node). So we could say our space cost is O(d).

But we can also relate d to n. In a balanced tree, d is log base2 n.
​And the more unbalanced the tree gets, the closer d gets to n.

In the worst case, the tree is a straight line of right children from the root where every node in that line also has a left child. The traversal will walk down the line of right children, adding a new left child to the stack at each step. When the traversal hits the rightmost node, the stack will hold half of the n total nodes in the tree. Half n is O(n), so our worst case space cost is O(n).

## Bonus
What if the input tree has duplicate values?

What if Number.NEGATIVE_INFINITY or Number.POSITIVE_INFINITY appear in the input tree?