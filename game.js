var buttoncolors=["red", "blue", "yellow", "green"];
var gamepattern=[];
var userpattern=[];
var level=0;
var started=false;

$("h1").text("Press the button to start");

$(".start-button").click(function(){
    if(!started)
    {   
        $("body").removeClass("game-over");
        $(".start-button").addClass("invisible");
        started=true;
        $(".instructions").addClass("invisible");
        nextsequence();
    }
});

$(".btn").click(function(){
    if(started)
    {
        userpattern.push(this.id);
        flash(this.id);
        checkanswer(); 
    }
});

function flash(selectedbutton)
{
    var audio= new Audio("./sounds/"+selectedbutton+".mp3");
    audio.play();
    $("#"+selectedbutton).addClass("pressed");
    setTimeout(function() {
        $("#"+selectedbutton).removeClass("pressed");
    }, 120);
}

function nextsequence()
{
    userpattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomnum=Math.floor(Math.random()*4);
    gamepattern.push(buttoncolors[randomnum]);
    flash(buttoncolors[randomnum]);
}

function checkanswer()
{
    let lastelement= userpattern.length-1;
    if(userpattern[lastelement]==gamepattern[lastelement])
    {
        if(userpattern.length==gamepattern.length)
        {
            setTimeout(nextsequence , 1000);
        }
    }
    else
    {
        var audio= new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("h1").text("Game over.");
        $(".start-button").removeClass("invisible");
        $(".start-button").text("Play again");
        level=0;
        gamepattern=[];
        started=false;
        $(".instructions").removeClass("invisible");
    }
}