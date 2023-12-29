/* Password Strength

There are n passwords in the form of a string aray of passwords[n]. There is also a dictionary dict_words[m] that contains m weak passwords.

Classify each of the n passwords as 'weak' or 'strong'.

A password is 'weak' if any of these conditions are met:

1. The password is in the dictionary
2. A substring of the password is a word in the dictionary
3. The password is all numerical, ie consisting of characters from ('0' to '9')
4. All characters are uppercase ('A' to 'Z') or all of them are lowercase ('a' to 'z')
5. The password is shorter than 6 characters.

Implement a prototype password validation service.

Given a list of n string, passwords and m string, common_words, for each of the passw2ords, report 'string' or 'weak' based on the conditions.

Example
n = 5, m = 3, passwords = 'iliketoCoDe', 'teaMAKEsmehappy', 'abracaDabra', 'pasSword', 'blackcoffeeISthebest'], common_words = ['coffee', 'coding', 'happy']
]

iliketoCoDe: strong
teaMAKEsmehappy: weak
abracaDabra: strong
pasSword: strong
pass: weak

Constraints
1. 1 < common_words[i] <= 20
2. 1 < passwords[i] <= 20
3. The passwords consist of lowercase, uppercase, and numeric characters only

Return value:
An array of values either 'weak' or 'strong' corresponding to each password

*/

var getPasswordStrength = function (passwords, common_words) {
	const result = [];
	for (let pw of passwords) {
		if (isWeakPassword(pw, common_words)) {
			result.push("weak");
		} else {
			result.push("strong");
		}
	}
	return result;
};

var isWeakPassword = function (password, common_words) {
	// password length is less than 6
	if (password.length < 6) {
		console.log("pw less than 6 chars");
		return true;
	}

	// all numerical
	if (/^\d+$/.test(password)) {
		console.log("pw all numbers");
		return true;
	}
	// all uppercase
	if (/^[A-Z]+$/.test(password)) {
		console.log("pw all upper");
		return true;
	}
	// // all lowercase
	if (/^[a-z]+$/.test(password)) {
		console.log("pw all lower");
		return true;
	}

	for (let i = 0; i < common_words.length; i++) {
		if (password.indexOf(common_words[i]) > -1) {
			console.log("pw substring in commmonwords");
			return true;
		}
	}
	return false;
};

const passwords = ["hello", "chargeR", "pass123"];
const common_words = ["hello", "123", "password", "xyz", "999"];
console.log(getPasswordStrength(passwords, common_words));
