# Code Splitting

Whenever we create a project with `create-react-app`, we also install a "bundler" for our project which bundles our JS, CSS and HTML files to have smaller sizes. Bundling helps us to have smaller file sizes so that load of our web-app gets lighter.

> Large bundled files are harmful for [web-vitals](https://web.dev/vitals/)  for our website.

On default, our bundlers gives us 3 different files. (one each for CSS, HTML and JS). When our page lets loaded, all of those files gets loaded. But at initial step, we do not need all of those content. So wouldn't it be a good idea to seperate those files internally and extract the parts which we need for any moment. This operation increases performance of websites and React have a function to do this (which is called as React.lazy()).

In this post, I'll try to explain React.lazy() and some use cases to make it clear.


## React.lazy

The React.lazy function lets you render a dynamic import as a regular component.

On default, we import other files as:

```js
import OtherComponent from './OtherComponent';
```

By using React.lazy(), we can import files as:

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

This will automatically load the bundle containing the **OtherComponent** when this component is first rendered.

There are some constraints when we want to use React.lazy(). The lazy component should be rendered inside a **Suspense** component. Suspense component allows us to show some fallback content (it could be a loading indicator) while we're waiting for the lazy component to get rendered.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

Whenever we face problem on load **OtherComponent**, the react fragment inside fallback prop will be rendered. It's possible to have multiple components inside a Suspense element.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

> Another tricky point is that, React.lazy only supports for default exports!

If we don't have default exports for our components, we need an intermediate file which imports non-default file and exports it as a default.

```js
export { MyComponent as default } from "./ManyComponents.js";
```


### Route-based Code Splitting
Important point for web-papts to introduce code splitting. This operation can be a bit tricky. Main goal should prevent disrupting user experience.

A good place to start could be routes. And on React, we generally use `react-router`, so I've provided an example of combination of both concepts:

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```


### Everything looks good, but?

So far, we've talked about how great code splitting is. The main problem behind code splitting is that *it only works for client-side-rendering*. Official React document suggest to use [loadable components](https://loadable-components.com/) to avoid this problem. I'll mention loadable components on a different post.



