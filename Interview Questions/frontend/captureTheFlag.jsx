// 1. Open this [link](https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge)
// 2. Find a hidden URL within the HTML
//    - Each character of the URL is given by this DOM tree, in this specific order. You need to find (in order) all of the occurrences and join them to get the link.
//    - The asterisk **(\*)** is a wildcard representing zero or more characters that can be present in the string. These characters are irrelevant to the result and should be ignored.
//    - There can be zero or more DOM nodes between each valid tag. These nodes are irrelevant to the result.
//    - Any additional attribute that doesn't interfere with the described pattern can be safely ignored.

// Pattern of the DOM tree for each valid character of the URL:

/* <code data-class="23*">
  <div data-tag="*93">
    <span data-id="*21*">
      <i class="char" value="VALID_CHARACTER"></i>
    </span>
  </div>
</code> */

// _To validate this step, you should be able to open the URL and get an English word. This means you have captured the flag!_

// 3. Create a CodeSandbox React application
// 4. Make an HTTP request to URL obtained in step 2 to load the flag into a React component
//    - Don't use any external libraries. Use browser APIs
//    - Render a "Loading..." text while the request is ongoing
// 5. Render the flag you loaded in step 4 with the following conditions:
//    - Simulate a typewriter effect with a half second delay between each character. _Start showing nothing and then display characters one by one until the full string is displayed._
//    - No style required
//    - Render the flag as a list, where each character is a list item
//    - Animation should trigger after you load the flag
//    - Animation should run only once
//    - Use React APIs only. Don't use CSS or external libraries

/***********************************/

// Solution
// 1. Write a script to extract the hidden characters from the html doc
// 2. In App.js, use a useEffect hook to query the link for its HTML as a string by fetching the url and converting the response to text with response.text() OR use Chrome -> View Source to copy HTML and paste it into a separate file)
// 3. Use the extraction script to get the hidden URL from the html doc and set the result as a string in the component state
// 4. Use another useEffect hook to fetch the hidden URL and set the response.text() to another piece of component state called 'flag'. Also set isLoading state to false.
// 5. Use a separate TypeWriter component to render the flag text using a typewriter style animation
// 6. Animation consists of component states for currentText and currentIndex, which gets updated inside a setTimeout according to the 'delay' and 'infinite' props.

import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
	const [url, setUrl] = useState("");
	const [flag, setFlag] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(
			"https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"
		)
			.then((response) => response.text())
			.then((html) => {
				// Convert the HTML string into a document object
				const parser = new DOMParser();
				const parsedHtml = parser.parseFromString(html, "text/html");

				// or do it manually
				// const el = document.createElement('html');
				// el.innerHTML = html;

				const url = getHiddenUrl(parsedHtml);
				setUrl(url);
			})
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		if (url.length) {
			fetch(url)
				.then((response) => response.text())
				.then((html) => {
					setFlag(html);
					setIsLoading(false);
				})
				.catch((error) => console.log(error));
		}
	}, [url]);

	return (
		<div className="App">
			{isLoading ? (
				<div>Loading...</div>
			) : (
				// Inifinite prop is optional
				<TypeWriter text={flag} delay={500} infinite />
			)}
		</div>
	);
}

function TypeWriter({ text, delay, infinite }) {
	const [currentText, setCurrentText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex <= text.length) {
			const timeout = setTimeout(() => {
				setCurrentText((prevText) => prevText + text[currentIndex]);
				setCurrentIndex((prevIndex) => prevIndex + 1);
			}, delay);

			return () => clearTimeout(timeout);
		} else if (infinite) {
			setCurrentIndex(0);
			setCurrentText("");
		}
	}, [currentIndex, delay, text]);

	return <span>{currentText}</span>;
}

const getHiddenUrl = (htmlDoc) => {
	let result = "";
	const targetElements = htmlDoc.querySelectorAll(
		"code[data-class^='23'] div[data-tag$='93'] span[data-id*='21'] i.char"
	);
	targetElements.forEach((element) => {
		const char = element.getAttribute("value");
		result += char;
	});
	return result;
};
