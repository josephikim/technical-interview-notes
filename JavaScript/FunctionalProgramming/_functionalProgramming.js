// Bottom line:

// Encoding the intent (rather than the result)
// Also, describe the minimal instructions (or state) necessary to make the update

// ASK YOURSELF - Is this functional style?

// YES - A Google Doc that updates based on instructions to the server saying what the user did relative to the last state, whatever the state was.
// NO - A Google Doc that updates based on a depiction of what the resulting state should be.

// React.js example

// YES - A Component that uses useReducer (ie Redux pattern) to store variable state which lasts the entire lifespan of the component, and updates using encoded instructions without dependency on component props or state
//    E.G. the benefit of decoupling the useEffect() from having to include 'step' as a dependency

const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;

useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: "tick" }); // Instead of setCount(c => c + step);
  }, 1000);
  return () => clearInterval(id);
}, [dispatch]);

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === "tick") {
    return { count: count + step, step };
  } else if (action.type === "step") {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}

// NO - A Counter component that uses its state to track an incrementing number by referencing component's state (useState()) or props e.g

const [count, setCount] = useState(0);

setCount((c) => c + step); // 'c' refers to whatever state the 'count' variable is currently in

// NO - Also includes things like setState()
const newState = setState((state) => {
  state.someValue = state.someValue + 33;
});
