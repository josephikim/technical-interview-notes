// A dictionary should be though of as a static entity (which you can initialize however you want)
// So when trying to find the highest scoring word given a wordlist and a set of tiles:
// instead of using a two-param function ie findBestWord(wordlist, tiles), think of the wordlist as a contructor entity

// During constructor phase, also generate info that would help subsequent function calls e.g. a hashmap where each word in wordlist is mapped to its highest possible score.

// BUT MOST IMPORTANT - Which data structure will allow us to
//
// TRAVERSE DATA MOST EFFICIENTLY
//
// ie can it be structured as a binary search tree or max heap?

class scoreOptimizer {
  constructor(wordlist) {
    // Either do some sorting or create a data structure ie a dictionary
    this.wordlist = wordlist.someSortingOrStructuringFunction();
  }

  // generates array of tuples [word, maxscore] sorted by descending max score
  someSortingOrStructuringFunction(words) {
    let wordlist = [];
    for (const word of words) {
      let score = 0;
      for (const letter of word) {
        score += letterValues[letter];

        wordlist.push([word, maxScore]);

        wordlist.sort((a, b) => b[1] - a[1]);
      }
    }
    return wordlist;
  }
  findBestWord(tiles) {
    // logic using constructed wordlist
  }
}

const tiles = "biejs_kejf__";

const optimizer = new scoreOptimizer();
optimizer.findBestWord(tiles);
