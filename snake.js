
function init(){
    canvas = document.getElementById('mycanvas');
    H = canvas.height = 1000;
    W = canvas.width = 1000;
    pen = canvas.getContext('2d');
    cs=70;
    game_over = false;
    score = 0;

    food_img = new Image();
    food_img.src = "apple.png";

    score_img = new Image();
    score_img.src = "trophy.png";

    
    food = getRandomFood();

    snake = {
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",


       
        createSnake:function(){
            // console.log("creating snake");
			for(var i=this.init_len; i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},

        drawSnake:function(){
            // console.log("drawing snake");
            for(var i = 0;i<this.cells.length ; i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
            }
        },

        updateSnake:function(){
            // console,log("updating snake");
            //increase the length of snake when it eats the food
            
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if( (headX == food.x) && (headY == food.y) ){
                playConsume();
                console.log("food eaten by snake");
                food = getRandomFood();
                score++;
            }
            else{
                //for increaing the length of snake
                this.cells.pop();
            }

            var newX;
            var newY;

            if(this.direction=="right"){
                newX = headX + 1;
                newY = headY;
            }
            else if(this.direction=="left"){
                newX = headX - 1;
                newY = headY;
            }
            else if(this.direction=="up"){
                newX = headX ;
                newY = headY - 1;
            }
            else if(this.direction=="down"){
                newX = headX;
                newY = headY + 1;
            }
            
            this.cells.unshift({x:newX,y:newY});

            //put check for snake if it gop out of the grid
            var last_X = Math.round(W/cs);
            var last_Y = Math.round(H/cs);

            if(this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > last_X || this.cells[0].y >last_Y){
                playGameOver();
                game_over = true;
            }
        },

        


    };

    snake.createSnake();

    //adding an event listener
    function keyPressed(e){
        // console.log("key pressed",e.key);
        playAudio();
        if(e.key=="ArrowUp"){
            snake.direction="up";
        }
        if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        console.log(snake.direction);

    }

    document.addEventListener('keydown',keyPressed);

}

function playAudio(){
    //when key is cressed
    var audio = new Audio('https://www.soundjay.com/switch/switch-1.wav');
    audio.play();			
}

function playConsume(){	
    //when food is eaten		
    var audio = new Audio('https://www.soundjay.com/button/button-3.wav');
    audio.play();			
}

function playGameOver(){
    //when game is over
    var audio = new Audio('https://www.soundjay.com/button/sounds/button-10.mp3');
    audio.play();
}

function draw(){
    //erase the old frame
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.fillStyle = "blue";
    pen.drawImage(score_img,50,50,cs,cs);
	pen.font = "50px Roboto"
	pen.fillText(score,75,90);

}

function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food= {
        x:foodX,
        y:foodY,
        color:"red",
    }

    return food;
}
function gameloop(){
    console.log("in gameloop");
    draw();
    update();

    if(game_over == true){
        clearInterval(f);
        alert("GAME OVER");
        return;
    }

}

init();

var f = setInterval(gameloop,100);