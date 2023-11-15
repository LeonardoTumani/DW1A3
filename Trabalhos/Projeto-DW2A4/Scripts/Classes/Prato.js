class Prato {
    // Lista contendo os pratos e seus atributos para ser adicionado ao cardápio ao carregar-se a página de cardápio.
    listaPratos = [
        {
          "nome": "Feijoada",
          "descricao": "Originária do Brasil, a Feijoada é um prato que tem suas raízes na época colonial. Feita com carne de porco, feijão preto, arroz, farofa, couve, torresmo e laranja, essa delícia reflete a rica mistura cultural do país.",
          "ingredientes": "Carne de porco, feijão preto, arroz, farofa, couve, torresmo e laranja.",
          "preco": "R$50,90",
        },
        {
          "nome": "Pizza",
          "descricao": "Nascida nas ruas movimentadas de Nápoles, a Pizza conquistou o mundo com sua combinação perfeita de massa de farinha de trigo, tomate, queijo e outros ingredientes. Uma verdadeira obra-prima da culinária italiana.",
          "ingredientes": "Massa de farinha de trigo, tomate, queijo, outros ingredientes.",
          "preco": "R$32,60",
        },
        {
          "nome": "Sushi",
          "descricao": "Diretamente do Japão, o Sushi é uma arte culinária que combina peixe cru, arroz e alga. Com séculos de tradição, cada peça é cuidadosamente preparada para proporcionar uma experiência gastronômica única.",
          "ingredientes": "Peixe cru, arroz, alga.",
          "preco": "R$45,80",
        },
        {
          "nome": "Hambúrguer",
          "descricao": "Surgido nos Estados Unidos, o Hambúrguer tornou-se um ícone da comida rápida. Com pão, carne, queijo, salada e outros ingredientes, esse prato reflete a praticidade e o sabor inconfundível da culinária americana.",
          "ingredientes": "Pão, carne, queijo, salada, outros ingredientes.",
          "preco": "R$25,00",
        },
        {
          "nome": "Lasanha",
          "descricao": "Originária da Itália, a Lasanha é uma explosão de sabores harmoniosamente empilhados. Composta por massa, molho de tomate, queijo e outros ingredientes, esse prato é uma celebração da tradição italiana à mesa.",
          "ingredientes": "Massa, molho de tomate, queijo, outros ingredientes.",
          "preco": "R$34,75",
        },
        {
          "nome": "Pasta",
          "descricao": "Na Itália, a Pasta é mais que uma refeição, é uma tradição passada de geração em geração. Massa cozida em água e sal, servida com molho e outros ingredientes, essa iguaria é um verdadeiro abraço da culinária italiana.",
          "ingredientes": "Massa, molho, outros ingredientes.",
          "preco": "R$21,20",
        },
        {
          "nome": "Tacos",
          "descricao": "Diretamente do México, os Tacos são uma explosão de sabores e cores. Tortilhas de milho recheadas com carne, frango, peixe, vegetais ou outros ingredientes, refletem a riqueza da gastronomia mexicana.",
          "ingredientes": "Tortilhas de milho, carne, frango, peixe, vegetais, outros ingredientes.",
          "preco": "R$14,90",
        },
        {
          "nome": "Quesadillas",
          "descricao": "Originárias do México, as Quesadillas são uma verdadeira festa de queijos e sabores. Tortilhas de milho recheadas com queijo e outros ingredientes, proporcionam uma experiência gastronômica única.",
          "ingredientes": "Tortilhas de milho, queijo, outros ingredientes.",
          "preco": "R$15,50",
        },
        {
          "nome": "Burrito",
          "descricao": "Originário do México, o Burrito é um prato que combina a simplicidade e a complexidade de sabores. Tortilhas de milho recheadas com carne, frango, peixe, vegetais ou outros ingredientes, fazem desse prato uma explosão de cultura gastronômica.",
          "ingredientes": "Tortilhas de milho, carne, frango, peixe, vegetais, outros ingredientes.",
          "preco": "R$19,90",
        },
        {
          "nome": "Enchiladas",
          "descricao": "Também do México, as Enchiladas são uma verdadeira festa de sabores. Tortilhas de milho recheadas com carne, frango, peixe, vegetais ou outros ingredientes, cobertas com molho de tomate e queijo, proporcionam uma experiência gastronômica inesquecível.",
          "ingredientes": "Tortilhas de milho, carne, frango, peixe, vegetais, molho de tomate, queijo.",
          "preco": "R$33,30",
        },
        {
          "nome": "Paella",
          "descricao": "Originária da Espanha, a Paella é uma explosão de sabores mediterrâneos. Arroz com frutos do mar, legumes e outros ingredientes, cozidos em uma panela especial, fazem desse prato uma celebração da rica culinária espanhola.",
          "ingredientes": "Arroz, frutos do mar, legumes, outros ingredientes.",
          "preco": "R$49,90",
        },
        {
          "nome": "Frango xadrez",
          "descricao": "Diretamente da China, o Frango Xadrez é um prato que une sabores agridoces de forma equilibrada. Frango cozido em molho de soja, açúcar e vinagre, reflete a arte da culinária chinesa em cada pedaço.",
          "ingredientes": "Frango, molho de soja, açúcar, vinagre.",
          "preco": "R$35,00",
        },
      ]
      
    // Função que adiciona os pratos da lista no cardápio.
    incluirPrato() {
        const divPratos = document.getElementById('div-pratos')
        var i = 0
        
        if(divPratos) {
          // Para cada elemento da lista, adicionam-se div's e p's para mostrar os dados do prato.
            this.listaPratos.forEach(element => {
                i++
                var newPrato = document.createElement("div")
                newPrato.setAttribute("id", ("prato-id" + i))
                newPrato.setAttribute("class", "prato")

                    var newTituloPrato = document.createElement("div")
                    newTituloPrato.setAttribute("id", ("titulo-prato-id" + i))
                    newTituloPrato.setAttribute("class", "titulo-prato")
                    newPrato.appendChild(newTituloPrato)

                        var pNome = document.createElement("p")
                        pNome.setAttribute("id", ("nome-prato-id" + i))
                        pNome.setAttribute("class", "nome-prato")
                        pNome.textContent = element.nome
                        newTituloPrato.appendChild(pNome)

                        var pDescricao = document.createElement("p")
                        pDescricao.setAttribute("id", ("descricao-prato-id" + i))
                        pDescricao.setAttribute("class", "descricao-prato")
                        pDescricao.textContent = element.descricao
                        newTituloPrato.appendChild(pDescricao)

                    var newDescAdd = document.createElement("div")
                    newDescAdd.setAttribute("id", ("desc-add-id" + i))
                    newDescAdd.setAttribute("class", "desc-add")
                    newPrato.appendChild(newDescAdd)

                        var pPrecoPrato = document.createElement("p")
                        pPrecoPrato.setAttribute("id", ("preco-prato-id" + i))
                        pPrecoPrato.setAttribute("class", "preco-prato")
                        pPrecoPrato.textContent = element.preco
                        newDescAdd.appendChild(pPrecoPrato)

                        var newButtonsAdd = document.createElement("div")
                        newButtonsAdd.setAttribute("id", ("buttons-add-id" + i))
                        newButtonsAdd.setAttribute("class", "buttons-add")
                        newDescAdd.appendChild(newButtonsAdd)

                            var buttonMinus = document.createElement("button")
                            buttonMinus.setAttribute("id", ("minus-button-id" + i))
                            buttonMinus.setAttribute("class", "minus-button")
                            buttonMinus.setAttribute("onclick", "carrinhoSample.atualizarCarrinho(this)")
                            buttonMinus.textContent = '-'
                            newButtonsAdd.appendChild(buttonMinus)

                            var pQuantDisplay = document.createElement("p")
                            pQuantDisplay.setAttribute("id", ("quant-display-id" + i))
                            pQuantDisplay.setAttribute("class", "quant-display")
                            pQuantDisplay.textContent = 0
                            newButtonsAdd.appendChild(pQuantDisplay)

                            var buttonPlus = document.createElement("button")
                            buttonPlus.setAttribute("id", ("plus-button-id" + i))
                            buttonPlus.setAttribute("class", "plus-button")
                            buttonPlus.setAttribute("onclick", "carrinhoSample.atualizarCarrinho(this)")
                            buttonPlus.textContent = '+'
                            newButtonsAdd.appendChild(buttonPlus)

                divPratos.appendChild(newPrato)
            })
        }
    }
}

// Prato exemplo para acessar suas funções.
var pratoSample = new Prato()