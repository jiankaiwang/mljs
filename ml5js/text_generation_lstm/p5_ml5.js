let lstm;
let textInput;
let lengthSlider;
let tempSlider;
let button;

function setup() {
  noCanvas();

  // create a LSTM generator passing it the model directory
  lstm = ml5.LSTMGenerator("./models/woolf", modelReady);

  // Grab the DOM elements
  textInput = select("#textInput");
  lengthSlider = select("#lenSlider");
  tempSlider = select("#tempSlider");
  button = select("#generate");

  // DOM elements events
  button.mousePressed(generate);
  lengthSlider.input(updateSliders);
  tempSlider.input(updateSliders);
}

function updateSliders() {
  // update the slider value for the user
  select("#length").html(lengthSlider.value());
  select("#temperature").html(tempSlider.value());
}

function modelReady() {
  // update the status for loading the model
  select("#status").html("Model was loaded.");
}

function generate() {
  select("#status").html("Generating ...");

  let original = textInput.value();
  let txt = original.toLowerCase();

  if(txt.length > 0) {
    /*
      lstm model requires three main components:
        seed: the beginning text
        temperature: the randomizing level
        length: the number of output characters
    */
    let data = {
      seed: txt,
      temperature: tempSlider.value(),
      length: lengthSlider.value()
    };

    // use `generate()` to generate characters
    // `gotResult` is the callback function handling the coming result
    lstm.generate(data, gotResult);

    function gotResult(err, result) {
      select("#status").html("Ready!");
      select("#result").html(txt + result);
    }
  }
}