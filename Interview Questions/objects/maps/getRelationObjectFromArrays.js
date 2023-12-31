// Given array of sample and tasks, where each sample has one related task but a task may or may not have a related sample:

// output an array of objects where the object's key is task name and object's value is an array of related samples that have status: ready.

const samples = [
	{ name: "bob", status: "pending", taskId: "1" },
	{ name: "mary", status: "ready", taskId: "2" },
	{ name: "john", status: "failed", taskId: "2" },
];

const tasks = [
	{ id: "1", name: "dig", sample: "bob" },
	{ id: "2", name: "scratch", sample: "larry" },
	{ id: "3", name: "jump", sample: "null" },
	{ id: "4", name: "crawl", sample: "mary" },
];

/*******************************/

// Iterative solution (array.reduce)

const getTasksWithReadySamples = (tasks) => {
	const result = tasks.reduce((acc, task) => {
		acc[task.name] = samples.filter((sample) => {
			return sample.name === task.sample && sample.status === "ready"; // Don't forget 'return' statement if using a function block
		});

		return acc; // Don't forget to return the accumulator!
	}, {});

	return result;
};

/*******************************/

// Iterative solution (array.map)

// const getTasksWithReadySamples = (tasks) => {
// 	const result = {};

// 	tasks.map((task) => {
// 		result[task.name] = samples.filter((sample) => {
// 			return sample.name === task.sample && sample.status === "ready";
// 		});
// 	});

// 	return result;
// };

console.log(getTasksWithReadySamples(tasks));
