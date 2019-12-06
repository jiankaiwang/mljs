var video = document.getElementById("video");
var loading = document.getElementById("loading");
var catButton = document.getElementById("catButton");
var amountOfCatImages = document.getElementById("amountOfCatImages");
var dogButton = document.getElementById("dogButton");
var amountOfDogImages = document.getElementById("amountOfDogImages");
var train = document.getElementById("train");
var loss = document.getElementById("loss");
var predict = document.getElementById("predict");
var result = document.getElementById("result");

let totalLoss = 0;

// create a webcam capture
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    video.srcObject = stream;
    video.play();
  });
}

// change the status once the model was loaded
function modelLoaded() {
  loading.innerText = "Model was loaded.";
}

// extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
// create a new classifier using this features
const classifier = featureExtractor.classification(video);

// when the Cat button was pressed, the current frame from the video
// with the a label of cat was added to the classifier
catButton.onclick = function() {
  classifier.addImage('cat');
  amountOfCatImages.innerText = Number(amountOfCatImages.innerText) + 1;
}

// when the Dog button was pressed, the current frame from the video
// with the a label of dog was added to the classifier
dogButton.onclick = function() {
  classifier.addImage('dog');
  amountOfDogImages.innerText = Number(amountOfDogImages.innerText) + 1;
}

// when the train button was pressed, train the classifier with all
// the given cat and dog images
train.onclick = function() {
  classifier.train(function(lossValue) {
    if(lossValue) {
      totalLoss = lossValue;
      loss.innerText = 'Loss: ' + totalLoss;
    } else {
      loss.innerText = 'Done Training! Final loss: ' + totalLoss;
    }
  })
}

// show the results
function gotResult(err, data) {
  if (err) {
    console.error(new Error("Error in getting the result."));
    console.error(err);
  }
  result.innerText = data;
  classifier.classify(gotResult);
}

// start predicting when the predict button was pressed
predict.onclick = function() {
  classifier.classify(gotResult);
}