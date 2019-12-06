const size = 256;
let inputImg;
let inputCanvas;
let outputContainer;
let statusMsg;
let pix2pix;
let clearBtn;
let transferBtn;

// the flag checking whether the model is loaded
let modelReady = false;

// the flag checking whether now is in transferring process
let isTransferring = false;

function setup() {
  // create a canvas whose size is size x size
  // and append it to the DOM element `editor`
  inputCanvas = createCanvas(size, size);
  inputCanvas.class("border-box").parent("editor");

  // load a image and draw it on a canvas (drawImage)
  inputImg = loadImage("img/input.png", drawImage);

  outputContainer = select("#output");
  statusMsg = select("#status");

  // start a transferring process
  transferBtn = select("#transferBtn");
  transferBtn.mousePressed(function() {
    transfer();
  });

  // clear the canvas
  clearBtn = select("#clearBtn");
  clearBtn.mousePressed(function() {
    clearCanvas();
  });
  
  // the drawing density
  pixelDensity(1);

  // create a pix2pix object and passing it a pretrained model
  pix2pix = ml5.pix2pix("./models/edges2pikachu_AtoB.pict", modelLoaded);
}

function modelLoaded() {
  statusMsg.html("The model was loaded.");

  // set the flag to true once the model was loaded
  modelReady = true;

  // after loading the model and start a transferring process
  transfer();
}

function drawImage() {
  image(inputImg, 0, 0);
}

function clearCanvas() {
  // clear the canvas is to set the background to 255
  background(255);
}

function draw() {
  // mouseIsPressed is defined in processing.js
  if (mouseIsPressed) {
    // here we use `line()` to draw the line
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mouseReleased() {
  // mouseReleased() is like the draw() as a predefined function
  // start a new transferring once the mouse is released
  if(modelReady && !isTransferring) {
    transfer();
  }
}

function transfer() {
  isTransferring = true;
  statusMsg.html("Applying style transferring ...");

  // get the canvas element
  let canvasElement = select("canvas").elt;

  // pix2pix parameter is passing the canvas DOM element `canvasElement`
  pix2pix.transfer(canvasElement, function(err, result) {
    if(err) {
      console.error(err);
    }
    if(result && result.src) {
      isTransferring = false;
      outputContainer.html('');
      createImg(result.src).class("border-box").parent("output");
      statusMsg.html("Done!");
    }
  });
}