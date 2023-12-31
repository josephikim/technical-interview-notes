/*
Youtube: https://www.youtube.com/watch?v=ixgxx_um8r8

Can you build out a tree browser component?

The component must be able to render a folder structure that is designed like a tree structure. It must also traverse a tree structure of folders and files according to a certain traversal pattern and process each folder or file in sequence.

Note: The DOM is a common usage of a tree structure.
*/


/* import {useState} from 'react' */

const files = {
	children: [
		{ name: "node_modules", children: [{ name: "joi", children: [{name: "node_modules"}, {name: package.json}] }] },
		{ name: "package.json" },
		{ name: "vite.config.ts" },
	],
};

type TEntry = {
	name: String,
	children?: TEntry[],
};

function Entry({ entry, depth }: { entry: TEntry, depth: number }) {
	const [isExanded, setIsExpanded] = useState(false);

	return (
		<>
			{entry.children ? (
				<button className="entry" onClick={() => setIsExpanded(!isExanded)}>
				{isExanded ? '-' : '+'} {entry.name}
			</button>
			) : (<div>{entry.name}</div>)}

			<div>
				{isExanded && (
					<div style={{ paddingLeft: `${depth * 10}px` }}>
						{entry.children?.map((entry) => (
							<Entry {...entry} depth={depth + 1} />
						))}
					</div>
				)}
			</div>
		</>
	);
}

function App() {
	return (
		<div className="App">
			{files.children.map((entry) => {
				<Entry entry={entry} depth={1} />;
			})}
		</div>
	);
}


// App.css
.entry {
  background: none;
  padding: 0;
}