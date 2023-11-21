# Definition

A heap is a variant of binary tree data structure, with two additional properties:

1. It is a Complete Binary Tree: Each level of a Complete Binary Tree contains the maximum number of nodes, except possibly the last layer, which must be filled from left to right. A Complete Binary Tree is always balanced by it's definition ie height is small relative to the number of nodes it has(height is Math.floor(logbase2(n)), where n is the number of nodes.)

2. Every node satisfies the "heap property": Heap property means that for any given node C, if P is a parent node of C, then:
  1. For a max heap: the key (or value) of P should be greater than or equal to the key of C.
  2. For a min heap: the key (or value) of P should be less than or equal to the key of C.

3. Difference between priority queue and heap
  1. A priority queue is an abstract datatype. It is a shorthand way of describing a particular interface and behavior, and says nothing about the underlying implementation.
  2. A heap is a data structure. It is a name for a particular way of storing data that makes certain operations very efficient.
  3. A heap is a very good data structure to implement a priority queue, because the operations which are made efficient by the heap data strucure are the operations that the priority queue interface needs.

NOTE: Javascript does not have a standard heap / priority queue data structure that you can use out of the box.

## The relationship between parent and children nodes.

The definition of a heap ensures that a Complete Binary Tree of n nodes can only have 1 possible shape. It, in turn, would allow us to represent the Complete Binary tree using an array. Which means, heaps can be represented using arrays too.

If a node is placed at index i in array, then given that the resultant index lies within length of the array:

1. It's left child would be at (2i+1)th position
2. Right child would be at (2i+2)the position
3. If a node is placed at index i in array, it's parent node would be located at floor((i-1)/2)th index.

## Min Heap

### Implementation

There are three key things we want to be able to achieve with the help of our heap data structure:

1. Add a new key into the heap
2. Remove the max or min key from the heap (depending on whether it's min heap or max heap)
3. Get the max of min key from the heap (depending on whether it's min or max heap)

The third operation is quite trivial. We know for the min heap, first item in the array would be the min key and similarly for max heap, first item in the array would max key.

```
function heappush(heap, newKey){
  // push the new key 
  heap.push(newKey);

  // get the current index of pushed key
  let curr = heap.length-1;

 // keep comparing till root is reached or we terminate in middle
  while(curr > 0){
    let parent = Math.floor((curr-1)/2)
    if( heap[curr] < heap[parent] ){
      // quick swap
      [ heap[curr], heap[parent] ] = [ heap[parent], heap[curr] ]
      // update the index of newKey
      curr = parent
    } else{
      // if no swap, break, since we heap is stable now
      break
    }
  } 
}

function heappop(heap){
  // swap root with last node
  const n = heap.length;
  [heap[0], heap[n-1]] = [ heap[n-1], heap[0]]

  // remove the root i.e. the last item (because of swap)
  const removedKey = heap.pop();

  let curr = 0;

  // keep going till atleast left child is possible for current node
  while(2*curr + 1 < heap.length){
    const leftIndex = 2*curr+1; 
    const rightIndex = 2*curr+2;
    const minChildIndex = (rightIndex < heap.length && heap[rightIndex] < heap[leftIndex] ) ? rightIndex :leftIndex;
    if(heap[minChildIndex] < heap[curr]){
     // quick swap, if smaller of two children is smaller than the parent (min-heap)
      [heap[minChildIndex], heap[curr]] = [heap[curr], heap[minChildIndex]]
      curr = minChildIndex
    } else {
      break
    }
  }

  // finally return the removed key
  return removedKey;
}
```
### Creating a heap from an array

Creating a heap from a pre-existing array is pretty simple. Just create an empty heap and then iterate through all items of the array and perform heappush():

```
function heapify(arr){
  const heap = []
  for(let item of arr){
     heappush(heap, item)
  }
  return heap;
}
```

But can we do slightly better here? Yes. First off, we can avoid using extra space for the new heap altogether. Why not just re-arrange the items of the array itself so that it satisfies the heap property? To do this we can follow a similar logic as we did for heap pop. We can look at the first node and compare to it's children to see if it's the smallest one, if not swap it with the smaller child. In fact let's create a function for that called percolateDown(), since we're moving downwards:

```
// follows pretty much the same logic as heappush, except minor modifications

function percolateDown(heap, index) {
  let curr = index;
  // keep going down till heap property is established
  while(2*curr + 1 < heap.length){
    const leftIndex = 2*curr+1; 
    const rightIndex = 2*curr+2;
    const minChildIndex = (rightIndex < heap.length && heap[rightIndex] < heap[leftIndex] ) ? rightIndex :leftIndex;
    if(heap[minChildIndex] < heap[curr]){
     // quick swap, if smaller of two children is smaller than the parent (min-heap)
      [heap[minChildIndex], heap[curr]] = [heap[curr], heap[minChildIndex]]
      curr = minChildIndex
    } else {
      break
    }
  }
}

// now use percolateDown() to rearrange original array

function heapify(heap){
  for(let i in heap){
     percolateDown(heap, i)
   }
  return heap
}
```

So that saves us an extra array. But can we do anything to improve time taken? Yes. If you look closely we're actually doing some repetitive work here. Say there are n nodes in heap, out of which x are leaf nodes then that means we only need to perform percolateDown() for n-x nodes, since last x nodes would be in correct place by then.

So in the array representation of heap, till which index we should perform the percolateDown() operation? Well, till the index where parent of the last node lies. Because as soon as parent of last node is percolated down it'll take care of the last node too. So:

If array length is n:

-Last node's index would be: n-1
-It's parent node's index would be:

`Math.floor(((n-1) - 1) / 2) = Math.floor(n/2 - 1)`

Hence our final heapify function would be:

```
function heapify(heap){
  const last = Math.floor(heap.length/2 - 1);
  for(let i = 0; i <= last; i++){
     percolateDown(heap, i)
   }
  return heap
}
```

### Time and Space Complexity

Time Complexity: 
-O(log(n)) for heappush() and heappop()
-O(nlog(n)) worst case, O(n) average for heapify() 

Space Complexity: O(1)

Looking at the heappush() and heapop() operation, it's apparent that we're running through the height of the tree while trying to add or remove a key. Since heap is a balanced tree, height is log(n) where n is total number of nodes. Hence for push and pop operations of heap the time complexity would be O(log(n)). 

The time complexity for heapify() operation may seem like Onlog(n), since each call takes O(log(n)). This observation is correct for deriving the upper bound of the time complexity for heapify(), however, the asymptotic (averaged) time complexity comes out to be O(n). More details on this ([here)](https://www.geeksforgeeks.org/time-complexity-of-building-a-heap/)). 

In terms of space complexity, it's constant, since extra space is only being taken up by the constant-sized variables like curr, leftIndex etc.

## Max Heap

If we've an implementation of minHeap we can easily use it as a max heap as well. We just need to ensure that while adding values to the heap we insert negative of the key. It would ensure that heap acts as min-heap for negative of all the keys which is equivalent to maxHeap for all the actual keys. Example:

Say we have an array const x = [23, 454, 54, 29];
Min-heap can be created using:

```
const heap = [];
for(let el of x) heappush(heap, el);

// min value
const min = heappop(heap)
```

Max-heap can be created using:

```
const heap = [];
for(let el of x) heappush(heap, -el);

// max value
const max = -heappop(heap)
```