cross = true;
score = 0;
audioMain = new Audio('music.mp3');
audioGO = new Audio('gameover.mp3');
setTimeout(() => {
    audioMain.play();
}, 1000);
document.onkeydown = function (e) {
    console.log("Keydown: " + e.keyCode);
    if (e.keyCode == 32) {
        dino = document.querySelector('.dino');
        console.log("hhhh");
        dino.classList.add('animateDino');
        console.log("hhhh2");
        setTimeout(() => {
            dino.classList.remove('animateDino');
            console.log("hhhh3");
        }, 800);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        console.log("hhhh");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 80) + 'px';
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        console.log("hhhh");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 80) + 'px';
    }
};

setInterval(() => {
    dino = document.querySelector('.dino');
    dragon = document.querySelector('.dragon');
    gameOver = document.querySelector('.gameOver');
    gameScore = document.querySelector('.gameScore');
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));
    ox = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('bottom'));
    OffX = Math.abs(dx - ox);
    OffY = Math.abs(dy - oy);
    console.log(OffX + " " + OffY);
    if (OffX < 135 && OffY < 75) {
        gameOver.innerHTML = 'Game Over. Reload to play again.';
        dragon.classList.remove('animateDragon');
        
        audioMain.pause();
        audioGO.play();
        setTimeout(() => {
            audioGO.pause();
        }, 1000);
    }
    else if (OffX < 105 && cross == true) {
        score += 1;
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        updateScore(score);

        setTimeout(() => {
            duration = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue('animation-duration'));
            duration -= 0.1;
            dragon.style.animationDuration = duration + 's';
        }, 1000);
    }

}, 50);

function updateScore(score) {
    gameScore.innerHTML = "Your score is: " + score;
}