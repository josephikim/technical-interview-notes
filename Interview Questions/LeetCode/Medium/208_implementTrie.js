// A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

// Implement the Trie class:

// -Trie() Initializes the trie object.
// -void insert(String word) Inserts the string word into the trie.
// -boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
// -boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

// Example 1:

// Input
// ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
// [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
// Output
// [null, null, true, false, true, null, true]

// Explanation
// Trie trie = new Trie();
// trie.insert("apple");
// trie.search("apple");   // return True
// trie.search("app");     // return False
// trie.startsWith("app"); // return True
// trie.insert("app");
// trie.search("app");     // return True

// Constraints:

// 1 <= word.length, prefix.length <= 2000
// word and prefix consist only of lowercase English letters.
// At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.

/***********************************/

var TrieNode = function (value, sentinel = false) {
	this.value = value;
	this.sentinel = sentinel;
	this.next = {}; // key = [char], value = TrieNode(char)
};

var Trie = function () {
	this.head = new TrieNode(null, false);
};

/**
 * @param {string} word
 * @return {void}
 */
// Time Complexity = O(n)
// Space Complexity = O(1)
Trie.prototype.insert = function (word) {
	let curr = this.head;

	for (let i = 0; i < word.length; i++) {
		if (word.charAt(i) in curr.next) {
			curr = curr.next[word.charAt(i)];
		} else {
			const neighbor = new TrieNode(word.charAt(i));
			curr.next[word.charAt(i)] = neighbor;
			curr = neighbor;
		}
		if (i === word.length - 1) {
			curr.sentinel = true;
		}
	}
	return curr.value;
};

/**
 * @param {string} word
 * @return {boolean}
 */
// Searches for entire string and last node has sentinel value = true
// Time Complexity = O(n)
// Space Complexity = O(1)
Trie.prototype.search = function (word) {
	let curr = this.head;
	for (let i = 0; i < word.length; i++) {
		if (word.charAt(i) in curr.next) {
			curr = curr.next[word.charAt(i)];
		} else {
			return false;
		}
	}
	if (curr.sentinel === true) return true;
	return false;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
// Time Complexity = O(n)
// Space Complexity = O(1)
Trie.prototype.startsWith = function (prefix) {
	let curr = this.head;
	for (let i = 0; i < prefix.length; i++) {
		if (prefix.charAt(i) in curr.next) {
			curr = curr.next[prefix.charAt(i)];
		} else {
			return false;
		}
	}
	return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

const obj = new Trie();
obj.insert("apple");
console.log(obj.search("apple"));
console.log(obj.search("app"));
console.log(obj.search("abv"));
console.log(obj.startsWith("app"));
console.log(obj.startsWith("abv"));

/*********************/
// Object prototype syntax
// Barebones implementation (no TrieNode objects)
// Uses while loops to loop strings
// Only properties are "dictionary", "complete", and single-character keys for child objects

var Trie = function () {
	this.dictionary = {};
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
	let index = 0;
	let head = this.dictionary;
	while (index < word.length) {
		const char = word[index];
		if (head[char] === undefined) head[char] = {};
		head = head[char];
		index++;
	}
	head["complete"] = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
	let index = 0;
	let head = this.dictionary;
	while (index < word.length) {
		const char = word[index];
		if (head[char] === undefined) {
			return false;
		}
		head = head[char];
		index++;
	}
	if (head["complete"]) {
		return true;
	} else {
		return false;
	}
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
	let index = 0;
	let head = this.dictionary;
	while (index < prefix.length) {
		const char = prefix[index];
		if (head[char] === undefined) {
			return false;
		}
		head = head[char];
		index++;
	}
	return true;
};

/*********************/
// ES6 Class syntax
// Barebones implementation (no TrieNode objects)
// Only properties are "root", "isWord", and single-character keys for child objects

class Trie {
	constructor() {
		this.root = {};
	}

	/**
	 * @param {string} word
	 * @return {void}
	 */
	insert(word) {
		let curr = this.root;
		for (const w of word) {
			if (!curr[w]) {
				curr[w] = {};
			}
			curr = curr[w];
		}
		curr.isWord = true;
	}

	/**
	 * @param {string} word
	 * @return {boolean}
	 */
	search(word) {
		let curr = this.root;

		for (const w of word) {
			if (!curr[w]) {
				return false;
			}
			curr = curr[w];
		}

		return curr.isWord !== undefined;
	}

	/**
	 * @param {string} prefix
	 * @return {boolean}
	 */
	startsWith(prefix) {
		let curr = this.root;

		for (const p of prefix) {
			if (!curr[p]) {
				return false;
			}
			curr = curr[p];
		}

		return true;
	}
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
