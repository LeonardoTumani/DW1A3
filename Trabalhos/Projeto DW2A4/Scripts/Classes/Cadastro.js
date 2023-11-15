class Cadastro {
    abrirCadastro() {
        // Adiciona-se a classe "active" ao elemento com ID "modal-overlay", para que o CSS mude sua aparência.
        document.getElementById('modal-overlay').classList.add('active')
        cadastroSample.importarCadastro()
    }

    fecharCadastro() {
        // Remove-se a classe "active" do elemento com ID "modal-overlay", para que o CSS mude sua aparência.
        document.getElementById('modal-overlay').classList.remove('active')
    }

    salvarCadastro(nome, telefone, logradouro, numero, complemento, bairro, cidade, estado, pais) {
        // Cria-se uma lista com os dados do usuário para ser passada ao localStorage, salvando seu cadastro no navegador.
        var dadosUsuario = {
            "nome": nome,
            "telefone": telefone,
            "logradouro": logradouro,
            "numero": numero,
            "complemento": complemento,
            "bairro": bairro,
            "cidade": cidade,
            "estado": estado,
            "pais": pais
        }

        localStorage.setItem('cadastro', JSON.stringify(dadosUsuario));
    }
    removerCadastro() {
        // Remove-se o cadastro do usuário do navegador.
        localStorage.clear('cadastro')
    }
    importarCadastro() {
        // Importa-se o cadastro do usuário.
        return localStorage.getItem('cadastro')
    }
}

var cadastroSample = new Cadastro()