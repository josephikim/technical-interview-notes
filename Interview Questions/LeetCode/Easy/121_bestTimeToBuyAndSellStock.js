// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

// Example 1:

// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
// Example 2:

// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.

// Constraints:

// 1 <= prices.length <= 105
// 0 <= prices[i] <= 104

/***********************************/

// Optimal solution
// Time complexity = O(n)
// Space complexity = O(1)
//
// set minPrice (aka buy price) as first item in prices, maxProfit as 0
// Loop through each price starting at 2nd price, comparing whether minPrice needs updating, then whether maxProfit needs updating

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
	if (prices.length <= 1) {
		return 0;
	}

	let minPrice = prices[0];
	let maxProfit = 0;

	for (let i = 1; i < prices.length; i++) {
		minPrice = Math.min(minPrice, prices[i]);
		maxProfit = Math.max(maxProfit, prices[i] - minPrice);
	}

	return maxProfit;
};

// Naive solution
// same as above, but repeats calls to prices[i]

// /**
//  * @param {number[]} prices
//  * @return {number}
//  */
// var maxProfitNaive = function(prices) {
// 	let buyPrice = prices[0]
// 	let maxProfit = 0

// 	for (let i = 0; i < prices.length; i++ ) {
// 			if (prices[i] < buyPrice) {
// 					buyPrice = prices[i]
// 			}
// 			if (prices[i] - buyPrice > maxProfit) {
// 				maxProfit = prices[i] - buyPrice
// 			}
// 	}
// 	return maxProfit
// };
