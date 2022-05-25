# useState with TypeScript
We all know that the importance of TypeScript. TypeScript allows us to check our code before runtime - thanks to type checking. So in this article, I'd deeply look into usage of useState hook with Typescript.
I will introduce useState briefly, than will move on usage of it with TypeScript.


---

## Table of Contents


- [useState](#usestate)
- [useState with TypeScript](#usestate-with-typescript)

---

## useState

As stated in [official react documentation](https://reactjs.org/docs/hooks-reference.html#usestate), useState *returns a stateful value, and a function to update it.* We basically use useState when we're dealing with functional components instead of class ones. And to get a state value, we have to use useState hook.
```ts
const [state, setState] = useState(initialState);
```
During the initial render, the returned state (state) is the same as the value passed as the first argument (initialState).
```ts
setState(newState);
```
During subsequent re-renders, the first value returned by useState will always be the most recent state after applying updates.
>React guarantees that setState function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list.

## useState with TypeScript
To use useState hook with TypeScript, we have to add new information to it. As indicated above, TypeScript does type checking before moving on, so we have to define a type on our useState declaration.
```ts
const [greeting, setGreeting] = useState<string | null>(null);
```
On above declaration, we have used Generics and Union types that TypeScript serves us. We define that our *greeting* state will either be null or string.
> We add **null** here to deal with initial declaration. Note that we have declared initial value of greeting state as null.

We would have use different declarations as follows:
```ts
type Greeting = 'Hello World' | 'Hey!' | "What's up?;
const [greeting, setGreeting] = useState<Greeting>('Hello World');
const [greeting, setGreeting] = useState('Hello World' as Greeting);
```
On below, I have provided a working example to make it more clear:
```ts
import React, {useState} from 'react';
type Greeting = 'Hello World' | 'Hey!' | "What's up?";
const Greetings = () =>  {
	const [greeting, setGreeting] = useState<Greeting|null>(null);
	return (
		<button onClick={()=> setGreeting("Hello World")}>Set Hello World</button>
		<button onClick={()=> setGreeting("Hey!")}>Set Hey!</button>
		<button onClick={()=> setGreeting("What's up?")}>Set What's up?</button>
		{ greeting && <p>{greeting}</p>}
	)
}
```
