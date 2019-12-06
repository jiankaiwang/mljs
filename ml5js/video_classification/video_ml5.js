// grap html elements
var video = document.getElementById("video"),
  result = document.getElementById("result"),
  probability = document.getElementById("probability");

// create a video stream
navigator.mediaDevices.getUserMedia({video : true})
  .then((stream) => {
    video.srcObject = stream;
    video.play();    
  })

// inference loop
function loop(classifier) {
  classifier.predict()
    .then(results => {
      result.innerText = results[0].className;
      probability.innerText = results[0].probability.toFixed(4);
      loop(classifier);    
    })
}

// initial the image classifier method
// pass the video as the second parameter
ml5.imageClassifier('MobileNet', video)
  .then(classifier => loop(classifier))