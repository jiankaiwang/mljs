let lstm;
let textInput;
let lengthSlider;
let tempSlider;

function setup() {
  noCanvas();

  // create a LSTM generator and passing it a directory
  // storing a pretrained LSTM model
  lstm = ml5.LSTMGenerator('./models/woolf', modelReady);

  // grab the DOM elements
  textInput = select("#textInput");
  lengthSlider = select("#lenSlider");
  tempSlider = select("#tempSlider");

  // run the generate() once inputs change
  // to update the status, run the generator and show the result
  textInput.input(generate);
  lengthSlider.input(generate);
  tempSlider.input(generate);
}

function modelReady() {
  select("#status").html('Model was loaded.');
}

function generate() {
  // update status and ui
  select("#status").html("Generating ...");
  select("#length").html(lengthSlider.value());
  select("#temperature").html(tempSlider.value());

  // generate the text and show the result
  let original = textInput.value();
  let text = original.toLowerCase();

  if(text.length > 0) {
    // requirements for LSTM generator
    let data = {
      seed: text,
      length: lengthSlider.value(),
      temperature: tempSlider.value()
    };

    // generate the text based on the pretrained model
    lstm.generate(data, gotResult);

    // a callback function 
    // updates the DOM elements and shows the result
    function gotResult(err, result) {
      if(err) {
        console.error(err);
      }
      text += " " + result;
      select("#status").html("Model was ready.");
      select("#result").html(text);
    }
  } else {
    select("#status").html("Model was ready.");
    select("#textInput").html("");
    select('#result').html("");
  }
}