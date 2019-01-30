# ML on Javascript



The library `ml5.js`(https://ml5js.org/) is the higher level API built on the top of Tensorflow.js. The library `TensorFlow.js`(https://js.tensorflow.org/) is for training and deploying ML models in the browser or on Node.js.



Mljs is a part of Sophia project focusing on the coding tutorial to machine learning and deep learning. More details please refer to Sophia, https://github.com/jiankaiwang/sophia.



## ml5.js



`ML5.js ` is heavily inspired by [Processing](https://processing.org/) and [p5.js](https://p5js.org/). In this section, we try to provide you with two different kinds of javascript scripts based on either native ml5.js or p5.js included.



*   Basis (error-first callbacks and promises) : [scripts](ml5js/basis)
*   frame classification on a video streaming : [scripts](ml5js/video_classification), [ml5](ml5js/video_classification/video_ml5.js), [ml5+p5](ml5js/video_classification/video_p5_ml5.js)
*   Image classification using feature extraction with MobileNet : [scripts](ml5js/feature_extraction), [ml5](ml5js/feature_extraction/video_ml5.js), [ml5+p5](ml5js/feature_extraction/video_p5_ml5.js)
*   Regression using feature extraction : [scripts](ml5js/regression_feature_extractor), [ml5+p5](ml5js/regression_feature_extractor/video_p5_ml5.js)
*   Text generation with LSTM : [scripts](ml5js/text_generation_lstm), [ml5+p5](ml5js/text_generation_lstm/p5_ml5.js)



## TensorFlow.js



In this section, we provide you with more details about lower level API to machine learning or deep learning tasks.