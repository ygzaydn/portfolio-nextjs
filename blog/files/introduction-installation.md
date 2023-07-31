# GraphQL

- [GraphQL](#graphql)
	- [Introduction and Installation](#introduction-and-installation)
	- [Basic configuration](#basic-configuration)


## Introduction and Installation

GraphQL is a query language that helps us to fetch data from the server. It is developed and maintained by enginners of Meta. From it's release, GraphQL had lots of interest. Most of the modern web projects have been utilized from it.

GraphQL is kind of a middleware that stands front of databases/data sources and behind frontend. GraphQL does not change the way that we store data. It only deals with the data send to the client. It is only interested the data that its client wants.

Shortcomings of RESTful routings:

-	When we need specific data, the nested structure of RESTful APIs getting more 
and more complex. 
-	On highly related data, using of RESTful APIs may harm our software, since we have to make lots of calls.
-	We fetch all the data from the backend although we do not need them. RESTful APIs may serve dramatically heavy data.

An example query:

```gql
query {
	users(id: "23"){
		friends{
			id
			name
			company{
				name
			}
			position{
				name
			}
		}
	}
}
```

Packages that we need to install:

`npm i express express-graphql graphql --save`

## Basic configuration

```js
//server.js
const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;

const app = express();
app.use(
    "/graphql",
    expressGraphQL({
        graphiql: true,
    })
);

app.listen("4000", () => {
    console.log("Listening port 4000");
});
```

It is clearly seen that we are using backend service `express` and put our GraphQL middleware front of it.

> GraphiQL is the reference implementation of this monorepo, GraphQL IDE, an official project under the GraphQL Foundation. Graphiql is a development tool to train developers to use GraphQL. You can test GraphQL endpoints by help of GraphiQL. Open your terminal and type `node server.js`, then go to your browser and navigate `http://localhost:4000/graphql` to check GraphiQL interface.

As like other backend services, we must define & use a schema to use GraphQL. Our first step is going to be schema creation and type declarations.