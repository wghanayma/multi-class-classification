var dataX = [];
var dataY = [];
var currentDataColor

function setup() {
 
  let canvas1 = createCanvas(500, 500);
  canvas1.parent('sketch-container1');
  background(155);  
}

function draw() {
  //for canvas 1
  ///sdffsffdsfsffdsfds
  
}

function mouseClicked(event) {
  fill(currentDataColor)
  ellipse(mouseX, mouseY, 5, 5);
  console.log("mouseX"+mouseX+" mouseY"+mouseY+" color : "+ currentDataColor);

}


function setColor(color){ 
  currentDataColor = color 
}
// create a new instance of p5 and pass in the function for sketch 1
