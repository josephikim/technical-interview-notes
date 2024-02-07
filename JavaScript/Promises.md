# What is a promise and how does it work?

1. A Promise in JavaScript is an object representing the eventual completion or failure of an asynchronous operation. It enables you to register callbacks for notifications when the operation completes or fails and to handle errors or results. Promises provide a way to write asynchronous code that is more readable and manageable than using callback functions. A Promise has three states, which are Pending, Fulfilled and Rejected.

2. Creating a Promise is possible using the Promise constructor, which requires the executor function. The executor function receives two arguments, namely, resolve and reject. You can call resolve when the operation succeeds and reject when the operation fails.

# Explain the states of a promise?

A Promise has three states. 

-The Pending state is the initial state of a Promise. It means that the operation is yet to fulfil the Promise. 
-The Fulfilled state depicts the successful completion of the asynchronous operation. At this point, the Promise has a value, which is accessible via the `then` method. 
-The rejected state indicates the failure of the Promise's asynchronous operation. The Promise has a reason for rejection, which you can access via the `catch` method.

One key point is that a Promise can only transition from Pending to Fulfilled or Rejected. Once it is in either state, it cannot change to another state.

# Explain how to chain multiple Promises together and the syntax for doing so?

Chaining multiple Promises together means that you perform several asynchronous operations in a specific order, where each operation depends on the success of the previous operation. The syntax for chaining Promises is simple. You use the `then` method on the previous Promise to return a new Promise that performs the next operation. The value that returns from the previous `then` block passes as an argument to the next `then` block, allowing you to pass data between Promise chains.

# How can you convert a callback-based function to a Promise-based function?

To convert a callback-based function to a Promise-based function, you can wrap the callback-based function with a Promise and pass the `resolve` and `reject` functions to it. You call the `resolve` function when the asynchronous operation is successful and the `reject` function when the operation fails. You return the Promise in the function and `resolve` or `reject` the Promise based on the result of the asynchronous operation. It is possible for callers of the Promise-based function to use the `then` method to access the resolved value and the `catch` method to handle errors.

```const readFilePromise = (...args) => {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

readFilePromise(filePath, options)
  .then(data => {/* Do something with data */})
  .catch(err => {/* Handle error */})
```

```
// Non Node-style example

const shootPeasPromise = (...args) => {
  return new Promise((resolve, reject) => {
    // This is not a Node styled callback. 
    // 1. data is the first argument 
    // 2. err is the second argument
    shootPeas(...args, (data, err) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
```

# What is a race condition and how can you prevent it when using Promises?

A race condition occurs when two or more asynchronous operations compete for the same resource, and the outcome of the competition depends on the timing of the operations. This can produce unexpected behaviour, as the result of the operations may vary depending on their order of execution. One way to prevent race conditions when using Promises is to use the `Promise.all()` method. This method takes an array of Promises as its argument and returns a single Promise that resolves after the resolution of all the Promises in the array.

# Explain the concept of async/await and how it relates to Promises?

The async/await is a syntax sugar for Promises in JavaScript. The async keyword defines an asynchronous function, and the await keyword waits for the result of a Promise. **This enables you to write asynchronous code that looks and behaves like synchronous code.** With these keywords, you can write asynchronous code that is easy to read and understand, which makes it easier to maintain and debug.

# Implmenting your own Promise class

```
class MyPromise {
	constructor(main) {
		this.value = null;
		this.callBacks = [];

		resolve = (resolveValue) => {
			console.log("resolve hit");
			this.value = resolveValue;
			this.triggerCallbacks();
		};
		reject = (rejectValue) => {
			console.log("reject hit");
			this.value = rejectValue;
			this.triggerCallbacks();
		};

		main(resolve, reject);
	}

	then(cb) {
		const next = new MyPromise((resolve) => {
			this.callBacks.push((x) => resolve(cb(x)));
		});
		return next;
		// this.callBacks.push(cb)
	}

	triggerCallbacks() {
		this.callBacks.forEach((cb) => cb(this.value));
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
	});```