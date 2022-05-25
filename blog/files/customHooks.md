# Creating Custom Hooks on React

React is an open-source JavaScript UI library designed by Facebook, it has gained a lot of popularity in the front-end developer community.

React has started its journey by presenting class-based components and lifecycle methods, later than that creators of React have worked on function-based components. 

On version 16.8 hooks were added to React. Hooks allow functional components to have ability to access states some React features (such as states, lifecycle methods). Thanks to hooks, necessity of class components have been vanished.

There are some popular hooks that React introduces us. Let me briefly explain those popular ones before moving on.

> *Note*: I will just give a small introduction about those hooks. Usage of those hooks is a different topic.

-   `useState`: React useState hook allows us to generate and track states in a functional components.
-   `useEffect`: React useEffect hook allows us to perform side effects in a functional components.
-   `useRef`: React useRef hook allows us to persist values between renders. We can use useRef to access DOM elements.

There are more hooks that React brings us (`useCallback`, `useMemo`, `useContext`, `useReducer` ...)

Although there are several number of hooks that we can use, it does not fully cover all goals that we want accomplish. To cope with this situation, we are able to define our **custom hooks**. React allows us to define new hooks depending on our needs. In this blog post, I will define a new custom hook to demonstrate the process that we need to have a fully custom hook which we can use whenever we want.

## useFetch custom hook

Imagine that we need a GET fetch call on our component. The best place that we make this call is before component renders, so we have to use `useEffect` hook for this operation. Simple code to operate fetch should look like as follows: 

```js
import React, { useState, useEffect } from 'react';
import useFetch from '../hooks'

const initialState = {
    data: null,
    error: null,
    loading: null,
}

const ExampleComponent = () =>  {
  
  const [info, setInfo] = useState({...initialState})

  const fetchData = async (url) => {
        try {
            const result = await fetch(url);
            const data = await res.json();
            setInfo(prev => ({...prev, data, loading: false}))
        } catch (error) {
            setInfo(prev => ({...prev, error, loading: false}))
        }
    }

    useEffect(() => {
        setInfo(prev => ({...prev, loading: true}))
        fetchData(targetURL)
    },[])

  return (
    <>
      {error && 'Error!'}
      {loading && 'Loading...'}
      {data.entries.map(el => (
        <div key={el.API}>{el.description}</div>
      )}
    </>
  )
}
```


Assume that we need more fetch operations on different component, wouldn't it be better if we have an operation to accomplish all fetch operations? At this point, it will be a might choice to build a custom hook. I will call this hook as `useFetch`.

Main goal of this hook is to return three different values to us which are data, error and loading state, respectively.

The only parameter that this hook is to target URL. If we supply proper target URL parameter to our custom hook, we want to have three parameters that I have explained above.

Before moving on the code itself, I want to give more information about the structure. When we think the possible necessities of the hook, we should realize that we need `useEffect` hook to deal with side effects and `useState` hook to keep data persistent and stable during the whole process. 

> To define a new custom hook, we need built-in hooks that React serves us.

We keep the parameters of our state with `useState` hook, and make our fetch call with `useEffect` hook.

A solution should look like this:

```js

import React, { useEffect, useState } from 'react';

const initialState = {
    data: null,
    error: null,
    loading: null,
}

const useFetch = (targetURL) => {
    const [info, setInfo] = useState({...initialState})

    const fetchData = async (url) => {
        try {
            const result = await fetch(url);
            const data = await res.json();
            setInfo(prev => ({...prev, data, loading: false}))
        } catch (error) {
            setInfo(prev => ({...prev, error, loading: false}))
        }
    }

    useEffect(() => {
        setInfo(prev => ({...prev, loading: true}))
        fetchData("https://api.publicapis.org/entries")
    },[targetURL])
    
    return (
        <>
            {error && 'Error!'}
	    {loading && 'Loading...'}
	    {data.entries.map(el => (
	        <div key={el.API}>{el.description}</div>
	    )}
	</>
    )
}

export default useFetch;
```

When we observe the hook above, we can easily say that it returns the three value that we want. An example usage of this hook should look like:

```js
const {data, error, loading} = useFetch("exampleURL")
```

It will be better approach to keep returned values on an state itself. A fully covered example of the usage:

```js
import React, { useState } from 'react';
import useFetch from '../hooks'

const ExampleComponent = () =>  {
  
  const [info, setInfo] = useState(useFetch("https://api.publicapis.org/entries"))
  return (
    <>
      {error && 'Error!'}
      {loading && 'Loading...'}
      {data.entries.map(el => (
        <div key={el.API}>{el.description}</div>
      )}
    </>
  )
}
```

As a result, we have managed to create a fully custom hook to accomplish all GET requests that we might have in future. This hook is open to develop, for example it can be added a flag for POST operations. The main goal of this post is to give an insight about how it works.
