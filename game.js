let userClickedPattern= [];
let buttonColours=["red", "blue", "green", "yellow"];
let gamePattern=[];
let level = 0;
let started = false

//when the user press a key the game starts, then we change the h1 to the current level and set the variable started to true
$(document).on("keypress",function(){
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started=true;
    }
    
});


//Capture the clicked color and pushed it to empty array
$(".btn").click (function(){
    userChosenColour=(this.id);
    userClickedPattern.push(userChosenColour)
    
    playSound(userChosenColour)
    animatedPress(userChosenColour)

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    //check if the most recent answer is the same as the game pattern 
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } else{
        
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        
        startOver()
    }
};



function nextSequence(){
    // Reset userClickedPatter to an empty array ready for next lvl
    userClickedPattern=[];
    
    level++
    $("h1").text("Level " + level)
    let randomNumber = Math.floor(Math.random() * 4); 
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  
    playSound(randomChosenColour)

};

function startOver(){
    level=0;
    gamePattern=[];
    started=false
}

//function to play sound according the situation
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatedPress(currentColour){
    $("#" + currentColour).addClass("pressed")
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed")
      }, 100);
};











