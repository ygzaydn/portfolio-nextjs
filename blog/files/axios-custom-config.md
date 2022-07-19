# Managing Axios

- [Managing Axios](#managing-axios)
  - [Installing](#installing)
  - [Data Fetching with Axios](#data-fetching-with-axios)
  - [Handling Responses](#handling-responses)
  - [Creating Axios Instance](#creating-axios-instance)
  - [Interceptors](#interceptors)

Fetching data on web development is vital. Almost all of our projects, we need to fetch data from our back-end service. There are different ways to handle fetching operation, but the best soluiton (for me) is axios.

[Axios](https://axios-http.com/docs/intro) is a promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same codebase). On the server-side it uses the native node.js http module, while on the client (browser) it uses XMLHttpRequests.

In this post, I'll try to show the best practices on axios.

## Installing

In order to install axios, you just need to add npm package to your node project:

```js
npm install axios

bower install axios

yarn add axios
```

Or even you can use it as a CDN:

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## Data Fetching with Axios

Fetching is super easy on axios. Just crate a axios instance and put the url on it.

```js
import axios from 'axios';

axios.get('https://some-domain.com/api/user?ID=12345')
  .then((response) => {
    // handle success
    console.log(response);
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
  .then(() => {
    // always executed
  });


  async function getUser() {
  try {
    const response = await axios.get('https://some-domain.com/api/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

You can also configure your request (like adding headers, body etc.) really easily.

```js
  async function getUser() {
  try {
    const response = await axios.get('https://some-domain.com/api/user?ID=12345',{headers:{
      'Authorization': 'Bearer' + token
    }});
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  async function getUser() {
  try {
    const response = await axios.get('https://some-domain.com/api/user?ID=12345',dataToSend,{headers:{
      'Authorization': 'Bearer' + token
    }});
    console.log(response);
  } catch (error) {
    console.error(error);
  }
```

## Handling Responses

Axios has a predefined response schema, which has following skeleton:

```js
{
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  request: {}
}
```

To reach the response, it is necessary to use `then` or `async-await` structure.

```js
axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

## Creating Axios Instance

Critical part of this post is here. To use axios in an efficient way, creating an instance is highly recommended. Most of the configurations that you put on your requests would be same for a same project, so creating an instance will easen your development process. You can assign headers, baseUrl or timeout value for **every** request that you use.

```js
//  axios/config.js

export const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

```

When you import and fetch data using the instance that we've created above, you dont have to worry about the configuration that we put anymore.

```js
import instance from './axios/config'

async function getUser() {
  try {
    const response = await instance.get('/user?ID=12345',dataToSend,{headers:{
      'Authorization': 'Bearer' + token
    }});
    console.log(response);
  } catch (error) {
    console.error(error);
  }
```

> The whole configuration list can be found at [here](https://axios-http.com/docs/req_config)

## Interceptors

An Interceptor is a function that is invoked by the framework BEFORE or AFTER an action invocation. Axios has interceptor structure, which we can utilize with.

You can intercept requests and responses before thay are handled by the request itself. Interceptors are useful when sending the authentication token. I generally use interceptors while I have to deal with JWTs(JSON Web Token)

You can both play with requests and responses. The code schema looks like:

```js
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```

You can also add interceptors on your custom axios instance.

Let me give an example here. The code below has two interceptors, first one adds Authorization header, second deals with unsuccessful requests.

```js
import axios from 'axios'
import {toast} from 'react-toastify'

const apiWithToken = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

apiWithToken.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem('accessToken'))
  if (token){
    req.headers.Authorization = `Bearer ${token}`
    return req
  }
})

apiWithToken.interceptors.response.use((resp) => resp, error => {
  if (error?.response?.data?.message) {
    toast.error(error.response.data.message?.join('\n'))
  }
  else {
    toast.error('Something went wrong')
  }
  const unauthorized = error.response 
  && error.response.status 
  && (error.response.status === 401 
      || error.response.status === 403) {
    if (unauthorized 
    && !window.location.pathname.includes("/auth")) {
      setTimeout(() => {
        window.location.replace(`${window.location.origin}/auth/login`)
      }, 1000)
    }
  return Promise.reject(error)
  }
})

export {apiWithToken}
```