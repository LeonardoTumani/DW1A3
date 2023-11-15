// Função que calcula a distância do fim da página.
function calculateDistanceFromBottom() {
    // Altura do documento (incluindo área de scroll)
    const fullHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    )

    // Altura da viewport
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight

    // Distância do fim da página que usuário está vendo
    const distanceFromBottom = fullHeight - (window.pageYOffset + viewportHeight)

    return distanceFromBottom
}

// Função que atualiza o display da seta de scroll de acordo com o scroll do usuário.
function updateArrowDisplay() {
    const scrollArrow = document.getElementById('scroll-arrow')

    if(scrollArrow) { 
        if(calculateDistanceFromBottom() < 200) {
            scrollArrow.style.opacity = 0
        } else {
            scrollArrow.style.opacity = 1
        }
    }
}
