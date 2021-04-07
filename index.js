var buttoncolors=["red", "blue", "yellow", "green"];
var gamepattern=[];
var userpattern=[];
var level=0;
var started=false;

$(".btn").click(function(){
    userpattern.push(this.id);
    console.log(userpattern);
    flash(this.id);
    checkanswer(userpattern.length-1);
});

$(document).keypress(function(){
    if (!started)
    {
        $("body").removeClass("game-over");
        started=true;
        nextsequence();
    }
});

function checkanswer(lastindexofuserpattern)
{
    if(gamepattern[lastindexofuserpattern]==userpattern[lastindexofuserpattern])
    {
        if(gamepattern.length==userpattern.length)
        {
            setTimeout(nextsequence , 1000);
        }
    }
    else
    {
        var audio= new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("h1").text("Game over, press any key to play again");

        level=0;
        gamepattern=[];
        started=false;
    }
}

function nextsequence()
{
    userpattern=[];
    level++;
    $("h1").text("Level "+ level);
    var randomnum=Math.floor(Math.random()*4);
    gamepattern.push(buttoncolors[randomnum]);
    flash(buttoncolors[randomnum]);
}

function flash(selectedbutton)
{
    var audio= new Audio("./sounds/"+selectedbutton+".mp3");
    audio.play();
    $("#"+selectedbutton).addClass("pressed");
    setTimeout(function() {
        $("#"+selectedbutton).removeClass("pressed");
    }, 120);
}

