var NUMBERSELECTOR = 1; 
var PROBLEM = 2; 
var CORRECT = 3; 
var WRONG = 4; 
var SESSION_REPORT = 5;  
var gameState = NUMBERSELECTOR; 
var rand1; 
var rand2;  
var correctAnswer; 
var incorrectAnswer; 
var percentageScore; 
var playerInput; 
var timer; 
var totalQuestion; 
var skippedQuestions; 
var sessionTimer; 
var randomSelector1Input;
var randomSelector2Input;
var randomSelector3Input;
var randomSelector4Input;

function setup() {
  createCanvas(windowWidth, windowHeight);

  this.input = createInput("Answer");
  this.button = createButton("Check Answer!"); 
  this.next = createButton("Next Question"); 
  this.session = createButton("End Session");

  this.selectRange = createButton("Select Final Range");
  this.selectRange.style('background-color', 'red');

  this.startTest = createButton("Start Test");
  this.startTest.style('background-color', 'lightcyan');

  this.randomSelector1 = createInput("Ex. 1");
  this.randomSelector2 = createInput("Ex. 100");
  this.randomSelector3 = createInput("Ex. 1");
  this.randomSelector4 = createInput("Ex. 100"); 

  this.next.position(displayWidth/2 + 150, 100);

  timerinSeconds = 0;
  timerinMinutes = 0;
  timerinHours = 0;  

  sessionTimerinSeconds = 0;
  sessionTimerinMinutes = 0; 
  sessionTimerinHours = 0; 

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

  if(gameState === NUMBERSELECTOR){
    this.input.hide();
    this.button.hide();
    this.next.hide();
    this.session.hide(); 

    this.startTest.position(displayWidth/2 + 250, 100);

    this.randomSelector1.position(displayWidth/2 - 100, displayHeight/2 - 165); 
    this.randomSelector2.position(displayWidth/2 + 100, displayHeight/2 - 165); 
    this.randomSelector3.position(displayWidth/2 - 100, displayHeight/2 - 115); 
    this.randomSelector4.position(displayWidth/2 + 100, displayHeight/2 - 115); 
    this.selectRange.position(displayWidth/2 + 100, displayHeight/2 - 75); 

    textSize(30);
    textFont("Calibri");
    text("Choose the Range for Your Test!", displayWidth/2 - 200, displayHeight/2 - 350);

    textSize(15);
    text("Choose the Range for the Multiplicand:", displayWidth/2-350, displayHeight/2 - 150); 
    text("Choose the Range for the Multiplier:", displayWidth/2 - 350, displayHeight/2 - 100); 

    this.selectRange.mousePressed(()=>{

      randomSelector1Input = this.randomSelector1.value(); 
      randomSelector2Input = this.randomSelector2.value(); 
      randomSelector3Input = this.randomSelector3.value(); 
      randomSelector4Input = this.randomSelector4.value();

      this.selectRange.style('background-color', 'lime');

    });

    var playersTestProblem1 = parseInt(randomSelector1Input);
    var playersTestProblem2 = parseInt(randomSelector2Input);
    var playersTestProblem3 = parseInt(randomSelector3Input);
    var playersTestProblem4 = parseInt(randomSelector4Input);

    this.startTest.mousePressed(()=>{

     rand1 = Math.round(random(playersTestProblem1, playersTestProblem2)); 
     rand2 = Math.round(random(playersTestProblem3,playersTestProblem4)); 

     gameState = PROBLEM; 
    });
  }

  if(gameState === PROBLEM){

    this.input.show();
    this.button.show();
    this.next.show();
    this.session.show();
    
    this.startTest.hide(); 
    this.randomSelector1.hide();
    this.randomSelector2.hide();
    this.randomSelector3.hide();
    this.randomSelector4.hide();
    this.selectRange.hide();

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
      timerinSeconds++; 
    }

    if(timerinSeconds >= 60){
      timerinSeconds = 0; 
      timerinMinutes++; 
    }

    if(timerinHours >= 60){
      timerinMinutes = 0; 
      timerinHours++; 
    }

    if(frameCount % 50 === 0){
      sessionTimerinSeconds++; 
    }

    if(sessionTimerinSeconds >= 60){
      sessionTimerinSeconds = 0; 
      sessionTimerinMinutes++; 
    }

    if(sessionTimerinMinutes >= 60){
      sessionTimerinMinutes = 0; 
      sessionTimerinHours++; 
    }

    textSize(15);
    text("Time: " + timerinHours + ":" + timerinMinutes + ":" + timerinSeconds, displayWidth/2 + 150,170); 
    text("Session Time: " + sessionTimerinHours + ":" + sessionTimerinMinutes + ":" + sessionTimerinSeconds, displayWidth/2 + 150,150); 

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

      
    var nextPlayerTestProblem1 = parseInt(randomSelector1Input);
    var nextPlayerTestProblem2 = parseInt(randomSelector2Input);
    var nextPlayerTestProblem3 = parseInt(randomSelector3Input);
    var nextPlayerTestProblem4 = parseInt(randomSelector4Input);

    rand1 = Math.round(random(nextPlayerTestProblem1,nextPlayerTestProblem2)); 
    rand2 = Math.round(random(nextPlayerTestProblem3,nextPlayerTestProblem4)); 

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
    text("Good Job! You got the answer correct!", displayWidth/2 - 70, displayHeight/2 + 50); 

    this.next.mousePressed(()=>{

      gameState = PROBLEM; 
      
      nextPlayerTestProblem1 = parseInt(randomSelector1Input);
      nextPlayerTestProblem2 = parseInt(randomSelector2Input);
      nextPlayerTestProblem3 = parseInt(randomSelector3Input);
      nextPlayerTestProblem4 = parseInt(randomSelector4Input);
  
      rand1 = Math.round(random(nextPlayerTestProblem1,nextPlayerTestProblem2)); 
      rand2 = Math.round(random(nextPlayerTestProblem3,nextPlayerTestProblem4)); 
  
      timerinHours = 0;
      timerinMinutes = 0; 
      timerinSeconds = 0;  
  
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

      nextPlayerTestProblem1 = parseInt(randomSelector1Input);
      nextPlayerTestProblem2 = parseInt(randomSelector2Input);
      nextPlayerTestProblem3 = parseInt(randomSelector3Input);
      nextPlayerTestProblem4 = parseInt(randomSelector4Input);
  
      rand1 = Math.round(random(nextPlayerTestProblem1,nextPlayerTestProblem2)); 
      rand2 = Math.round(random(nextPlayerTestProblem3,nextPlayerTestProblem4)); 
  
      timerinHours = 0;
      timerinMinutes = 0; 
      timerinSeconds = 0;  
  
      }); 

  }

  if(gameState === SESSION_REPORT){
    this.input.hide();
    this.button.hide();
    this.next.hide();
    this.session.hide(); 

    correctAnswer = totalQuestion - incorrectAnswer; 

    percentageScore = correctAnswer/totalQuestion;
    percentageScore = Math.round(percentageScore  * 100); 

    textSize(50); 
    text("Session Report", displayWidth/2 - 100, 100);

    textSize(25); 
    text("Score: " + percentageScore + "%", displayWidth/2 - 100, 150); 
    text("Time Studied: " + sessionTimerinHours + ":" + sessionTimerinMinutes + ":" + sessionTimerinSeconds, displayWidth/2 - 100, 200);
    text("Number of Questions: " + totalQuestion, displayWidth/2 - 100, 250);
    text("Correct: " + correctAnswer, displayWidth/2 - 100, 300); 
    text("Incorrect: " + incorrectAnswer, displayWidth/2 - 100, 350); 
    text("Skipped: " + skippedQuestions, displayWidth/2 - 100, 400); 
  }
}