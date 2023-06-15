addEventListener("DOMContentLoaded", setScreen)

// Elements of the game
var bee = document.getElementById('bee')
var screen = document.getElementById('screen')

// Player dimensions
var beeHeight = 50
var beeWidth = 50

// Movement variables
    // Player's vertical position
    var beeY

    // Player's vertical speed
    var beeSpeedY = 0

    // Speed at which the player ascends and descends
    var upSpeed = 7
    var downSpeed = upSpeed / 35

    // Maximum speed the player can achieve
    var maxSpeed = upSpeed
    var minSpeed = -10

/* How many miliseconds it takes the game to update and try spawning
   a new wasp */
var gameUpdateMs = 10
var randSpawnMs = 10

/* Defines how much the player will bounce after hitting the ground
   and how hard it is to lift off */
var groundHardness = 2





                        // GAME SETUP AREA

// Detect player click
document.addEventListener('mousedown', (e) => {
    if (e.repeat) return
    beeSpeedY = upSpeed
})

var screenHeight
var screenWidth
var screenOffsetTop
var screenTop
var screenBottom

var positionX = 0

function adjustScreen() {
    screenHeight = screen.clientHeight
    screenWidth = screen.clientWidth
    screenOffsetTop = 10
    screenTop = screenHeight - beeHeight + screenOffsetTop
    screenBottom = -4

    positionX -= 2
    screen.style.backgroundPosition = positionX + 'px 0px'
}

var gameReset = false

function setScreen() {
    adjustScreen()

    bee.style.left = '50px'
    bee.style.bottom = screenBottom + 'px'
    beeY = screenBottom
}

var gameUpdateIntervalID

// Start game
function startGame() {
    setScreen()
    
    if (gameReset == false) {
        document.querySelector('.start-screen').classList.remove('active')
    } else {
        despawnAllWasps()
        score = 0
        document.querySelector('.restart-screen').classList.remove('active')
    }

    gameReset = true
    gameUpdateIntervalID = setInterval(gameUpdate, gameUpdateMs)
}

function gameUpdate() {
    adjustScreen()
    updateScore()
    movePlayer()
    spawnWasp()
    moveWasps()
    detectCollision()
}

function gameOver() {
    clearInterval(gameUpdateIntervalID)
    document.querySelector('.restart-screen').classList.add('active')
}





                        // GAME FUNCTIONS

var score = 0
var scoreToEarn
var scoreShown
var scoreText = document.getElementById('score')
var restartScoreText = document.getElementById('restart-score')

// Update score
function updateScore() {
    scoreToEarn = 100 / (screenHeight * 1.5)
    score += scoreToEarn
    scoreShown = Math.floor(score)

    scoreText.textContent = 'Score: ' + scoreShown
    restartScoreText.textContent = 'Your score: ' + scoreShown
}

                    // Player game functions

function movePlayer() {
    limitSpeed()
    limitPosition()
    updateCoordinates()
}

function limitSpeed() {
    if (beeSpeedY > maxSpeed) { beeSpeedY = maxSpeed } 
    else if (beeSpeedY < minSpeed) { beeSpeedY = minSpeed }

    if (hitTop()) { beeSpeedY = 0 }
    if (hitBottom()) { beeSpeedY = (beeSpeedY * -1) / groundHardness }

    beeSpeedY -= downSpeed
}

// Detect player collision with the top or bottom of the screen
function hitTop() { if (beeY >= screenTop) {return true} }
function hitBottom() { if (beeY <= screenBottom) {return true} }

// Limit the player's position to the screen size
function limitPosition() {
    beeY = beeY + beeSpeedY
    beeY = Math.min(screenTop, Math.max(screenBottom, beeY))
    bee.style.bottom = beeY + 'px'
}

// The player's borders coordinates
var beeRect

function updateCoordinates() {
    beeRect = bee.getBoundingClientRect()
}



                    // Wasps game functions

// Random numbers
var randSpawn
var randPosition
var randWaspSize
var randWaspSpeedX

// IDs of the spawned and despawned wasps
var spawnedWasp
var spawnedWaspID
var spawnedWaspSize
var spawnedWaspSpeedX
var despawnedWasp
var despawnedWaspID

// Wasp counting variables
var arrayWasps = []
var dictWaspSpeed = {}
var dictWaspSize = {}
var i = 0
var howManyWasps = 0
var waspCounter = 0

var waspSizeVariation = 20
var waspMaxQuantity = 60
var waspMaxSpeed = 8
var waspMinSpeed = 4

function spawnWasp() {
    // Iteration counter
    i += 1

    // Random chance of spawning a new wasp
    if (i >= randSpawnMs) {
        randSpawn = Math.floor(Math.random() * 2) + 1
        i = 0
    }

    if (randSpawn == 1) {
        randSpawn = 0
        waspCounter += 1

        howManyWasps = arrayWasps.length

        // Despawn the first wasp in the array if there are more wasps than the specified number
        if (howManyWasps >= waspMaxQuantity) {
            despawnedWasp = document.getElementById(arrayWasps[0])
            despawnedWaspID = despawnedWasp.id

            // Delete the wasp from the array
            arrayWasps.shift()
            howManyWasps = arrayWasps.length

            // Delete the wasp from the wasp properties' dictionary
            delete dictWaspSpeed[despawnedWaspID]
            delete dictWaspSize[despawnedWaspID]

            // Remove the wasp from the screen
            screen.removeChild(despawnedWasp)
        }

        // Spawn next wasp
        spawnedWasp = document.createElement("img")
        spawnedWasp.src = "./Components/images/wasp.png"
        spawnedWasp.className = 'wasp'
        spawnedWaspID = spawnedWasp.id = 'wasp' + waspCounter

        // Set spawned wasp size and speed 
        randWaspSize = Math.floor(Math.random() * (waspSizeVariation * 2)) + 0
        spawnedWaspSize = spawnedWasp.style.width = beeWidth - waspSizeVariation + randWaspSize + 'px'

        spawnedWaspSpeedX = randWaspSpeedX = Math.floor(Math.random() * waspMaxSpeed) + waspMinSpeed

        // Set spawned wasp position
        screen.appendChild(spawnedWasp)
        spawnedWasp.style.left = screenWidth + 100 + 'px'

        randPosition = Math.floor(Math.random() * (screenTop - (waspSizeVariation)) + screenBottom)
        spawnedWasp.style.bottom = randPosition + 'px'

        // Add spawned wasp to the array
        arrayWasps.push(spawnedWaspID)
        howManyWasps = arrayWasps.length

        // Add spawned wasp to the wasp properties' dictionary
        dictWaspSpeed[spawnedWaspID] = spawnedWaspSpeedX
        dictWaspSize[spawnedWaspID] = spawnedWaspSize
    }
}

function despawnAllWasps() {
    while (howManyWasps >= 1) {
        deletedWasp = document.getElementById(arrayWasps[0])
        deletedWaspID = deletedWasp.id

        // Delete the wasp from the array
        arrayWasps.shift()
        howManyWasps = arrayWasps.length

        // Delete the wasp from the wasp properties' dictionary
        delete dictWaspSpeed[deletedWaspID]
        delete dictWaspSize[deletedWaspID]

        // Remove the wasp from the screen
        screen.removeChild(deletedWasp)
    }
}

// The current iteration's wasp's properties 
var currentWaspSpeedX
var currentWasp
var currentWaspID
var currentWaspX

function moveWasps() {
    for (im = 0; im < howManyWasps; im++) {
        currentWasp = document.getElementById(arrayWasps[im])
        currentWaspID = currentWasp.id

        currentWaspSpeedX = dictWaspSpeed[currentWaspID]
        currentWaspX = currentWasp.offsetLeft - currentWaspSpeedX
        currentWasp.style.left = currentWaspX + 'px'
    }
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

        if (collisionX && collisionY) { gameOver() }
    }
}
