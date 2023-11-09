# Tree Data Structure

## Any Trees

1. Tree
   1. organizes values hierarchically as nodes (e.g. X inside Y inside Z)
   2. e.g. Filesystems, comment threads, family tree diagram
2. Leaf
   1. Nodes that have no children (ie at bottom of the tree)
3. Depth
   1. A node's depth is the number of links away from the root node
4. Height
   1. A tree's height is the number of links from the root node to the furthest leaf
5. Breadth First Search (BFS)
   1. first explore all the nodes one step away, then all the nodes two steps away, etc.
   2. like throwing a stone in the center of a pond. The nodes you explore "ripple out" from the starting point
6. Depth First Search (DFS)
   1. Go as deep down as possible down one path before backing up and trying another one
   2. like walking through a corn maze. You explore one path, hit a dead end, and go back and try a different one
7. Comparing BFS vs DFS
   1. BFS will find the shortest path between the starting point and any other reachable node
   2. A depth-first search will not necessarily find the shortest path
8. Pre Order Traversal
   1. Visit the current node, then walk the left subtree, and finally walk the right subtree
   2. Usually follows same route as DFS but covers the entire tree
9. In Order Traversal
   1. Walk the left subtree first, then visit the current node, and finally walk the right subtree.
   2. MOST COMMON METHOD when walking a Binary SEARCH Trees (a 'sorted' binary tree) (bc is hits the nodes in the same order as the node values are sorted)
   3. For BST's, 'walk' means visit the nodes in ascending order of the node VALUES not node position <https://www.interviewcake.com/concept/python/tree?#balanced>
10. Post Order Traversal
    1. Walk the left subtree, then the right subtree, and finally visit the current node
    2. This one is rarely used

## Binary Trees

1. Every node has 2 children at most
2. Full Binary Tree
   1. Every node has exactly 0 or 2 children
3. Perfect Binary Tree
   1. Doesn't have room for any more nodes—unless we increase the tree's height.
   2. n = 2^(n+1) - 1
4. Complete Binary Tree
   1. Like a perfect binary tree missing a few nodes in the last level. Nodes are filled in from left to right.
   2. Complete trees are the basis for heaps and priority queues.
5. Balanced Binary Tree
   1. height is small relative to the number of nodes it has.
   2. Typically means the height is Math.floor(logbase2(n)), where n is the number of nodes.
6. Relating Height vs Number of Nodes
   1. call the total number of nodes in the tree n, and the height of the tree h
   2. log base2 of (n+1) = h
   3. A perfect tree is balanced, and in a perfect tree the height grows logarithmically with the number of nodes <https://www.interviewcake.com/concept/python/tree?#balanced>
