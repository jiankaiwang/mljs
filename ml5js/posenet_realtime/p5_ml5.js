
let video;
let poseNet;
let poses = [];
const width = 640;
const height = 480;

function setup() {
  createCanvas(640,480);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // create a posenet detector
  poseNet = ml5.poseNet(video, modelReady);
  // start to detect pose and keep returning detected poses
  poseNet.on('pose', function(results) {
    // poses = [0:{pose:{}, skeleton:{}}, 1:{}]
    // a pose is composed of pose and skeletion properties
    poses = results;
  });
}

function modelReady() {
  select("#status").html("Model was loaded.");
}

function draw() {
  image(video, 0, 0, width, height);

  // draw points and skeletions
  drawKeypoints();
  drawSkeleton();
}

function drawKeypoints() {
  for(let i = 0 ; i < poses.length ; i++) {
    let pose = poses[i].pose;
    for(let j = 0 ; j < pose.keypoints.length ; j++) {
      // a keypoint is an object standing for a body part, e.g. left arm, etc.
      let keypoint = pose.keypoints[j];
      if(keypoint.score > 0.2) {
        // draw an object in a ellipse type
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

function drawSkeleton() {
  for(let i = 0 ; i < poses.length ; i++) {
    // a skeleton is the connection between keypoints
    let skeleton = poses[i].skeleton;
    for(let j = 0 ; j < skeleton.length ; j++) {
      let start = skeleton[j][0];
      let end = skeleton[j][1];
      stroke(255, 0, 0);
      line(start.position.x, start.position.y, end.position.x, end.position.y);
    }
  }
}