// https://medium.com/a-layman/practicing-system-design-in-javascript-cache-system-and-the-shortest-path-for-graph-9e0408687f5f

// Please Design a Cache for a Single System?
// Requirements
// Design a cache system with the following properties.

// Efficient lookups given a key
// Expiration of old data so that it can be replaced with new data
// Design a Cache System in JavaScript
// To design a cache system, we may use the following data structures.

// Hash Table: the property of Hash Table allows us easy lookups data (O(1) ~ O(n)) but wouldn’t allow easy data purging
// Linked List: The property of Linked List allows us purging of old data. The purging action consist of moving the fresh item to the front (O(n)) and removing the last element when the list exceeds a certain size(O(n))

class Cache {
  constructor(cacheSize = defaultCacheSize) {
    this.cacheSize = cacheSize;
    this.map = new HashTable();
    this.linkedList = new LinkedList();
    this.size = 0;
  }

  getResults(key) {
    // Get value from the hash table: O(1)
    let node = this.map.get(key);
    if (node != undefined) {
      // Move the fresh item to the front: O(n)
      this.linkedList.moveToFront(node);
      return node;
    }
    return null;
  }

  insertResults(key, value) {
    // Update the node
    // Get value from the hash table: O(1)
    let node = this.map.get(key);
    if (node != undefined) {
      node.val = value;
      // Move the fresh item to the front: O(n)
      this.linkedList.moveToFront(node);
      return;
    }
    // Insert the node: O(1)
    this.linkedList.preppend(key, value);
    this.map.set(key, value);
    this.size = this.size + 1;

    // Remove the last node of the Linked list: O(1)
    if (this.size > this.cacheSize) {
      // O(1)
      this.map.delete(this.linkedList.tail.key);
      // O(1)
      this.linkedList.delete(this.linkedList.tail.val);
    }
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
  //O(n)
  delete(value) {
    //refer to: https://medium.com/a-layman/learning-data-structure-in-javascript-for-beginners-f5752363a4e1#8804
  }
  //O(1)
  prepend(key, value) {
    const newNode = new Node(key, value);
    newNode.next = this.head;
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }
  //O(n)
  moveToFront(node) {
    let currentNode = this.head;
    while (currentNode && currentNode.next) {
      if (currentNode.next === node) {
        currentNode.next = currentNode.next.next;
        node.next = this.head;
        this.head = node;
        return;
      }
      currentNode = currentNode.next;
    }
  }
}
