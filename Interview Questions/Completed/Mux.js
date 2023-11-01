/*Who is in Space?
Interview Question
The Open Notify API provides information about who is currently in space. Visit https://who-is-in-space-api.onrender.com/ to see not only how many people are currently in space but also their names and which spacecraft they’re on.

Create a program that pulls in this data and displays the information from this API in a tabular format. Ensure that the width of the header is as long as the longest value in the column.

Output
→ go run main.go
There are 10 people in space right now:

Name            | Craft
----------------|---------
Mark Vande Hei  | ISS
Oleg Novitskiy  | ISS
Pyotr Dubrov    | ISS
Thomas Pesquet  | ISS
Megan McArthur  | ISS
Shane Kimbrough | ISS
Akihiko Hoshide | ISS
Nie Haisheng    | Tiangong
Liu Boming      | Tiangong
Tang Hongbo     | Tiangong
*/

import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://who-is-in-space-api.onrender.com/",
});

console.log("hello");

apiClient.get(apiClient.baseURL).then((res) => {
  console.log("response dat", res.data);

  const people = res.data.people;
  const baseEntry = people[0];
  const keys = Object.keys(baseEntry);
  const maxLength = 10;
  const spaceChar = " ";

  let maxNameLength = 0;
  let maxCraftLength = 0;

  for (const entry of people) {
    if (entry.name.length > maxNameLength) {
      maxNameLength = entry.name.length;
    }
    if (entry.craft.length > maxCraftLength) {
      maxCraftLength = entry.craft.length;
    }
  }

  console.log("maxNameLength", maxNameLength);
  console.log("maxCraftLength", maxCraftLength);

  const headerStr =
    `${keys[0]}` +
    `${spaceChar.repeat(maxNameLength - 4)}` +
    "|" +
    `${keys[1]}` +
    `${spaceChar.repeat(maxNameLength - 5)}`;

  console.log("headerStr", headerStr);

  // const hyphenStr = "-".repeat(maxLength);
});
