# React 18 - What's New?

React is an open-source JavaScript UI library designed by Facebook, it has gained a lot of popularity in the front-end developer community.

![1](./react18-1.jpg)

React 18 is shifting from alpha to beta and has some exciting features and updates for the React.js development community. All updates are primarily aimed to maintain third-party libraries by introducing out-of-the-box features and improvements.

In this post, I'll try to explain those changes, and how they impact our development process. Let's get started.

## Automatic Batching

One of the great upgrade coming to us in React 18 is *automatic batching.*

> Computerized batch processing is a method of running software programs called jobs in batches automatically. While users are required to submit the jobs, no other interaction by the user is required to process the batch. Batches may automatically be run at scheduled times as well as being run contingent on the availability of computer resources. 

On previous version of React, batching happened when you had multiple state updates within a single event handler; in that situation, React would re-render once at the end of the function - not on every state change. However, this operation can't happen outside event handlers. To overcome batching in React 17, 


For an example, if there were multiple state updates within a fetch call, the code would *re-render* for each state changes.

```js
fetch('http://example.com/data.json').then(() => {
    setIsLoading(false); 
    setData(data);
    setError(null);
});

// In this case, the page get render 3 times.
```

With React 18, updates are batched automatically, regardless of what they're wrapped by.