window.addEventListener("keydown", playSound);

function playSound(e) {
    var key = document.querySelector("div[data-key=\"" + e.keyCode + "\"]");
    var audio = document.querySelector("audio[data-key=\"" + e.keyCode + "\"]");
    
    key.classList.add("playing");
    audio.currentTime = 0;
    audio.play();
}

var keys = document.querySelectorAll(".key");

keys.forEach(function(keys) {
    keys.addEventListener("transitionend", removeTransistion);
});

function removeTransistion(e) {
    if (e.propertyName !== "transform") {return;}
    this.classList.remove("playing");
}