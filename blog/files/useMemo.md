# React useMemo() hook

In this post, I will try to explain one of the fanciest hooks that React represents: `useMemo()`. useMemo helps us to accomplist the goal of memoization, to avoid unnecessary calculations on every render. First, I briefly explain what memoization is, later that I'll jump into the hook itself.

## Memoization and why is it so important?

As [wikipedia](https://en.wikipedia.org/wiki/Memoization) explains:

> In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

A "memoized" function remembers the result of corresponding outputs for some set of inputs. Subsequent calls with remembered inputs always return same result, so recalculating it is a mess, and we should avoid it.

React serves us a hook to accomplish that goal. Let's dive into how it works.

## useMemo() hook

useMemo hooks helps us to avoid recalculation of a variable on every render. It helps us to improves our performance by saving the amount of recalculation time. It's very useful on big list of objects or arrays.

`useMemo()` is a built-in React hook that accepts 2 arguments — a `function` compute that computes a result and the `depedencies array`:

```javascript
const memoizedResult = useMemo(compute, dependencies);
```

During initial rendering, `useMemo(compute, dependencies)` invokes `compute`, memoizes the calculation result, and returns it to the component.

If during next renderings the dependencies don't change, then `useMemo()` **doesn't invoke compute but returns the memoized value**.

But if dependencies change during re-rendering, then useMemo() invokes compute, memoizes the new value, and returns it. The important point to use `useMemo()` is to determine dependency array.

I'll copy a use case for `useMemo()` ~ [source](https://dmitripavlutin.com/react-usememo-hook/)

```javascript
import { useState } from 'react';
export function CalculateFactorial() {
  const [number, setNumber] = useState(1);
  const [inc, setInc] = useState(0);
  const factorial = factorialOf(number);
  const onChange = event => {
    setNumber(Number(event.target.value));
  };
  const onClick = () => setInc(i => i + 1);
  
  return (
    <div>
      Factorial of 
      <input type="number" value={number} onChange={onChange} />
      is {factorial}
      <button onClick={onClick}>Re-render</button>
    </div>
  );
}
function factorialOf(n) {
  console.log('factorialOf(n) called!');
  return n <= 0 ? 1 : n * factorialOf(n - 1);
}
```

Every time you change the input value, the factorial is calculated factorialOf(n) and 'factorialOf(n) called!' is logged to console.

On the other side, each time you click Re-render button, inc state value is updated. Updating inc state value triggers `<CalculateFactorial />` re-rendering. But, as a secondary effect, during re-rendering the factorial is recalculated again — 'factorialOf(n) called!' is logged to console.

How can you memoize the factorial calculation when the component re-renders? Welcome `useMemo()` hook!

By using `useMemo(() => factorialOf(number), [number])` instead of simple factorialOf(number), React memoizes the factorial calculation.

Let's improve `<CalculateFactorial />` and memoize the factorial calculation:

```javascript
import { useState, useMemo } from 'react';
export function CalculateFactorial() {
  const [number, setNumber] = useState(1);
  const [inc, setInc] = useState(0);
  const factorial = useMemo(() => factorialOf(number), [number]);
  const onChange = event => {
    setNumber(Number(event.target.value));
  };
  const onClick = () => setInc(i => i + 1);
  
  return (
    <div>
      Factorial of 
      <input type="number" value={number} onChange={onChange} />
      is {factorial}
      <button onClick={onClick}>Re-render</button>
    </div>
  );
}
function factorialOf(n) {
  console.log('factorialOf(n) called!');
  return n <= 0 ? 1 : n * factorialOf(n - 1);
}
```

However, if you click Re-render button for the case above, 'factorialOf(n) called!' isn't logged to console because `useMemo(() => factorialOf(number), [number])` returns the memoized factorial calculation. So we've managed to accomplish our goal!


As a conclsion, `useMemo(() => computation(a, b), [a, b])` is the hook that lets you memoize expensive computations. Given the same `[a, b]` dependencies, once memoized, the hook is going to return the memoized value without invoking `computation(a, b)`.

You always should consider those kinds of enhancements on your React app to be an React expert. Those small improvements, will have much more effect as time goes on.

On this post, I've tried to explain `useMemo()` hook that React serves us.