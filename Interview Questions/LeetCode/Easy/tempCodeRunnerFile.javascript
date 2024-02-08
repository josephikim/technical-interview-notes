const rejectTest = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		reject("Error!");
	}, 1000);
});

rejectTest
	.then((value) => {
		console.log("Resolved:", value);
	})
	.catch((reason) => {
		console.error("Rejected:", reason); // LOG Rejected
	});
