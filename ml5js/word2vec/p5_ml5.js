let w2v;

function setup() {
  noLoop();
  noCanvas();

  w2v = ml5.word2vec('data/wordvecs10000.json', function() {
    select("#status").html("Model was loaded.");
  });

  // find the nearest word
  let nearWordInput = select("#nearword");
  let nearButton = select("#submit");
  let nearResult = select("#result");

  nearButton.mousePressed(() => {
    let word = nearWordInput.value();
    // use the function `nearest` to find the nearest words
    w2v.nearest(word, (err, result) => {
      let output = '';
      if(result) {
        for(let i = 0 ; i < result.length ; i++) {
          output += result[i].word + "<br/>";
        }
      } else {
        output = "No word vector found.";
      }
      nearResult.html(output);
    });
  });

  // find the average of two words
  let betweenWordInput1 = select("#between1");
  let betweenWordInput2 = select("#between2");
  let betweenButton = select("#submit2");
  let betweenResult = select("#result2");

  betweenButton.mousePressed(() => {
    let word1 = betweenWordInput1.value();
    let word2 = betweenWordInput2.value();
    let max_cnt = 4;
    w2v.average([word1, word2], max_cnt, (err, average) => {
      let output = '';
      for(let i = 0 ; i < max_cnt ; i++) {
        output += average[i].word + "<br/>";
      }
      betweenResult.html(output);
    })
  });

  // adding two words together to find an analogy
  let addInput1 = select("#isto1");
  let addInput2 = select("#isto2");
  let addInput3 = select("#isto3");
  let addButton = select("#submit3");
  let addResult = select("#result3");

  addButton.mousePressed(() => {
    let is1 = addInput1.value();
    let to1 = addInput2.value();
    let is2 = addInput3.value();

    w2v.subtract([to1, is1])
      .then(difference => w2v.add([is2, difference[0].word]))
      .then(result => addResult.html(result[0].word))
  });

}