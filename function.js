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
    var sc          = 1;
    var food        = $(".food");
    var score       = $(".score");
    var snake       = $(".snake");
//    var pos         = $(".position");
    var battlefield = $(".battlefield");
    var coords      = [$(".snake")];
    var snake       = coords[0];
    var dx = 0,dy   = 0;
    var time        = 300;
    var c           = 0;
    
    $(window).on("keydown", function(event){
        switch(event.which)
        {
            case 87 : up();     break; /* w */
            case 65 : left();   break; /* a */
            case 83 : down();   break; /* s */
            case 68 : right();  break; /* d */
        }
    });
    
    function up()   { dx = 0;   dy = -50; }
    function left() { dx = -50; dy = 0;   }
    function down() { dx = 0;   dy = 50;  }
    function right(){ dx = 50;  dy = 0;   }
    
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
