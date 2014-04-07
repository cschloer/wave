// Firebase dataRef
var myDataRef = new Firebase('https://venxigsb16i.firebaseio-demo.com/');

var canv = document.getElementById('canvas'),
	c = canv.getContext('2d'),
	context = c,
	rowSize = 200,
	columnSize = 200,
	canvasWidth = $("canvas").width(),
	canvasHeight = $("canvas").height();

canv.height = canvasHeight;
canv.width  = canvasWidth;

var radius = canvasWidth/(2*columnSize);

var counter1 = 25;  //counter for first pattern
var counter2 = 0;   //counter for second pattern
var counter3 = 25;  //counter for third pattern
var switch3 = 0;    //switch statements for third pattern
var counter4 = 0;
var switch4 = 1;

var check = 0;

var choose = 1;

var score = 0;
var highScore = 0;

var PAUSE = false;

var offset = 0;
var offsetSwitch = 1;

var mouseX = 0
var mouseY = 0;

// mouse follow circles
var circleRadius = 5;

var background = new Array();

	for(var x = 0; x < columnSize; x++){
		background.push(new Array());
		background[x].push(-1);
		background[x].push(0);
	};

	var whiteBackground = new Array()
		for(var x = 0; x < columnSize; x++){
			whiteBackground.push(new Array());
			whiteBackground[x].push(-1);
			whiteBackground[x].push(0);
	};

	function drawCircle(mouseX, mouseY){

		// Establish the circle path
		context.globalCompositeOperation="lighter"; // setting global composition to "lighter" for circle to shows up from underneith the wave
		context.beginPath();
		context.arc(mouseX, mouseY, circleRadius, 0 , 2 * Math.PI, false);

		// Fill the circle
		context.fillStyle = '00F0FF';
		context.fill();

		// Setting global canvas composition back to default "source-over"
		context.globalCompositeOperation="source-over";
	}
 

	drawBackground = function(x, y, length) {   
		context.beginPath();
		context.rect(x, y, 5, length);
		context.fill();
		context.lineWidth = 0;
		context.stroke();
	}

	updateBoard = function(){
		if(PAUSE){
		   return 0;
	} 

	switch(choose){
		case 1:
			var columnList = pattern1();
			break;
		case 2:
			var columnList = pattern2();
			break;
		case 3:
			var columnList = pattern3();
			break;
		case 4:
			var columnList = pattern4();
	}

	if (offsetSwitch != 0) {        //chance of changing offset switch to normal
		if (Math.random() > 0.8){
			offsetSwitch = 0;
		}
	}

	if (Math.random() > 0.9) { //random to make it positive or negative
		if (Math.random() > 0.5) {
			offsetSwitch = -1;
		} else {
			offsetSwitch = 1;
		}
	}
    
		
    if (columnList[0] == 75 && choose!=3){ //randomize pattern
        if (Math.random() < 0.25){
            choose = 1;
        } else if (Math.random() < .333) {
            choose = 2;
        } else if (Math.random() > .3) {
            choose = 3;
        } else {
            choose = 4;
    	}
    }
    
	if (counter3 > 29) { //move to next switch
		if (Math.random() < 0.33){
			if (switch3 == 2) {
				switch3 = 6;
				counter3 = 0;
			}

			if (switch3 == 4){
				switch3 = 7;
				counter3 = 0;
			}
		}
	}
            
        
    for(var x = 0; x< columnSize; x++) {
                
		whiteBackground[x-1] = whiteBackground[x];
        background[x-1] = background[x];
           
		if (x == columnSize-1) {
			whiteBackground[x-1] = pattern4Helper();
			background[x-1] = columnList;
			
			if (offsetSwitch != 0){
				offset += offsetSwitch;            
			} else if (offset > 0){ //offset is 0
				offset--;
			} else if (offset < 0){
				offset++;
			}
                    
			whiteBackground[x-1][0] += offset;
			background[x-1][0] += offset;
		}
	};
}

pattern1 = function() {
    var column = new Array();
    counter1++;
 
    if (counter1 < 50) {
		column.push(50+counter1);
		column.push(80);
    } else{
        column.push(150-counter1);
        column.push(80);
        
        if (counter1 > 99) {
            counter1 = 0;
        }
    }
    return column;
}

pattern2 = function(){
    var column = new Array()
    counter2++;
 
    if (counter2 < 50) {
		column.push(75-Math.floor(counter2/2))
		column.push(counter2*4+80)
	} else{
		column.push(25+Math.floor(counter2/2));
		column.push(480-counter2*4);
       
        if (counter2 > 99) {
            counter2 = 0;
        }
    }
    return column;
}

pattern3 = function(){
    var column = new Array();
    
    switch (switch3){
            case 0: //middle
                column.push(75);
                column.push(80);
                counter3++;
                if (counter3 > 30){
                    switch3 = 1;
                    counter3 = 0;
                } break;
            
            case 1: //half up
                column.push(25);
                column.push(330);
                counter3++;
                if (counter3 > 30){
                    switch3 = 2;
                    counter3 = 0;
                } break;
            
            case 2: //small top
                column.push(25);
                column.push(100);
                counter3++;
                if (counter3> 30){
                    switch3 = 3;
                    counter3 = 0;
                } break;
            
            case 3: //long
                column.push(25);
                column.push(575);
                counter3++;
                if(counter3 > 30){
                    switch3 = 4;
                    counter3 = 0;
                } break;
            
            case 4://small bottom
                column.push(120);
                column.push(100);
                counter3++;
                if(counter3> 30){
                    switch3 = 5;
                    counter3 = 0;
                } break;
			
            case 5://long
                column.push(25);
                column.push(575);
                counter3++;
                if(counter3 > 30){
                    switch3 = 2;
                    counter3 = 0;
                } break;
            
            case 6: //even up, top
                column.push(25);
                column.push(330);
                counter3++;
                if (counter3 > 30){
                    choose = 2;
                    switch3 = 0;
					
					if (Math.random() < 0.5){
						choose = 1;
                    } else  {
                        	choose = 2;
					}
                } break;
            
             case 7: //even up, bottom
                column.push(75);
                column.push(325);
                counter3++;
                if (counter3 > 30){
                    choose = 2;
                    switch3 = 0;
                    counter3 = 0;
					 if (Math.random() > 0.5){
						 choose = 1;
						} else {
							choose = 2;
						}
				} break;
}
    return column;
}

pattern4 = function(){
    var column = new Array()

    counter4++;
 
    if (counter4 < 100) {
    column.push(75-Math.floor(counter4/2));
    column.push(counter4*4+80);
        } else if (switch4) {
            column.push(25);
            column.push(480);
            if (counter4 > 300) {
                if (Math.random() < .75) {
                    switch4 = 0;
                }
                counter4 = 99;       
            }
		} else {    
			column.push(-25+Math.floor(counter4/2))
			column.push(880-(counter4)*4)

				if (counter4 > 199) { 
					counter4 = 0 
					switch4 = 1

				}
    	}
    
	return column;    
} // end pattern4

pattern4Helper = function() {
    
    var column = new Array()
    if (counter4 < 50) {
        column.push(-1);
        column.push(0);
    }
    
    else if (counter4 < 100) {
		column.push(75-Math.floor(counter4/2)+30);
		column.push(counter4*4-200);
    } else if (switch4) {
		column.push(55);
		column.push(200);
    } else {
        if (counter4 > 150) {
			column.push(-1);
			column.push(0);
        }
        column.push(5 +Math.floor(counter4/2));
        column.push(600-counter4*4);
    }
    return column;
} // end patter4Helper


drawPieces = function(){
    
    if (PAUSE) {
        return 0;        
    }
   
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    
    highScoreDisplay();
    
	if(check == 0){
        score-= score;
        context.fillStyle = "red";
        scoreDisplay();
    } else {
        score++;
        context.fillStyle = "black";
        scoreDisplay();
    }
    if (score > highScore){
        highScore = score;
    }
    context.fillStyle = "black";
  
    for(var x = 0; x<rowSize; x++){
        context.fillStyle = "#E6E6FA";
        context.strokeStyle = "#E6E6FA";
        drawBackground(x*radius*2+radius, background[x][0]*radius*2+radius, background[x][1]);
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = "#FFFFFF";
        drawBackground(x*radius*2+radius, whiteBackground[x][0]*radius*2+radius, whiteBackground[x][1]);
	}
}


run = function(){
    var pixelData = canvas.getContext('2d').getImageData(mouseX, mouseY, 1, 1).data;
   
    var mouseR = pixelData[0];
    var mouseG = pixelData[1];
    var mouseB = pixelData[2];
 
    if(mouseR!=230 && mouseG!=230 && mouseB !=250){
        check=0;
	} else{
        check = 1;
    }
    
	drawPieces();
	updateBoard();
	context.fillStyle = "black";
	highScoreDisplay();
	drawCircle(mouseX, mouseY);
}

function highScoreDisplay(){
    context.font = "bold 90px Arial";
    context.fillText(Math.floor((highScore/5)), 850, 90);
}

function scoreDisplay(){
    context.font = "bold 90px Arial";
    context.fillText(Math.floor((score/5)), 40, 90);
}


main = function(){
	setInterval(run, 15);
}


window.onkeypress = function(evt) {
    console.log('pressed');
    
    if (evt.keyCode == 32) {
		PAUSE = !PAUSE;
    }
}

canvas.onmousemove = function(e){

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    } else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}

window.onload = main;