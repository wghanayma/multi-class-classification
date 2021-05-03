var allDataPoints = [], learningRate, activationFun, ratioOftrainingData, numberOfIterations, SumSSE = 0,mMSE=0;
var currentDataColor, canvasWidth, canvasHeight, y1ForLine = 0, y2ForLine = 0, isReady = false, numberOFClasses = 0, classes
function getRnd(min, max) {
  return (Math.random() + min);
}
function DataPoint(posX, posY, col) {
  this.positionX = posX;
  this.positionY = posY;
  this.color = col;
}

function Perceptron(weights, threshol, output) {

  this.weight1 = weights[0];
  this.weight2 = weights[1];
  this.threshold = threshol;
  this.actualOutput = output;
}

function activate(type, BigX) {

  if (type == "Tanh") {
    return ((2 / (1 + Math.exp(-2 * BigX))) - 1)
  }
  else if (type == "ReLU") {
    if (BigX < 0)
      return 0;
    else {
      return BigX;
    }
  }
  else if (type == "Leaky ReLU") {
    if (BigX < 0)
      return 0;
    else {
      return 0.01 * BigX;
    }
  }
  else if (type == "Sigmoid") {
    return 1 / (1 + Math.exp(-1 * BigX))
  }
}

function train() {
  SumSSE = 0;
  numberOFClasses = getNumberOfClasses(allDataPoints);

  if (numberOFClasses == 1 || numberOFClasses == 0) {
    window.alert("Please add two classes at least");
  }
  else if (numberOFClasses == 2) {
    var colors = getColors(numberOFClasses);
    var perceptronee = new Perceptron([getRnd(-0.5, 0.5), getRnd(-0.5, 0.5)], getRnd(-0.5, 0.5), 0);
    trainPerceptron(perceptronee, colors[0]);
  }
  else if (numberOFClasses == 3) {
    console.log(numberOFClasses);
    var colors = getColors(numberOFClasses);
    var perceptronee1 = new Perceptron([getRnd(-0.5, 0.5), getRnd(-0.5, 0.5)], getRnd(-0.5, 0.5), 0);
    var perceptronee2 = new Perceptron([getRnd(-0.5, 0.5), getRnd(-0.5, 0.5)], getRnd(-0.5, 0.5), 0);
    var perceptronee3 = new Perceptron([getRnd(-0.5, 0.5), getRnd(-0.5, 0.5)], getRnd(-0.5, 0.5), 0);

    trainPerceptron(perceptronee1, colors[0]);
    trainPerceptron(perceptronee2, colors[1]);
    trainPerceptron(perceptronee3, colors[2]);
  }
  else if (numberOFClasses == 4) {
    var colors = getColors(numberOFClasses);
    var perceptronee1 = new Perceptron([getRnd(-0.5, 0.5), getRnd(-0.5, 0.5)], getRnd(-0.5, 0.5), 0);
    var perceptronee2 = new Perceptron([getRnd(-0.5, 0.5), getRnd(-0.5, 0.5)], getRnd(-0.5, 0.5), 0);
    var perceptronee3 = new Perceptron([getRnd(-0.5, 0.5), getRnd(-0.5, 0.5)], getRnd(-0.5, 0.5), 0);
    var perceptronee4 = new Perceptron([getRnd(-0.5, 0.5), getRnd(-0.5, 0.5)], getRnd(-0.5, 0.5), 0);

    trainPerceptron(perceptronee1, colors[0]);
    trainPerceptron(perceptronee2, colors[1]);
    trainPerceptron(perceptronee3, colors[2]);
    trainPerceptron(perceptronee4, colors[3]);

  }
}
function getColors(numberOfclas) {
  var colors = new Array(numberOfclas);
  for (let i = 0, j = 0; i < classes[0].length; i++) {
    if (classes[1][i]) {
      colors[j] = j + 1;
      j++;
    }
  }
  return colors
}
function getNumberOfClasses(arrDataPoints) {
  classes = new Array(2);

  classes[0] = new Array(4);
  classes[1] = new Array(4).fill(false);

  classes[0][0] = 1;
  classes[0][1] = 2;
  classes[0][2] = 3;
  classes[0][3] = 4;

  var numOfClasses = 0;
  for (let i = 0; i < arrDataPoints.length; i++) {
    if (arrDataPoints[i].color == 1)
      classes[1][0] = true;
    else if (arrDataPoints[i].color == 2)
      classes[1][1] = true;
    else if (arrDataPoints[i].color == 3)
      classes[1][2] = true;
    else if (arrDataPoints[i].color == 4)
      classes[1][3] = true;
  }
  for (let i = 0; i < classes[1].length; i++) {
    if (classes[1][i])
      numOfClasses++;
  }
  return numOfClasses
}
function trainPerceptron(perceptron, color1) {
  var t = 0, bigX = 0, colorToTrain = 0;

  for (let i = 0; i < numberOfIterations; i++, t++) {
    if (allDataPoints[t].color == color1)
      colorToTrain = 1
    else colorToTrain = -1;

    bigX = (allDataPoints[t].positionX * perceptron.weight1) + (allDataPoints[t].positionY * perceptron.weight2) + perceptron.threshold;
    perceptron.actualOutput = activate(activationFun, bigX);
    var errorIteration = colorToTrain - perceptron.actualOutput;
    SumSSE = SumSSE + Math.pow(errorIteration, 2);
    var deltaWeight1 = learningRate * allDataPoints[t].positionX * errorIteration;
    perceptron.weight1 = deltaWeight1 + perceptron.weight1;
    var deltaWeight2 = learningRate * allDataPoints[t].positionY * errorIteration;
    perceptron.weight2 = deltaWeight2 + perceptron.weight2;
    y1ForLine = (perceptron.threshold - (perceptron.weight1 * -1)) / perceptron.weight2;
    y1ForLine = scaleOutput(y1ForLine, 0, 500);
    y2ForLine = (perceptron.threshold - (perceptron.weight1 * 1)) / perceptron.weight2;
    y2ForLine = scaleOutput(y2ForLine, 0, 500);
    isReady = true;
    if (t == (allDataPoints.length - 1)) {
      t = 0;
      mMSE=(SumSSE / allDataPoints.length);
      setMSE(mMSE)
      console.log("MSE " +mMSE );
     // getSumSEE(SumSSE / allDataPoints.length );
      SumSSE = 0;
    }
  }
  draw();
}
function scaleInput(input, min, max) {
  return ((input - min) * ((1 - (-1)) / (max - min)) + -1)
}
function scaleOutput(output, min, max) {
  return ((output - (-1)) * ((max - min) / (1 - (-1))) + min)
}
function setup() {
  // var canvasStyle = document.getElementById("canvasDiv").style
  canvasWidth = 500;
  canvasHeight = 500;
  var canvas1 = createCanvas(500, 500);
  canvas1.parent('canvasDiv');
  background(255);
}

function draw() {
  if (isReady ) {
    // clear();
    // background(255);

    for (let i = 0; i < allDataPoints.length; i++) {

      xscaleOutput = scaleOutput(allDataPoints[i].positionX, 0, 500)
      yscaleOutput = scaleOutput(allDataPoints[i].positionY, 0, 500)
      if (allDataPoints[i].color == 1)
        fill(231, 29, 54)
      else if (allDataPoints[i].color == 2)
        fill(255, 159, 28)
      else if (allDataPoints[i].color == 3)
        fill(46, 196, 182)
      else if (allDataPoints[i].color == 4)
        fill(1, 22, 39);

      ellipse(xscaleOutput, yscaleOutput, 5, 5);
    }
    line(0, y1ForLine, 500, y2ForLine);
  }
}


function mouseClicked(event) {
  fill(currentDataColor)
  ellipse(mouseX, mouseY, 5, 5);
  //  console.log("mouseX" + mouseX + " mouseY" + mouseY + " color : " + currentDataColor);
  if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight) {
    var inputColor
    console.log('currentDataColor' + currentDataColor)
    if (currentDataColor == "rgb(231, 29, 54)")
      inputColor = 1;
    else if (currentDataColor == "rgb(255, 159, 28)")
      inputColor = 2;
    else if (currentDataColor == "rgb(46, 196, 182)")
      inputColor = 3;
    else if (currentDataColor == "rgb(1, 22, 39)")
      inputColor = 4;

    var x = scaleInput(mouseX, 0, 500)
    var y = scaleInput(mouseY, 0, 500)
    var newPoint = new DataPoint(x, y, inputColor);
    allDataPoints.push(newPoint);
    // console.log(newPoint.color)
    // console.log("currentDataColor" + currentDataColor);
  }
}
function setColor(color) {
  currentDataColor = color
}

function setActivationFun(actfun) {
  activationFun = actfun
}

function setLearningRate(learningRat) {
  learningRate = learningRat
}

function setRatioOfTrainingData(ratio) {
  ratioOftrainingData = ratio;
}

function setIterationNumber(iteration) {
  numberOfIterations = iteration;
}

function setSSE(sse) {
  SSE = sse;
}

function getMSE() {
  return mMSE;
}
function setMSE(mse) {
  mMSE = mse;
}
