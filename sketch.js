var allDataPoints = [], learningRate, activationFun, ratioOftrainingData, numberOfIteration, SSE

var currentDataColor, canvasWidth, canvasHeight

function DataPoint(positionX, positionY,color ) {
  this.positionX = positionX;
  this.positionY =  positionY;
  this.color = color;
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
  //for canvas 1
  ///sdffsffdsfsffdsfds

}

function mouseClicked(event) {
  fill(currentDataColor)
  ellipse(mouseX, mouseY, 5, 5);
  // console.log("mouseX" + mouseX + " mouseY" + mouseY + " color : " + currentDataColor);
  if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight){
    var newPoint = new DataPoint(mouseX, mouseY, currentDataColor);
    allDataPoints.push();
    console.log(newPoint.color)
  }
}


function setColor(color) {
  currentDataColor = color
}
// create a new instance of p5 and pass in the function for sketch 1
