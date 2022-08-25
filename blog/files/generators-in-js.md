# Generators in Javascript

Source of web development is data. We play with data and show it to end-users. Commonly, we need to iterate data, apply some functionalities on each element of our data. In this post, we'll focus this topic, and try to show the newest approach of Javascript to handle 'flow' of datas - generators.

- [Generators in Javascript](#generators-in-javascript)
  - [Iterators](#iterators)
  - [Generators](#generators)
    - [Async / Await](#async--await)


## Iterators

We regularly have lists or collections or data where we want to go through each item and do something to each element. We're going to discover there's a new beautiful way of thinking about using each element one-by-one.

```js
const numbers = [4,5,6]

for (let i=0; i<numbers.length; i++){
  console.log(numbers[i])
}
```

Programs store data and apply functionality to it. But there are two parts of applying functions to collections of data.

1.  The process of accessing each element
2.  What we want to do to each element

Iterators *automate* the accessing of each element - so we can focus on what to do to each element - and make it available to us in a smooth way.

**But it starts with us returning a function from another function**

Functions can be returned from other functions in JS.

```js
function crateNewFunction() {
  function add2(num) {
    return num+2
  }
  return add2
}

const newFunction = crateNewFunction()

const result = newFunction(3)
```

When a function returns a function, we have more source than a function, we also grap its lexical scope. (closures)

```js
function createFunction(array){
  let i = 0;
  function inner(){
    const element = array[i]
    i++
    return element
  }
  return inner
}

const returnNextElement = createFunction([4,5,6])
const element1 = returnNextElement() // 4
const element2 = returnNextElement() // 5
```

- When the function `inner` is defined, it gets a bond to the surrounding local memory in which it has been defined.
- When we return out `inner`, that surrounding live data is returned out too - attached on the 'back' of the function definition itself (which we now give a new global label `returnNextElement`)
- When we call `returnNextElement` and don't find array or i in the immediate execution context, we look into the function definition's 'backpack' of persistent live data
- The 'backpack' is officially known as the C.O.V.E. (Closed Over Variable Environment) or 'closure'
- We can observe closure's lexical scope from google dev tool `[[scope]]`


So, iterators turn our data into 'streams' of actual values we can access one after another.

Now, we have functions that hold our underlying array, the position we're currently at in the array, and return out the next item in the 'stream' of elements from our array when run.

This lets us have for loops that show us the element itself in the body on each loop and more deeply allows us to rethink arrays as flows of elements themselves which we can interact with by calling a function that switches that flow on to give us our next element.

We have truly 'decoupled' the process of accessing each element from what we want to do each element.

## Generators

JavaScript's build in iterators are actually objects with a `next` method that when called returns the next element from the 'stream'/flow. So let's restructure slightly.

```js
function createFlow(array){
  let i = 0
    const inner = {next :
      function(){
        const element = array[i]
        i++
        return element
      }
  }
  return inner
}

const returnNextElement = createFlow([4,5,6])
const element1 = returnNextElement.next()
const element2 = returnNextElement.next()

//And the built in iterators actually produce the next element in the format: {value: 4}
```

Once we start thinking of our data as flows (where we can pick of an element one-by-one) we can rethink how we produce those flows. JS now lets us produce the flows using a function.

```js
function *createFlow(){
  yield 4
  yield 5
  yield 6
}
const returnNextElement = createFlow()
const el1 = returnNextElement.next() // 4
const el2 = returnNextElement.next() // 5
```

`yield` suspends the execution context of current element. It keeps track the position of execution context itself. It pauses execution context **it won't release it.**

```js
function *createFlow(){
  const num = 10
  const newNum = yield num
  yield 5 + newNum
  yield 6
}

const returnNextElement = createFlow()
const element1 = returnNextElement.next() // 10
const element2 = returnNextElement.next(2) // 7

/*
This allows us to dynamically set what data 
flows to us (when we run returnNextElement’s
function)
*/
```

> `yield` at RHS is so powerful, when it's used on RHS, it'll return the value before even making assignments. Also on the next call, `yield` on RHS will read argument and take it inside the function.

returnNextElement is a special object (a generator object) that when its next method is run starts (or continues) running createFlow until it hits yield and returns out the value being 'yielded'.

And most importantly, for the first time we get to pause ('suspend') a function being run and then return to it by calling returnNextelement.next()

In async JS, we want to:

1.  Initiate a task that takes long time (e.g requesting data from the server)
2.  Move on to more synchronous regular code in the meantime
3.  Run some functionality once the requested data has come back

What if we `yield` out of the function at the tmoment of sending of the long-time task and return to the function only when the task is complete.

We can use the ability to pause createFlow's running and then restart it only when our data returns.

```js
function doWhenDataReceived(val){
  returnNextElement.next(val)
}

function *createFlow() {
  const data = yield fetch('https://twitter.com...')
  console.log(data)
}

const returnNextElement = createFlow()
const futureData = returnNextElement.next()

futureData.value.then(doWhenDataReceived)
```

We get to control when we return back to createFlow and continue executing by setting up the trigger to do so `returnElement.next()` to be run by our function that was triggered by the promise resolution (when the value returned from the server)

### Async / Await

Kind of a generator that helps us to control async events under the hood.

Async/await simplifies all this and finally fixes the inversion of control problem of callbacks.

```js
async function createFlow(){
  console.log("Me First")
  const data = await fetch("https://..")
  console.log(data)
}

createFlow()

console.log("Me second")

/*
await waits until the promise resolves and gets value of it.

Me First
Me second
data
*/
```
No need for a triggered function on the promise resolution, instead we auto trigger the resumption of the createFlow execution (this functionality is still added to the microtask queue though)

We don't have to trigger async events - like we did on promises (.then())-. Await behaves similar as `yield`. The createFlow method that we've created is actually a simulation of async/await paradigm.

