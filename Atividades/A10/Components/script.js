const masks = {
    name(value) {
        return value
        .replace(/[^A-ü ]+/g, '')
        .replace(/([A-ü ]{50})[A-ü ]+?$/, '$1')
        .replace(/^ /g, '')
        .replace(/(\s|^)[A-ü]/g, function(match) { return match.toUpperCase(); })
        .replace(/ +/g, ' ')
        .replace(/[~^´`¨]/g, '');
      },

    cpf (value) {
        return value
        .replace(/\D+/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    },

    date (value) {
        return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{4})\d+?$/, '$1')
    },
  
    phone (value) {
        return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1')
    },

    money(value) {
        const cleanValue = +value.replace(/\D+/g, '').substring(0, 11);
        const options = { style: 'currency', currency: 'BRL' };
        return new Intl.NumberFormat('pt-br', options).format(parseInt(cleanValue) / 100);
    }
}

document.querySelectorAll('input').forEach($input => {
    const field = $input.dataset.js
    
    $input.addEventListener('input', e => {
        e.target.value = masks[field](e.target.value)
    }, false)
})

const button = document.getElementById('button')

button.addEventListener('click', (event) => {
    event.preventDefault()

    const elemName = document.getElementById('idName')
    const elemCPF = document.getElementById('idCPF')
    const elemDate = document.getElementById('idDate')
    const elemPhone = document.getElementById('idPhone')
    const elemMoney = document.getElementById('idMoney')

    if (elemName.value == "" | elemName.value.length < 10) {
        elemName.classList.add('errorInput')
    }
    else {
        elemName.classList.remove('errorInput')
    }

    if (elemCPF.value == "" | elemCPF.value.length < 14) {
        elemCPF.classList.add('errorInput')
    }
    else {
        elemCPF.classList.remove('errorInput')
    }

    if (elemDate.value == "" | elemDate.value.length < 10) {
        elemDate.classList.add('errorInput')
    }
    else {
        elemDate.classList.remove('errorInput')
    }

    if (elemPhone.value == "" | elemPhone.value.length < 14) {
        elemPhone.classList.add('errorInput')
    }
    else {
        elemPhone.classList.remove('errorInput')
    }

    if (elemMoney.value == "") {
        elemMoney.classList.add('errorInput')
    }
    else {
        elemMoney.classList.remove('errorInput')
    }
})