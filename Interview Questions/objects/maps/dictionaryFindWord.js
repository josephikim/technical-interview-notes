// Youtube: https://www.youtube.com/watch?v=yju4zwKSriI

// function setup(input)
// function isInDict(word)

// setup(['cat', 'cat', 'bar'])
// isInDict('cat') // true
// isInDict('bat') // false

// Wildcard
// isInDict('*at') // true
// isInDict('cr*') // false

class Dictionary {
	constructor(wordsArray) {
		this.dict = wordsArray;
		// or alternatively using Set
		// this.dict = new Set(wordsArray)
	}

	// if dict is initialized as a Set
	// isInDict(word) {
	//   return this.dict.has(word)
	// }

	// Note: this function will support MORE THAN ONE WILDCARD
	// Translate wildcard characters into a regExp expression, then test it against each dictionary word that results from the dict.some() function.
	// This is better than just doing this.dict.includes(word) repeatedly
	isInDict(word) {
		return this.dict.some((dictWord) => {
			const regexTemplate = word.replaceAll("*", ".");
			const regex = new RegExp(`^${regexTemplate}$`);
			return regex.test(dictWord);
		});
	}
}

// Time complexities

// constructor == O(1)
// isInDict == O(n) for array.some() + O(n) for regexp => O(n)
//// array.some() = O(n) ie n being length of array
//// regex.test() = min bound is related to length of word being tested

/*******************************/

// How to do more optimization in constructor function in order to simplify isInDict()?
class BetterDictionary {
	// APPLIES FOR WORDS HAVING ONE WILDCARD CHARACTER ONLY
	// This time we are not only adding entries like {'cat': 'cat'} to the wordMap
	// but also adding {'*at': true}, {'c*t': true}, {'ca*': true} and so on, so that isInDict() can literally just do one O(1) lookup.

	constructor(wordsArray) {
		const wordMap = wordsArray.reduce((accumulator, word) => {
			accumulator[word] = word;

			word.split("").forEach((letter, i) => {
				const start = word.slice(0, i);
				const end = word.slice(i + 1);
				const partialWord = `${start}*${end}`;

				accumulator[partialWord] = true;
			});
			return accumulator;
		}, {});

		this.dict = wordMap;
	}

	isInDict(word) {
		return !!this.dict[word];
	}
}

/*************************/

// What about more than one wildcard character?

// Solution 1: just stick with dictionary solution above since lookup will still be O(1) regardless of space complexity;

// Solution 2: Use a character map that acutally includes star characters all the way through bc this would still be complexity O(1) lookup

// {
//   c: {
//     a: {
//       t: true,
//       r: true
//     }
//   },
//   *: {
//     *: {
//       t: true,
//       r: true
//     }
//   }
// }
