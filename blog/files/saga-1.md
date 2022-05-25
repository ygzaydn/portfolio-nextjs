# Redux Saga

  - [What is Redux Saga ?](#what-is-redux-saga--)
    - [Javascript Generators](#javascript-generators)
      - [Generators](#generators)
    - [Initialization of Saga](#initialization-of-saga)
      - [Creation of First Saga](#creation-of-first-saga)
      - [First Async Saga](#first-async-saga)
      - [Fetch Call with Saga](#fetch-call-with-saga)

## What is Redux Saga ?

`redux-saga` is brand new middleware for Redux. It helps to ease side effects (aysnc tasks like fetching, or accessing browser cache) that uses javascript generators. As stated at [origin page](https://redux-saga.js.org/docs/About/):

> `redux-saga` is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

Before moving on, we need to talk about generators. Understanding those is crucial step.

### Javascript Generators

Generators are functions that can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.  Generators in JavaScript -- especially when combined with Promises -- are a very powerful tool for asynchronous programming as they mitigate -- if not entirely eliminate -- the problems with callbacks.

Syntax:

```js
function* name([param[, param[, ... param]]]) {
   statements
}
```


#### Generators

The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.

```js
function* generator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = generator(); // Generator {}

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

Instance methods:

-   `Generator.prototype.next()`: returns a value yielded by the `yield` expression.
-   `Generator.prototype.return()`: returns the given value and finishes the generator.
-   `Generator.prototype.throw()`: throws an error to a generator (also finishes generator unless caught from within that generator)

```js
function* infinite() {
    let index = 0;

    while (true) {
        yield index++;
    }
}

const generator = infinite(); // "Generator { }"

console.log(generator.next().value); // 0
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
```

```js
function* logGenerator() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
}

var gen = logGenerator();

// the first call of next executes from the start of the function
// until the first yield statement
gen.next();             // 0
gen.next('pretzel');    // 1 pretzel
gen.next('california'); // 2 california
gen.next('mayonnaise'); // 3 mayonnaise
```

```js
function* yieldAndReturn() {
  yield "Y";
  return "R";
  yield "unreachable";
}

var gen = yieldAndReturn()
console.log(gen.next()); // { value: "Y", done: false }
console.log(gen.next()); // { value: "R", done: true }
console.log(gen.next()); // { value: undefined, done: true }
```

Now we can move back to redux-saga.

### Initialization of Saga

As a first step, lets install redux-saga.

```
npm i redux-saga
```

Later than that, we need to add saga as a middleware to our Redux store.

```js
// src/redux/store.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";
```

`applyMiddleware` is the API to connect middlewares to Redux.

> The regenerator-runtime/runtime is imported to allow async actions to be transpiled by Babel without any issues. If this line is omitted, your app with fail with the following error message: Uncaught ReferenceError: regeneratorRuntime is not defined.

#### Creation of First Saga

At this step, we should create our first saga.

```js
// src/redux/root-saga.js

export function* firstSaga(){
    console.log("This is my first saga.");
}
```

Now lets back to our store and connect saga.

```js
// src/redux/store.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";
import rootReducer from './reducer'; // assume that we have a reducer.
import {firstSaga} from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [];
middlewares.push(sagaMiddleware);

export const store = createStore(import rootReducer from './reducer' // assume that we have a reducer.
,applyMiddleware(...middleWares));

```
Now, we have integrated our redux-saga as a middleware. To run our saga, we have to use `run()` command as follows:

```js
// src/redux/store
...

sagaMiddleware.run(exampleSaga);
```

As a result, we have:

```js
// src/redux/store.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";
import rootReducer from './reducer'; // assume that we have a reducer.
import {firstSaga} from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(firstSaga);
```

If you check your console, you'll see `This is my first saga.` which means we successfully deployed our first saga.

Now lets try to add some async event to our setup. Let's make a counter and buttons to play value. To do this, first step is to create a action types and reducer.


```js
// src/redux/types.js
const ACTIONTYPES = {
    increment: "INCREMENT",
    decrement: "DECREMENT",
};

export default ACTIONTYPES;
```

```js
// src/redux/reducer.js

import ACTIONTYPES from "./types";

const initialState = 0;
const initialFetchState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONTYPES.increment:
            return state + 1;
        case ACTIONTYPES.decrement:
            return state - 1;
        default:
            return state;
    }
};

export {reducer};
```

When we call "increment" action, we'd wait that value will increase, and "decrease" action to decrease.

As a second step, we should connect our reducer to store.

```js
// src/redux/store.js

import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";
import { reducer } from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    counter: reducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
```

> Notice that we still have our saga, so we will have same console log output.

After connect our reducer, its time to create our React component and connect store to it. We must connect redux to react system on index file first.

```js
// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

```

Now we're ready to create our React component and connect store to it. 

```js
// src/App.js

import React from "react";
import { connect } from "react-redux";

function App({
    state,
    decrement,
    increment
  }) {
    return (
        <div className="App">
            <button onClick={() => decrement()}>Decrease</button>
            <span>{state}</span>
            <button onClick={() => increment()}>Increase</button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    state: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

`connect` is an HOC that helps us to connect redux actions & dispatchs to react component. You should add your state info on `mapStateToProps` and dispatch info on `mapDispatchToProps` functions.

Now we should be able to observe that buttons working as we want.

![counter-gif](/counter.gif)

#### First Async Saga

Now we can add more functionality on the system. Lets simulate an async increase event and try to integrate it with sagas. Lets create a function that return promise after a given time.

```js
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
```

This function can help us to simulate async events.

We need to create 2 sagas now, 1 worker saga to perform async increment task and 1 watcher saga to spawn a new increment async task.

Watcher saga should look like:

```js
export function* watchIncrementAsync() {
    yield takeLatest("INCREMENT_ASYNC", incrementAsync);
}
```

This saga creates an `"INCREMENT_ASYNC"` action type and calls incrementAsync function after that. `takeLatest` is an API that saga serves us. 

>takeLatest(pattern, saga, ...args)​ Forks a saga on each action dispatched to the Store that matches pattern. And automatically cancels any previous saga task started previously if it's still running.

[You can look for all saga APIs here.](https://redux-saga.js.org/docs/api/)

Watcher saga will call `incrementAsync` function, which is our worker saga. Worker saga should look like.

```js
export function* incrementAsync() {
    yield delay(1000);
    yield put({ type: "INCREMENT" });
}
```

This saga will run `delay(1000)` first, later calls `dispatch({type: "INCREMENT" })` action.

To be able to access our created sagas, we should export our **watcher saga**.

```js
// src/saga.js

import { all, put, takeLatest } from "redux-saga/effects";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* incrementAsync() {
    yield delay(1000);
    yield put({ type: "INCREMENT" });
}

export function* watchIncrementAsync() {
    yield takeLatest("INCREMENT_ASYNC", incrementAsync);
}

export default function* rootSaga() {
    yield all([watchIncrementAsync()]);
}
```

Now we're ready to use saga on our React component.

```jsx
// src/App.js

import React from "react";
import { connect } from "react-redux";

function App({
    state,
    decrement,
    increment,
    incrementDelay,
}) {
    const slicedFetch = fetchState.slice(0, 10);
    return (
        <div className="App">
            <button onClick={() => decrement()}>Decrease</button>
            <span>{state}</span>
            <button onClick={() => increment()}>Increase</button>
            <button onClick={() => incrementDelay()}>
                Increase with Delay
            </button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    state: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
    incrementDelay: () => dispatch({ type: "INCREMENT_ASYNC" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

Let's check output now.

![counter-with-delay-gif](/counterdelay.gif)

#### Fetch Call with Saga

As a last step, lets try to work with real fetch call. Let's create our fetch call first.

```js
// src/redux/fetchCalls.js

import axios from "axios";

export const getPosts = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");

    return res.data;
};
```

This async function will give us result data it if successfully fetches. Same with the methdology we've followed on the case above, we need to create a worker and a watcher sagas. Lets try to create them.

```js
// src/redux/saga.js
export function* startFetch() {
    yield takeLatest("START_FETCH", fetchData);
}

export function* fetchData() {
    const res = yield getPosts();
    yield put({ type: "FETCH", payload: res });
}
```

`startFetch` function is our watcher saga, whereas `fetchData` is the worker.

Our finalized saga file should look like:

```js
// src/redux/saga.js

import { all, put, takeLatest } from "redux-saga/effects";
import { getPosts } from "./fetchCalls";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* incrementAsync() {
    yield delay(1000);
    yield put({ type: "INCREMENT" });
}

export function* fetchData() {
    const res = yield getPosts();
    yield put({ type: "FETCH", payload: res });
}

export function* watchIncrementAsync() {
    yield takeLatest("INCREMENT_ASYNC", incrementAsync);
}

export function* startFetch() {
    yield takeLatest("START_FETCH", fetchData);
}

export default function* rootSaga() {
    yield all([watchIncrementAsync(), startFetch()]);
}
```

Now it's time to create reducers and connect this reducer to our store.

```js
// src/redux/reducer.js

import ACTIONTYPES from "./types";

const initialState = 0;
const initialFetchState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONTYPES.increment:
            return state + 1;
        case ACTIONTYPES.decrement:
            return state - 1;
        default:
            return state;
    }
};

const fetchReducer = (state = initialFetchState, action) => {
    switch (action.type) {
        case ACTIONTYPES.fetch:
            return [...action.payload];
        default:
            return state;
    }
};

export { fetchReducer, reducer };

```

```js
// src/redux/store.js

import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";
import { reducer, fetchReducer } from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    counter: reducer,
    fetch: fetchReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
```

I've created completely different reducer for fetch data, and connect it to store. So on our store we've 2 different reducers now.

Let's connect call our saga on React component.

```js

// src/App.js

import React from "react";
import { connect } from "react-redux";

function App({
    state,
    decrement,
    increment,
    incrementDelay,
    fetchState,
    fetch,
}) {
    const slicedFetch = fetchState.slice(0, 10);
    return (
        <div className="App">
            <button onClick={() => decrement()}>Decrease</button>
            <span>{state}</span>
            <button onClick={() => increment()}>Increase</button>
            <button onClick={() => incrementDelay()}>
                Increase with Delay
            </button>
            <br /> <br /> <br /> <br />
            <button onClick={() => fetch()}>Fetch Data</button>
            {slicedFetch && (
                <>
                    {slicedFetch.map((el) => (
                        <h3 key={el.title}>
                            ----
                            {el.title}
                        </h3>
                    ))}
                </>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    state: state.counter,
    fetchState: state.fetch,
});

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
    incrementDelay: () => dispatch({ type: "INCREMENT_ASYNC" }),
    fetch: () => dispatch({ type: "START_FETCH" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

```


Now output should look like:

![fetch-gif](/fetch.gif)


As a result, we've managed to run our sagas for 3 different cases. I hope this post helped you to digest saga concept on React environment. Using sagas is cutting-edge way to deal with async event and I highly recommend them.

[You can find related GitHub repo here](https://github.com/ygzaydn/redux-saga/tree/fetch). Please check other branches for previous cases.
