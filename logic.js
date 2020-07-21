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
    // define level properties
    var level = function (cols, rows, width, height)
    {
        this.columns = cols;
        this.rows = rows;
        this.tilewidth = width;
        this.tileheight = height;
    };
    
    // initialize battelfield array
    this.tile = [];
    for( var i = 0; i < this.columns; i++ )
    {
       this.tile[i] = [];
       for( var j = 0; j < this.rows; j++ )
            this.tile[i][j] = 0; 
    }
    
    // greate a default level
    level.prototype.generate = function()
    {
        for( var i = 0; i < this.columns; i++ )
        {
            for( var j = 0; j < this.columns; j++ )
            {
                if( i == 0 || i == this.columns - 1 || j == 0 || j == this.rows - 1 )
                {
                    // add wals at the edge of the level
                    this.tiles[i][j] = 1;
                }else{
                    // add empty space
                    this.tiles[i][j] = 0;
                }
            }
        }
    };
    
    // greate the snake 
    var snake = function()
    {
        this.init(0,0,1,10,1);
    };
    
    // direction table: up, right, down, left
    snake.prototype.direction = [[0,-1][1,0][0,1][-1,0]];
    
    // initialize the snake at a location
    snake.prototype.init = function(x,y, direction, speed, numsegments)
    {
        this.x = x;
        this.y = y;
        this.direction = direction; // up, right, down, left
        this.speed = speed;         // movement speed in blocks per second
        this.movedelay = 0;
        
        // reset the segments and add new ones
        this.segments = [];
        this.growsegments = 0;
        for( var i = 0; i < numsegments; i++ )
        {
            this.segments.push({x:this.x - i*this.direction[direction][0],
                                y:this.y - i*this.direction[direction][1]});
        }
    };
    
    // increase the segment count
    snake.prototype.grow = function()
        this.growsegments++;
      
    // check we are allowed to move
    snake.prototype.trymove = function(dt)
    {
        this.movedelay += dt;
        var maxmovedelay = 1 / this.speed;
        if( this.movedelay > maxmovedelay )
            return true;
        return false;
    };
    
    // move the snake in the direction
    snake.prototype.move = function()
    {
        // get the next moce and modify the position
        var nextmove = this.nextmove();
        this.x = nextmove.x;
        this.y = nextmove.y;
        
        // get the position of the last segment
        var lastseg = this.segments[this.segments.length - 1];
        var growx = lastseg.x;
        var growy = lastseg.y;
        
        // move segments to the position of the previous segment
        for( var i = this.segments.length - 1; i>=1; i-- )
        {
            this.segments[i].x = this.segments[i-1].x;
            this.segments[i].y = this.segments[i-1].y;
        }
        
        // grow a segment if needed
        if( this.growsegments > 0 )
        {
            this.segments.push({x:growx, y:growy});
            this.segmetns--;
        }
        
        // move the first segment
        this.segments[0].x = this.x;
        this.segments[0].y = this.y;
        
        // reset movedelay
        this.movedelay = 0;
    };
    
    // draw  the snake
    function drawsnake()
    {
        // loop over every snake segment
        for( var i = 0; i < snake.segments.lenght; i++ )
        {
            var segment = snake.segments[i];
            var segx = segment.x;
            var segy = segment.y;
            var tilex = segx.level.tilewidth;
            var tiley = segy.level.tileheight;
            
            // sprite ncolumn and row that gets calculated
            var tx = 0;
            var ty = 0;
            
            if( i == 0 )
            {
                // head; determine the correct image
                var nseg = snake.segments[i+1]; // next segment
                if( segy < nseg.y )     { tx = 3; ty = 0;} // UP
                else if(segx > nseg.x)  { tx = 4; ty = 0;} // RIGHT
                else if(segy > nseg.y)  { tx = 4; ty = 1;} // DOWN
                else if(segy < nseg.x)  { tx = 3; ty = 1;} // LEFT
            }
            else if(i == snake.segments.lenght - 1)
            {
                // tail; determine the correct image
                var pseg = snake.segments[i-1]; // previous segment
                if( pegy < segy )       { tx = 3; ty = 2;}// UP
                else if( pseg.x > segx ){tx = 4; ty = 2;} // RIGHT
                else if( pseg.y > segy ){tx = 4; ty = 3;} // DOWN
                else if( pseg.x < segx ){tx = 3; ty = 3;} // LEFT
            } else {
                // body; determine the correct image
                var pseg = snake.segments[i-1]; // previous segment
                var nseg = snake.segments[i+1]; // next segment
                if( pseg.x < segx && nseg.x > segx || nseg.x < segx && pseg.x > segx )      { tx = 1; ty = 0; } // horizontal left-right
                 else if (pseg.x < segx && nseg.y > segy || nseg.x < segx && pseg.y > segy) { tx = 2; ty = 0; } // angle Left-Down
                 else if (pseg.y < segy && nseg.y > segy || nseg.y < segy && pseg.y > segy) { tx = 2; ty = 1; } // vertical up-down
                 else if (pseg.y < segy && nseg.x < segx || nseg.y < segy && pseg.x < segx) { tx = 2; ty = 2; } // angle top-left
                 else if (pseg.x > segx && nseg.y < segy || nseg.x > segx && pseg.y < segy) { tx = 0; ty = 1; } // angle right-up
                 else if (pseg.y > segy && nseg.x > segx || nseg.y > segy && pseg.x > segx) { tx = 0; ty = 0; } // angle down-right
        }
        
        // draw the image of the snake part
        context.drawImage(tileimage, tx*50, ty*50, 50, 50, tilex, tiley. level.tilewidth, level.tileheight);
    };
    
    var snake = new snake();
    var level = new level(80,40,25,25); // cols, rows, width, height
    
    // variables
    var score = 0;
    var gameover = true;
    var gameovertime = 1;
    var gameoderdelay = 0.5;
    
    // (...)
    
    function newgame()
    {
        // initialize the snake
        snake.init(10,10,1,10,4); // x,y, direction, speed, numsegments
        
        // generate the default level
        level.generate();
        
        // add an apple
        addfood();
        
        // initialize the score
        score = 0;
        
        // initialize variables
        gameover = false;
    }
    
    function addfood()
    {
        
    }
});
