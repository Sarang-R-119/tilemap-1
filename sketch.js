// sketch.js
// Description: 
//
// AUTHOR:  Sarang Vadi Rajeev
// COURSE:  ECE 4525
// DATE:    September 17, 2021
var tilemap = [         //
    "wwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwww      w",
    "w           w   v  w",//v
    "w           w      w",
    "w     w     www    w",
    "w    www           w",
    "ww  v w            w",//v
    "w              wwwww",
    "www                w",
    "w          v       w",//v
    "w    wwwwwwwwww  www",
    "w      w           w",
    "w     www          w",
    "wwww         wwwwwww",
    "w     h      w     w",//h
    "w     w     www  p w",
    "www  www           w",
    "w                www",
    "w h       wwwwwwwwww",//h
    "wwwwwwwwwwwwwwwwwwww",
];

class Wall{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw() {
        rectMode(CENTER);
        fill(6, 65, 183);
        rect(this.x + 10, this.y + 10, 20, 20);
        fill(40, 87, 182);
        rect(this.x + 10, this.y + 10, 10, 10);

        // if(playerIsMoving)
        // {
        //     var hor_dist = dist(this.x, 0, player.x, 0);
        //     var vert_dist = dist(this.y, 0, player.y, 0);
        //     if (hor_dist < 30) {
        //         if (this.x > player.x) {
        //             player.x -= (30-hor_dist);
        //         }
        //         else if (this.x < player.x) {
        //             player.x += (30-hor_dist);
        //         }
        //     }

        //     if (vert_dist < 30) {
        //         if (this.y > player.y) {
        //             player.y -= (30-vert_dist);
        //         }
        //         else if (this.y < player.y) {
        //             player.y += (30-vert_dist);
        //         }
        //         player.draw();
        //     }
        // }
    }

}

class Player {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw() {

        fill(169, 49, 49);
        ellipse(this.x+10, this.y+10, 20, 20);
        // this.check_collision();
        // Checks if the left and right arrow keys are pressed and the player is moved consecutively.
    }

    move() {
        var deltaX = 0;
        var deltaY = 0;

        if (keyIsPressed && (keyCode === RIGHT_ARROW) && this.x < width - 10){
            deltaX = 5;
        }
        if (keyIsPressed && (keyCode === LEFT_ARROW && this.x > 10)){
            deltaX = -5;
        }
        // Checks if the up and down arrow keys are pressed and the player is moved consecutively.
        if (keyIsPressed && (keyCode === UP_ARROW) && this.y > 10){
            deltaY = -5;

        }
        if (keyIsPressed && (keyCode === DOWN_ARROW) && this.y < height - 10){
            deltaY = 5;
        }

        if(this.check_collision(deltaX, deltaY) == true){
            deltaX = 0;
            deltaY = 0;
        }
        
      this.x += deltaX;
      this.y += deltaY;
    }

    check_collision_with_walls(deltaX, deltaY) {
      
      for (var i=0; i < walls.length; i++) {

          var horizontal_distance = abs(walls[i].x - (this.x + deltaX));//dist(walls[i].x, 0, this.x + deltaX, 0);
          var vertical_distance = abs(walls[i].y - (this.y + deltaY));
          

          if(horizontal_distance <= 15 && vertical_distance <= 15) {
            console.log('Collision with wall');
            return true;
          }
        }

        return false;
    }
}

class Enemy{
    constructor(x, y, dir){
        this.x = x;
        this.y = y;
        this.dir = dir;
    }

    draw() {
        var prop = 1/6; // proportion
        
        stroke(255, 0, 0);
        fill(255);
        ellipse(this.x, this.y, 150 * prop, 200 * prop); // Face
        
        push(); // Nose
            strokeWeight(2);
            fill(255, 0, 0);
            ellipse(this.x, this.y, 50 * prop, 30 * prop);
        pop();
        
        push(); // Left Eye
            strokeWeight(1);
            stroke(10, 10, 30);
            translate(this.x - 30 * prop, this.y - 37.5 * prop);
            rotate(PI/12);
            ellipse(0, 0, 30 * prop, 15 * prop);
        pop();
        
        push(); // Left pupil
            fill(0);
            ellipse(this.x - 30 * prop, this.y - 35 * prop, 5 * prop, 10 * prop);
        pop();
        
        push(); // Right Eye
            strokeWeight(1);
            stroke(10, 10, 30);
            translate(this.x + 30 * prop, this.y - 37.5 * prop);
            rotate(-PI/12);
            ellipse(0, 0, 30 * prop, 15 * prop); 
        pop();

        push(); // Right pupil
            fill(0);
            ellipse(this.x + 30 * prop, this.y - 35 * prop, 5 * prop, 10 * prop);
        pop();
        fill(255);
        
        push(); // Mouth
            strokeWeight(4 * prop + 1);
            triangle(this.x - 37.5 * prop, this.y + 25 * prop, this.x, this.y + 75 * prop, this.x + 37.5 * prop, this.y + 25 * prop);
        pop();
        
        stroke(0); // Teeth
        line(this.x - 18.75 * prop, this.y + 25 * prop, this.x - 18.75 * prop, this.y + 47 * prop);
        line(this.x + 18.75 * prop, this.y + 25 * prop, this.x + 18.75 * prop, this.y + 47 * prop);
        line(this.x, this.y + 25 * prop, this.x, this.y + 70 * prop);

    }

    move() {

        if (this.dir === 'vertical') {
            var deltaY = 5;

            if (this.y <= 33.33 || this.y >= height - 33.33) {
                deltaY *= -1;
            }

            if(this.check_collision(deltaY) == true){
                deltaY = 0;
            }

            this.y += deltaY;
        }

        if (this.dir === 'horizontal') {
            var deltaX = 5;

            if (this.x <= 25 || this.x >= width - 25) {
                deltaX *= -1;
            }

            if(this.check_collision(deltaX) == true){
                deltaX = 0;
            }

            this.x += deltaX;
        }
    }

    check_collision_with_walls(deltaX, deltaY) {
      
        for (var i=0; i < walls.length; i++) {
            
            if ( vertical)
            var horizontal_distance = abs(walls[i].x - (this.x + deltaX));
            var vertical_distance = abs(walls[i].y - (this.y + deltaY));
  
            if(horizontal_distance <= 30 && vertical_distance <= 28.33) {
              console.log('Collision with wall');
              return true;
            }
          }
  
          return false;
      }
}

class StartScreen{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw() {

        rect(this.x + 50, this.y + 50, 300, 100)
        textSize(40);
        text("Start", this.x + 150, this.y + 115);

        rect(this.x + 50, this.y + 200, 300, 100);
        textSize(40);
        text("Instructions", this.x + 100, this.y + 265);
    }
}

// Start button dimensions
var button1_start_x = 50;
var button1_start_y = 50;
var button1_end_x = 350;
var button1_end_y = 150;

// Start button dimensions
var button2_start_x = 50;
var button2_start_y = 200;
var button2_end_x = 350;
var button2_end_y = 350;

var game_state = false; // Checking if the game has loaded
var instructions_state = false; // Checking if the instructions has loaded
var overBox_start = false; // Checking focus on button start
var overBox_instructions = false; // Checking focus on button instructions
var score = 0; // Game score

var start_screen;
var walls = [];
var vertical_enemies = [];
var horizontal_enemies = [];
var player;
var playerIsMoving = false;

// Initializes the game components from the tilemap.
function initTilemap() {
    for (var i = 0; i< tilemap.length; i++) {
        for (var j =0; j < tilemap[i].length; j++) {
            switch (tilemap[i][j]) {
                case 'w': 
                    walls.push(new Wall(j*20, i*20));
                    break;

                case 'v': 
                    vertical_enemies.push(new Enemy(j*20, i*20, 'vertical'));
                    break;

                case 'h': 
                    horizontal_enemies.push(new Enemy(j*20, i*20, 'horizontal'));
                    break;

                case 'p':
                    player = new Player(j*20, i*20);
                    break;
                // case 'c': coin.draw(j*20, i*20);
                    // break;
            }
        }
    }
}

function draw_walls() {
    for (var i=0; i < walls.length; i++) {
        walls[i].draw();
    }
}

function draw_enemies() {
    for (var i=0; i < vertical_enemies.length; i++) {
        vertical_enemies[i].draw();
        vertical_enemies[i].move();
    }

    for (var i=0; i < horizontal_enemies.length; i++) {
        horizontal_enemies[i].draw();
        horizontal_enemies[i].move();
    }
}

// function draw_prizes() {
//     for (var i=0; i < prizes.length(); i++) {
//         prizes[i].draw();
//     }
// }

function setup() {
    createCanvas(400, 400);
    start_screen = new StartScreen(0,0);
    initTilemap();
}
  
function draw() {
    background(220);

    if (!(game_state || instructions_state))
    {
        start_screen.draw();

        if (mouseX > button1_start_x &&
            mouseY > button1_start_y &&
            mouseX < button1_end_x &&
            mouseY < button1_end_y) {
              
            // Focusing on the start button.
            overBox_start = true;
        }
        else {
            overBox_start = false;
        }

        if (mouseX > button2_start_x &&
            mouseY > button2_start_y &&
            mouseX < button2_end_x &&
            mouseY < button2_end_y) {
              
            // Focusing on the instructions button.
            overBox_instructions = true;
        }
        else {
            overBox_instructions = false;
        }
    }
    else if(instructions_state)
    {   
        textSize(40);
        text('Instructions', 100, 70);
        textSize(20);
        text("1. Move the player with arrow keys", 20, 120);
        text("2. Obtain all the prizes to win", 20, 165);
        text("3. You lose if you hit the enemy", 20, 210);
        text("4. You can pass through the walls", 20, 255);

        rect(115, 285, 150, 75);
        textSize(40);
        text('Return', 127.5, 337.5);

        if (mouseX > 115 &&
            mouseY > 285 &&
            mouseX < 250 &&
            mouseY < 360) {
              
            // Focusing on the instructions button.
            overBox_instructions = false;
        }
        else {
            overBox_instructions = true;
        }
        //exits to start_screen
    }
    else if (game_state)
    {
        background(0);
        // Draws all the components in the game
        draw_walls();
        draw_enemies();
        player.draw();
        player.move();
        // draw_prizes(); 
    }
}

// Checking if the mouse is pressed while the cursor is over the logo i.e. overBox is true.
// If yes, the game is loaded.
function mousePressed() {
    if (overBox_start) {
        game_state = true;
    } else {
        game_state = false;
    }

    if (overBox_instructions) {
        instructions_state = true;
    } else {
        instructions_state = false;
    }
}