// Dynamic programming is all about breaking down a problem into smaller subproblems and solving each subproblem only once, storing the solutions for future reference. This approach can significantly improve the efficiency of our algorithms by avoiding redundant calculations. The two main principles of dynamic programming are:

// 1. Optimal Substructure: The problem can be broken down into smaller subproblems that can be independently solved.

// 2. Overlapping Subproblems: The same subproblems are solved multiple times in the process.

// Fibonacci Sequence Revisited:

// Let's start with a classic example to illustrate dynamic programming in action: computing the nth Fibonacci number. The naïve recursive approach has exponential time complexity, but dynamic programming can drastically improve this.

function fibonacci(n) {
	if (n <= 1) return n;

	const memo = new Array(n + 1);
	memo[0] = 0;
	memo[1] = 1;

	for (let i = 2; i <= n; i++) {
		memo[i] = memo[i - 1] + memo[i - 2];
	}

	return memo[n];
}

console.log(fibonacci(10)); // Output: 55

/************************/

// Longest Common Subsequence:

// Another practical example where dynamic programming shines is finding the longest common subsequence (LCS) of two strings.

// The time complexity is O(m * n) where m and n are the lengths of sequences X and Y, respectively.
// The space complexity is also O(m * n) due to the 2D matrix used to store the solutions to subproblems.

function longestCommonSubsequence(text1, text2) {
	const m = text1.length;
	const n = text2.length;
	const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
	// or Array(m+1).fill().map(() => Array(n+1).fill(0));

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (text1[i - 1] === text2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1;
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
			}
		}
	}

	return dp[m][n];
}

const text1 = "dynamic";
const text2 = "programming";
console.log(longestCommonSubsequence(text1, text2)); // Output: 3
