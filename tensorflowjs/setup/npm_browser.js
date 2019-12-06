/**
 * Preparation
 * 
 * * install the parcel first
 * ```sh
 * npm install -g parcel-bundler
 * ```
 * 
 * * create the package.json on the project
 * ```sh
 * npm init [-y]
 * ```
 * 
 * * coding in html and using script tag to include the resource
 * the browser must support ES6
 * in parcel (without type="module") : <script src=""></script>
 * others : <script type="module" src=""></script>
 * 
 * * using bundle tool, here we use parcel
 * with independent server (localhost:1234)
 * ```sh
 * parcel index.html
 * ```
 * 
 * In this example,
 * ```sh
 * parcel npm_installation.html
 * ```
 * 
 * only watch the difference
 * ```sh
 * parcel watch index.html
 * ```
 * 
 */

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