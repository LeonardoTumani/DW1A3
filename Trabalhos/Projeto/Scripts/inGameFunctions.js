/* How many miliseconds it takes the game to update and try spawning
   a new wasp */
var gameUpdateMs = 10

/* Defines how much the player will bounce after hitting the ground
   and how hard it is to lift off */
var groundHardness = 2

// Bee health points
var beeHP = 5



var score = 0
var scoreToEarn
var scoreShown
var scoreText = document.getElementById('score')

var hpBar = document.getElementById('hp-bar')

function updateScore() {
    scoreToEarn = 100 / (screenHeight * 1.5)
    score += scoreToEarn
    scoreShown = Math.floor(score)

    scoreText.textContent = 'Score: ' + scoreShown
}

var collisionWasp
var collisionWaspID
var collisionWaspRect

var topCollisionOffset = 10
var bottomCollisionOffset = 10
var leftCollisionOffset = 5
var rightCollisionOffset = 5

function detectCollision() {
    howManyWasps = arrayWasps.length

    for (ic = 0; ic < howManyWasps; ic++) {
        collisionWasp = document.getElementById(arrayWasps[ic])
        collisionWaspID = collisionWasp.id

        collisionWaspRect = collisionWasp.getBoundingClientRect()

        var collisionX = (beeRect.left + leftCollisionOffset <= collisionWaspRect.left + collisionWaspRect.width - leftCollisionOffset) && (beeRect.left + beeRect.width - rightCollisionOffset >= collisionWaspRect.left + rightCollisionOffset);
        var collisionY = (beeRect.top + topCollisionOffset <= collisionWaspRect.top + collisionWaspRect.height - topCollisionOffset) && (beeRect.top + beeRect.height - bottomCollisionOffset >= collisionWaspRect.top + bottomCollisionOffset);

        if (collisionX && collisionY) {
            collisionWasp.src = angryWaspImageSource
            
            beeHP--
            beeHP = Math.max(beeHP, 0)

            hpBarImageSource = './Components/images/hp/' + beeHP + '.png'
            hpBar.src = hpBarImageSource
        }

        if (beeHP < 1) {
            bee.src = sadBeeImageSource
            gameOver()
        }
    }
}

var fpsCounter = document.getElementById('fps-counter')

function calculateFPS() {
    var prevTime = Date.now()
    var frames = 0

    requestAnimationFrame(function loop() {
        var time = Date.now()
        frames++

        if (time > prevTime + 1000) {
            var fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) )
            prevTime = time
            frames = 0

            fpsCounter.textContent = 'FPS: ' + Math.round(fps / 5) * 5
        }

        requestAnimationFrame(loop)
    })
}

var degree
var spriteRotateTransition = false

function rotateSprite(element, elementSpeedY) {
    if (qualityOnSwitch == true) {
        degree = Math.atan(elementSpeedY) * (180 / Math.PI)
        degree = Math.floor(degree * -1) / 8

        element.style.transform = 'rotate(' + degree + 'deg)'
    } else {
        element.style.transform = 'rotate(0deg)'
        spriteRotateTransition = false
    }
}