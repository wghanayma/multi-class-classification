/*var canvas1, canvas2, h1;
function setup(){
    canvas1 = createCanvas(800,800);
    canvas1.parent('sketch-container1');
    canvas1.background(220);
    canvas2 = createCanvas(800,800);
    canvas2.parent('sketch-container2');
    canvas2.background(220);

    }
function draw(){
    circle(mouseX1, mouseY1, 50);
    circle(mouseX2, mouseY2, 50);

    let xLabel1 = document.getElementById('x-label1');
    xLabel1.innerText = 'X: ' + mouseX1;
  
    let yLabel1 = document.getElementById('y-label1');
    yLabel1.innerText = 'Y: ' + mouseY1;
    let xLabel2 = document.getElementById('x-label2');
    xLabel2.innerText = 'X: ' + mouseX2;
  
    let yLabel2 = document.getElementById('y-label2');
    yLabel2.innerText = 'Y: ' + mouseY2;
}
  */
var s1 = function( sketch ) {
    sketch.setup = function() {
      let canvas1 = sketch.createCanvas(600,600,sketch.WEBGL);
       canvas1.parent('sketch-container1');
  
     }
    sketch.draw = function() {
      //for canvas 1
      sketch.background(100);
      sketch.rotateX(sketch.frameCount * 0.01);
      sketch.rotateZ(sketch.frameCount * 0.01);
      sketch.cone(30, 50);
    }
  };
  
  // create a new instance of p5 and pass in the function for sketch 1
  new p5(s1);
  
  var s2 = function( sketch ) {
  
     sketch.setup = function() {
      let canvas2 = sketch.createCanvas(600, 600,sketch.WEBGL);
      canvas2.parent('sketch-container2');
    }
    sketch.draw = function() {
      //for canvas 2
      sketch.background(100);
      sketch.rotateX(sketch.frameCount * 0.01);
      sketch.rotateZ(sketch.frameCount * 0.02);
      sketch.cone(30, 50);
    }
  };
  new p5(s2);
