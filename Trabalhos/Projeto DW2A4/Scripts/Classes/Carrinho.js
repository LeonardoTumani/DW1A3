class Carrinho {
    atualizarCarrinho(clickedElement) {
        // Constante que checa se o elemento clicado foi um botão de menos.
        const isMinus = clickedElement.classList.contains('minus-button')
        const id = clickedElement.id.split('-id')[1].trim()

        // Se o botão clicado foi um de menos, subtrai-se 1 da quantidade de pratos no pedido, do contrário, adiciona-se 1.
        if(isMinus) {
            var operation = -1
        } else {
            var operation = 1
        }

        // Variável contendo o elemento que mostra a quantidade de pratos no pedido.
        var quantDisplay = document.getElementById('quant-display-id' + id)
        var oldDisplay = parseInt(quantDisplay.textContent)

        // Calcula a nova quantidade no display de acordo com a operação feita pelo usuário (adição ou subtração).
        var newDisplay = oldDisplay + operation
        // Impede a quantidade de ser menor que 0.
        if(newDisplay < 0) newDisplay = 0

        quantDisplay.textContent = newDisplay

        // divSituacao é uma div que mostra ao usuário a situação do pedido (aprovado, negado por falta de pratos no pedido, etc).
        const divSituacao = document.getElementById('div-situacao')
        divSituacao.classList.remove('active')
    
        // Chama-se a função para atualizar a div contendo o pedido do usuário (à direita).
        carrinhoSample.atualizarSeuPedido(isMinus, oldDisplay, newDisplay, id)
    }

    atualizarSeuPedido(isMinus, oldDisplay, newDisplay, id) {
        const divSeuPedido = document.getElementById('div-seu-pedido')
        const divTotal = document.getElementById('div-total')

        // Variáveis de nome, preço e quantidade do prato presentes no pedido.
        const nomePrato = document.getElementById('nome-prato-id' + id).textContent
        const precoPrato = document.getElementById('preco-prato-id' + id).textContent
        const quantPrato = document.getElementById('quant-prato-pedido-id' + id)
        const quantDisplay = document.getElementById('quant-display-id' + id)

        const pedido = document.getElementById('pedido-id' + id)

        // Se o botão clicado for o de menos, e... 
        if(isMinus) {
            // ...a nova quantidade é zero, a quantidade antiga é maior que zero e o pedido existe... 
            if (newDisplay == 0 && oldDisplay > 0 && pedido) {
                // ...remove-se a div do prato de dentro do pedido.
                divSeuPedido.removeChild(pedido)
            } else {
                // Senão, apenas mostra-se a nova quantidade.
                if(quantPrato) quantPrato.textContent = parseInt(quantDisplay.textContent)
            }
        // Se o botão clicado for o de mais, e...
        } else {
            // ...se a nova quantidade é maior que zero, a quantidade antiga era zero e o pedido não existe...
            if (newDisplay > 0 && oldDisplay == 0 && !pedido) {
                // ...adiciona-se ao pedido o prato desejado, criando div's e p's para mostrar os dados do prato dentro da div de pedido (à direita)
                var newPedido = document.createElement('div')
                newPedido.setAttribute("id", ("pedido-id" + id))
                newPedido.setAttribute('class', 'pedido')

                    var divCounter = document.createElement('div')
                    divCounter.setAttribute("id", ("counter-id" + id))
                    divCounter.setAttribute('class', 'counter')
                    newPedido.appendChild(divCounter)

                        var pQuantPratoPedido = document.createElement('p')
                        pQuantPratoPedido.setAttribute("id", ("quant-prato-pedido-id" + id))
                        pQuantPratoPedido.setAttribute('class', 'quant-prato-pedido')
                        pQuantPratoPedido.textContent = newDisplay
                        divCounter.appendChild(pQuantPratoPedido)
        
                        var pNomePratoPedido = document.createElement('p')
                        pNomePratoPedido.setAttribute("id", ("nome-prato-pedido-id" + id))
                        pNomePratoPedido.setAttribute('class', 'nome-prato-pedido')
                        pNomePratoPedido.textContent = nomePrato
                        divCounter.appendChild(pNomePratoPedido)

                    var pPrecoPratoPedido = document.createElement('p')
                    pPrecoPratoPedido.setAttribute("id", ("preco-prato-pedido-id" + id))
                    pPrecoPratoPedido.setAttribute('class', 'preco-prato-pedido')
                    pPrecoPratoPedido.textContent = precoPrato
                    newPedido.appendChild(pPrecoPratoPedido)
    
                divSeuPedido.insertBefore(newPedido, divTotal)
            } else {
                // Senão, apenas mostra-se a nova quantidade.
                if(quantPrato) quantPrato.textContent = parseInt(quantDisplay.textContent)
            }
        }

        // Chama-se a função para atualizar os preços no pedido.
        carrinhoSample.atualizarTotal()
    }

    atualizarTotal() {
        var total = 0
        var totalFormatted = 'R$0,00'
        const precoTotal = document.getElementById('preco-total')

        const listaPedidos = document.getElementsByClassName('pedido')
        const arrayPedidos = Array.from(listaPedidos)

        // Para cada prato no pedido, ...
        arrayPedidos.forEach(element => {
            var id = element.id.split('-id')[1].trim()

            var quantPratoPedido = document.getElementById('quant-prato-pedido-id' + id).textContent
            var precoPrato = document.getElementById('preco-prato-id' + id)
            var precoPratoPedido = document.getElementById('preco-prato-pedido-id' + id)
            var precoPratoConverted = parseFloat((precoPrato.textContent).split('R$')[1].trim().replace(',', '.'))

            var totalPorPrato = quantPratoPedido * precoPratoConverted
            var totalPorPratoFormatted = 'R$' + ((Math.round(((totalPorPrato) * 100)) / 100).toFixed(2).toString()).replace('.', ',')

            total = total + totalPorPrato
            totalFormatted = 'R$' + ((Math.round(((total) * 100)) / 100).toFixed(2).toString()).replace('.', ',')

            // ...formata-se o preço total.
            precoPratoPedido.textContent = totalPorPratoFormatted
        })

        precoTotal.textContent = totalFormatted
    }

    async enviarPedido() {
        // Verifica se há cadastro salvo no dispositivo.
        const hasCadastro = cadastroSample.importarCadastro()

        const listaPedidos = document.getElementsByClassName('pedido')
        const arrayPedidos = Array.from(listaPedidos)

        const divSituacao = document.getElementById('div-situacao')

        console.log(arrayPedidos)
        // Se o pedido contém pelo menos um prato...
        if(arrayPedidos.length >= 1) {
            // ... e se há cadastro salvo no dispositivo, ...
            if (hasCadastro) {
                var dadosUsuario = JSON.parse(hasCadastro)
    
                divSituacao.style.backgroundColor = '#7dccab'
                divSituacao.style.border = '2px solid #0aa062'
                divSituacao.textContent = "Seu pedido está sendo processado e será enviado para o seguinte endereço:\n\n" +
                (dadosUsuario.logradouro !== "" ? "Logradouro: " + dadosUsuario.logradouro + "\n" : "") +
                (dadosUsuario.numero !== "" ? "N.º: " + dadosUsuario.numero + "\n" : "") +
                (dadosUsuario.complemento !== "" ? "Complemento: " + dadosUsuario.complemento + "\n" : "") +
                (dadosUsuario.bairro !== "" ? "Bairro: " + dadosUsuario.bairro + "\n" : "") +
    
                (dadosUsuario.cidade !== "" ? "Cidade: " + dadosUsuario.cidade + "\n" : "") +
                (dadosUsuario.estado !== "" ? "Estado: " + dadosUsuario.estado + "\n" : "") +
                (dadosUsuario.pais !== "" ? "País: " + dadosUsuario.pais + "\n" : "")

                // Mostra-se a situação de pedido confirmado ao cliente.
            } else {
                // Senão, mostra-se a situação de pedido negado por falta de cadastro salvo.
                divSituacao.style.backgroundColor = '#f0bcbf'
                divSituacao.style.border = '2px solid #f0303a'
                divSituacao.textContent = "Seu pedido não pôde ser processado porque não há cadastro de endereço salvo neste dispositivo. Cadastre-se e tente novamente."
            }
        } else {
            // Senão, mostra-se a situação de pedido negado por falta de pratos no pedido.
            divSituacao.style.backgroundColor = '#f0bcbf'
                divSituacao.style.border = '2px solid #f0303a'
                divSituacao.textContent = "Seu pedido não pôde ser processado porque não há nenhum prato no pedido."
        }

        // Adiciona-se a classe "active" à div de situação para que seja mostrada ao cliente apenas ao registrar o pedido.
        divSituacao.classList.add('active')
    }
}

// Carrinho exemplo para acessar suas funções.
var carrinhoSample = new Carrinho()
