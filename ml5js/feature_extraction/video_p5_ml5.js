let featureExtractor;
let classifier;
let video;
let loss;
let dogImages = 0;
let catImages = 0;

function setup() {
  noCanvas();

  // create a video element
  video = createCapture(VIDEO);
  // append it to the video container DOM element
  video.parent('videoContainer');

  // extract the already learned features from mobilent
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  // create a new classifier using features
  // and given the video we want to use
  classifier = featureExtractor.classification(video);

  // setup the UI Buttons
  setupButtons();
}

function modelReady() {
  select("#loading").html('Model was loaded.');
}

function setupButtons() {
  buttonCat = select("#catButton");
  buttonCat.mousePressed(function() {
    classifier.addImage('cat');
    select("#amountOfCatImages").html(catImages++);
  });

  buttonDog = select("#dogButton");
  buttonDog.mousePressed(function() {
    classifier.addImage('dog');
    select("#amountOfDogImages").html(dogImages++);
  });

  train = select("#train");
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if(lossValue) {
        loss = lossValue;
        select('#loss').html("Loss value: " + loss);
      } else {
        select('#loss').html('Training finished. Loss is : ' + loss);
      }
    });
  });

  buttonPredict = select("#predict");
  buttonPredict.mousePressed(classify);
}

function classify() {;
  classifier.classify(gotResult);
}

function gotResult(err, data) {
  if(err) {
    console.error(new Error("classify error"));
    console.error(err);
  }
  select('#result').html(data);
  classify();
}