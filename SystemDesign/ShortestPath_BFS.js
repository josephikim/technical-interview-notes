// https://jarednielsen.com/data-structure-graph-shortest-path/

// How to Find the Shortest Search Path between Two Vertices?

// Apply BFS for undirected graph
// Return a path between two nodes

class Graph {
	constructor() {
		this.vertices = [];
		this.adjacent = {};
		this.edges = 0;
	}

	addVertex(v) {
		this.vertices.push(v);
		this.adjacent[v] = [];
	}

	addEdge(v, w) {
		this.adjacent[v].push(w);
		this.adjacent[w].push(v);
		this.edges++;
	}

	bfs(goal, root = this.vertices[0]) {
		let adj = this.adjacent;

		const queue = [];
		queue.push(root);

		const discovered = [];
		discovered[root] = true;

		const edges = [];
		edges[root] = 0;

		const predecessors = [];
		predecessors[root] = null;

		const buildPath = (goal, root, predecessors) => {
			const stack = [];
			stack.push(goal);

			let u = predecessors[goal];

			while (u != root) {
				stack.push(u);
				u = predecessors[u];
			}

			stack.push(root);

			let path = stack.reverse().join("-");

			return path;
		};

		while (queue.length) {
			let v = queue.shift();

			if (v === goal) {
				return {
					distance: edges[goal],
					path: buildPath(goal, root, predecessors),
				};
			}

			for (let i = 0; i < adj[v].length; i++) {
				if (!discovered[adj[v][i]]) {
					discovered[adj[v][i]] = true;
					queue.push(adj[v][i]);
					edges[adj[v][i]] = edges[v] + 1;
					predecessors[adj[v][i]] = v;
				}
			}
		}

		return false;
	}
}

const g = new Graph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");
g.addVertex("G");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("A", "D");
g.addEdge("B", "C");
g.addEdge("B", "D");
g.addEdge("C", "D");
g.addEdge("C", "E");
g.addEdge("D", "F");
g.addEdge("F", "G");

console.log(g.bfs("G", "A"));
