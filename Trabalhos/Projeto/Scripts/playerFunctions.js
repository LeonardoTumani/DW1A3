var bee = document.getElementById('bee')

// Player dimensions
var beeHeight = 50
var beeWidth = 50

// Movement variables
    // Player's vertical position
    var beeY
    var beeX = 50

    // Player's vertical speed
    var beeSpeedY = 0

    // Speed at which the player ascends and descends
    var upSpeed = 7
    var downSpeed = upSpeed / 35

    // Maximum speed the player can achieve
    var maxSpeed = upSpeed
    var minSpeed = -10
    
    var beeMaxHP = 10

// Detect player click
screen.addEventListener('mousedown', (e) => {
    if (e.repeat) return
    if (e.button !== 0) {
        e.preventDefault
        return
    }

    if (pauseOn == true) { beeSpeedY = upSpeed } 
})

// window.addEventListener('contextmenu', (e) => {
//     e.preventDefault()
// })

var pauseOn = true

// Detects player clicking the pause button
buttonPause.addEventListener('mousedown', (e) => {
    if (e.repeat) return
    if (e.button !== 0) {
        e.preventDefault
        return
    }

    if (pauseOn == true) {
        clearInterval(gameUpdateIntervalID)

        buttonPause.textContent = 'Resume'
        pauseOn = false
    } else {
        gameUpdateIntervalID = setInterval(gameUpdate, gameUpdateMs)

        buttonPause.textContent = 'Pause'
        pauseOn = true
    }

    e.stopPropagation()
})



// Block clicks on buttons to move the bee
buttonQualityLow.addEventListener('mousedown', (e) => {
    if (e.repeat) return
    if (e.button !== 0) {
        e.preventDefault
        return
    }

    e.stopPropagation()
})

buttonQualityHigh.addEventListener('mousedown', (e) => {
    if (e.repeat) return
    if (e.button !== 0) {
        e.preventDefault
        return
    }

    e.stopPropagation()
})

// Detect player key press and disable it
document.addEventListener('keydown', (e) => {
    if (e.repeat) return
    if (e.button !== 0) {
        e.preventDefault
        return
    }
    
    e.preventDefault()
})

function movePlayer() {
    limitSpeed()
    limitPosition()
    updateCoordinates()

    if (qualityOnSwitch == true || spriteRotateTransition == true) {
        rotateSprite(bee, beeSpeedY)
    }
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

    hpBar.style.bottom = beeY + hpBarOffset + 'px'
}

// The player's borders coordinates
var beeRect

function updateCoordinates() {
    beeRect = bee.getBoundingClientRect()
}