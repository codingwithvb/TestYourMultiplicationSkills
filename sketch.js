var PROBLEM = 1; 
var CORRECT = 2; 
var WRONG = 3; 
var SESSION_REPORT = 4;  
var gameState = PROBLEM; 
var rand1; 
var rand2;  
var correctAnswer; 
var incorrectAnswer; 
var playerInput; 
var timer; 
var totalQuestion; 
var skippedQuestions; 
var sessionTimer; 

function setup() {
  createCanvas(displayWidth, displayHeight);

  this.input = createInput("Answer");
  this.button = createButton("Check Answer!"); 
  this.next = createButton("Next Question"); 
  this.session = createButton("End Session"); 

  this.next.position(displayWidth/2 + 150, 100);

  if(gameState === PROBLEM){

    rand1 = Math.round(random(100,450)); 
    rand2 = Math.round(random(1,50)); 
  
  }

  timer = 0; 
  sessionTimer = 0; 
  incorrectAnswer = 0;
  correctAnswer = 0;  
  totalQuestion = 0; 
  skippedQuestions = 0; 
}

function draw() {
  background(220);

  if(correctAnswer === undefined){
    correctAnswer = 0; 
  }

  if(gameState === PROBLEM){

    textSize(50);
    textFont("Calibri"); 
    text(rand1, displayWidth/2,displayHeight/2-100);
    text("x " + rand2, displayWidth/2 - 35, displayHeight/2 -60);
  
    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 30);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.next.position(displayWidth/2 + 150, 100);
    this.session.position(displayWidth/2 + 150, 75);  

    var correctAnswer = rand1 * rand2; 

    if(frameCount % 50 === 0){
      timer++; 
    }

    if(frameCount % 50 === 0){
      sessionTimer++; 
    }

    textSize(15);
    text("Time: " + timer, displayWidth/2 + 150,170); 
    text("Session Time: " + sessionTimer, displayWidth/2 + 150,150); 

    this.button.mousePressed(()=>{
      playerInput = this.input.value(); 
      
      var playerAnswer = parseInt(playerInput)

      if(playerAnswer === correctAnswer){
        console.log(gameState);
        gameState = CORRECT;  
        totalQuestion++; 
      }

      if(playerAnswer !== correctAnswer){

        gameState = WRONG; 
        totalQuestion++; 
        incorrectAnswer++; 
      }
    });

    this.next.mousePressed(()=>{

    rand1 = Math.round(random(100,450)); 
    rand2 = Math.round(random(1,50)); 
    timer = 0; 
    skippedQuestions++; 

    }); 

    this.session.mousePressed(()=>{
      gameState = SESSION_REPORT; 
    }); 

  }

  if(gameState === CORRECT){

    textSize(50); 
    text(rand1, displayWidth/2,displayHeight/2-100);
    text("x " + rand2, displayWidth/2 - 35, displayHeight/2 -60);

    textSize(15);
    textFont("Calibri"); 
    text("Good Job! You got the answer correct! It took you " + timer + " second/s.", displayWidth/2 - 70, displayHeight/2 + 50); 

    this.next.mousePressed(()=>{

      gameState = PROBLEM; 
      rand1 = Math.round(random(100,450)); 
      rand2 = Math.round(random(1,50)); 
      timer = 0; 
  
      }); 
  }

  if(gameState === WRONG){
 
    textSize(50); 
    text(rand1, displayWidth/2,displayHeight/2-100);
    text("x " + rand2, displayWidth/2 - 35, displayHeight/2 -60);

    textSize(15);
    textFont("Calibri"); 
    text("Wrong Answer, the correct answer was " + rand1 * rand2, displayWidth/2 - 70, displayHeight/2 + 50); 

    this.next.mousePressed(()=>{

      gameState = PROBLEM; 
      rand1 = Math.round(random(100,450)); 
      rand2 = Math.round(random(1,50)); 
      timer = 0; 
  
      }); 

  }

  if(gameState === SESSION_REPORT){
    this.input.hide();
    this.button.hide();
    this.next.hide();
    this.session.hide(); 

    correctAnswer = totalQuestion - incorrectAnswer; 

    textSize(50); 
    text("Session Report", displayWidth/2 - 100, 100);

    textSize(25); 
    text("Time Studied: " + sessionTimer + " second/s", displayWidth/2 - 100, 150);
    text("Number of Questions: " + totalQuestion, displayWidth/2 - 100, 200);
    text("Correct: " + correctAnswer, displayWidth/2 - 100, 250); 
    text("Incorrect: " + incorrectAnswer, displayWidth/2 - 100, 300); 
    text("Skipped: " + skippedQuestions, displayWidth/2 - 100, 350); 
  }
}