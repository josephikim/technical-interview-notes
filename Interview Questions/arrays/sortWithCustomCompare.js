// NOTE: Array.prototype.sort() returns the reference to the same array now sorted

// Sort the test array below according to the following criteria:

// 1. elements without an 'order' field should go first
// 2. elemnts with an 'order' field should be sorted according to ascending order value

const test = [
	{ _id: "name", order: 1 },
	{ _id: "is", order: 2 },
	{ _id: "my", order: 0 },
	{ _id: "oh I would be very first" },
	{ _id: "adam", order: 3 },
];

const x = test.sort((a, b) => {
	const [STAY, SWAP] = [-1, 1];
	if (!a.hasOwnProperty("order")) {
		return STAY;
	}
	if (!b.hasOwnProperty("order")) {
		return SWAP;
	}
	return a.order - b.order;
});

console.log(x);
