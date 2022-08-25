# Asynchronous Javascript and Promises

We all know that JS is a single threaded language, so execution happens line by line. This means that in any type of asynchronous event, this synchronous sequence of execution may have some problems. Due to this singularity on execution, we need different solution to deal with async events.

Asynchroninous Javascript is a complex topic that many developers struggle while dealing with it. In this post, I'll try to explain asynchronous JS and promises by giving some examples. 
- [Asynchronous Javascript and Promises](#asynchronous-javascript-and-promises)
  - [Asynchronous Javascript](#asynchronous-javascript)
  - [Promises](#promises)
## Asynchronous Javascript

Asyncronicity is the backbone of modern web development in Javascript.
Javascript is single-threaded (one command executing at a time) and has a synchronous execution model (each line is executed in order the code appears).

So what if we need to **wait some time before we can execute certain bits of code?** Perhaps we need to wait on fresh data from an API/server request or for a timer to complete and then execute our code. We have a conundrum - a tension between wanting to **delay some code execution** but **not wanting to block the thread** from any further code running while we wait.

To solve the problem, we need use some features that run outside JS engine itself. We utilize webAPI/Node background threads to deal with async events.

WebAPI and Node background threads are outside of Javascript, the returned values from those structures will not been executed until global context is free. So we wait for single threaded JS to complete.

> JavaScript has a runtime model based on an event loop, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. It continously checks the global execution context to determine next step.

```js
(() => {

  console.log('this is the start');

  setTimeout(() => {
    console.log('Callback 1: this is a msg from call back');
  },0); 

  console.log('this is just a message');

  setTimeout(() => {
    console.log('Callback 2: this is a msg from call back');
  }, 0);

  console.log('this is the end');

})();

// "this is the start"
// "this is just a message"
// "this is the end"
// "Callback 1: this is a msg from call back"
// "Callback 2: this is a msg from call back"

/*
Since we have single thread of execution, the output that
we have will look like this. JS global execution context
will run over the lines until code finishes. Any async event
will be pushed to webAPI interface. While global exectuion context
runs synchronous functions (console.logs()), webAPI processes the
async calls and whenever it finishes the job, webAPI pushes the
result to callback queue. Javascript's event loop will continously
look up to global stack and callback queue to determine next step
of program does. Whenever the global stack is free, the results at
callback queue will be invoked and as a result, async events are
completed on the program.
*/
```

> If you run something outside JS engine, wait until global stack is free.

Callback queue is JS engine feature. It tracks the situation of webAPI calls.

## Promises

Promises are pecial objects build into JavaScript that get returned immediately when we make a call to a web browser API/feature (e.g fetch) that's set up to return(not all are).
Promises act as a placeholder for the data we hope to get back from the web browser feature's background work. They have 3 different states: `pending, fulfilled or rejected`. Depending on the success of operation, they behave differently. In case of success, they run the function on their `onFulfillment` attribute, on failure it'll look up to `onRejection` attribute.
We also attach the functionality we want to defer running until that background work is done (using the built in `.then` method). By calling `.then(method)` we'll push the method to `onFullfillment` array. Similarly `.catch(method)` works for `onRejection`.

Promise objects will automatically trigger that functionality to run.
  - The value returned from the web browser feature's work (e.g the returned data from fetch) will be that function's input/argument

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(()=> {
    resolve("foo")
  },300)
})

myPromise.then(handleFullfilledA, handleRejectedA) 
/* 
.then and .catch returns another promise objects.
*/
```

```js
function display(data) {
  // declaring a function named display
  console.log(data)
}

const futureData = fetch("https://....") 
/* 
declaring a variable futureData whose value is 
undefined at start. value of futureData will be 
determined after fetch operation completes, fetch 
returns a promise which has {value, onFulfillment, 
status} attributes.
*/

futureData.then(display) // attaches display function to onFulfillment array

// whenever we get request from fetch, the method on onFulfillment array will be executed.

console.log("Me First!")

/*
Fetch returns a promise.  
Promise object has the following structure:
{
  value: undefined at initial
  onFullfilment: [] // the array to show what we'll do when we have the value, like the operation on .then()
}

As a result, we'll log "Me First!"" first, then the response of the fetch.

*/
```

We have rules for the execution of our asynchronously delayed code.

1.  We hold each promise-deferred functions in a **microtask queue** and each non-promise deferred function in a task queue (callback queue) when the API completes.
2.  Add the function to the call stack (i.e execute the function) **ONLY** when the call stack is totally empty (we have the Event Loop to check this condition).
3.  Event Loop prioritize tasks (callbacks) in the microtask queue over the regular task queue.

> Microtask queue has a different name on standarts: **Job Queue**, and **it has priority over Callback Queue.**

Promises, Web APIs, the Callback & Microtask queues and Event Loop allow us to deferour actions until the work(an API request, timer etc) is completed and continue running our code line by line in the meantime.

> Asynchronous JS is the backbone of the modern web - letting us build fast 'non-blocking'

Promises also have `onRejection` hidden attribute which we can pass our function in case promise call cannot be completed.