// Create a function that outputs all the users who experienced the error.
// Error means a user clicked 'A', then 'B', then 'C' with no other choices in between

// logs are in chronological order
const logs = [
	{ user: 1, action: "A" },
	{ user: 1, action: "B" },
	{ user: 2, action: "A" },
	{ user: 1, action: "C" },
	{ user: 2, action: "B" },
	{ user: 3, action: "Z" },
	{ user: 2, action: "B" },
	{ user: 2, action: "C" },
	{ user: 3, action: "A" },
	{ user: 3, action: "B" },
	{ user: 3, action: "C" },
];

/*******************************/

// Iterative solution (updating map)

// Time complexity = O(n)
// Space complexity = O(n)

// 1. init a userMap object and result array
// 2. Loop through logs entries and update userMap
// 3. For first entry given user id, value should be 'A' or 'null
// 4. For subsequent entries given user id, update map value to either 'null', 'A', or 'B'.
// 5. If Map value is already 'B' and entry's value is 'C', mark map value as 'true' and push user id to result array.

function checkLogsForErrors(logs) {
	const userMap = {};
	const userErrors = [];

	for (let i = 0; i < logs.length; i++) {
		if (!logs[i].user in userMap) {
			userMap[logs[i].user] = logs[i].action == "A" ? logs[i].action : null;
		} else if (userMap[logs[i].user] === true) {
			// 'true' means error has been confirmed for that user
			continue;
		} else {
			// userMap[logs[i].user] exists but is not 'true'
			switch (userMap[logs[i].user]) {
				case "A":
					if (logs[i].action == "B") userMap[logs[i].user] = "B";
					break;
				case "B":
					if (logs[i].action == "C") {
						userErrors.push(logs[i].user);
						userMap[logs[i].user] = true;
					} else {
						userMap[logs[i].user] = null;
					}
					break;
				default:
					if (logs[i].action == "A") userMap[logs[i].user] = "A";
					break;
			}
		}
	}

	console.log(userErrors);
	return userErrors;
}

checkLogsForErrors(logs);

/*******************************/

// Iterative solution (naive)

// Time complexity = O(n) => O(input.length) + O(n) worst case for calling indexOf
// Space complexity = O(n) => n = actionsByUser.length

// 1. Create map where key is user and value is a string comprised of the combination of action values for that user
// 2. loop through map entries and check each entry's value for the substring 'ABC'
// 3. If match is found, push user ID into result array

// const getUsers = (input) => {
// 	const res = [];
// 	const actionsByUser = {};

// 	logs.forEach((log) => {
// 		actionsByUser[log.user] = actionsByUser[log.user]
// 			? actionsByUser[log.user] + log.action
// 			: log.action;
// 	});
// 	console.log({ actionsByUser });

// 	Object.entries(actionsByUser).forEach(([user, action]) => {
// 		console.log({ user });
// 		console.log({ action });
// 		if (action.indexOf("ABC") > -1) {
// 			res.push(user);
// 		}
// 	});
// 	console.log({ res });
// 	return res;
// };

// getUsers();
