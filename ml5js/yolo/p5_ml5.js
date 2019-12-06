let video;
let yolo;
let status;
let objects = [];
let detectbtn;

let isModelLoading = false;
let isInDetect = false;

const width = 320;
const height = 240;

function setup() {
  createCanvas(width, height);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // create a yolo detector and pass it a video object
  yolo = ml5.YOLO(video, startDetection);

  status = select("#status");
  detectbtn = select("#detectbtn");
  detectbtn.mousePressed(function() {
    // start the detection while the model was loaded
    if(isModelLoading) {
      if(!isInDetect) {
        detect();

        isInDetect = true;
        detectbtn.html("stop");
      } else {
        isInDetect = false;
        detectbtn.html("start");
      }
    }
  });
}

function draw() {
  // draw the content from the camera streaming
  image(video, 0, 0, width, height);
  
  if(isInDetect) {
    for(let i = 0 ; i < objects.length; i++) {
      // print the label, the object's coordinate is normalized from 0 to 1
      noStroke();
      fill(0, 255, 0);
      text(objects[i].className, objects[i].x * width, objects[i].y * height - 5);

      // draw the rectangle
      noFill();
      strokeWeight(4);
      stroke(0, 255, 0);
      rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
    }
  } else {
    objects = [];
  }
}

function startDetection() {
  status.html("The model was loaded.");
  detectbtn.html("Start");
  isModelLoading = true;
}

function detect() {
  // continue detecting
  yolo.detect(function(err, results) {
    objects = results;
    if(isInDetect) {
      detect();
    }
  });
}