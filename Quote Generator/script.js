var quoteArr = [[["Who wishes to fight must first count the cost"], ["Sun Tzu"]], 
                [["He will win who knows when to fight and when not to fight"], ["Sun Tzu"]], 
                [["The greatest victory is that which requires no battle"], ["Sun Tzu"]], 
                [["Appear weak when you are strong, and strong when you are weak"], ["Sun Tzu"]],
                [["Opportunities multiply as they are seized"], ["Sun Tzu"]],
                [["Always do right. This will gratify some people and astonish the rest"], ["Mark Twain"]],
                [["Courage is resistance to fear, mastery of fear - not absence of fear"], ["Mark Twain"]],
                [["I have never let my schooling interfere with my education"], ["Mark Twain"]],
                [["The worst loneliness is not to be comfortable with yourself"], ["Mark Twain"]],
                [["When in doubt, tell the truth"], ["Mark Twain"]],
                [["Train yourself to let go of everything you fear to lose"], ["Master Yoda"]],
                [["In a dark place we find ourselves, and a little more knowledge lights our way"], ["Master Yoda"]],
                [["Many of the truths that we cling to depend on our point of view"], ["Master Yoda"]],
                [["Do or do not. There is no try"], ["Master Yoda"]],
                [["Ohhh. Great warrior. Wars not make one great."], ["Master Yoda"]],
                [["Oh the things you can find, if you don’t stay behind!"], ["Dr. Seuss"]],
                [["Why fit in when you were born to stand out?"], ["Dr. Seuss"]],
                [["Sometimes you will never know the value of a moment, until it becomes a memory"], ["Dr. Seuss"]],
                [["Today you are you, that is truer than true. There is no one alive who is youer than you"], ["Dr. Seuss"]],
                [["A person’s a person, no matter how small"], ["Dr. Seuss"]],
                [["Never assume that loud is strong and quiet is weak"], ["Unknown"]],
                [["The cave you fear to enter holds the treasure you seek"], ["Joseph Campbell"]],
                [["Where you stumble and fall, there you will find gold"], ["Joseph Campbell"]],
                [["Not all those who wander are lost"], ["J.J.R. Tolkien"]],
                [["Little by little, one travels far"], ["J.J.R. Tolkien"]],
                [["You can only come to the morning through the shadows"], ["J.R.R. Tolkien"]]
               ];

var randomNum = 0;

var twitterBtn = document.querySelector(".fa-twitter");
var quoteText = document.querySelector(".text");
var authorText = document.querySelector(".author");
var nextBtn = document.querySelector(".fa-refresh");

quote = quoteArr[randomNum][0];
author = quoteArr[randomNum][1];

quoteText.textContent = quote;
authorText.textContent = author;

nextBtn.addEventListener("click", function() {
    fade();
    setTimeout(newQuote, 2000);
    setTimeout(fade, 2000);
});

//Fade Out & Fade In
function fade() {
    quoteText.classList.toggle("fade-out");
    authorText.classList.toggle("fade-out");
}

//Generate New Quote
function newQuote() {
    randomNum = Math.floor(Math.random() * quoteArr.length);
    
    quote = quoteArr[randomNum][0];
    author = quoteArr[randomNum][1];
    
    quoteText.textContent = quote;
    authorText.textContent = author;
}

//Post to Twitter
twitterBtn.addEventListener("click", function() {
    var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + quote + '" -' + author);
    window.open(url);
});