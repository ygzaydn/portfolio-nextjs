# Handling Errors on React

While developing web apps, unwanted errors may happen. Whenever React faces with an error, it crashes the app and shows error message. This crush event harms our user experience, and we may want to avoid that event before it occurs.

In this post, I'll talk about *error boundaries*. 

## Error Boundaries

As [official React documentary](https://reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper) states:

> Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

It's important to note here that, error boundaries **don't catch** errors for:

-	Event handlers
-	Asynchronous code
-	Server side rendering
-	Errors thrown in the error boundary component itself.

We have some work-arounds to catch errors for above list aswell, which is explained in later parts of this post.

### How to catch errors?

Everything so far seems reasonable, but how we apply this error boundary component? To implement *ErrorBoundary*, we **have to use** class components. This obligation is due to some methods that React serves us.


`static getDerivedStateFromError(error)` method returns a new state based on the error we caught.

`componentDidCatch(error, errorInfo)` lifecycle is called whenever an error occurs. We can log the error or try to recover from error.

```js
static getDerivedStateFromError(error){
	// Update state so the next render will show the fallback UI.    
	return { hasError: true };
}

componentDidCatch(error, errorInfo) {    
	// You can also log the error to an error reporting service    
	logErrorToMyService(error, errorInfo);  
}
```

By using those two methods above, we should be ready to implement our *ErrorBoundary* component. Let's get started.

### Implementation

As I've indicated above, we need a class component. We also have to define a state to control conditional render.

```js
class ErrorBoundary extends React.Component {

    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        errorService.log({ error, errorInfo });
    }
    ....
}
```

Next, we have to change the JSX we return as state changes.

```js
class ErrorBoundary extends React.Component {

    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        errorService.log({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return <h1>Oops, we have found an error</h1>;

        }
        return this.props.children;
    }  

}
```

This component returns its child component when there is no error. In case of error, we'd see `<h1>Oops, we have found an error</h1>` element.

### Usage

Our *ErrorBoundary* is ready to use now. We can wrap our `<App />` by it.

```js
ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    document.getElementById('root')
)
```

Congratulations, we've managed to implement our ErrorBoundary on our React element.

### Modifications

Obviously, the component we've defined is open to development. I've add some modifications to enhance the experience we have.

To start with, we can add a method to reset our error, which helps end user to try rendering our app again.

```js
class ErrorBoundary extends React.Component {
    state = { hasError: false };
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        errorService.log({ error, errorInfo });
    }

    resetError () {
    	this.setState({hasError: false})
    }

    render() {
        if (this.state.hasError) {
            return (
            <div>
                <h1>Oops, we have found an error</h1>;
                <button type="button" onClick={() => this.resetError()}>
                Try again?
                </button>
            </div>
            );
        }
        return this.props.children;
    }  
}
```

Remember that, I've mentioned the limitations that we have:

	-	Error boundaries can't catch the errors on async events.

What if we use a React.Context Component, and serve our setState function to our children components? In this case we'd be able to change the error state, hence our app will sense the errors on async calls. Let's try to implement it.

```js
class ErrorBoundary extends React.Component {
    state = { hasError: false };
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        errorService.log({ error, errorInfo });
    }

    resetError () {
    	this.setState({hasError: false})
    }
    catchError () {
    	errorService.log({error, errorInfo});
    	this.setState({hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return (
            <div>
                <h1>Oops, we have found an error</h1>;
                <button type="button" onClick={() => this.resetError()}>
                Try again?
                </button>
            </div>
            );
        }
        return this.props.children;
    }  
}
````

`catchError()` function changes state whenever we want to. Now let's create a React context and pass our function to it.

```js
const ErrorBoundaryContext = React.createContext(() => {});

const useErrorHandling = () => {
    return React.useContext(ErrorBoundaryContext)
}

class ErrorBoundary extends React.Component {
    state = { hasError: false };
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        errorService.log({ error, errorInfo });
    }

    resetError () {
    	this.setState({hasError: false})
    }
    catchError (error) {
    	errorService.log({error, errorInfo});
    	this.setState({hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return (
            <ErrorBoundaryContext.Provider value={this.catchError}>
                <h1>Oops, we have found an error</h1>;
                <button type="button" onClick={() => this.resetError()}>
                Try again?
                </button>
            </ErrorBoundaryContext>
            );
        }
        return this.props.children;
    }  
}

```

Now, we should be able to use `catchError` method on our children components. Imagine that we have got a button.

```js

const SignUpButton = () => {
	const catchError = useErrorHandling();
	const handleClick = async () => {
		try {
			//some async call
		} catch (error) {
			catchError(error);
		}
	}
	return <button onClick={handleClick}>Sign up</button>;
}
```

Now, we are able to sense errors on aysnc calls.

> You have to make a decision here. It might not be a good idea to use the approact that we have above. We may not want to navigate user to our error page when a fetch fails. Our app may use cached value, or may even try re-fetching instead of navigating error page. The decision is up to application & developer.

## React-error-boundary

We can write our own error boundary component, but luckily there are different solutions. [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) is a npm package which is developed by a React Core team member, and we can use it.

Usage is very similar to our *ErrorBoundary* component.

```js
ReactDOM.render(
    <ErrorBoundary 
        FallbackComponent={MyFallbackComponent}
        onError={(error, errorInfo) => errorService.log({ error, errorInfo })}
    >
        <App />
    </ErrorBoundary>,
    document.getElementById('root')
)
```

## Conclusion

Handling errors is vital to prevent unexpected behaviors for our application. It also provide better user experience. *ErrorBoundary* helps us to handle errors on React, and I highly suggest you to use it.

