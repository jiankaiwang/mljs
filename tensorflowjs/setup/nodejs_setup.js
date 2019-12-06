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
