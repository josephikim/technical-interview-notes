// https://motional.zoom.us/j/99575745138?pwd=dW1LQzAxNTFRRnFOOVI0RXZJNVV3dz

// Given array of sample and tasks, where each sample has one related task but a task may or may not have a related sample, output an array of objects where key is task name and value is an object of related tasks that have status: ready.
const samples = [
  { name: "bob", status: "pending", taskId: "1" },
  { name: "mary", status: "ready", taskId: "2" },
  { name: "john", status: "failed", taskId: "2" },
];

const tasks = [
  { id: "1", name: "dig", sample: "bob" },
  { id: "2", name: "scratch", sample: "larry" },
  { id: "3", name: "jump", sample: "null" },
];

// Similar example

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
