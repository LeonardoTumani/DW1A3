// EventListener que atualiza o display da seta de scroll de acordo com o scroll do usuário.
window.addEventListener('scroll', updateArrowDisplay)

const modalOverlay = document.getElementById('modal-overlay')
const modalCadastro = document.getElementById('modal-cadastro')

// EventListener que fecha o modal de cadastro quando o usuário clicar fora dele.
modalOverlay.addEventListener('click', function (event) {
    if (!event.target.closest('#modal-cadastro')) {
        cadastroSample.fecharCadastro()
    }
})

// EventListener que salva o cadastro do usuário com as informações passadas no formulário.
document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault()

    const nome = document.getElementById('input-nome').value
    const telefone = document.getElementById('input-telefone').value

    const logradouro = document.getElementById('input-logradouro').value
    const numero = document.getElementById('input-numero').value
    const complemento = document.getElementById('input-complemento').value
    const bairro = document.getElementById('input-bairro').value

    const cidade = document.getElementById('input-cidade').value
    const estado = document.getElementById('input-estado').value
    const pais = document.getElementById('input-pais').value

    // Salva-se o cadastro do usuário com as informações passadas no formulário.
    cadastroSample.salvarCadastro(nome, telefone, logradouro, numero, complemento, bairro, cidade, estado, pais)
})

// EventListeners que mostram o texto de "Cadastro salvo!" e "Cadastro removido!" quando o usuário clicar nos respectivos botões.
document.getElementById('input-submit').addEventListener('click', async function(event) {
    document.getElementById('p-salvo').classList.add('active')
    await sleep(1400)
    document.getElementById('p-salvo').classList.remove('active')
})

document.getElementById('p-remover-cadastro').addEventListener('click', async function(event) {
    document.getElementById('p-removido').classList.add('active')
    await sleep(1400)
    document.getElementById('p-removido').classList.remove('active')

    cadastroSample.removerCadastro()
})