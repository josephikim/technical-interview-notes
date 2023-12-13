# What is JSX?

1. "Javascript and XML"
2. XML-like syntax for writing JS intended to render to the DOM
3. Just syntactice sugar over React.createElement (which what what your react code essentially compiles down into, even though JSX just looks like HTML/XML code)

# Why is "class" called "className" in react?

1. "Class" is a reserved keyword in JS. This would conflict with your compiled JSX if your JSX used "class" instead of "className". (IE the runtime would think you're using trying to create a JS "class")
2. Babel is used under the hood to compile JSX into JS

# What is the Virtual DOM in react?

1. The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM (Document Object Model) by a library such as ReactDOM.
  1. The Document Object Model (DOM) is an application programming interface (API) for valid HTML and well-formed XML documents.
2. Virtual DOM is a REPRESENTATION of the real DOM, whose creation / manipulation is handled by browsers. Advance frameworks/libraries like React, Vue will create a tree of elements similar to Real DOM in memory which forms the Virtual DOM in Declarative way. For example:
  1. DOM:

  ```<ul class="fruits">
  <li>Apple</li>
  <li>Banana</li>
  <li>Guva</li>
  </ul>
  ```

  2. Virtual DOM:

  ```{
    type: "ul",
    props: {
        "class": "fruits" 
    },
    children: [
        {
            type: "li",
            props: null,
            children: [
                "Apple"
            ]
        },
        {
            type: "li",
            props: null,
            children: [
                "Banana"
            ]
        },
        {
            type: "li",
            props: null,
            children: [
                "Guva"
            ]
        }
    ]
  }
  ```

# Why Virtual DOM?
1. In recent history, server side rendering of website has decreased, and browser based rendering increased. 
2. With the rise of Single Page Applications, (where only a single DOM is manipulated), a more optimized way of re-rendering the UI was needed.
3. Thus need of Virtual DOM arises and many frameworks/libraries come up with their own way of managing the same ie Angular, React, Vue.
4. Challenges:
  1. Manual DOM manipulation is messy
  2. Keeping track of previous DOM state is hard
  3. DOM is tree structure, which should be updated minimally and efficiently

# How does Virtual DOM update the DOM?
1. Whenever something is changed in a component's state/props, a new virtual DOM representation will be created and it will be compared with the previous one using a diffing algo. This will determine specially which DOM nodes need to be updated.
2.  Example:
  1. Un-optimized:
  ```function generateList(fruits) {
    let ul = document.createElement('ul');
    document.getElementByClassName('.fruits').appendChild(ul);
    fruits.forEach(function (item) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += item;
    });
    return ul
  }
  let fruits = ['Apple', 'Banana', 'Guva']
  document.getElementById('#list').innerHtml =  generateList(fruits)
  ```
  2. Optimized:
  ```document.querySelector('li').innerText = "Orange"```
3. Virtual DOM is NOT FASTER than real DOM
  1. Under the hood virtual DOM also uses real DOM to render the page or content. So there is no way that virtual DOM is faster than real dom.
  2. Virtual DOM's advantage is that it EFFICIENTLY updates DOM at a granular level programmatically

# What are major use cases for a Virtual DOM?

1. Allows to write HTML as function of state.
2. Allows to create isomorphic apps.
3. Ensure best practices of DOM Reconciliation.
4. Easy DOM batching a performance enhancement.

# How does state work in react?

1. Reat state is a special javascript variable or object that is used to track some value between re-renders of your UI.
  1. NOTE: A vaniall JS variable wouldn't trigger a re-render. You would have to update the DOM manually for each change.
2. When a piece of a react state changes, your UI re-renders to reflect the updated state value, which can be seen if you display that value in some UI element (e.g. a couter component)

# Describe data flow in react?

1. Data flow is unidirectional - all components have a parent/child relationship where data is passed from parent to child using props
2. Components themselves also manage data using component state (useState in functional components)
3. Global state management (app state) allow you to share data across multiple components. This data can be shared by passing props, but you want to avoid prop drilling through multiple levels of components. Instead use React context or a third party library like Redux.

# Should you use ternaries or && operator to conditionally render react components?

1. Better to use ternaries because it reminds you to render something if the first condition is false.
2. If you just use && operator and the first condition is false, the entire expression will just be false and your component wont render anything.
   
# How would you delay an API call until a component has mounted?

1. Class component - componentDidMount (can mention component lifecycle)
  1. Runs code after component has mounted which ensures that your API response will have access to the correct lifecycle stage in order to render out its data 
2. Functional component - useEffect() hook with empty dependency array (this mimics componentDidMount)

# How do hooks works in React?

1. Hooks allow you to use state and other react features without writing a class
2. E.g. useEffect allows you to run code as a side effect depending on a piece of component state (ie putting a variable in dependency array will make useEffect run its code only when that variable changes)
3. UseEffect can replicate traditional lifecycle methods (componentDidMount etc.)

# Can you describe how each hook works in React?
1. UseState - lets you add a state variable to your component
```
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
```
2. UseReducer -  lets you add a reducer to your component
```
import { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'incremented_age') {
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  return (
    <>
      <button onClick={() => {
        dispatch({ type: 'incremented_age' })
      }}>
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}
```
3. UseEffect - lets you synchronize a component with an external system or state
```
import { useEffect, useRef } from 'react';

export default function ModalDialog({ isOpen, children }) {
  const ref = useRef();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dialog = ref.current;
    dialog.showModal();
    return () => {
      dialog.close();
    };
  }, [isOpen]);

  return <dialog ref={ref}>{children}</dialog>;
}

```
4. UseRef - lets you reference a value that’s not needed for rendering (NOTE: ref is a PLAIN js object, not a state object. Ref.current is mutable, and it won't trigger a re-render of your UI)
```
// This component uses a ref to keep track of how many times the button was clicked. Note that it’s okay to use a ref instead of state here because the click count is only read and written in an event handler.
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```
5. UseLayoutEffect - a version of useEffect that fires before the browser repaints the screen
  1. useLayoutEffect blocks the browser from repainting. React guarantees that the code inside useLayoutEffect and any state updates scheduled inside it will be processed before the browser repaints the screen.
  2. https://react.dev/reference/react/useLayoutEffect
6. UseContext - lets you read and subscribe to context from your component
```
import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```
7. UseImperativeHandle - lets you customize the handle exposed as a ref
  1. First understand forwardRef()
    1. A Form component passes a ref to MyInput. The MyInput component forwards that ref to the <input> browser tag. As a result, the Form component can access that <input> DOM node and call focus() on it.
    2. https://react.dev/reference/react/forwardRef#forwardref
  2. When using forwardRef, you can call useImperativeHandle to customize the ref that it exposes. For example, suppose you don’t want to expose the entire <input> DOM node, but you want to expose two of its methods: focus and scrollIntoView. To do this, keep the real browser DOM in a separate ref. Then use useImperativeHandle to expose a handle with only the methods that you want the parent component to call:
  ```
  import { forwardRef, useRef, useImperativeHandle } from 'react';

  const MyInput = forwardRef(function MyInput(props, ref) {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => {
      return {
        focus() {
          inputRef.current.focus();
        },
        scrollIntoView() {
          inputRef.current.scrollIntoView();
        },
      };
    }, []);

    return <input {...props} ref={inputRef} />;
  });
  ```
8.  UseMemo - lets you cache the result of a calculation between re-renders
```
// You should only rely on useMemo as a performance optimization. If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add useMemo to improve performance.

import { useMemo } from 'react';
import List from './List.js';
import { filterTodos } from './utils.js'

export default function TodoList({ todos, theme, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  return (
    <div className={theme}>
      <p><b>Note: <code>List</code> is artificially slowed down!</b></p>
      <List items={visibleTodos} />
    </div>
  );
}

```
9.  UseCallback - lets you cache a function definition between re-renders
  1.  Usage 1: In JavaScript, a function () {} or () => {} always creates a different function, similar to how the {} object literal always creates a new object. You might want to pass the SAME function reference to a component wrapped in memo, and this lets it skip re-rendering. 
  ```
  // You should only rely on useCallback as a performance optimization. If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add useCallback back.
  
  import { useCallback } from 'react';
  import ShippingForm from './ShippingForm.js';

  export default function ProductPage({ productId, referrer, theme }) {
    const handleSubmit = useCallback((orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails,
      });
    }, [productId, referrer]);

    return (
      <div className={theme}>
        <ShippingForm onSubmit={handleSubmit} />
      </div>
    );
  }

  function post(url, data) {
    // Imagine this sends a request...
    console.log('POST /' + url);
    console.log(data);
  }
  ```

# Describe the component lifecycle in react?

1. Consists of a series of methods that are called at different points in the component's existence. Allows you to control how a component behaves and perform actions like fetching data or updating the UI.
2. Three main phases:
  1. Mounting - when component is first rendered to DOM. The following are called in this order:
    1. constructor(props): This is called when a component is first created. It is used to initialize the state and bind event handlers.
    2. static getDerivedStateFromProps(props, state): This is a static method that is called right before the initial render. It returns an object that is merged with the component state.
    3. render(): This is the only required method in a class component. It is called to create the JSX that will be rendered to the DOM.
    4. componentDidMount(): This method is called after the component has been rendered to the DOM. It is used to perform any necessary setup, such as fetching data or adding event listeners.
  2. Updating - when a component prop or state changes. The following are called in this order:
    1. static getDerivedStateFromProps(props, state): This method is called when the component receives new props. It returns an object that is merged with the component state.
    2. shouldComponentUpdate(nextProps, nextState): This method is called before the component updates. It returns a boolean indicating whether or not the component should update.
    3. render(): This method is called to create the updated JSX that will be rendered to the DOM.
    4. getSnapshotBeforeUpdate(prevProps, prevState): This method is called right before the updated JSX is rendered to the DOM. It returns an object that can be used to capture the current state of the DOM.
    5. componentDidUpdate(prevProps, prevState, snapshot): This method is called after the updated JSX has been rendered to the DOM. It is used to perform any necessary cleanup, such as removing event listeners.
  3. Unmounting - when a component is removed from the DOM. It calls the following:
    1. componentWillUnmount(): This method is called right before the component is removed from the DOM. It is used to perform any necessary cleanup, such as removing event listeners.

# How do you force a component to re-render?

1. To force a component to re-render, you can call the forceUpdate() method. This will trigger the render() method of the component and update the DOM. However, it is recommended to avoid using forceUpdate() as much as possible and instead use state or props to trigger re-renders.

# Explain the difference between React class components and functional components?

1. React class components are defined using the class syntax and extend the React.Component class. They have access to the full range of React lifecycle methods and can maintain their own internal state using the this.state property.
2. Functional components, on the other hand, are defined using a function and do not have access to the full range of React lifecycle methods. They are primarily used to render UI based on the props passed to them and do not have their own internal state. However, with the introduction of Hooks in React 16.8, functional components can now also have state and use many of the same features as class components.

# How do you optimize React performance using lifecycle methods?

1. There are several ways to optimize React performance using lifecycle methods, such as:
  1. Use shouldComponentUpdate method to prevent unnecessary re-renders.
  2. Use PureComponent or React.memo to avoid re-rendering when props and state haven't changed.
  3. Use componentWillReceiveProps or getDerivedStateFromProps to update the internal state of the component based on new props.
  4. Use componentDidMount to fetch data asynchronously and update the component state.
  5. Use componentWillUnmount to clean up any resources used by the component.

By using these lifecycle methods effectively, you can improve the performance of your React application and avoid unnecessary re-renders and API calls.

# Explain the use of React.PureComponent and when to use it.

1. React.PureComponent is a subclass of React.Component that implements shouldComponentUpdate method with a shallow comparison of props and state. This means that if the props and state haven't changed, the component will not re-render. PureComponent is useful when dealing with large or complex components that have a lot of nested components, as it can prevent unnecessary re-renders and improve the performance of your application.

# How do you handle asynchronous requests in React components?

1. You can handle asynchronous requests in React components using the following methods:
  1. componentDidMount: This method is called once after the component is mounted and is a good place to fetch data asynchronously and update the component state
  2. componentDidUpdate: This method is called every time the component updates and is a good place to make additional API requests based on updated props or state.
  3. componentWillUnmount: This method is called just before the component is unmounted and is a good place to cancel any ongoing API requests to prevent memory leaks.

You can also use libraries like axios or fetch to make API requests in React components.

# How do you implement a loading spinner using React lifecycle methods?

1. You can implement a loading spinner using the following lifecycle methods:
  1. componentDidMount: Set the component state to a loading state when the component is mounted.
  2. componentDidUpdate: Check for the loading state in componentDidUpdate and display a loading spinner if the component is still loading.
  3. componentWillUnmount: Cancel any ongoing API requests and clean up any resources used by the component when it is unmounted.

By using these lifecycle methods, you can display a loading spinner while your component is fetching data asynchronously.