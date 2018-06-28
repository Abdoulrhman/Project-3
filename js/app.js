/*
|--------------------------------------------------------------------------
| [9-20]Enemy Constructor
|--------------------------------------------------------------------------
| This constructor Represents an enemy Which the player must avoid it .
|
|  @constructor
*/
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = randomization(200, 1010);  // The Enemy on the X-axis (property)
    this.y = y;  // The Enemy on the Y-axis (property)
    this.Width = 50;    // The Enemy Width (property)
    this.Height = 50;   // The Enemy Height (property)
    this.speed = randomization(300,500);   // The Enemy Speed (property)
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


/*
|--------------------------------------------------------------------------
| [32-41]Enemy Constructor's Prototype Function
|--------------------------------------------------------------------------
| This Function will ensure the game runs at the same speed for all computers.
| Updates the enemy's position.
|
|  @param {number} dt --->  a time delta between ticks
*/
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 1000) {
        this.x = randomization(-200, -100);
        this.speed = randomization(300,500);
    }
};

/*
|--------------------------------------------------------------------------
| [49-51]Enemy Constructor's Prototype Function
|--------------------------------------------------------------------------
| This Function will draw te enemy on the screen.
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
|--------------------------------------------------------------------------
| [61-67]Player Constructor
|--------------------------------------------------------------------------
| This constructor Represents the player character .
|
|  @constructor
*/
var Player = function() {
    this.x = 404;
    this.y = 300;
    this.Width = 50;
    this.Height = 50;
    this.sprite = 'images/char-horn-girl.png';
};

/*
|--------------------------------------------------------------------------
| [76-103]Player Constructor's Prototype Function
|--------------------------------------------------------------------------
| This Function will Update the collision with the player score
*/

Player.prototype.update = function() {
    checkForCollisions();
    if (this.y < 42) {
        this.y = 300;
        results.setNewScore(1);
        WaterAudio.play();
        document.getElementById('score').innerHTML = results.getScore();


      // Checks for winning the game.

        if (results.getScore() === 5) {
            CongAudio.play();
            var modal = document.getElementById('win-popup');
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            $("#play-again-btn").on("click", function() {
                location.reload()
            });

        }
    }
};
/*
|--------------------------------------------------------------------------
| [110-112]Player Constructor's Prototype Function
|--------------------------------------------------------------------------
| This Function will draw te player on the screen.
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
|--------------------------------------------------------------------------
| [122-155]Player Constructor's Prototype Function
|--------------------------------------------------------------------------
| Updates the player's position based on the key pressed
|
| @param key ---> a string representation of available player moves.
*/
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        TickAudio.play();
        if (this.x === 0) {
            this.x = 0;

        } else {
            this.x -= 101;
        }

    }
    if (key === 'right') {
        TickAudio.play();
        if (this.x === 909) {
            this.x = 909;
        } else {
            this.x += 101;
        }

    }
    if (key === 'down') {
        TickAudio.play();
        if (this.y === 386) {
            this.y = 386;
        } else {
            this.y += 86;
        }
    }
    if (key === 'up') {
        TickAudio.play();
        this.y -= 86;

    }
};





var enemy1 = new Enemy(50);  // instantiate Enemy One with 50 on y-axis
var enemy2 = new Enemy(120); // instantiate Enemy One with 120 on y-axis
var enemy3 = new Enemy(200); // instantiate Enemy One with 200 on y-axis
var enemy4 = new Enemy(50);  // instantiate Enemy One with 50 on y-axis
var enemy5 = new Enemy(120); // instantiate Enemy One with 120 on y-axis
var enemy6 = new Enemy(200); // instantiate Enemy One with 200 on y-axis

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);

});

/*
|--------------------------------------------------------------------------
|  [193-215]Function for check collisions
|--------------------------------------------------------------------------
*/

function checkForCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (
            player.x < allEnemies[i].x + 75 &&
            player.x + 75 > allEnemies[i].x &&
            player.y < allEnemies[i].y + 35 &&
            player.y + 35 > allEnemies[i].y
        )

        {
            collisionAudio.play(); // playing the collisionAudio after hitting
            player.x = 404;   // re-position the player  on x-axis
            player.y = 300;   // re-position the player  on y-axis
            results.setNewLives(1);
            document.getElementById('lives').innerHTML = results.getLives();
            if (results.getLives() === 0) {
                alert('Wanna try again?');
                location.reload();
            }
        }
    }

}

/*
| The Randomization Function Takes 2 arguments Min, and Height
| To Make a Random Integer Number By Using The  Math.floor Built in function
| Which It Returns The Largest Integer Less Than or Equal To a Given Number
*/
function randomization(min, max) {
    return Math.floor((Math.random() * (min - max) + min));
}

/*
| This is a Multi Returning function which returns more than one function
*/

var results = function() {
    var score = 0;
    var lives = 3;
    return {
        setNewScore: function(n) {
            score = score + n;
        }, // this function increment the score by one in every one loop
        getScore: function() {
            return score;
        },  // this function gets the score value
        setNewLives: function(n) {
            lives = lives - n;
        },  // this function decrements the lives by on in every collision
        getLives: function() {
            return lives;
        }  // this function gets the Lives value
    };
}();  // this is a self invoked function

var collisionAudio = new Audio("sounds/crunch.wav");
var TickAudio = new Audio("sounds/ding.wav");
var WaterAudio = new Audio("sounds/water-splash.wav");
var CongAudio = new Audio("sounds/cong.mp3");