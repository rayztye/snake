/* 
    Created on : 01.07.2020, 09:26:56
    Author     : jannikb
*/
$(document).ready(function()
{
    var canvas = $(".battlefield")[0];
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    var food;
    var snake;
    var d = "RIGHT";
    var foodpos;
    
    var gameloop = setInterval(update, 100);
    
    function update()
    {
        if( d == "UP" )
            snake.y --;
        else if( d == "LEFT" )
            snake.x ++;
        else if( d == "DOWN" )
            snake.y ++;
        else if( d == "RIGHT" )
            snake.x --;
        
        check_borders();
        checkfood();
        paint_cell(food.x, food.y, foodpos); // todo: define foodpos (food position)
    }
    
    function showGameOver()
    {
        
    }
    
    function updateHighScore()
    {
        
    }
    
    function placeFood()
    {
        food = {
            x: Math.round(Math.random() * (w-cw) / cw),
            y: Math.round(Math.random() * (h-cw) / cw)
        };
    }
    
    function placeSnake()
    {
        snake = {
            x: Math.round(Math.random() * (w-cw) / cw),
            y: Math.round(Math.random() * (h-cw) / cw)
        };
    }
    
    $(window).on("keydown", function(event){
        switch(event.which)
        {
            case 87 : if( dir != 83 ) { up();   dir = 87; } break; /* w */
            case 65 : if( dir != 68 ) { left(); dir = 65; } break; /* a */
            case 83 : if( dir != 87 ) { down(); dir = 83; } break; /* s */
            case 68 : if( dir != 65 ) {right(); dir = 68; } break; /* d */
        }
    });
});
