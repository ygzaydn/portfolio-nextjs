# React with Firebase

---
## Table of Contents



- [React Router](#react-router)
- [Firebase](#firebase)
	- [Firebase in React](#firebase-in-react)
	- [Firebase's Authentication API](#firebase-s-authentication-api)
		- [withRouter HOC](#withrouter-hoc)
		- [Recompose package](#recompose-package)
	- [Session Handling with Higher-Order Components](#session-handling-with-higher-order-components)
	- [Authorization\(1\): General Authorization and Route Protection](#authorization-1---general-authorization-and-route-protection)




---

## React Router

```js
npm install react-router-dom
```

Best place to place routing logic is App component.

```js
// on app.js
import { BrowserRouter as Router, Route } from 'react-router-dom'
...
const App = () => {
	return (
		<Router>
			<Route exact path={ROUTES.LANDING} component={LandingPage}
			....
			<Route path={ROUTE.ADMIN} component={AdminPage}
		</Router>
	)
}
```

We use Router component from 'react-router-dom' package to wrap up our Routes, it behaves like a context API in React. To do so, we can control our Routes in a composed way.

On the pages we want to route from, we need to use Link component from 'react-router-dom' package.

```js
import {Link} from 'react-router-dom'
...
<Link to={place-to-go}>Link</Link>
```

## Firebase
Firebase enables realtime databases, extensive authentication and authorization, deployment. You can build real-world applications with React & Firebase without worrying about back-end.

```js
npm install firebase
```
To run firebase for your application, you have to get your firebase credentials from firebase website. 

Its under general options on project page. Similar config file is attached below:

```js
 var firebaseConfig = {
    apiKey: "AIzaSyDw42F5UkRgcoXasdasdrvweBhzxDZoNICAdT7YQ",
    authDomain: "react-firebase-authentic-5ae39qweqwe.firebaseapp.com",
    databaseURL: "https://reactzxc-firebase-authentic-5ae39.firebaseio.com",
    projectId: "react-firebase-autqwehentic-5ae39",
    storageBucket: "react-firebase-authentic-5a1sae39.appspot.com",
    messagingSenderId: "101055040431261ws10",
    appId: "1:1010550404610:web:6e722aasd3ce313c3a4c8191b"
  };
```

You can either use those variables directly, or hide them behind *.env* files.

In order to create a Firebase Class, we need to create a Firebase Component in React.

```js
//on Firebase/firebase.js
import app from 'firebase/app'
const config = {
	...
}

class Firebase {
	constructor(){
		app.initializeApp(config);
	}
}
export default Firebase;
```

### Firebase in React

We've created a Firebase class, now its time to connect it with our React App. To do it, we will use React Context API, and wrap our components under the Firebase Context.

Firstly, we have to create a Firebase Context.

```js
//on Firebase/context.js

import React from 'react'
const FirebaseContext = React.createContext(null)
export default FirebaseContext;
```

[NOTE] React's Context API gives us two components(Consumer and Provider).

- Provider: Used to provide Firebase instance at top-level of React Component Tree
- Consumer: Used to retrieve the Firebase instance if it is needed in the component.

As a second step, we will create a HOC that covers Firebase Context.

```js
on Firebase/index.js

import React from 'react'
import FirebaseContext from './context'
import Firebase from '.firebase'

export const withFirebase = (Component) => props => (
	<FirebaseContext.Consumer>
		{(firebase)=> <Component {...props} firebase={Firebase}} />}
	</FirebaseContext.Consumer>
)

export default Firebase;
export { FirebaseContext }
```

We've used the Consumer component of FirebaseContext, so we need to wrap it up with a Provider. The top level of our project (index.js) is a right place to use Provider.

```js
//on index.js

import React from 'react'
...
import Firebase, { FirebaseContext } from "./components/Firebase";

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}
		<App />
	</FirebaseContext.Provider>,
	document.getElementById("root")

);
```

Now, any component that we wrap up with withFirebase HOC, will have firebase props, which we can react and use it.

### Firebase's Authentication API
As an entrance point of Firebase, we'd have firebase's authentication API in our project. We can import it on our Firebase class.

```js
//on Firebase/firebase.js
import 'firebase/auth';
...
class Firebase {
	...
	app.initializeApp(config);
	*this.auth = app.auth();*
	...
}
```

app.auth() gives us several methods that are useful:

- auth.createUserWithEmailAndPassword(email, password)
- auth.signInWithEmailandPassword(email, password)
- auth.signOut()
- auth.sendPasswordResetEmail(email)
- auth.currentUser.updatePassword(password)

to use those methods, we have to add them in our Firebase class.

```js
//on Firebase/firebase.js
	...
	this.auth=app.auth();
	

	doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  	doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
    ...
```
#### withRouter HOC
There are some cases we want to redirect the user to another page(e.g routing to home page after log-in)

To do so, we need to use React Router's *withRouter* HOC. We take history as an input prop, and play with it.

```js
import { withRouter } from 'react-router-dom'

const ComponentNameBase = ({history}) => {
...
	history.push(Route_to_go)
...
}
const ComponentName = withRouter(withFirebase(ComponentNameBase))
```

#### Recompose package
A package to combine different HOC's for a component.
```js
npm install recompose
```

Usage:
```js
import {compose} from 'recompose'
const ComponentName = withRouter(withFirebase(ComponentNameBase)) OR
const ComponentName = compose(withRouter, withFirebase)(ComponentNameBase)
```

### Session Handling with Higher-Order Components
Logic regarding the current authenticated user needs to be stored and made accessible other components. There is where we use Redux or MobX. On our particular ptoject, we use local state under App component.

To get information about current user, we use ```auth.onAuthStateChanged``` method. Lets look it in details:

```js
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});
```

Main logic that we'll use is to catch user with ```onAuthStateChanged``` and conditional render our components whether we have logged user or not. To do this operation we can again use a HOC, which is named as *withAuthentication*

Let's define Context API for Authentication.
```js
//on Session/Context.js
import React from 'react'
const AuthUserContext = React.createContext(null)
export default AuthUserContext

//on Session/withAuthentication
import React, {useState, userEffect} from 'react'
import {AuthUserContext} from 'context'
import {withFirebase} from ....


export const withAuthentication = Component => {
	const WithAuthentication = (props) => {
		const [authUser, setAuthUser] = useState(null);

		useEffect(() => {
			props.firebase.auth.onAuthStateChanged((authUser) => {
				authUser
				? setAuthUser(authUser)
				: setAuthUser(null)
			})
		},[]);

		return (
			<AuthUserConext.Provider value={authUser}>
				<Component (...props) />
			</AuthUserContext.Provider>
		)
	}
	return withFirebase(WithAuthentication)
}
```

Notice that this HOC provides Context.Provider not Context.Consumer, so this is overall coverage for AuthUserContext API, in order to use its functionality, we have to add AuthUserContext.Consumer element to our components.

So our withAuthentication will wrap up our App component.

```js
//App.js
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import { withAuthentication } from "../Session";
import * as ROUTES from "../../constants/routes";

const App = () => {
  return (
    <Router>
      <Navigation />
      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </Router>
  );
};

export default withAuthentication(App);
```

### Authorization(1): General Authorization and Route Protection

Protection for routes = authorization
So far, we are using 'broad-grained authorization' which checks if the user is logged or not. We can use role-based or permission-based authorizarion (fine-grained authorization)

We can define some conditions for rendering like:

- ```cons condition = authUser => authUser.role === 'ADMIN'```
- ```const condition = authUser => authUser.permissions.canEditAccount```

Like the withAuthentication HOC, we can define withAuthorization HOC which uses AuthUserContext.Provider mechanism to protect content from particular users or guests.

```js
//on Session/withAuthorization

import React, withRouter, compose, AuthUserContext, withFirebase, useEffect, * as ROUTES

const withAuthorization = condition => Component => {
	const WithAuthorization = (props) => {
		useEffect(() => {
			props.firebase.onAuthStateChanged(authUser => {
				if(!condition(authUser)){
					props.history.push(ROUTES.SIGN_IN)
				}
			})
		},[])

		return (
			<AuthUserContext.Consumer value={authUser}>
				{authUser => condition(authUser) ?
					<Component {...props} authUser={authUser}
					: null}
			</AuthUserContext.Consumer>
		)
	}

	return compose(withRouter, withFirebase)(WithAuthorization)
}
```

Notice that we've user AuthUserContext.Consumer this time (on withAuthentication we've used AuthUserContext.Consumer)

To call it:

```js
//on Account/index.js

import React from 'react'
const AccountPage = ({ authUser }) => {
	return (
		<div>
			<h1>Account Mail: {authUser.email}</h1>
		</div>
	)
}

const condition = authUser => authUser != null

export default withAuthorization(condition)(AccountPage)
```

