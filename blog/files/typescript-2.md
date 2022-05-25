# useEffect with TypeScript
We all know that the importance of TypeScript. TypeScript allows us to check our code before runtime - thanks to type checking. So in this article, I'd deeply look into usage of useEffect hook with Typescript.
I will introduce useEffect briefly, than will move on usage of it with TypeScript.


---
## Table of Contents



- [useEffect](#useeffect)
- [useEffect with TypeScript](#useeffect-with-typescript)



---


## useEffect

The motivation behind the introduction of useEffect Hook is to eliminate the side-effects.

> Side effects are basically anything that affects something outside of the scope of the current function that's being executed. To give an example, tasks like updating the DOM, fetching data from API end-points, setting up subscriptions or timers, etc can be lead to unwarranted side-effects, can be different side effects that we face.

On class components, we use methods like *componentDidMount()*, *componentWillUnmount()*, *componentShouldUpdate()* to deal with side effects. *useEffect* hook does the same job for functional components.

useEffect() hook accepts 2 arguments:

```ts
useEffect(callback, [dependencies]);
```

-	callback is the function containing the side-effect logic. callback is executed right after changes were being pushed to DOM.
-	dependencies is an optional array of dependencies. useEffect() executes callback only if the dependencies have changed between renderings.

> Put your side-effect logic into the callback function, then use the dependencies argument to control when you want the side-effect to run. That's the sole purpose of useEffect().

The detailed usage of *useEffect()* hook will be explained on different article.

However, you can find detailed information on [official document](https://reactjs.org/docs/hooks-reference.html#useeffect)


## useEffect with TypeScript

For TypeScript usage, you dont need to provide any extra typings. TypeScript will check that the method signature of the function you provide is correct. Both of *useEffect* and *useLayoutEffect* are used for performing side effects and return an optional cleanup function which means if they don't deal with returning values, no types are necessary. When using useEffect, take care not to return anything other than a function or undefined, otherwise both TypeScript and React will yell at you. This can be subtle when using arrow functions:

```ts
const DelayedEffect = (props: { timerMs: number }) => {
  const { timerMs } = props;

  useEffect(() => {
    setTimeout(() => {
      /* do stuff */
    }, timerMs);
  }, [timerMs]);
  
  return null;
}
```