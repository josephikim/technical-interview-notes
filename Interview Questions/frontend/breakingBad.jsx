/* Youtube: https://www.youtube.com/watch?v=OVp2muKTkdg&t=1193s 

There is a list of period table elements.

Using a set of text inputs (firstName, lastName), dynamically render the text such that the first substring that matches an element in the period table will have special styling applied a la the logo from Breaking Bad. 

When checking for matches:

1. two-letter elements take precedence over one-letter elements (ie 'Br' should match before 'B')
2. matches can exist at any position input string
3. only need to format the first valid match

*/

const elements = [
	"Ac",
	"Al",
	"Am",
	"Sb",
	"Ar",
	"As",
	"At",
	"Ba",
	"Bk",
	"Be",
	"Bi",
	"Bh",
	"B",
	"Br",
	"Cd",
	"...",
];

/* import { useState, useEffect } from 'react' */
/* import styled from 'styled-components'*/

function App() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	// These states will be used to construct the resulting styled component
	const [first, setFirst] = useState(["", "", ""]);
	const [last, setLast] = useState(["", "", ""]);
	const styles = {};

	// check for matching elements in the substrings of length 2 or length 1 in the input string
	// return array of 3 substring ie [prefix, matchingElement, postfix]
	const breakify = (str) => {
		let result = [];
		// use a for loop so that we can break early when first match is found
		for (let i = 0; i < str.length; i++) {
			const oneChar = str[i].toUppercase();
			const twoChar = `${oneChar}${str[i + 1]}`;
			if (elements.includes(twoChar)) {
				result = [str.slice(0, i), twoChar, str.slice(i + 2, str.length)];
				break;
			}

			if (elements.includes(oneChar)) {
				result = [str.slice(0, i), oneChar, str.slice(i + 1, str.length)];
				break;
			}
		}

		if (!result.length) {
			result = [str, "", ""];
		}
		return result;
	};

	// use two useEffects for efficiency ie we don't want to run breakify on last name when first name is changed
	useEffect(() => {
		setFirst(breakify(firstName));
	}, [firstName]);

	useEffect(() => {
		setLast(breakify(lastName));
	}, [lastName]);

	return (
		<div className="app">
			<div className="content">
				<div className="row">
					<BreakingLogo result={first} />
				</div>
				<div className="row">
					<BreakingLogo result={last} />
				</div>
				<div className="row">
					<div className="col">
						<label>First Name</label>
						<input
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
						/>
					</div>
					<div className="col">
						<label>Last Name</label>
						<input
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
						/>
					</div>
				</div>
				<button>Breakify</button>
			</div>
		</div>
	);
}

interface BreakingLogoProps {
	result: string[];
}

function BreakingLogo(result: BreakingLogoProps) {
	return (
		<S.Wrapper>
			<span>{result[0]}</span>
			{result[1] && <S.Element>{result[1]}</S.Element>}
			<span>{result[2]}</span>
		</S.Wrapper>
	);
}

// styles elements
const S = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		& > span {
			font-size: 75px;
		}
	`,
	Element: styled.div`
		height: 100px;
		background-color: green;
		aspect-ratio: 1;
		color: white;
		font-size: 75px;
		display: flex;
	`,
};
