// Write a function that returns all of the user's names and roles in a string with each value labeled.

const users = [
	{
		name: "Homer",
		role: "Clerk",
		dob: "12/02/1988",
		admin: true,
	},
	{
		name: "Lisa",
		role: "Staff",
		dob: "01/30/1965",
		admin: true,
	},
	{
		name: "Marge",
		role: "Associate",
		dob: "09/10/1980",
		admin: true,
	},
];

function namesAndRoles(users) {
	combine = "";
	for (var element of users) {
		combine += "Name: " + element.name + " Role: " + element.role + "\n";
	}
	return combine;
}
console.log(namesAndRoles(users));
