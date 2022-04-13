class gamstructure{
    numerstring = [];
    score = [];
    gmlog = "";
    constructor()
    {
        for(let i = 0; i < 7; i++)
        {
            this.numerstring.push(getrandomint(1,8));
        }
        let k = this.numerstring.reduce((a, b) => a + b, 0) - getrandomint(4,9);
        this.score.push(k);
        this.score.push(k);
        this.gmlog = "Game has initialized";
    }

    finishstatus()
    {
        if(this.numerstring.length <= 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    drawgame()
    {
        if(this.numerstring.length==0)
        {
            if(this.score[0]==this.score[1])
            {
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

    whowon(ply)
    {
        if(this.numerstring.length == 0)
        {
            if(this.score[ply]==Math.max(...this.score))
            {
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

    gameplay(ply,num)
    {
        var index;
        if(this.numerstring.includes(num))
        {
            index = this.numerstring.indexOf(num);
            this.numerstring.splice(index, 1);
            this.score[ply] = this.score[ply] - num;
            if(this.finishstatus())
            {
                if(this.whowon(0))
                {
                    this.gmlog = "Computer Has won the game";
                    return;
                }
                else if(this.whowon(1))
                {
                    this.gmlog = "Human Has won the game";
                    return;
                }
                else{
                    this.gmlog = "The game is draw";
                    return;
                }

            }
            return;
        }
        else{
            if(this.whowon(0))
            {
                this.gmlog = "Computer has won the game";
            }
            else if(this.whowon(1))
            {
                this.gmlog = "Human has won the game";
            }
            else{
                this.gmlog = "The game is draw";
            }
            return;
        }
    }

    humanmove(num)
    {
        this.gameplay(1,num);
        this.compmove();
        updetails();
        return;
    }
    compmove()
    {
        var bst = -100;
        var bestmove;
        var num;
        var tempnum;
        for(num in this.numerstring)
        {
            tempnum = this.numerstring[num];
            this.numerstring.splice(num,1);
            this.score[0] = this.score[0] - tempnum;
            var score = this.minimax(false);
            this.numerstring.push(tempnum);
            this.score[0] = this.score[0] + tempnum;
            if(score > bst)
            {
                bst = score;
                bestmove = tempnum;
            }
        }
        this.gmlog = "Computer choose "+String(bestmove);
        this.gameplay(0,bestmove);
        return;
    }
    minimax(bl)
    {
        var bst;
        var score;
        var num;
        var tempnum;
        if(this.whowon(0))
        {
            return 1;
        }
        else if(this.whowon(1))
        {
            return -1;
        }
        if(this.drawgame())
        {
            return 0;
        }
        if(bl)
        {
            bst = -100;
            for(num in this.numerstring)
            {
                tempnum = this.numerstring[num];
                this.numerstring.splice(num,1);
                this.score[0] = this.score[0] - tempnum;
                var score = this.minimax(false);
                this.numerstring.push(tempnum);
                this.score[0] = this.score[0] + tempnum;
                if(score > bst)
                {
                    bst = score;
                }
            }
            return bst;
        }
        else{
            bst = 100;
            for(num in this.numerstring)
            {
                tempnum = this.numerstring[num];
                this.numerstring.splice(num,1);
                this.score[0] = this.score[0] - tempnum;
                var score = this.minimax(true);
                this.numerstring.push(tempnum);
                this.score[0] = this.score[0] + tempnum;
                if(score > bst)
                {
                    bst = score;
                }
            }
            return bst;
        }
    }
    
}

gamedata = new gamstructure();


function getrandomint(min,max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gamepageinit(){
    var inithtm = `
    <div class = "text-center">
            <h1 class="display-4" style="margin-bottom: 7px;">Score of the players</h1>
            <div class="d-flex flex-row justify-content-center">
                <div class="p-2"><p class="lead" id="aiscore">AI Score: 0</p></div>
                <div class="p-2"><p class="lead" id="humanscore">Human Score: 0</p></div>
              </div>
              <blockquote class="blockquote">
                <p class="mb-0">Choose from the available numbers below.</p>
              </blockquote>
              <div class="d-flex flex-row justify-content-center" id="btnspace">
                <div class="p-2"><p class="lead"><button type="button" class="btn btn-outline-primary">0</button></p></div>
                <div class="p-2"><p class="lead"><button type="button" class="btn btn-outline-secondary">0</button></p></div>
              </div>
              <p class="lead" id="gmlog">Game has initialised</p></div>
        </div>
        <div class = "container" style="margin-top: 10%;">
          <p class="lead">
            <u>INSTRUCTION: </u>The game starts with some given numbers. The numbers are random as well as the points you have.
            Your points will be deducted based on number you choose. That is if you choose 2, and your point is 10, your point will be deducted
            to 8. So, Like that the game goes on. The game will finish when you reach a state where there is no numbers available. And when you reach
            that state, Whoever has the maximum points wins the game. That is if AI has the maximum points he wins, else if the human as maximum he wins.
            The winner of the game will displayed there. 
          </p>
        </div>
    `;
    document.body.innerHTML = inithtm;
}

function btnclk(num)
{
    gamedata.humanmove(parseInt(num));
    updetails();
}

function updetails(){
    let buttonvars = "";
    document.getElementById("aiscore").innerHTML = "AI Score: "+String(gamedata.score[0]);
    document.getElementById("humanscore").innerHTML = "Human Score: "+String(gamedata.score[1]);
    for(let k = 0; k < gamedata.numerstring.length; k++)
    {
        buttonvars = buttonvars+'<div class="p-2"><p class="lead"><button type="button" class="'+btnclassreturn()+'" onclick="btnclk('+String(gamedata.numerstring[k])+')">'+String(gamedata.numerstring[k])+'</button></p></div>\n';
    }
    if(gamedata.numerstring.length > 0)
    {
        document.getElementById("btnspace").innerHTML = buttonvars;
    }
    else
    {
        document.getElementById("btnspace").innerHTML = "";
    }
    document.getElementById("gmlog").innerHTML = gamedata.gmlog;

}

function btnclassreturn(){
    var btnclasses = [
        "btn btn-outline-primary btn-lg",
        "btn btn-outline-secondary btn-lg",
        "btn btn-outline-success btn-lg",
        "btn btn-outline-danger btn-lg",
        "btn btn-outline-warning btn-lg",
        "btn btn-outline-info btn-lg",
        "btn btn-outline-dark btn-lg"
    ];
    return btnclasses[Math.floor(Math.random()*btnclasses.length)];

}

function firstclick(val)
{
    console.log(val);
    document.body.innerHTML = "";
    document.title = "The game has started";
    if(val == "1")
    {
        gamedata.compmove();
    }
    gamepageinit();
    updetails();
}