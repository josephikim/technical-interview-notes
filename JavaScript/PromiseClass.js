// Implmenting your own Promise class

class MyPromise {
	constructor(executionFunction) {
		this.promiseChain = [];
		this.handleError = () => {};

		this.onResolve = this.onResolve.bind(this);
		this.onReject = this.onReject.bind(this);

		executionFunction(this.onResolve, this.onReject);
	}

	then(handleSuccess) {
		this.promiseChain.push(handleSuccess);

		return this;
	}

	catch(handleError) {
		this.handleError = handleError;

		return this;
	}

	onResolve(value) {
		let storedValue = value;

		try {
			this.promiseChain.forEach((nextFunction) => {
				storedValue = nextFunction(storedValue);
			});
		} catch (error) {
			this.promiseChain = [];

			this.onReject(error);
		}
	}

	onReject(error) {
		this.handleError(error);
	}
}

//  ------------------- Test resolve
const resolveTest = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve("Success!");
	}, 1000);
});

resolveTest
	.then((value) => {
		console.log("Resolved:", value); // LOG Resolved
	})
	.catch((reason) => {
		console.error("Rejected:", reason);
	});

// Test reject
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
