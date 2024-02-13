// Implmenting your own Promise class
// Note: catch(failureCallback) is short for then(null, failureCallback)

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
				try {
					this.onFulfilledCallbacks.forEach((fn) => fn(value));
				} catch (err) {
					console.log("resolve err:", err);
					this.onRejectedCallbacks.forEach((fn) => fn(value));
				}
			}
		};

		const reject = (value) => {
			console.log("reject value:", value);

			if (this.status === "pending") {
				this.status = "rejected";
				console.log("rej status", this.status);
				this.value = value;
				try {
					console.log("callbakcs", this.onRejectedCallbacks);
					this.onRejectedCallbacks.forEach((fn) => fn(value));
				} catch (err) {
					console.log("reject err:", err);
					// this.onRejectedCallbacks.forEach((fn) => fn(value));
					// return err
				}
			}
		};

		try {
			handler(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	// catch(handleError) {
	// 	this.handleError = handleError;

	// 	return this;
	// }
	catch(onRejected) {
		console.log("onrejected:", onRejected.toString());
		return new MyPromise((resolve, reject) => {
			try {
				// console.log("this.value", this.value);
				const rejectedFromLastPromise = onRejected(this.value);
				console.log({ rejectedFromLastPromise });
				reject(rejectedFromLastPromise);
			} catch (err) {
				console.log("catch err:", err);
				reject(err);
			}
		});
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
			}

			// if (this.status === "rejected") {
			// 	this.onRejectedCallbacks.push(() => {
			// 		try {
			// 			console.log("this.value;", this.value);
			// 			const rejectedFromLastPromise = onRejected(this.value);
			// 			console.log({ rejectedFromLastPromise });
			// 			if (rejectedFromLastPromise instanceof MyPromise) {
			// 				rejectedFromLastPromise.then(resolve, reject);
			// 			} else {
			// 				reject(rejectedFromLastPromise);
			// 			}
			// 		} catch (err) {
			// 			reject(err);
			// 		}
			// 	});
			// }

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
					console.log("err value:", this.value);
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
})
	.then((res) => {
		console.log(res);
		throw new Error("catch me!");
	})
	.catch((reason) => {
		console.log("error:", reason);
		return reason;
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
