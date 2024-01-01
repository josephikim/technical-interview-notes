# Definition

A Trie is a specialized tree-based data structure that facilitates **efficient string searching**. Each node of the Trie corresponds to a single character of a string. A series of nodes then make up a string. The root of the Trie is generally an empty node.

# Why Use Tries?

Tries have several advantages over other data structures when it comes to string handling:

1. Searching for a string in a Trie can be done in O(M) time complexity, where M is the length of the string. This is faster than searching for a string in an unsorted array (O(NM)) or a sorted array (O(M log N)).
2. Tries support prefix-based searches effectively.
3. They also provide auto-suggestions for auto-completion features.

# Implementing Trie in JavaScript

```
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

        for(let i = 0; i < word.length; i++) {
            if(!node.children[word[i]]) {
                node.children[word[i]] = new TrieNode();
            }

            node = node.children[word[i]];
        }

        node.end = true;
    }

    search(word) {
        let node = this.root;

        for(let i = 0; i < word.length; i++) {
            if(node.children[word[i]]) {
                node = node.children[word[i]];
            } else {
                return false;
            }
        }

        return node.end;
    }
}
```