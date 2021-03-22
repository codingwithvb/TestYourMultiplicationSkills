var PROBLEM = 1; 
var CORRECT = 2; 
var WRONG = 3; 
var gameState = PROBLEM; 
var rand1; 
var rand2;  
var playerInput; 

function setup() {
  createCanvas(displayWidth, displayHeight);

  this.input = createInput("Answer");
  this.button = createButton('Check Answer!');  

  
  rand1 = Math.round(random(100,450)); 
  rand2 = Math.round(random(1,50)); 

}

function draw() {
  background(220);

  if(gameState === PROBLEM){

    textSize(50);
    textFont("Calibri"); 
    text(rand1, displayWidth/2,displayHeight/2-100);
    text("x " + rand2, displayWidth/2 - 35, displayHeight/2 -60);
  
    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 30);
    this.button.position(displayWidth/2 + 30, displayHeight/2); 

    var correctAnswer = rand1 * rand2; 

    this.button.mousePressed(()=>{
      playerInput = this.input.value(); 
      
      var playerAnswer = parseInt(playerInput)

      if(playerAnswer === correctAnswer){
        gameState = CORRECT;  
        console.log(gameState); 
      }

      if(playerAnswer !== correctAnswer){
        gameState = WRONG; 
      }
    });
  }

  if(gameState === CORRECT){

    textSize(50); 
    text(rand1, displayWidth/2,displayHeight/2-100);
    text("x " + rand2, displayWidth/2 - 35, displayHeight/2 -60);

    textSize(15);
    textFont("Calibri"); 
    text("Good Job! You got the answer correct!", displayWidth/2 - 70, displayHeight/2 + 50); 
  }

  if(gameState === WRONG){

    textSize(50); 
    text(rand1, displayWidth/2,displayHeight/2-100);
    text("x " + rand2, displayWidth/2 - 35, displayHeight/2 -60);

    textSize(15);
    textFont("Calibri"); 
    text("Wrong Answer, the correct answer was " + rand1 * rand2, displayWidth/2 - 70, displayHeight/2 + 50); 
  }
}