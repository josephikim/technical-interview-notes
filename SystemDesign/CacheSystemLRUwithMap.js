// Design a LRU (Least Recently Used) cache system with the following properties:

// 1. Efficient lookups given a key
// 2. Expiration of old data so that it can be replaced with new data

// To design a cache system, we may use the following data structures.

// Hash Map: Implemented in Javacript using JS Map()

class LRUCache {
	constructor(capacity) {
		this.cache = new Map();
		this.capacity = capacity;
	}

	get(key) {
		if (!this.cache.has(key)) return -1;

		let val = this.cache.get(key);

		this.cache.delete(key);
		this.cache.set(key, val);

		return val;
	}

	put(key, value) {
		this.cache.delete(key);

		if (this.cache.size === this.capacity) {
			this.cache.delete(this.cache.keys().next().value);
			this.cache.set(key, value);
		} else {
			this.cache.set(key, value);
		}
	}

	// Implement LRU/MRU retrieval methods
	getLeastRecent() {
		return Array.from(this.cache)[0];
	}

	getMostRecent() {
		return Array.from(this.cache)[this.cache.size - 1];
	}
}
