var myGamePiece;

function reset() {
  myGameArea.stop();
  myGameArea.clear();
  startGame();
}

function startGame() {
  
    document.getElementById("play").style.opacity = "0.0";
    document.getElementById("pause").style.opacity = "1.0";
    document.getElementById("pause").style.float = "left";
    myGamePiece = new component(15, 15, "black", 0, 0);
    myGameArea.start();
}



var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() { 
        this.canvas.width = this.canvas.height * 2;
        this.canvas.style.height = '300px';
        // this.canvas.height = this.canvas.width/2;
        // this.canvas.style.marginBottom = '100px';
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
				      
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.speedX = 8;
    this.speedY = 0;    
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitLeftSide();
        this.hitRightSide();
        this.hitTop();
        this.hitBottom();
    }
  
    this.hitLeftSide = function() {
      var hitLeft = myGameArea.canvas.width - this.width;
        if (this.x > hitLeft) {
          this.x = - this.width + this.width;
        }
    }
  
    this.hitRightSide = function() {
      var hitRight = - this.width + this.width;
        if (this.x < hitRight) {
          this.x = myGameArea.canvas.width - this.width;
        }
    }
  
    this.hitTop = function() {
      var topHit = this.height - this.height;
        if (this.y < topHit) {
          this.y = topHit;
          this.gravitySpeed = -this.gravitySpeed * (7/10);
          
          if (this.y == topHit) {
              this.speedX += -0.05;
              if (this.speedX < 0) {
                for(let i = 0; i < 2; i++){
                  this.speedX = 0;
                }
                
              }
            }
        }
    }
  
    this.hitBottom = function() {
      var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -this.gravitySpeed * (7/10);
            
          
            if (this.y == rockbottom) {
              this.speedX += -0.05;
              if (this.speedX < 0) {
                for(let i = 0; i < 2; i++){
                  this.speedX = 0;
                }
                
              }
            }
           
        }
    }
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.newPos();
  myGamePiece.update();
  // displayConsolData();
  // directions(e);
  displayData();
}

// function displayConsolData(){
//   console.log("y = " + myGamePiece.y);
//   console.log("x = " + myGamePiece.x);
//   console.log("speedX = " + myGamePiece.speedX);
//   console.log("speedY = " + myGamePiece.speedY);
//   console.log("gravity = " + myGamePiece.gravity);
//   console.log("gravitySpeed = " + myGamePiece.gravitySpeed);
// }

function displayData(){
  document.getElementById('Y').innerHTML = "y = " + Math.ceil(myGamePiece.y);
  document.getElementById('X').innerHTML = "x = " + Math.ceil(myGamePiece.x);
  document.getElementById('speedX').innerHTML = "Diagonal speed = " + Math.ceil(myGamePiece.speedX);
  document.getElementById('speedY').innerHTML = "Virticle speed = " + Math.ceil(myGamePiece.speedY);
  document.getElementById('gravity').innerHTML = "Gravity = " + myGamePiece.gravity;
  document.getElementById('gravitySpeed').innerHTML = "Gravity speed = " + Math.ceil(myGamePiece.gravitySpeed);
}

function fallSpeed(s) {
  myGamePiece.speedX += s;
}

function fallSlow(l) {
  if (myGamePiece.speedX > 0) {
    myGamePiece.speedX += -l;
  }
  if (myGamePiece.speedX < 0) {
    myGamePiece.speedX += l;
  }
}

let n = gravity / 2;
let nG = gravity;

function accelerate(n, nG) {
  let eG = n + nG;
  myGamePiece.gravity = eG;
}


let xAfter;
let yAfter;   
let xSAfter;
let ySAfter;   
let gAfter;
let gSAfter;

let t = 0;

function pause(t) {
  document.getElementById("pause").style.opacity = "0.0";
  document.getElementById("pause").style.float = "right";
  document.getElementById("play").style.opacity = "1.0";
  document.getElementById("play").style.right = "0px";
  
  xAfter = myGamePiece.x;
  yAfter = myGamePiece.y; 
  xSAfter = myGamePiece.speedX;
  ySAfter = myGamePiece.speedY;    
  gAfter = myGamePiece.gravity;
  gSAfter = myGamePiece.gravitySpeed;
  
  myGamePiece.speedX = t;
  myGamePiece.speedY = t;    
  myGamePiece.gravity = t;
  myGamePiece.gravitySpeed = t;
}

function unpause() {
  document.getElementById("pause").style.opacity = "1.0";
  document.getElementById("pause").style.float = "left";
  document.getElementById("play").style.opacity = "0.0";
  document.getElementById("play").style.right = "0px";
  
  myGamePiece.x = xAfter;
  myGamePiece.y = yAfter; 
  myGamePiece.speedX = xSAfter;
  myGamePiece.speedY = ySAfter;    
  myGamePiece.gravity = gAfter;
  myGamePiece.gravitySpeed = gSAfter;
}

document.getElementById("goback").addEventListener("click", () => {
  history.back();
});