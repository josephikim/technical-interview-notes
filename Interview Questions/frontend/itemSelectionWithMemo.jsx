// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.
//
// Feel free to change the component structure at will.

const { Fragment, useState, useCallback, memo } = React;

const List = ({ items }) => {
  const [selections, setSelections] = useState(items.map(item => ({name: item.name, selected: false})))
 
  const handleClick = useCallback((item) => {
   // use functional state update syntax when using useCallback with empty dependency list
   setSelections(prevSelections => prevSelections.map(selection => {
      return selection.name === item.name ? {name: item.name, selected: !selection.selected} : selection
    })) 
    
    // Can't do this because useCallback forms a closure that makes selections already refer to the INITIAL selections
    /* const update = selections.map(selection => {
      return selection.name === item.name ? {name: item.name, selected: !selection.selected} : selection
    })
    setSelections(update) */
  }, [])
  
  const selected = selections.filter(selection => selection.selected === true);
  
  return (
    <Fragment>
      {selected.map(selected => (
      	<div key={selected.name}>{selected.name}</div>
      ))}
      
      <ul className="List">
        {items.map(item => (
          <MemoListItem 
          key={item.name}
          item={item}
          className={`List__item List__item--${item.color} ${selections.find(selection => selection.name === item.name).selected === true && "List__item--selected"}`}
          handleClick={handleClick}
          />
        ))}
      </ul>
    </Fragment>
  );
}

const MemoListItem = memo(({item, className, handleClick}) => {
 /* console.log('rendering MemoListItem w name:', item.name) */
 return (
    <li className={className} onClick={() => handleClick(item)}>
      {item.name}
    </li>
    )
 })
// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          [],
        ),
      ],
      [],
    ),
  ],
  [],
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <List items={items}/>,
);