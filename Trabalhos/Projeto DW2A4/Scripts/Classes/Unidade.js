class Unidade {
    // Lista contendo as unidades e seus atributos para ser adicionado à página de unidades.
    listaUnidades = [
        { "nome": "🇩🇪 Alemanha", "listaEnderecos": [
            { "endereco": "Brandenburg Gate, n.º 1" },
            { "endereco": "Kurfürstendamm, n.º 2" },
            { "endereco": "Unter den Linden, n.º 3" },
            { "endereco": "Checkpoint Charlie Street, n.º 4" },
            { "endereco": "Cologne Cathedral Lane, n.º 5" },
            { "endereco": "Neuschwanstein Castle Road, n.º 6" }
          ] },
        { "nome": "🇦🇷 Argentina", "listaEnderecos": [
          { "endereco": "Avenida 9 de Julio, n.º 1" },
          { "endereco": "Calle Florida, n.º 2" },
          { "endereco": "Avenida Corrientes, n.º 3" },
          { "endereco": "Plaza de Mayo, n.º 4" },
          { "endereco": "Palermo Soho Street, n.º 5" },
          { "endereco": "San Telmo Square, n.º 6" }
        ] },
        { "nome": "🇦🇺 Austrália", "listaEnderecos": [
          { "endereco": "Sydney Harbour Drive, n.º 1" },
          { "endereco": "Great Ocean Road, n.º 2" },
          { "endereco": "Bondi Beach Walk, n.º 3" },
          { "endereco": "Uluru Red Center Street, n.º 4" },
          { "endereco": "Barossa Valley Avenue, n.º 5" },
          { "endereco": "Great Barrier Reef Coral Walk, n.º 6" }
        ] },
        { "nome": "🇧🇷 Brasil", "listaEnderecos": [
          { "endereco": "Avenida Paulista, n.º 1" },
          { "endereco": "Rua Augusta, n.º 2" },
          { "endereco": "Praia de Copacabana, n.º 3" },
          { "endereco": "Ipanema Beach Avenue, n.º 4" },
          { "endereco": "Brasília Boulevard, n.º 5" },
          { "endereco": "Amazon Rainforest Road, n.º 6" }
        ] },
        { "nome": "🇨🇦 Canadá", "listaEnderecos": [
          { "endereco": "Yonge Street, n.º 1" },
          { "endereco": "Robson Street, n.º 2" },
          { "endereco": "Maple Leaf Avenue, n.º 3" },
          { "endereco": "Niagara Falls Parkway, n.º 4" },
          { "endereco": "Banff National Park Trail, n.º 5" },
          { "endereco": "Vancouver Seawall Walk, n.º 6" }
        ] },
        { "nome": "🇨🇳 China", "listaEnderecos": [
          { "endereco": "Nanjing Road, n.º 1" },
          { "endereco": "Huangpu River Avenue, n.º 2" },
          { "endereco": "Beijing Street, n.º 3" },
          { "endereco": "Great Wall Path, n.º 4" },
          { "endereco": "Xi'an Drum Tower Street, n.º 5" },
          { "endereco": "Shanghai Bund Boulevard, n.º 6" }
        ] },
        { "nome": "🇪🇸 Espanha", "listaEnderecos": [
          { "endereco": "La Rambla, n.º 1" },
          { "endereco": "Passeig de Gràcia, n.º 2" },
          { "endereco": "Puerta del Sol, n.º 3" },
          { "endereco": "Alhambra Palace Path, n.º 4" },
          { "endereco": "Park Güell Walkway, n.º 5" },
          { "endereco": "Sagrada Família Avenue, n.º 6" }
        ] },
        { "nome": "🇫🇷 França", "listaEnderecos": [
          { "endereco": "Champs-Élysées, n.º 1" },
          { "endereco": "Montmartre Street, n.º 2" },
          { "endereco": "Rue de la Paix, n.º 3" },
          { "endereco": "Eiffel Tower Promenade, n.º 4" },
          { "endereco": "Louvre Museum Passage, n.º 5" },
          { "endereco": "Versailles Palace Gardens Avenue, n.º 6" }
        ] },
        { "nome": "🇮🇳 Índia", "listaEnderecos": [
          { "endereco": "Chandni Chowk, n.º 1" },
          { "endereco": "MG Road, n.º 2" },
          { "endereco": "Linking Road, n.º 3" },
          { "endereco": "Taj Mahal Lane, n.º 4" },
          { "endereco": "Mumbai Marine Drive, n.º 5" },
          { "endereco": "Golden Temple Street, n.º 6" }
        ] }
      ]
      
    // Função que adiciona as unidades à página de unidades.
    incluirUnidade() {
        const divUnidades = document.getElementById('div-unidades')

        if(divUnidades) {
          // Para cada elemento da lista, adicionam-se div's e p's para mostrar os dados da unidade.
            this.listaUnidades.forEach(element => {
                var newPais = document.createElement("div")
                newPais.setAttribute("class", "pais")

                var pNomePais = document.createElement('p')
                pNomePais.setAttribute("class", "p-nome-pais")
                pNomePais.textContent = element.nome
                newPais.appendChild(pNomePais)

                var newUnidadeHorizontalDiv = document.createElement('div')
                newUnidadeHorizontalDiv.setAttribute("class", "unidade-horizontal-div")
                newPais.appendChild(newUnidadeHorizontalDiv)

                var listaEnderecos = element.listaEnderecos
                listaEnderecos.forEach(element2 => {
                    var newUnidade = document.createElement('div')
                    newUnidade.setAttribute("class", "unidade")
                    newUnidade.textContent = element2.endereco
                    newUnidadeHorizontalDiv.appendChild(newUnidade)
                })

                divUnidades.appendChild(newPais)
            })
        }
    }
}

// Unidade exemplo para acessar suas funções.
var unidadeSample = new Unidade()

