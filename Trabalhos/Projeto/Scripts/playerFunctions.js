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



// Detect player click
document.addEventListener('mousedown', (e) => {
    if (e.repeat) return
    beeSpeedY = upSpeed
})

// Detect player key press and disable it
document.addEventListener('keydown', (e) => {
    if (e.repeat) return
    e.preventDefault()
})

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