# ML on Javascript



The library `ml5.js`(https://ml5js.org/) is the higher level API built on the top of Tensorflow.js. The library `TensorFlow.js`(https://js.tensorflow.org/) is for training and deploying ML models in the browser or on Node.js.



Mljs is a part of Sophia project focusing on the coding tutorial to machine learning and deep learning. More details please refer to Sophia, https://github.com/jiankaiwang/sophia.



Reference:

*   Ml5-example : https://github.com/ml5js/ml5-examples



## ml5.js



`ML5.js ` is heavily inspired by [Processing](https://processing.org/) and [p5.js](https://p5js.org/). In this section, we try to provide you with two different kinds of javascript scripts based on either native ml5.js or p5.js included.


### Task APIs

*   Basis (error-first callbacks and promises) : [scripts](ml5js/basis)
*   frame classification on a video streaming : [scripts](ml5js/video_classification), [ml5](ml5js/video_classification/video_ml5.js), [ml5+p5](ml5js/video_classification/video_p5_ml5.js)
*   Image classification using feature extraction with MobileNet : [scripts](ml5js/feature_extraction), [ml5](ml5js/feature_extraction/video_ml5.js), [ml5+p5](ml5js/feature_extraction/video_p5_ml5.js)
*   Regression using feature extraction : [scripts](ml5js/regression_feature_extractor), [ml5+p5](ml5js/regression_feature_extractor/video_p5_ml5.js)
*   Text generation with LSTM : [scripts](ml5js/text_generation_lstm), [ml5+p5](ml5js/text_generation_lstm/p5_ml5.js)
*   Interactive text generation with LSTM : [scripts](ml5js/interactive_text_generation_lstm), [ml5+p5](ml5js/interactive_text_generation_lstm/p5_ml5.js)
*   Style transfer : [scripts](ml5js/style_transfer), [ml5+p5](ml5js/style_transfer/p5_ml5.js)
*   Style transfer with a video streaming : [scripts](ml5js/style_transfer_realtime), [ml5+p5](ml5js/style_transfer_realtime/p5_ml5.js)
*   Pixel 2 Pixel : [scripts](ml5js/pix2pix), [ml5+p5](ml5js/pix2pix/p5_ml5.js)
*   PoseNet detection with a video streaming : [scripts](ml5js/posenet_realtime), [ml5+p5](ml5js/posenet_realtime/p5_ml5.js)
*   Object detection in a video streaming with YOLO : [scripts](ml5js/yolo), [ml5+p5](ml5js/yolo/p5_ml5.js)
*   Word2Vec : [scripts](ml5js/word2vec), [ml5+p5](ml5js/word2vec/p5_ml5.js)

### Training

*   Image classification based on D-CNN network : Here we demo how to train an image classification on a deep CNN network, and dump out the variable weights in binary format. Next, we also show how to view the weights.
    *   [training and dump variable weights](customized_training/training.py), [view the variable weights](customized_training/viewer.py)




## TensorFlow.js



In this section, we provide you with more details about lower level API to machine learning or deep learning tasks.



### Basic Concept

*   Setup Tensorflow.js: [Tutorial](mljs/tensorflowjs/setup/)
    *   Script Tag: [jsFiddle demo](https://jsfiddle.net/jiankaiwang/b3uynh6o/), [browser_setup.html](tensorflowjs/setup/browser_setup.html)
    *   Setup via NPM and Packaging via Bundle Tools : [npm_browser.js](tensorflowjs/setup/npm_browser.js), 
    *   Implement on the Server-Side : [nodejs_setup.js](tensorflowjs/setup/nodejs_setup.js)
*   Convert from python-based pertained models.
*   Tensorflow.js Visualization : tfjs-vis
*   Using TensorflowBoard







