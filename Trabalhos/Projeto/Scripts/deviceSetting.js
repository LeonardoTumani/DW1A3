var isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent)
var isTablet = /iPad|Android|webOS/i.test(navigator.userAgent)

function adjustDevice() {
    if (isMobile) {
        beeHeight = 30
        beeWidth = 30

        upSpeed = 5
        downSpeed = upSpeed / 35

        waspMaxQuantity = 20
        waspSizeVariation = 10

        waspMaxSpeedX = 5
        waspMinSpeedX = 4

        waspMaxSpeedY = 2
        waspMinSpeedY = 0

        screen.style.backgroundSize = '150px'

        bee.style.left = '5px'
    } else {
        bee.style.left = '50px'
    }
}
