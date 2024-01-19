// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.

// Return true if you can finish all courses. Otherwise, return false.

// Example 1:

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0. So it is possible.

// Example 2:

// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

// Constraints:

// 1 <= numCourses <= 2000
// 0 <= prerequisites.length <= 5000
// prerequisites[i].length == 2
// 0 <= ai, bi < numCourses
// All the pairs prerequisites[i] are unique.

/***********************************/

// Iterative solution (dfs w adjacency list as array)

// Time Complexity = O(n + m) => n = numCourses, m = prerequisites.length
// Space Complexity = O(n + n + n) => O(n)

/*
1. Use graph theory pattern with vertex, adjacency list, visited, arrive, depart
2. Use DFS to check for any dependency loops (ie loops in graph starting at each particular vertex)
*/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
	// build adjacency list as array
	const adjList = Array.from({ length: numCourses }, () => []);
	for (const [course, req] of prerequisites) {
		adjList[course].push(req);
	}

	const hasCycleDFS = function (node, adjList, visited, arrive, depart) {
		arrive[node]++;
		visited[node] = true;

		for (let neighbor of adjList[node]) {
			if (!visited[neighbor]) {
				visited[neighbor] = true;
				if (hasCycleDFS(neighbor, adjList, visited, arrive, depart))
					return true;
			} else {
				if (depart[neighbor] === 0) return true;
			}
		}
		depart[node]++;
		return false;
	};

	const visited = {};
	const arrive = Array.from({ length: numCourses }, () => 0);
	const depart = Array.from({ length: numCourses }, () => 0);

	for (let vertex = 0; vertex < adjList.length; vertex++) {
		if (!visited[vertex]) {
			if (hasCycleDFS(vertex, adjList, visited, arrive, depart)) return false;
		}
	}
	return true;
};

/***********************************/

// Iterative solution (dfs with map)

// Time Complexity =
// Space Complexity =

/*

*/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
	// produces map of entries in the form of:
	// { [course]: [...prerequisites] }
	const map = {};
	for (const course of numCourses) {
		map[course] = [];
	}

	prerequisites.forEach((element) => {
		map[element[0]] = [...map[element[0]], element[1]];
	});

	console.log({ map });

	const visited = new Set();

	// want to check whether a course has valid prerequisites
	// No prereq => a node without an incoming edge in a graph
	// Yes prereq => a node with an incoming edge in a graph
	// For each of the prereqs, recur the dfs function to check their prereqs
	// If we hit an already visited node, we've found a loop => impossible to fulfill the prereqs!
	const dfs = function (course) {
		console.log("init course:", course);
		console.log("initi visited:", visited.keys());
		console.log("visited.has(course)", visited.has(course));
		if (visited.has(course)) return false; // course w a prereq that we've already visited
		console.log("map[course.toString()]", map[course.toString()]);
		if (map[course.toString()].length === 0) return true; // course w no prereqs
		visited.add(course);

		map[course.toString()].forEach((prereq) => {
			console.log("inner foreach w preqreq", prereq);
			if (!dfs(prereq)) return false;
		});
		visited.delete(course);
		console.log("set afer delete", visited.keys());

		map[course.toString()] = [];

		return true;
	};

	for (let i = 0; i < numCourses; i++) {
		console.log({ i });
		if (!dfs(i)) return false;
	}
	return true;
};
