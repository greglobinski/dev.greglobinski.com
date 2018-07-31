---
title: Use styled-jsx in create-react-app without ejection
category: tutorial
cover: styled-jsx-create-react-app.png
---

I like [styled-jsx](https://github.com/zeit/styled-jsx). I build a [GatsbyJS](https://gatsbyjs.org) [starter](https://github.com/greglobinski/gatsby-starter-hero-blog) with it.

If you do not know, [GatsbyJS](https://gatsbyjs.org) is a static site generator for ReactJS.

I assume you know what [styled-jsx](https://github.com/zeit/styled-jsx) is, otherwise you would not be interested in the title. Just in case, **styled-jsx** is a 'CSS in JS' library.

As I wrote, I got some experience with **styled-jsx** working with **GatsbyJS**, but a couple of days ago I wanted to use the library in an app based on [create-react-app](https://github.com/facebook/create-react-app). I am pretty sure you know what **create-react-app** is. :)

There was one problem however.

To make **styled-jsx** work we have to edit the project's [babel](https://babeljs.io/) config. Nothing complicated, but **create-react-app** does not allow any changes like that, without **ejecting**. Ejecting however was not a thing I wanted.

I got stuck.

## React App Rewired

Fortunately, [react-app-rewired](https://github.com/timarney/react-app-rewired) came to the rescue.

> Tweak the create-react-app webpack config(s) without using 'eject' and without creating a fork of the react-scripts. All the benefits of create-react-app without the limitations of "no config". You can add plugins, loaders whatever you need.

So let's make **styled-jsx** work in an unejected **create-react-app** based application.

## Rewire create-react-app to use styled-jsx

First, create an app with `create-react-app`.

```
npx create-react-app my-styled-jsx-app
```

Move to the newly created folder.

```
cd my-styled-jsx-app
```

Then install `react-app-rewire` as a dev dependency.

```
yarn add react-app-rewired --dev
```

And `styled-jsx` as a dependency.

```
yarn add styled-jsx
```

It's time to rewire `create-react-app`. Open the `package.js` file and edit from this...

```
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test --env=jsdom",
}
```

... to this.

```
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test --env=jsdom"
}
```

Now we are able to edit the `babel`'s config, as we want.

Create a new file called `config-overrides.js` in the root directory of the app.

```javascript
const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config, env) {
  config = injectBabelPlugin(["styled-jsx/babel"], config);

  return config;
};
```

That's it. We have an app build on `create-react-app` in which we can use `styled-jsx` without ejecting.

## Restyle the app with styled-jsx

Move CSS style rules from outer css files into the `App` component's file.

```javascript
import React, { Component } from "react";
import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {`/* global styles */`}
        <style jsx global>
          {`
            body {
              margin: 0;
              padding: 0;
              font-family: sans-serif;
            }
          `}
        </style>
        {`/* local styles */`}
        <style jsx>{`
          .App {
            text-align: center;
          }

          .App-logo {
            animation: App-logo-spin infinite 20s linear;
            height: 80px;
          }

          .App-header {
            background-color: #222;
            height: 150px;
            padding: 20px;
            color: white;
          }

          .App-title {
            font-size: 1.5em;
          }

          .App-intro {
            font-size: large;
          }

          @keyframes App-logo-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>`
      </div>
    );
  }
}

export default App;
```

## Clearing

The last thing to do is to make some clearing.

Remove needless CSS files.

```
remove src/index.css scr/App.css
```

And their `import` statements from `App.js` and `index.js`.

## Demo

There is a repo on Github - [example-create-react-app-styled-jsx](https://github.com/greglobinski/example-create-react-app-styled-jsx) - with a [live demo](https://greglobinski.github.io/example-create-react-app-styled-jsx/).
