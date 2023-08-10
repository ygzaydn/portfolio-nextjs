# Creating a React Project From Scratch

- [Creating a React Project From Scratch](#creating-a-react-project-from-scratch)
  - [Project Initiation](#project-initiation)
  - [Adding Compiler](#adding-compiler)
  - [Adding Bundler](#adding-bundler)
  - [Adding React to Project](#adding-react-to-project)
  - [Connecting Bundler and Transpiler](#connecting-bundler-and-transpiler)
  - [Creating HTML File and Running Project](#creating-html-file-and-running-project)
  - [Adding Typechecker](#adding-typechecker)
  - [Adding Linter](#adding-linter)


In this post, I'll show how to create React project without using tools like `create-react-app`. Goal is to show usage of tools that we're already using in our projects.

So our project will have:
-	A transpiler (babel.js)
-	A bundler (webpack)
-	A linter (eslint)
-	Typechecker (typescript)

## Project Initiation

Let's create a folder named `react-from-scratch`, and navigate it. I'm using debian based linux system, so bash commands will be adjusted for my usage, it may differ for different operation systems

```bash
mkdir react-from-scratch
cd react-from-scratch
```

To create a node project, open terminal and type:

```bash
npm init
```

This command will ask some parameters for your project description, you can press enter for all fields for default values. After that our node project should be created successfully.

## Adding Compiler

First step that I'll do is to install our transpiler. For this, best candidate is to use `babel.js`. We have to use a transpiler to make our code readable for each browser. Transpiler converts our code into older syntax of javascript so that each browser can process it.

To install babel:

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

Let's go through packages that we've installed:
-	babel/core: features the core functions of babel.
-	babel/cli: not necessary, but handy packet. it allows us to babel commands on CLI.
-	babel/preset-env: @babel/preset-env is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!

Those packages are useful for all projects that use babel. Remember that React use `jsx` format, so it would not be a suprise that we need another preset for `jsx`. Thankfully, babel have another preset for react. So let's install that aswell:

```bash
npm install --save-dev @babel/preset-react
```

After installation is complete, lets create a file for our babel config. This file should be called as `.babelrc` and contains: 

```js
{
	"presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

We basically add presets that we've installed. This installation is enough for babel for now.

## Adding Bundler

A bundler basically combines seperate files and serves them from a single point (which may change if we want to). It reduces the code size and neglect unnecessary part if it detects. Webpack is the most used bundler for web architecture. So we'll go through webpack.

> Configuration of webpack is a bit complicated, so it is easy to overwhelm during dealing with it.

To install webpack:

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
``` 

Lets go through the packages again:
-	webpack: is the core package that we need to use webpack.
-	webpack-cli: allows us to use webpack commands on CLI.
-	webpack-dev-server: serves us a server that we can serve our output file. It'll be handy at the end of the our configuration.


So basic webpack configuration looks like:

```js
const path = require('path')

const config = () => ({
	mode: 'development',
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		path: path.resolve(__dirname,'/dist'),
		filename: "[name].js"
	}
})
```

As I've mentioned above, webpack configuration has tons of different options and combinations, I'll try to explain when we add new fields. So far:
-	mode: describes the mode of the file, it can have different values such as development, production etc.
-	entry: describes the entry file of the project
-	output: describes the wanted output. output can be either single file or multiple files depending on needs.

To use webpack in our project easily, we should add related scripts on our `package.json` file.

```json
{
  "name": "react-from-scratch",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve --config webpack.config.js",
    "build": "webpack config -- webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.22.10",
    "@babel/core": "^7.22.10",
    "@babel/preset-env": "^7.22.10",
    "@babel/preset-react": "^7.22.5",
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  }
}
```


## Adding React to Project

Let's add React on our project now. To install React:

```bash
npm i react react-dom
```

> Note that `react` and `react-dom` added as a dependency, not a devDependency. This is vital since we'll be using those packages on production.

It's time to create our first js file. 

```jsx
// src/index.js

import React from 'react';
import { createRoot } from 'react/client';

const App = () => {
	return <div>Hello World</div>;
}

const domNode = document.getElementById('root');
root.render(<App/>)
```

> Before moving on, I want to add another property to our project. On projects that are build by pre-defined tools (like create-react-app, create-next-app) we do not have to import React to top of our files. We manage this by using another babel plugin which is called `@babel/plugin-transform-react-jsx`. This plugin imports React to jsx/tsx files.

Let's install it and add our configuration:

```bash
npm i --save-dev @babel/plugin-transform-react-jsx
```

```js
// .babelrc

{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
        [
            "@babel/plugin-transform-react-jsx",
            {
                "runtime": "automatic" //automatic auto imports the functions that JSX transpiles to. classic does not automatically import anything.
            }
        ]
    ]
}
```

Notice that, `@babel/plugin-transform-react-jsx` is not a preset. It's a plugin. Actually this plugin is included in `@babel/preset-react`, but I wanted to show how to add additional plugins.

## Connecting Bundler and Transpiler

So far, we've configured our bundler and added preset to transpiler. There is a loader on webpack that connects babel with webpack, which is called as `babel-loader`. babel-loader exposes a loader-builder utility that allows users to add custom handling of Babel's configuration for each file that it processes.

To install `babel-loader`:

```bash
npm i --save-dev babel-loader
```

And we have to add new fields to our webpack configuration file aswell:

```js
//webpack.config.js
const path = require("path");

const config = () => ({
    mode: "development",
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: [/node_modules/, /\.(spec|test).(ts|js)x?$/i],
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    compact: true,
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
        alias: {
            src: path.resolve(__dirname, "./src/"),
        },
    },
});

module.exports = config;
```

Let's go through new fields:
-	module: These field determines how the different types of modules within a project will be treated. There is the place we should add our configuration for `babel-loader`.
	-	rules: An array of Rules which are matched to requests when modules are created. These rules can modify how the module is created. They can apply loaders to the module, or modify the parser.
		-	test: specifies the files that will be treated under this rule. we've specified jsx and tsx files by using regular expression.
		-	exclude: specifies the path or files that will be excluded for this rule
		-	loader: specifies the loader that will be used for this rule.
		-	options: speficies loader options for this rule. this file reflects `.babelrc`actually. the fields that we enter here can be specified at `.babelrc` aswell
			-	cacheDirectory: Default false. When set, the given directory will be used to cache the results of the loader. Future webpack builds will attempt to read from the cache to avoid needing to run the potentially expensive Babel recompilation process on each run. If the value is set to true in options ({cacheDirectory: true}), the loader will use the default cache directory in node_modules/.cache/babel-loader or fallback to the default OS temporary file directory if no node_modules folder could be found in any root directory.
			-	cacheCompression:Default true. When set, each Babel transform output will be compressed with Gzip. If you want to opt-out of cache compression, set it to false -- your project may benefit from this if it transpiles thousands of files.
			-	compact: All optional newlines and whitespace will be omitted when generating code in compact mode.
-	resolve: helps us to change syntax while importing files on different file.
	-	modules: modules resolve imports by searching them in the specified directories, ofthen this is used to resolve node modules. 
	-	alias: alias resolves imports by replacing the original path with the custom one.
	-	extensions: extensions resolves imports by their file types

## Creating HTML File and Running Project

Now it's time to create our HTML file which react will inject its code. Create `index.html` under root directory and add:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

When you type `npm run start` you should see that project is running on `localhost:8080`. But when you type the address to the browser, you wont be able to see out HTML content. We need a server to serve our HTML file.

Webpack have a plugin for this, which is called as `html-webpack-plugin`. Let's install it:

```bash
npm i --save-dev html-webpack-plugin
```

And add configuration to webpack:

```js
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const config = () => ({
    mode: "development",
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: [/node_modules/, /\.(spec|test).(ts|js)x?$/i],
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    compact: true,
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
        alias: {
            src: path.resolve(__dirname, "./src/"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            inject: true,
        }),
    ],
});

module.exports = config;
```

Let's go through new configuration:
-	plugins: where we add configuration of our plugin. it's an array of plugin configuration
-	newHTMLWebpackPlugin: initialization of our webpack-html-plugin.
	-	template: file to serve
	-	inject: flag whether we inject output file or not.


Now restart the project again, and you should see our react application at `localhost:8080`.

## Adding Typechecker

Now it's good time to add typescript to our project.

We need to install typescript first:

```bash
npm i typescript --save-dev
npx tsc --init
```

After installing typescript, we run the second command to initialize typescript to our project. That command will create a configuration file for typescript `tsconfig.json`. We need to edit the file abit:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",                                /* Specify what JSX code is generated. */
    "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "target": "ES5",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "outDir": "/dist",
    "skipLibCheck": true,                                 /* Skip type checking all .d.ts files. */
  }
}
```

I won't go in detail for Typescript configuration, it's a bit complicated.

After insalling and configuring Typescript, we have make Babel to adapt it. To do so, we need to install `@babel/preset-typescript` and add to our config.

```bash
npm i @babel/preset-typescript --save-dev
```

And edit `.babelrc`

```
{
    "presets": ["@babel/preset-env", "@babel/preset-react","@babel-preset-typescript"],
    "plugins": [
        [
            "@babel/plugin-transform-react-jsx",
            {
                "runtime": "automatic"
            }
        ]
    ]
}
```

As a last step, we need to add types to all packages that we'll use for production. To do so, lets add types for react by running the following code:

```bash
npm i @types/reacy @types/react-dom --save-dev
```

## Adding Linter

As a last step, we'll add a linter (ESLint). First thing we need to do is install it to our editor (it's VSCode for my case). After installing it we can add it to our project:

```bash
npm i --save-dev eslint
eslint --init
```

After we run init function, console will ask some questions about the project, you can fulfill the options as your project needs. After initizaliation is completed, a configuration file for ESLint will be created `.eslintrc`, and you'll the errors about the project.

I generally ignore errors at my webpack config file, so my `.eslintrc` file will look like:

```js
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
    ],
    ignorePatterns:['webpack.config.js']
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {},
};
```

Now, we're ready to develop our React project.

