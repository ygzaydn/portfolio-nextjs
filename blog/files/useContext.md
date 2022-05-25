# React Context and useContext() Hook

The React context structure provides data to components no matter how deep they are in the components tree. By doing so we do not need to pass data into props to react desired component. Context architecture is used to manage global data or state, such as theming, language information, settings etc.

In this article I'll dive into React Context and its usage thanks to `useContext()` hook. Later than that I'll provide a working example for you to understand the topic better.

---
## Table of Contents

- [React Context](#react-context)
  - [Creating Context](#creating-context)
  - [Providing Context](#providing-context)
  - [Consuming Context](#consuming-context)
    - [Context.Consumer](#context-consumer)
    - [useContext hook](#usecontext-hook)
- [React Context with useContext](#react-context-with-usecontext--)
---


## React Context

In order to use context architecture, we have to follow 3 steps, which are:

- Creating Context
- Providing Context
- Consuming Context

we'll go those steps one by one.


### Creating Context

To create React Context, we use `createContext()` built-in function.

```js
import { createContext } from 'react';

const MyContext = createContext("erolyagizaydin");
``` 

createContext function creates a context object, which we can provide to our React App. The value that I provide on context (which is "erolyagizaydin" in this case) will be used if and only if we don't provide a Provider to our App. It may sound confusing right now, but as you go in this article, the topic will be crystal clear.

### Providing Context

After creating the context, we have to use Provider structure to connect our context object with our React app.

```js
<MyContext.Provider value={/* any value */}>
  <App />
</MyContext.Provider>
```

The value we pass here will overwrite default value which we declared on creating context phase.

The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers. Providers can be nested to override values deeper within the tree.

> All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes.

### Consuming Context

After we connect context object with our component, we will be able to consume our context. Consuming operation can be held by 2 different methods:

- Context.Consumer
- useContext hook

#### Context.Consumer

A React component that subscribes to context changes. Using this component lets you subscribe to a context within a function component.

```js
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```

#### useContext hook

This hook accepts a context object which we can use later on. The current context value is determined by the value prop of the nearest <MyContext.Provider> above the calling component in the tree. A component calling useContext will always re-render when the context value changes.

```js
const value = useContext(MyContext);
```

## React Context with useContext()

To explain context architecture more detailed, I provide some examples here. In this one, I use `useContext()` hook.

```js
//  context.js
import React, { useState, createContext } from "react";

export const MyContext = createContext("erolyagizaydin");

const CounterState = ({ children }) => {
  const [counter, setCounter] = useState(0);

  const increaseCounter = () => setCounter(counter + 1);
  const decreaseCounter = () => setCounter(counter - 1);

  const context = {
    counter,
    increaseCounter,
    decreaseCounter
  };
  return <MyContext.Provider value={context}>{children}</MyContext.Provider>;
};

export default CounterState;
```

As you can see above, I have created a state logic on my provider. After creating context, we need to connect it with our component.

```js
// index.js
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import CounterState from "./context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <CounterState>
      <App />
    </CounterState>
  </StrictMode>,
  rootElement
);
```

After connecting component and context, we're ready to use our context.

```js
//  App.js

import React, { useContext } from "react";
import { MyContext } from "./context";

const App = () => {
  const { counter, increaseCounter, decreaseCounter } = useContext(MyContext);

  return (
    <div className="App">
      <button onClick={() => decreaseCounter()}>Decrease Counter </button>
      <span>{counter}</span>
      <button onClick={() => increaseCounter()}>Increase Counter</button>
    </div>
  );
};

export default App;
```

Here is the result.

![res](/context-1.jpg)

If you want to check the code & structure, you can use [this sandbox link](https://codesandbox.io/s/dreamy-babycat-vlg4do).


