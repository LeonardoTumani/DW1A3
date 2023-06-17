// var qualitySet = localStorage.getItem('quality')
var qualitySet = localStorage.getItem('quality')
var qualityOnSwitch = true

var beeImageSource = './Components/images/bee-gif.gif'
var waspImageSource = './Components/images/wasp-gif.gif'

var sadBeeImageSource = './Components/images/sad-bee-gif.gif'
var angryWaspImageSource = './Components/images/angry-wasp-gif.gif'



function adjustQuality(quality) {
    if (qualitySet == null) {
        quality = 'high'
    }

    if (quality == 'low') {
        buttonQualityLow.style.color = '#b10000'
        buttonQualityHigh.style.color = '#000000'

        beeImageSource = './Components/images/bee.png'
        sadBeeImageSource = './Components/images/sad-bee.png'

        waspImageSource = './Components/images/wasp.png'
        angryWaspImageSource = './Components/images/angry-wasp.png'

        qualityOnSwitch = false
        qualitySet = 'low'
        localStorage.setItem('quality', qualitySet)
    } else if (quality == 'high') {
        buttonQualityLow.style.color = '#000000'
        buttonQualityHigh.style.color = '#b10000'

        beeImageSource = './Components/images/bee-gif.gif'
        sadBeeImageSource = './Components/images/sad-bee-gif.gif'

        waspImageSource = './Components/images/wasp-gif.gif'
        angryWaspImageSource = './Components/images/angry-wasp-gif.gif'

        qualityOnSwitch = true
        spriteRotateTransition = true
        qualitySet = 'high'
        localStorage.setItem('quality', qualitySet)
    } else {
        adjustQuality('high')
    }

    bee.src = beeImageSource
}