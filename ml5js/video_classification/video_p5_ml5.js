let classifier;
let video;

// setup the environment
function setup() {
  noCanvas();

  // create a camera input
  video = createCapture(VIDEO);
  // initialize the image classifier
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function modelReady() {
  // change the status once the model is loaded
  // select() is like jquery
  select("#status").html('Model loaded');
  // start to classify the video (frame)
  classifyVideo();
}

function classifyVideo() {
  // the main classification function
  classifier.predict(gotResult);
}

function gotResult(err, result) {
  // show the result on the webpage
  select("#result").html(result[0].className);
  select("#probability").html(result[0].probability);

  // continue the classification
  classifyVideo();
}