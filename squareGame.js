class Components { //Properites of all of the objects on screen
    constructor(x, y, width, height, color, speed, canvas) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.canvas = canvas;
    }

    create() {
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }

    moveUp() {
        this.y -= this.speed;
    }

    collisionWith(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var collision = true;
        if ((mybottom < othertop) || (mytop > otherbottom) ||      (myright  < otherleft) || (myleft > otherright)) { 
            collision = false;
        }

        return collision;
    }
}

/*class GameArea { //Creates the canvas
    constructor(id) {
        this.id = id;
        this.canvas = document.createElement(id);
    }

    start() {
        this.canvas.width =  80;
        this.canvas.height = 270;

        this.context = this.canvas.getContext("2d");
        document.querySelector("body").append(this.context);
    }
}*/

let user; 
let obstacles = [];
let canvasWidth = Math.floor(Math.random() * window.innerWidth) + 5000;
let canvasHeight = Math.floor(Math.random() * window.innerHeight) + 250;

if (canvasWidth > window.innerWidth) {
    canvasWidth = window.innerWidth;
}

if (canvasHeight > window.innerHeight) {
    canvasHeight = window.innerHeight - 100;
}

document.addEventListener('keydown', moveUser);

function moveUser(event) {
    if (event.key === "ArrowRight" || event.key === "d") {
        user.moveRight();
    }

    if (event.key === "ArrowLeft" || event.key === "a") {
        user.moveLeft();
    }

    if (event.key === "ArrowDown" || event.key === "s") {
        user.moveDown();
    }

    if (event.key === "ArrowUp" || event.key === "w") {
        user.moveUp();
    }

    if (user.x < 0) {
        user.x += 15;
    }

    if (user.y < 0) {
        user.y += 15;
    }

    if (user.y > canvasHeight - 25) {
        user.y = canvasHeight - 40;
    }
}

function start() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    document.querySelector("body").append(canvas);

    user = new Components(10, 10, 25, 25, "blue", 15, canvas);
    user.create();
    
    let counter = 0;
    let points = 0;
    //let hp = 3;

    let intervalPoints = setInterval(() => {
        points++;

        document.querySelector("#points").innerHTML = points;
    }, 1000)

    
    let interval = setInterval(() => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); 

        if ((user.x + user.width) >= canvas.width) {
            clearInterval(interval);
            document.querySelector("#restart").style.display = "block";

            document.querySelector("#restart").innerHTML = `Great you won! Total Points ${points} <br> <small>Press enter</small>`;

            document.querySelector("#restart").addEventListener("click", () => {
                location.reload();
            })

            document.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    location.reload();
                }
            })
        }

        for (let i = 0; i < obstacles.length; i++) {
            const element = obstacles[i];
            
            if (user.collisionWith(element)) {
                clearInterval(interval);

                document.querySelector("#restart").style.display = "block";

                document.querySelector("#restart").innerHTML = `Restart Total points ${points} <br> <small>press enter</small>`

                document.querySelector("#restart").addEventListener("click", () => {
                    location.reload();
                })

                document.addEventListener("keydown", (event) => {
                    if (event.key === "Enter") {
                        location.reload();
                    }
                })

                //hp--;

                /*user.fadeOut().fadeIn();

                if (hp < 0) {
                    clearInterval(interval);
                }*/
            }       
        
            element.create();
            element.moveLeft();
        }

        if (counter % 30 === 0) { //30, 60, ... to spawn obstacles
            let obstacle = new Components(canvasWidth, Math.floor(Math.random() * canvasHeight), Math.floor(Math.random() * 100) + 10  
            , Math.floor(Math.random() * 100) + 10, "red", 5, canvas);

            obstacles.push(obstacle);

            setTimeout(() => {
                let obstacle2 = new Components(canvasWidth, Math.floor(Math.random() * canvasHeight), Math.floor(Math.random() * 100) + 10  
                , Math.floor(Math.random() * 100) + 10, "yellow", 10, canvas);

                obstacles.push(obstacle2);
            }, 10000)   
        }

        user.create();

        counter++; 
    }, 30);
}

console.log(document.querySelector("body"));

start();

/* 
setInterval - clears context then adds a different position
*/

/*  
  ctx.clearRect(0, 0, 500, 500);

  bee(x, y);
  x = locate(x);
  y = locate(y);

  ctx.strokeRect(0, 0, 500, 500);
}, 30)
*/