/* How many miliseconds it takes the game to update and try spawning
   a new wasp */
var gameUpdateMs = 10

/* Defines how much the player will bounce after hitting the ground
   and how hard it is to lift off */
var groundHardness = 2



var score = 0
var scoreToEarn
var scoreShown
var scoreText = document.getElementById('score')

function updateScore() {
    scoreToEarn = 100 / (screenHeight * 1.5)
    score += scoreToEarn
    scoreShown = Math.floor(score)

    scoreText.textContent = 'Score: ' + scoreShown
}

var topCollisionOffset = 20
var bottomCollisionOffset = 20
var leftCollisionOffset = 15
var rightCollisionOffset = 15
var currentWaspRect

function detectCollision() {
    for (ic = 0; ic < howManyWasps; ic++) {
        currentWasp = document.getElementById(arrayWasps[ic])
        currentWaspID = currentWasp.id

        currentWaspRect = currentWasp.getBoundingClientRect()

        var collisionX = (beeRect.left <= currentWaspRect.left + currentWaspRect.width - leftCollisionOffset) && (beeRect.left + beeRect.width - rightCollisionOffset >= currentWaspRect.left);
        var collisionY = (beeRect.top <= currentWaspRect.top + currentWaspRect.height - topCollisionOffset) && (beeRect.top + beeRect.height - bottomCollisionOffset >= currentWaspRect.top);

        if (collisionX && collisionY) {
            currentWasp.src = './Components/images/angry-wasp-gif.gif'
            bee.src = './Components/images/sad-bee-gif.gif'
            gameOver()
        }
    }
}
