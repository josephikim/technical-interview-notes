// Closures are simply a combination of a function with some preserved data (provided via the function's lexical scope)

// In JS functions, values can either be passed as an argument or set as a local variable. Closures allow you to:

// 1. avoid passing in arguments for every function call
// 2. preserve some scoped data by tying it to a particular function instance
// 3. PROTECT scoped variables tied to a function from modification via the global scope

// Examples (Least to Most complex)

//// Level 1 - GLOBAL SCOPE
//// The global scope serves as the lexical scope used by addTo()

var passed = 3;

var addTo = function () {
	var inner = 2;
	return passed + inner;
};
console.log(addTo()); // 5

var passed = 4;
console.log(addTo()); // 6

//// Level 2 - INNER FUNCTION
//// The forEach loop serves as the lexical scope for the inner callback function
const buttons = document.querySelectorAll("button");

buttons.forEach((button, i) => {
	button.addEventListener("click", (e) => {
		console.log(i);
	});
}); // 0, 1, 2

//// Level 3 - INNER FUNCTION CALLED FROM THE OUTSIDE
//// The returned function uses the lexical scope of makeFunc()
function makeFunc() {
	const name = "Mozilla";
	function displayName() {
		console.log(name);
	}
	return displayName;
}
const myFunc = makeFunc();
myFunc(); // "Mozilla"

//// Level 4 - INNER FUNCTION WIH CUSTOM SCOPED DATA
//// Each returned function can be tied to unique data via the outer function's lexical scope
var addTo = function (passed) {
	var add = function (inner) {
		return passed + inner;
	};
	return add;
};
var addThree = new addTo(3); // 'new' keyword creates a new function object (instance), thus a new 'this'
var addFour = new addTo(4);

console.log(addThree(1)); // 4
console.log(addFour(1)); // 5

//// Level 5 - INNER FUNCTION WITH IIFE (Immediately Invoked Function Expression)
//// The IIFE runs only once, but the returned function is still tied to data in the IIFE's scope, thus making this pattern useful for constructing a counter.
//// NOTE: 'counter' cannot be modified from the global scope.

const increment = (function () {
	let counter = 0;
	return function () {
		counter += 1;
		return counter;
	};
})();

increment(); // 1
increment(); // 2
increment(); // 3
