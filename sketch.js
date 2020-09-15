var ball;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database = firebase.database();
    var latest_data_from_database = database.ref("ball/position");
    latest_data_from_database.on("value", readPosition, error);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("ball/position").set({
        "x" : ball.x + x,
        "y" : ball.y + y
    })
    
}

function readPosition(data) {
    var position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function error() {
    console.log("error in reading ur data");
}

