let style;
let video;
let resultImg;

// a flag representing whether is in the transferring process
let isTransferring = false;

function setup() {
  // create a canvas in a size of 320 x 240 pixel
  // and append to a DOM element
  createCanvas(320, 240).parent("CanvasContainer");

  // create a video streaming but hide it
  // we are going to draw it depending on the condition
  video = createCapture(VIDEO);
  video.hide();

  // create a image container and also hide it
  // this image container is used to store the transferrring result
  resultImg = createImg('');
  resultImg.hide();

  // listen to a DOM element's event
  // start ot stop the transferring
  select("#startbtn").mousePressed(startStop);

  // create a transferring object
  // passing it a directory with a pretrained model
  // also passing it a video streaming object
  style = ml5.styleTransfer('./models/udnie', video, modelLoaded);
}

function draw() {
  // `draw()` is a function called in each iterations
  // once we create a canvas, 
  // we use this function to draw content on the canvas

  if(isTransferring) {
    // in transferring process, 
    // we keep draw the transferring result on the canvas
    image(resultImg, 0, 0, 320, 240);
  } else {
    // if the process is not in transferring process,
    // we keep drawing the video streaming content on the canvas
    image(video, 0, 0, 320, 240);
  }
}

function modelLoaded() {
  select("#status").html('The model was loaded.');
}

function startStop() {
// start or stop the transferring

  if(isTransferring) {
    // stop the transferring and set the buton to Start
    select("#startbtn").html("Start");
  } else {
    // start the transferring and set the button to stop
    select("#startbtn").html("Stop");

    // transfer the video content
    style.transfer(gotResult);
  }

  // reverse the transferring status
  isTransferring = !isTransferring;
}

function gotResult(err, result) {
  // once the transferring process finished
  // set the image container's attribute `src` to image source
  // the image source is the hex-coding content
  resultImg.attribute("src", result.src);

  if(isTransferring) {
    // keep transferring and storing its result
    style.transfer(gotResult);
  }
}