// https://medium.com/a-layman/practicing-system-design-in-javascript-cache-system-and-the-shortest-path-for-graph-9e0408687f5f

// How to Find the Shortest Search Path between Two People?
// Requirements
// Apply BFS for the undirected graph
// Return a path between two nodes
// Design a Search Algorithm in JavaScript
// Assume that the data is stored in the hash table. The blow figure shows the level-order traversal for the one direction. We also have to search from the reverse direction for the graph.

// Source code
// The searchLevel function is to perform the level-order traversal. Use a queue to store the source and visit each nodes for the next level. The difference of level-order traversal is that we have to remember visited nodes.

// The mergePaths function is to find the collision person then merge two paths when we get the collision person.

function findPathBiBFS(peopleMap, startIndex, endIndex) {
  let sourceData = new BFSData(peopleMap[startIndex]),
    destData = new BFSData(peopleMap[endIndex]);

  while (!sourceData.isFinished() && !destData.isFinished) {
    let collison = searchLevel(sourceData, destData);
    if (collison !== null) {
      return mergePaths(sourceData, destData);
    }
    collison = searchLevel(destData, sourceData);
    if (collison !== null) {
      return mergePaths(sourceData, destData);
    }
  }

  return null;
}

//Merge two linkedlist
function mergePaths(firstBfs, secondBfs, collisionId) {
  let end1 = firstBfs.visited.get(collisionId);
  let end2 = secondBfs.visited.get(collisionId);
  let pathOne = end1.collapse(true);
  let pathTwo = end2.collapse(false); //reverse
  pathTwo.deleteHead(); //remove collision node
  pathOne.appendList(pathwo);
  return pathOne;
}

//Search the first level of friends then move to the next level
function searchLevel(primaryBfs, secondaryBfs) {
  let size = primaryBfs.toVisit.length;
  for (var i = 0; i < size; i++) {
    //pop the first node
    let pathNode = primaryBfs.toVisit.shift();
    let personId = pathNode.person.id;
    //get the destination node
    if (secondaryBfs.visited.find(personId) !== undefined) {
      return pathNode.person;
    }

    let person = pathNode.person;
    let friends = person.friends;
    for (var i = 0; i < friends.length; i++) {
      if (!primaryBfs.visited.get(friends[i].id) != undefined) {
        let next = new PathNode(friends[i], pathNode);
        primaryBfs.visited.set(friends[i].id, next);
        primaryBfs.toVisit.push(next);
      }
    }
  }
  return null;
}

class Person {
  constructor() {
    this.friends = [];
    this.id = 0;
  }
}

// Data Structures to Use
// To do the level-order search, we need a class to store visited paths and paths will be visited to (BFSData)

// Visited path: use hash table to store visited path can lookup the path easily
// Paths we will visit to: Use a queue (list here) to store paths we will visit to

//The data structure contains visited and toVisit list
class BFSData {
  constructor(root) {
    this.toVisit = [];
    this.visited = new HashTable();
    let sourcePath = new PathNode(root, null);
    this.toVisit.push(sourcePath);
    this.visited.set(root.id, sourcePath);
  }

  isFinished() {
    return this.toVisit.length === 0;
  }
}

class HashTable {
  constructor(hashTableSize = defaultHashTableSize) {
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList());
    this.keys = {};
  }
  hash(key) {}
  get(key) {
    //O(1) ~ O(n)
    //refer to: https://medium.com/a-layman/learning-data-structure-in-javascript-for-beginners-f5752363a4e1#8804
  }
  set(key, value) {
    //O(1) ~ O(n)
    //refer to: https://medium.com/a-layman/learning-data-structure-in-javascript-for-beginners-f5752363a4e1#8804
  }
  delete(key) {
    //O(1) ~ O(n)
    //refer to: https://medium.com/a-layman/learning-data-structure-in-javascript-for-beginners-f5752363a4e1#8804
  }
}

// To store points for a path and recover a path , we need a class to store points with a function to recover a path.

// Adjacency list: Use Linked list for recovering a path

class PathNode {
  constructor(person, previous) {
    this.person = person;
    this.previous = previous;
  }
  collapse(startWithRoot) {
    let path = new LinkedList();
    let node = this;
    while (node) {
      if (startWithRoot) {
        path.append(node.person);
      } else {
        path.preppend(node.person);
      }
      node = node.previous;
    }
    return path;
  }
}

class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  append(value) {
    //refer to: https://medium.com/a-layman/learning-data-structure-in-javascript-for-beginners-f5752363a4e1#8804
  }
  preppend(value) {
    //refer to: https://medium.com/a-layman/learning-data-structure-in-javascript-for-beginners-f5752363a4e1#8804
  }
  deleteHead() {
    //refer to: https://medium.com/a-layman/learning-data-structure-in-javascript-for-beginners-f5752363a4e1#8804
  }
  appendList(node) {
    if (!this.head) {
      return this;
    }
    this.tail.next = node;
    let currNode = this.head;
    while (currNode && currNode.next) {
      currNode = currNode.next;
    }
    this.tail = currNode;
  }
}
