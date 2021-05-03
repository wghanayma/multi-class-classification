var allDataPoints = [], learningRate, activationFun, ratioOftrainingData, numberOfIterations, SSE
var currentDataColor, canvasWidth, canvasHeight, y1ForLine = 0, y2ForLine = 0, isReady = false
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
  if (type == "ReLU") {
    if (BigX < 0)
      return 0;
    else {
      return BigX;
    }
  }
  if (type == "Leaky ReLU") {
    if (BigX < 0)
      return 0;
    else {
      return 0.01 * BigX;
    }
  }
  if (type == "Sigmoid") {
    return 1 / (1 + Math.exp(-1 * BigX))
  }
}

function train() {

  var perceptron = new Perceptron([getRnd(-0.5, 0.5), getRnd(-0.5, 0.5)], getRnd(-0.5, 0.5), 0);
  var bigX = 0;
  var t = 0;
  for (let i = 0; i < numberOfIterations; i++, t++) {

    bigX = (allDataPoints[t].positionX * perceptron.weight1) + (allDataPoints[t].positionY * perceptron.weight2) + perceptron.threshold;
    console.log("bigX" + bigX);
    perceptron.actualOutput = activate(activationFun, bigX);
    var errorIteration = allDataPoints[t].color - perceptron.actualOutput;
    var deltaWeight1 = learningRate * perceptron.weight1 * errorIteration;
    perceptron.weight1 = deltaWeight1 + perceptron.weight1;
    var deltaWeight2 = learningRate * perceptron.weight2 * errorIteration;
    perceptron.weight2 = deltaWeight2 + perceptron.weight2;
    console.log("perceptron.actualOutput" + perceptron.actualOutput);
    y1ForLine = (scaleOutput(perceptron.threshold, 0, 500) - (scaleOutput(perceptron.weight1, 0, 500) * 500)) / scaleOutput(perceptron.weight2, 0, 500);
    y2ForLine = (scaleOutput(perceptron.threshold, 0, 500) - (scaleOutput(perceptron.weight2, 0, 500) * 0)) / scaleOutput(perceptron.weight2, 0, 500);
    isReady = true;
    if (t == (allDataPoints.length - 1))
      t = 0;
  }

  console.log("weight1" + perceptron.weight1);
  console.log("weight2" + perceptron.weight2);

  console.log("perceptron.threshold" + perceptron.threshold);


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
  background(155);
}

function draw() {
  if (isReady) {
    line(0, y1ForLine, 500, y2ForLine)

  }

}

function mouseClicked(event) {
  fill(currentDataColor)
  ellipse(mouseX, mouseY, 5, 5);
  //  console.log("mouseX" + mouseX + " mouseY" + mouseY + " color : " + currentDataColor);
  if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight) {
    var inputColor = 0
    if (currentDataColor == "rgb(231, 29, 54)") {
      inputColor = 1
      console.log('hiiii')
    }

    else inputColor = 0
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


// create a new instance of p5 and pass in the function for sketch 1
