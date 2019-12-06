let featureExtractor;
let regressor;
let video;
let loss;
let slider;
let sample = 0;
let positionX = 175;
const width = 400;
const height = 400;

function setup() {
  // createCanvas(width, height);
  createCanvas(width, height);

  // create a video element
  video = createCapture(VIDEO);
  // hide the video element first, we will draw the content after
  video.hide();

  // extract the features from mobilenet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  // create a regressor using these features
  regressor = featureExtractor.regression(video, videoReady);

  // set up the UI buttons
  setupButtons();
}

// draw() is a loop (not-stoping) function
// beginning after the setup()
function draw() {
  // image(source, x1, y1, width, height)
  // draw a image on coordinate(x1, y1) with width and height
  // in this example, 30 = (400 - 340) / 2, 60 = (400 - 280) / 2
  // means to put the video in the center of the canvas
  image(video, 30, 60, 340, 280);

  // the following is to draw a rectangle
  // noStroke() means to remove the border
  noStroke();
  // fill color with (red, green, blue)
  fill(255, 0, 0);
  // draw a rectangle
  // rect(x1, y1, width, height)
  // 175 = (400 / 2) - (50 / 2), means to put in the center of canvas
  rect(positionX, 175, 50, 50);
}

function modelReady() {
  select("#modelStatus").html('Model was loaded.');
}

function videoReady() {
  select("#videoStatus").html("Video is ready.");
}

function predict() {
  // regression is one of the prediction task
  regressor.predict(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.error(err);
  }

  // the result stands for regressing the current image into a value
  // you can regard the value as the category but in continuous-type 
  // positionX is the position in the canvas indicating the x coordinate
  // and would be used in the draw() function
  positionX = map(result, 0, 1, 0, width);
  slider.value(result);
  predict();
}

function setupButtons() {
  slider = select("#slider");

  // add a sampling button
  // slider event is also captured via function `mousePressed()`
  select("#addSample").mousePressed(function() {
    // here in the regression task
    // we use slider.value as the regression value (just like a category)
    // in training, we take lots of images to fit the regression value
    regressor.addImage(slider.value());
    select("#amountOfSamples").html(sample++);
  });

  select("#train").mousePressed(function() {
    // use the same function `.train()` to train a regressor 
    // in regression task
    regressor.train(function(lossValue) {
      if(lossValue) {
        loss = lossValue;
        select('#loss').html("Loss: " + loss);  
      } else {
        select('#loss').html("Training finished. The loss value is: " + loss);  
      }
    });
  });

  select("#buttonPredict").mousePressed(predict);
}