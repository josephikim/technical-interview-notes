// A dictionary should be thought of as a static entity (which you can initialize however you want)

// Problem: find the highest scoring word given an inputList and a set of tiles

// Solution: Instead of using a two-param function ie findBestWord(inputList, tiles), think of initializing inputList as a contructor entity

// MEANING: findBestWord() doesn't have to rely strictly on inputList as is. It can instead use some other derivative list (ie this.wordList created via constructor) that will be optimized for findBestWord() e.g. so you can do lookups with complexity O(1).

// MOST IMPORTANT - Which data structure will allow us to traverse data efficiently?
// IE can wordList be structured as a binary search tree or max heap? YES BUT NOT EFFICIENT
// SOLUTION: Use a trie structure (best for efficient string searches)

// OPTIONAL: During constructor phase, also generate info that would help subsequent function calls e.g. a hashmap where each word in wordList is mapped to its highest possible score.

const alphabet = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];
const alphabetScore = [
	1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4,
	10,
];

const scores = alphabet.reduce((acc, value, i) => {
	acc[value] = alphabetScore[i];
	return acc;
}, {});

class scoreOptimizerDict {
	constructor(inputList) {
		// Either do some sorting or create a data structure ie a dictionary
		this.wordList = this.createTrie(inputList);
	}

	createTrie(inputList) {
		const trie = new Trie();

		for (const word of inputList) {
			trie.insert(word);
		}
		console.log({ trie });
		return trie;
	}

	findBestWordInTrie(tiles) {
		// first find set of all possible words given the tiles
		const possible = findPossibleWordsInTrie(tiles);
		console.log({ possible });
	}

	findPossibleWordsInTrie(tiles) {
		const result = [];

		// const tileFreq = new Array(26).fill(0);

		// for (let i = 0; i < tiles.length; i++) {
		// 	tileFreq[tiles.charCodeAt(i) - "a".charCodeAt(0)]++;
		// }

		// // tileFreq arr should be all non-negative if a scrabble was possible
		// for (let i = 0; i < tileFreq.length; i++) {
		// 	if (tileFreq[i] > 0) {
		// 		this.wordList.searchWordsFrom(this.wordList.root, tileFreq[i], result)
		// 	}
		// }

		let sorted = Array.from(tiles).sort().join("");
		console.log({ sorted });
		for (const char in sorted) {
			findSorted;
		}

		return result;
	}

	// uses unicode solution (see Leetcode 242)
	canMakeWord(tiles, word) {
		if (tiles.length < word.length) {
			return false;
		}
		console.log({ tiles });
		console.log({ word });

		const tileFreq = new Array(26).fill(0);

		for (let i = 0; i < tiles.length; i++) {
			tileFreq[tiles.charCodeAt(i) - "a".charCodeAt(0)]++;
			tileFreq[word.charCodeAt(i) - "a".charCodeAt(0)]--;
		}

		// tileFreq arr should be all non-negative if a scrabble was possible
		for (let i = 0; i < tileFreq.length; i++) {
			if (tileFreq[i] < 0) {
				return false;
			}
		}

		return true;
	}
}

class TrieNode {
	constructor() {
		this.end = false;
		this.children = {};
	}
}

class Trie {
	constructor() {
		this.root = new TrieNode();
	}

	insert(word) {
		let node = this.root;

		for (let i = 0; i < word.length; i++) {
			if (!node.children[word[i]]) {
				node.children[word[i]] = new TrieNode();
			}

			node = node.children[word[i]];
		}

		node.end = true;
	}

	search(word) {
		let node = this.root;

		for (let i = 0; i < word.length; i++) {
			if (node.children[word[i]]) {
				node = node.children[word[i]];
			} else {
				return false;
			}
		}

		return node.end;
	}

	// searches wordlist for all words beginning with a string prefix
	// searchWordsFrom(node = this.root, string = '', words = []) {
	//   if (!node) return;
	//   if (node.end) words.push(string);
	//   let possibleNextChars = Object.keys(node.children)
	//   possibleNextChars.forEach((char) => {
	//     string+=char;
	//     this.searchWordsFrom(node[string], string, words)
	//   })
	// }
}

const inputList = [
	"monitor",
	"program",
	"application",
	"keyboard",
	"javascript",
	"gaming",
	"network",
];

const tiles = "biejs_kejf__";

const optimizer = new scoreOptimizerDict(inputList);
optimizer.findBestWord(tiles);
