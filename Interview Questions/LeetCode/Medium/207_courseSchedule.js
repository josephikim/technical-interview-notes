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

// Iterative solution (dfs w adjacency list as array of arrays)

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
	// build adjacency list as array of arrays
	// ie array index matches the course, and element at index is an array of prereqs
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

// Iterative solution (dfs with prereqs map and second dfs parameter (new Set()) for tracking checked nodes )

// Time Complexity = O(n + m) => n = numCourses, m = prerequisites.length
// Space Complexity = O(n) + O(n) + O(n) => O(n)

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

var canFinish = function (numCourses, prerequisites) {
	// Build prereq map
	let prereqs = {};
	for (let i = 0; i < prerequisites.length; i++) {
		if (prerequisites[i][0] in prereqs) {
			prereqs[prerequisites[i][0]].push(prerequisites[i][1]);
		} else {
			prereqs[prerequisites[i][0]] = [prerequisites[i][1]];
		}
	}

	// tracks courses with all prereqs checked and validated
	let finished = new Set();

	// recursive function that checks if a course's prereqs are valid
	const canFinishCoursePrereqs = function (course, checking) {
		if (finished.has(course)) return true;
		if (!(course in prereqs)) return true;
		if (checking.has(course)) return false; // loop found in preqreqs, ie Course A has Course A as one of its prereqs
		checking.add(course);
		for (let prereq of prereqs[course]) {
			if (!canFinishCoursePrereqs(prereq, checking)) {
				return false;
			}
		}
		finished.add(course);
		return true;
	};

	for (let i = 0; i < numCourses; i++) {
		if (!canFinishCoursePrereqs(i, new Set())) return false;
	}
	return true;
};

/*********************************/

// Iterative solution (dfs with prereqs map and global set for tracking checked nodes )

// Time Complexity = O(n + m) => n = numCourses, m = prerequisites.length
// Space Complexity = O(n) + O(n) => O(n)

// uses a global visited set (instead of passing in a new 'checking' set for each dfs call like Solution 2)
// uses an empty array in prereqsMap to indicate a course with all prereqs validated (instead of a global 'finished' set like Solution 2)

var canFinish = function (numCourses, prerequisites) {
	const prereqsMap = {};
	for (let i = 0; i < prerequisites.length; i++) {
		if (prerequisites[i][0] in prereqsMap) {
			prereqsMap[prerequisites[i][0]].push(prerequisites[i][1]);
		} else {
			prereqsMap[prerequisites[i][0]] = [prerequisites[i][1]];
		}
	}

	const visited = new Set();

	const dfs = function (course) {
		if (visited.has(course)) return false;
		if (prereqsMap[course] === undefined || prereqsMap[course] === [])
			return true; // course with no prereqs or all prereqs validated
		visited.add(course);

		for (let prereq in prereqsMap[course.toString()]) {
			if (!dfs(prereq)) return false;
		}

		visited.delete(course);

		prereqsMap[course.toString()] = []; // indicates course w all prereqs validated

		return true;
	};

	for (let i = 0; i < numCourses; i++) {
		if (!dfs(i)) return false;
	}
	return true;
};
