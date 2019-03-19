let debug = false;
let game = true;

// Enemies our player must avoid
let Enemy = function (x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y + 55;
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //if enemy has not passed edge of canvas
    if (this.x < this.boundary) {
        //move forward at the set speed 
        this.x += this.speed * dt;
    } else {
        //reset x to 0
        this.x = this.resetPos;
    }

};

// Draw the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y) {
    this.sprite = 'images/char-pink-girl.png';
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.winner = false;

}
Player.prototype.reset = function () {
    this.x = this.startX;
    this.y = this.startY;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function (dt) {
    // check player's position against enemies
    for (let enemy of allEnemies) {
        //if player and enemy are on same square 
        if (this.y === enemy.y && (this.x < enemy.x + 45) && this.x + 20 > enemy.x) {
            this.reset();
        }
    }

    //check winning conditions
    if (this.y < 55) {
        this.winner = true;
    }
};

Player.prototype.handleInput = function (input) {
    switch (input) {
        case 'left':
            if (this.x > 0) {
                this.x -= this.step;
            }
            break;
        case 'right':
            if (this.x < this.step * 4) {
                this.x += this.step;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= this.jump;
            }
            break;
        case 'down':
            if (this.y < this.jump * 4) {
                this.y += this.jump;
            }
            break;
    }
}


const player = new Player;
/*create enemies, start one block off screen*/

const allEnemies = [
    new Enemy(-101, 0, 200),
    new Enemy(-101, 83, 150),
    new Enemy(-101 * 3, 83, 150),
    new Enemy(-101 * 2, 83 * 2, 100)
];

// This listens for key presses and sends the keys to the Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});