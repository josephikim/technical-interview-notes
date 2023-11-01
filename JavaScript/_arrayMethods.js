// MAP()

// REDUCE()

// Slick way
const numbers = [175, 50, 25];

document.getElementById("demo").innerHTML = numbers.reduce(myFunc); // returns 175 - 50 - 25 = 100;

function myFunc(total, num) {
  return total - num;
}

// Manual way
const reducer = (accumulator, currentValue) => {
  // same as myFunc above
  return accumulator * currentValue;
};

let multiply = (...args) =>
  args.reduce((accumulator, currentValue) => {
    return accumulator * currentValue;
  }, 1);

let multiplySlick = (...args) => args.reduce(reducer, 1);

// FILTER()

// SORT()

// Default sort (ie array.sort() without callback) is insertion sort -
function insertionSort(inputArr) {
  let n = inputArr.length;
  for (let i = 1; i < n; i++) {
    // Choosing the first element in our unsorted subarray
    let current = inputArr[i];

    // The last element of our sorted subarray
    let j = i - 1;

    // Move down the sorted array, shift each element up one until 'current' is greater than element at j
    while (j > -1 && current < inputArr[j]) {
      inputArr[j + 1] = inputArr[j];
      j--;
    }
    // insert the element at j+1 (which should be an empty slot due to shifting up)
    inputArr[j + 1] = current;
  }
  return inputArr;
}

let inputArr = [5, 2, 4, 6, 1, 3];
insertionSort(inputArr);
console.log(inputArr);

// CUSTOM SORTS
// Sort numbers
const sortByNumber = array.sort((a, b) => {
  return a.number - b.number;
});

// Sort strings
const sortByString = array.sort((a, b) => {
  if (a.str < b.str) return -1;
  return 1;
});

// Custom sort based on value
const sortByValue = array.sort((a, b) => {
  if (a.prop === "myValue") return 1;
  return -1;
});

// SHIFT()
// Removes first element from array
// Returns removed element
// Modifies original array

// UNSHIFT(element0, element1, /* … ,*/ elementN)
// Adds one or more elements to begining of array
// Modifies original array
// Returns length of new array

// EVERY()

// SOME()

// REVERSE()
// same as array.sort() but descending NOTE: ONLY WORKS WITH STRINGS

// SLICE()
// Returns shallow copy of portion of an array
// Original array does not change
// Copied portion is bounded by startIndex to endIndex (endIndex item not included)
// If slice() is called with no args, just returns copy of entire array
// Can accept floating point indexes (bc they are converted to integer via ES Abstract Function ToInteger())
slice(start, end);

// SPLICE()
// Deletes and inserts values from array
// Modifies array in place
// Returns array of deleted items (can be empty array[])
// Can accept floating point indexes (bc they are converted to integer via ES Abstract Function ToInteger())
splice(start, deleteCount, insertionItem1, insertionItem2, insertionItemN);

// Example used in mergeSort()
const left = array.splice(0, half); // returns first half of original array (bc it got deleted) and mutates array to have only second half of its original items

// Array.prototype.toString()
// Method that OVERRIDES the default Object.toString() method and returns a string representation containing each array element separated by a comma

// Calling toString() explicitly on an array
let array = [];
array.toString(); // ""  It returns an empty string.

let array1 = [1, 2, 3];
array1.toString(); // "1,2,3"  It returns a string containing each element in the array seperated by a comma.

// To OVERRIDE THE OVERRIDE (ie to call Object.prototype.toString()) you need to use function.call()
console.log(Object.prototype.toString.call([1, 2, 3])); // [object Array]
