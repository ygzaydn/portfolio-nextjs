# Definitions 

## Schema Definition

Schemas include `types` (types are  like "tables" for SQL databases, "collection" for noSQL databases). Each type has different fields and types for each fields. To declare a type and its fields, we use `GraphQL` helpers (e.g `GraphQLObjectType, GraphQLString, GraphQLInt`)

Each type has two mandatory fields, which are named as `name` and `fields`. On `fields`, we define our parameters and their types.

An example schema should look like:

```js
//schema/schema.js
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {
            type: GraphQLString,
        },
        firstName: {
            type: GraphQLString,
        },
        age: { type: GraphQLInt },
    },
});

```
Now, our User collection will look like:

```
---------------------------------
|name       |type           |
---------------------------------
|id         |string         |
|firstName  |string         |
|age        |int            |
---------------------------------
```

## Root Query Definition

To use GraphQL in our application, we have to define Root Query. Root Query is the entry point of GraphQL API.

> Root query is defined as follows on [graphql official docs](https://graphql.org/learn/execution/#:~:text=Root%20fields%20%26%20resolvers,which%20accepts%20the%20argument%20id%20.): *At the top level of every GraphQL server is a type that represents all of the possible entry points into the GraphQL API, it's often called the Root type or the Query type.*

Structure of Root Query is similar to our types. It has a type of `GraphQLObjectType` and have `name` and `fields` keys. Name is generally assigned as `RootQueryType`, the key point is the keys of `fields`. Each field under `fields` describe an endpoint for our GraphQL backend. So for `localhost:4000/graphql/user`, we should make a definition as follows:

```js
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                // the way we gather data from DB
                // the most important field of RootQuery
            },
        },
    },
});
```

Under user:
-   type: type defines the type of output. In this case, it should have `id, firstName, age` parameters.
-   args: args defines the arguments that we send to this endpoints. In this case, we defined an `id` parameter to look over specific user.
-   resolve: resolve is the place where we get our data from backend and serve as graphQL output. This is the place we should fetch our db and parse the data.

## Integration

At first step, let's use static data, and fill resolve function. 

> I've used library `lodash` here. Please install it by typing `npm i lodash` to your terminal before moving on.

Let's create a schema and export it.

```js
// schema.js

const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const users = [
    {
        id: "23",
        firstName: "Bill",
        age: 20,
    },
    {
        id: "47",
        firstName: "Samantha",
        age: 21,
    },
];

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {
            type: GraphQLString,
        },
        firstName: {
            type: GraphQLString,
        },
        age: { type: GraphQLInt },
    },
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                const { id } = args;
                return _.find(users, { id });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});

```

As a next step, we should import our schema into server.js and serve as a parameter under `expressGraphQL` method.

```js
// server.js

const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");

const app = express();
app.use(
    "/graphql",
    expressGraphQL({
        schema,
        graphiql: true,
    })
);

app.listen("4000", () => {
    console.log("Listening port 4000");
});

```

We're ready to try our query now. Now enter `localhost:4000/graphql` and you'll see graphiql UI that you can enter your queries.