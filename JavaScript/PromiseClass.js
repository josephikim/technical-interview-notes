// Implmenting your own Promise class

// Supports async callbacks
class MyPromise {
	constructor(handler) {
		this.status = "pending";
		this.onFulfilledCallbacks = [];
		this.onRejectedCallbacks = [];

		const resolve = (value) => {
			if (this.status === "pending") {
				this.status = "fulfilled";
				this.value = value;
				this.onFulfilledCallbacks.forEach((fn) => fn(value));
			}
		};

		const reject = (value) => {
			if (this.status === "pending") {
				this.status = "rejected";
				this.value = value;
				this.onRejectedCallbacks.forEach((fn) => fn(value));
			}
		};

		try {
			handler(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	catch(handleError) {
		this.handleError = handleError;

		return this;
	}

	then(onFulfilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			if (this.status === "pending") {
				this.onFulfilledCallbacks.push(() => {
					try {
						const fulfilledFromLastPromise = onFulfilled(this.value);
						if (fulfilledFromLastPromise instanceof MyPromise) {
							fulfilledFromLastPromise.then(resolve, reject);
						} else {
							resolve(fulfilledFromLastPromise);
						}
					} catch (err) {
						reject(err);
					}
				});
				this.onRejectedCallbacks.push(() => {
					try {
						const rejectedFromLastPromise = onRejected(this.value);
						if (rejectedFromLastPromise instanceof MyPromise) {
							rejectedFromLastPromise.then(resolve, reject);
						} else {
							reject(rejectedFromLastPromise);
						}
					} catch (err) {
						reject(err);
					}
				});
			}

			if (this.status === "fulfilled") {
				try {
					const fulfilledFromLastPromise = onFulfilled(this.value);
					if (fulfilledFromLastPromise instanceof MyPromise) {
						fulfilledFromLastPromise.then(resolve, reject);
					} else {
						resolve(fulfilledFromLastPromise);
					}
				} catch (err) {
					reject(err);
				}
			}

			if (this.status === "rejected") {
				try {
					const rejectedFromLastPromise = onRejected(this.value);
					if (rejectedFromLastPromise instanceof MyPromise) {
						rejectedFromLastPromise.then(resolve, reject);
					} else {
						reject(rejectedFromLastPromise);
					}
				} catch (err) {
					reject(err);
				}
			}
		});
	}
}

// testing code
let p1 = new MyPromise((resolve, reject) => {
	setTimeout(() => resolve("resolved first one"), 1000);
});

p1.then((res) => {
	console.log(res);
	return new MyPromise((resolve) => {
		setTimeout(() => resolve("resolved second one"), 1000);
	});
}).then((res) => {
	console.log(res);
});

/*********************************/

// Only supports synchronous callbacks

// class MyPromise {
// 	constructor(executionFunction) {
// 		this.promiseChain = [];
// 		this.handleError = () => {};

// 		this.onResolve = this.onResolve.bind(this);
// 		this.onReject = this.onReject.bind(this);

// 		executionFunction(this.onResolve, this.onReject);
// 	}

// 	then(handleSuccess) {
// 		this.promiseChain.push(handleSuccess);

// 		return this;
// 	}

// 	catch(handleError) {
// 		this.handleError = handleError;

// 		return this;
// 	}

// 	onResolve(value) {
// 		let storedValue = value;

// 		try {
// 			this.promiseChain.forEach((nextFunction) => {
// 				storedValue = nextFunction(storedValue);
// 			});
// 		} catch (error) {
// 			this.promiseChain = [];

// 			this.onReject(error);
// 		}
// 	}

// 	onReject(error) {
// 		this.handleError(error);
// 	}
// }

//  ------------------- Test resolve
// const resolveTest = new MyPromise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve("Success!");
// 	}, 1000);
// });

// resolveTest
// 	.then((value) => {
// 		console.log("Resolved:", value); // LOG Resolved
// 	})
//   .catch((reason) => {
//     console.error("Rejected:", reason);
//   });

// // Test reject
// const rejectTest = new MyPromise((resolve, reject) => {
// 	setTimeout(() => {
// 		reject("Error!");
// 	}, 1000);
// });

// rejectTest
//   .then((value) => {
//     console.log("Resolved:", value);
//   });
//   .catch((reason) => {
//     console.error("Rejected:", reason); // LOG Rejected
//   });
