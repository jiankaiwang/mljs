# Setup Tensorflow.js

`Tensorflow.js` provides both server-side (node) and client-side (javascript) for various developing environments. Overall, the following are three main ways to integrate `Tensorflow.js`.

* setup via a script tag
* setup via npm and packed via parcel
* implement on the server side

## Script Tag

The simplest way is to load `Tensorflow.js` via a script tag, like loading an external library.
```javascript
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
```
After you load the script, you can start to do a training or a prediction task. A simple example is to add a code snippet inside the `<script>` tag.
```javascript
<script>
/* Here is the main script for tensorflow.js */

// define a model designed for linear regression
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// prepare the model for training: specify the loss the the optimizer
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// generate some synthetic data for training
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([2, 4, 6, 8], [4, 1]);

// train the model using the data
model.fit(xs, ys, {epochs: 20}).then(() => {
  // use the model to do the inference on a data point
  model.predict(tf.tensor2d([10], [1, 1])).print();
});
</script>
```

## Setup via NPM and Packaging via Bundle Tools

The second way to integrate the `Tensorflow.js` is to load it over NPM, the Node Package Manager. And furthermore using a bundle tool `parcel` packages the `Tensorflow.js`.

### Installing Parcel

```sh
# install parcel first
npm install -g parcel-bundler

# create a package.json file for the project
npm init [-y]
```

Now we can start coding over `Tensorflow.js`. Create a file named `npm_browser.js`.

```javascript
import * as tf from '@tensorflow/tfjs';

// define a model designed for linear regression
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// prepare the model for training: specify the loss the the optimizer
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// generate some synthetic data for training
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([2, 4, 6, 8], [4, 1]);

// train the model using the data
model.fit(xs, ys, {epochs: 20}).then(() => {
  // use the model to do the inference on a data point
  model.predict(tf.tensor2d([10], [1, 1])).print();
});
```

Now create a new HTML document named `npm_installation.html`. Add the below content to it.

```html
<!DOCTYPE html>
<html>
<head>
  <script src="./npm_browser.js"></script>
</head>
<body>
  Use the developer tool to monitor the console output.
</body>
</html>
```

After you create these two files, you can now use the bundle tool to view the result.

```sh
# here we use parcel without an independent server
parcel npm_installation.html

# you can only watch the difference
parcel watch index.html
```

Surf the webpage (`http://localhost:1234`) to view the result.

# Implement on the Server-Side

The final common way to load `Tensorflow.js` is implemented on the server-side, a part of Node script. First, we install `Tensorflow.js` over NPM commands.

```sh
# for cpu version
npm install @tensorflow/tfjs

# for gpu version
npm install @tensorflow/tfjs-node-gpu
```

After you install the package, you can write the Node script. An example is below. Create a Node script named `nodejs_setup.js`.

```javascript
/**
 * native C++ : npm install @tensorflow/tfjs-node
 * CUDA : npm install @tensorflow/tfjs-node-gpu
 * javascript : npm install @tensorflow/tfjs
 */

const tf = require("./node_modules/@tensorflow/tfjs");

const model = tf.sequential();
model.add(tf.layers.dense({units: 100, activation: "relu", inputShape: [10]}));
model.add(tf.layers.dense({units: 1, activation: "linear"}));
model.compile({loss: 'meanSquaredError', optimizer: "sgd"});

const xs = tf.randomNormal([100, 10]);
const ys = tf.randomNormal([100, 1]);

model.fit(xs, ys, 
  {epochs: 101, 
    callbacks: { onEpochEnd: (epoch, log) => 
                  console.log(`Epoch ${epoch}: loss = ${log.loss}`)}
  });
```

Type the command to run the script.

```sh
node nodejs_setup.js
```