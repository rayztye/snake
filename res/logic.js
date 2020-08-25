/* 
    Created on : 01.07.2020, 09:26:56
    Author     : jannikb


      Color:
*/

function game()
{
    /* Color */
    color1 = "#04d9ff";
    color2 = "#faed27";
    color3 = "#00f700";
    color4 = "#39ff14";
    color5 = "#ff073a";
    color6 = "#000000";
    
    $(".startcontent").hide();
    $(".container").show();
    // cnavas stuff
    var canvas = $(".battlefield")[0];
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    // save the cell width in a variable for easy control
    var cw = 25 ;
    var d;
    var food;
    var score;
    var level;
    //create the snake
    var snake_array;

    function init()
    {
        d = "right"; // default direction 
        create_snake();
        create_food();
        // lets display the score
        score = 0;
        level = 1;

        // lets move the snake now using a timer which will trigger the paint function. Every 60ms
        if( typeof game_loop != "undifined" ) clearInterval(game_loop);
        var game_loop = setInterval(paint,100);
    }

    init();

    function create_snake()
    {
        var length = 5;
        snake_array = [];
        for( var i = length-1; i >=0; i-- )
            snake_array.push({x:i, y:0});
    }

    // create the food now
    function create_food()
    {
        food = {
            x: Math.round(Math.random()*(w-cw)/cw),
            y: Math.round(Math.random()*(h-cw)/cw)
        };
    }

    // paint the snake now
    function paint()
    {
        // lets paint the canvas now
        ctx.fillStyle = color6;
        ctx.fillRect(0,0,w,h);
        ctx.strokeStyle = color2; /* border */
        ctx.lineWidth = 4;
        ctx.strokeRect(0,0,w,h);

        if( snake_array.length == 0 )
            create_snake();
        // the movement code for the snake to come here
        var nx = snake_array[0].x;
        var ny = snake_array[0].y;

        switch(d)
        {
            case "up": ny--; break; 
            case "left": nx--; break;
            case "down": ny++; break;
            case "right": nx++; break;
        }

        // this will restart the game if the hits the wall 
        // lets add the code for body collision
        // now if the head of the snake bumps into its body, the game will restart
        if( nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array) )
        {
            // restart the game
            gameover();
        }

        // if the new head position matches with that of the food, create a new head instead of moving the tail
        if( nx == food.x && ny == food.y )
        {
            var tail = {x: nx, y:ny};
            score++;
            $('.score').text("Score: " + score);
            create_food();
        } else {
            var tail = snake_array.pop();
            tail.x = nx; 
            tail.y = ny;
        }
        // the snake can now eat the food

        snake_array.unshift(tail); // puts back tha tail as the first cell

        for( var i = 0; i < snake_array.length; i++ )
        {
            var c = snake_array[i];
            var f = snake_array[0];
            paint_cell(c.x, c.y, color1);
            paint_cell(f.x, f.y, color2);
        }
        // lets paint the food
        paint_cell(food.x, food.y, color4);
        // lets paint the score
        
    }

    // lets first create a generic function to paint cells
    function paint_cell(x,y,color)
    {
        ctx.fillStyle = color;
        ctx.fillRect(x*cw, y*cw, cw, cw);
        ctx.lineWidth = 1;
        ctx.strokeStyle = color6;
        ctx.strokeRect(x*cw, y*cw, cw, cw);
    }

    // this function will check of the provided x/y coordinates exist
    // in a array of cells or not
    function check_collision(x, y, array)
    {
        for( var i = 0; i < array.length; i++ )
        {
            if( array[i].x == x && array[i].y == y )
                return true;
        }
        return false;
    }
    
    function gameover()
    {
        $(".battlefield").hide();
        $(".information").hide();
        $(".errorscreen").show();
        $(".score").text("Score: " + score);
    }
    
    
    $(window).on("keydown", function(event){
        switch(event.which)
        {
            case 87 : if( d!=="down" ) { d = "up";} break; 
            case 65 : if( d!=="right" ) { d = "left";} break;
            case 83 : if( d!=="up" ) { d = "down";} break; 
            case 68 : if( d!=="left" ) { d = "right";} break; 
        }
    });
}
