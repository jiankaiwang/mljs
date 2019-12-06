/* ===
ml5 Example
Style Transfer Image Example using p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let status;
let transferBtn;
let inputImg;
let styleA;
let styleB;

function setup() {
  noCanvas();

  status = select("#status");
  transferBtn = select("#transferBtn");
  inputImg = select("#inputImg");
  styleA = select("#styleA");
  styleB = select("#styleB");

  // setup DOM element events
  transferBtn.mousePressed(transferImages);

  // create two style transfers
  // passing two relative directories to them
  styleA = ml5.styleTransfer("./models/wave", modelLoaded);
  styleB = ml5.styleTransfer("./models/udnie", modelLoaded);
}

function modelLoaded() {
  // TODO: improve how to judge two promises are fulfilled
  if(styleA.ready && styleB.ready) {
    status.html("Model was loaded.");
  } 
}

function transferImages() {
  status.html("Applying style transfer ...");

  // use `transfer()` to generate a new image
  // use attr `.src` to capture the image content in hex format
  styleA.transfer(inputImg, function(err, result) {
    createImg(result.src).parent("styleA");
  });

  styleB.transfer(inputImg, function(err, result) {
    createImg(result.src).parent("styleB");
  });

  status.html("Done !");
}