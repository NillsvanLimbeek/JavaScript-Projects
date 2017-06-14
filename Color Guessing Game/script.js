var colorsNum = 6;
var colors = [];
var square = document.querySelectorAll(".square");
var clickedColor;
var pickedColor;
var random = Math.floor(Math.random() * colorsNum);
var gamePlaying;
var buttons = document.querySelectorAll(".btn");
var resetButton = document.querySelector(".reset-button");
var h2 = document.querySelector("h2");
var h1 = document.querySelector("h1");

init();

function init() {
    colors = generateColors(colorsNum);
    assignColors();
    randomPickedColor();
    setSquares();
}

//EventListener for squares
square.forEach(function(square) {
    square.addEventListener("click", function() {
        clickedColor = (this.style.backgroundColor);
        return clickedColor;
    });
    
    square.addEventListener("mouseover", mouseOver);
    square.addEventListener("mouseout", mouseOut);
});

function mouseOver() {this.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.7";}
function mouseOut() {this.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0";}

//Random Color
function generateColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    
    var color = ("rgb(" + r + ", " + g + ", " + b + ")");
    return color;
}

//Push colors into array
function generateColors(num) {
    var arr = [];
    
    for (var i = 0; i < num; i++) {
        arr.push(generateColor());
    }
    
    return arr;
}

//Assign random colors to squares
function assignColors() {
    for (var i = 0; i < colors.length; i++) {
        square[i].style.backgroundColor = colors[i];
    }
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//Choose rightColor, change h2 to rightColor
function randomPickedColor() {
    pickedColor = pickColor();
    h2.textContent = pickColor();
    return pickedColor;
}

//Clicking the Squares
square.forEach(function(square) {
    square.addEventListener("click", function() {
        if(clickedColor === pickedColor) {
            h1.textContent = "Correct!";
            h1.style.color = pickedColor;
            h2.style.color = pickedColor;
            changeColor();
            removeMouseEvent();
        } else {
            h1.textContent = "Try Again";
            square.style.backgroundColor = "#e5e5e5";
            square.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0";
            square.removeEventListener("mouseover", mouseOver);
            square.removeEventListener("mouseout", mouseOut);
        }
    });
});

//All squares to the correcColor
function changeColor() {
    square.forEach(function(square) {
        square.style.backgroundColor = clickedColor;    
    });
}

//Remove all mouseEvents
function removeMouseEvent() {
    square.forEach(function(square) {
        square.removeEventListener("mouseover", mouseOver);   
    });
}

//Set correct number of squares
function setSquares() {
    for(var i = 0; i < square.length; i++) {
        if (colors[i]) {
            square[i].style.display = "block";
            square[i].style.backgroundColor = colors[i];
        } else {
            square[i].style.display = "none";
        }
    }   
}

//Assign correct button classes
buttons.forEach(function(buttons) {
    buttons.addEventListener("click", function() {
        removeButtonClass();
        this.classList.add("active");
    });
});

function removeButtonClass() {
    buttons.forEach(function(buttons) {
        buttons.classList.remove("active");    
    }); 
}

//Reset the game
resetButton.addEventListener("click", function() {
    colors = generateColors(colorsNum);
    assignColors();
    randomPickedColor();
    setSquares();
    h1.textContent = "Choose the correct color";
    h1.style.color = "#000";
    h2.style.color = "#000";
});

//Change game diffifulty
buttons.forEach(function(buttons) {
    buttons.addEventListener("click", function() {
        var mode = this.dataset.btn;
        if (mode === "easy") {
            colorsNum = 3;
            colors = generateColors(colorsNum);
            assignColors();
            randomPickedColor();
            setSquares();
            h1.textContent = "Choose the correct color";
            h1.style.color = "#000";
            h2.style.color = "#000";
        } else if (mode === "medium") {
            colorsNum = 6;
            colors = generateColors(colorsNum);
            assignColors();
            randomPickedColor();
            setSquares();
            h1.textContent = "Choose the correct color";
            h1.style.color = "#000";
            h2.style.color = "#000";    
        } else {
            colorsNum = 9;
            colors = generateColors(colorsNum);
            assignColors();
            randomPickedColor();
            setSquares();
            h1.textContent = "Choose the correct color";
            h1.style.color = "#000";
            h2.style.color = "#000";    
        }
    });    
});























