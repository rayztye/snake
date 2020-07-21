/*
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
*/
/* 
    Created on : 01.07.2020, 09:26:56
    Author     : jannikb
*/
$(document).ready(function()
{
    var bf = {width:80, height: 40, fieldsize: 50};
    var sc = 0;
    var food = $(".food");
    var score = $(".score");
    var snake = $(".snake");
//    var pos = $(".position");
    var battlefield = $(".battlefield").width(bf.width*bf.fieldsize).height(bf.height*bf.fieldsize);
    var coords = [$(".snake.first"),$(".snake.mid"),$(".snake.last")];
    var snake = coords[0];
    var dx = 0,dy = 0, dir = 0;
    var time = 300;
    var c = 0;
    
    $(".snake.mid").removeClass('mid');
    var init = coords[1].position();
    coords[1].css({left: init.left-50 });
    coords[2].css({left: init.left-100 });
    
    $(window).on("keydown", function(event){
        switch(event.which)
        {
            case 87 : if( dir != 83 ) { up();   dir = 87; } break; /* w */
            case 65 : if( dir != 68 ) { left(); dir = 65; } break; /* a */
            case 83 : if( dir != 87 ) { down(); dir = 83; } break; /* s */
            case 68 : if( dir != 65 ) {right(); dir = 68; } break; /* d */
        }
    });
    
    function up()   
    {
        dx = 0;
        dy = -50;
        snake.css("background-position", "-150px 0");
    }
    
    function left() 
    { 
        dx = -50; 
        dy = 0;  
        snake.css("background-position", "-150px -50px"); 
    }
    
    function down() 
    { 
        dx = 0;   
        dy = 50; 
        snake.css("background-position", "-200px -50px"); 
    }
    
    function right()
    { 
        dx = 50;  
        dy = 0;  
        snake.css("background-position", "-200px 0");
    }
    
    function heartbeat()
    {
        if( move(dx,dy) )
            setTimeout(heartbeat, time);
    }
    
    function move(dx,dy)
    {
        if( dx == 0 && dy == 0 )
            return true;
        
        $('.snake').removeClass('first last');
        
        var position  = snake.position();
        var snakeleft = position.left + dx; 
        var snaketop  = position.top + dy;
    
        // if snake in battlefield
        if( position.left <= battlefield.width()-40 && position.top <= battlefield.height()-40 && position.left >= 0 && position.top >= 0 )
        { 
            for( var i = 0; i < coords.length; i++ )
            {
                var segpos = coords[i].position();
                if( segpos.left == snakeleft && segpos.top == snaketop )
                    return HIT(); 
            }
            var foodpos = food.position();
            if( foodpos.left == snakeleft && foodpos.top == snaketop )
            {
                time -= 10;
                sc ++;
                grow(position);
                setFood();
            }
            snake = coords.pop();
            coords.unshift(snake);
            // add new position to the snake
            snake.css({left: snakeleft, top: snaketop});
            
//            pos.html("Position x: " + snakeleft/10 + "<br/> Position y: " + snaketop/10);
        }
        else
        {
            return HIT();
        }
        // set the head and the tail to the snake
        coords[0].addClass('first');
        c = coords.length - 1;
        if( c > 0 )
            coords[c].addClass('last');
        
        return true;
    }
    
    function HIT()
    {
        // if you lose, show the alert and restart
        alert("Your Highscore: " + sc);
        
        location.reload();
        return false;
    }
    
    function grow(pos)
    {
        var seg = snake.clone().css(pos).appendTo(battlefield); //.css("background-color", "red")
        coords.push(seg);
        score.html("Score: "+ sc);
    }
    
    function setFood()
    {
        // take the x and y coords and make math, and then you have the coords of a burger
        var divide = 50;
        var y = Math.round((battlefield.height() - 40) / divide);
        var x = Math.round((battlefield.width() - 40) / divide);
        
        var foodleft = Math.round(Math.random()* x )*divide;
        var foodtop  = Math.round(Math.random()* y )*divide;
//        console.log(x,y);
//        console.log("foodleft: " + foodleft + " foodtop: " + foodtop);

        food.css({
        left: foodleft,
        top:  foodtop
        });
    }
    
    setTimeout(heartbeat,1000);
});
