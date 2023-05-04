const newTransaction = document.getElementById('new-transaction');
const cancelNewTransaction = document.getElementById('cancel-new-transaction');
const form = document.querySelector('form');

newTransaction.addEventListener('click', (e) => {
    Modal.open();
});

cancelNewTransaction.addEventListener('click', (e) => {
    Modal.close();
});

form.addEventListener('submit', (e) => {
    Form.submit(e);
});

const Modal = {
    open: () => {
        document.querySelector('.modal-overlay').classList.add('active');
    },

    close: () => {
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}

const Storage = {
    get: () => {
        return JSON.parse(localStorage.getItem('finances:transaction')) || [];
    },

    set: (transactions) => {
        localStorage.setItem('finances:transaction', JSON.stringify(transactions));
    }
}

const Transaction = {
    all: transactions = Storage.get(),

    add: (transaction) => {
        Transaction.all.push(transaction);

        App.update();
    },

    remove: (index) => {
        Transaction.all.splice(index, 1);

        App.update();
    },

    incomes: () => {
        let income = 0;

        Transaction.all.forEach((transaction) => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        })

        return income;
    },

    expenses: () => {
        let expense = 0;

        Transaction.all.forEach((transaction) => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        })

        return expense;
    },

    total: () => {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),


    addTransaction: (transaction, index) => {

        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
        tr.dataset.index = index;
        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction: (transaction, index) => {
        const style = transaction.amount > 0 ? 'income' : 'expense';

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `        
            <td class="description">${transaction.description}</td>
            <td class="${style}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick="Transaction.remove(${index})" src="./Components/images/honeycomb-remove.png" 
                class="icon" id="honeycomb-remove" alt="remove transaction">
            </td>        
        `

        return html;
    },

    updateBalance: () => {
        const totalGreen = '#12a454';
        const totalRed = '#e92929';

        document.getElementById('income_value').innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.getElementById('expense_value').innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.getElementById('total_value').innerHTML = Utils.formatCurrency(Transaction.total());

        let totalValue = Transaction.total();
        Number(totalValue) >= 0 ? document.querySelector('.card.total').style.background = totalGreen
            : document.querySelector('.card.total').style.background = totalRed;

    },

    clearTransactions: () => {
        DOM.transactionsContainer.innerHTML = '';
    }
}

const Utils = {
    formatCurrency: (value) => {
        const signal = Number(value) >= 0 ? '' : '-';

        value = String(value).replace(/\D/g, '');

        value = Number(value) / 100;

        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return signal + value;
    },

    formatAmount: (value) => {
        value = Number(value.replace(/\,\./g, '')) * 100;
        return Math.round(value);
    },

    formatDate: (date) => {
        const splittedDate = date.split('-');
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues: () => {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields: () => {
        const { description, amount, date } = Form.getValues();

        if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
            throw new Error('🐝 Por favor, preencha todos os campos.');
        }
    },

    formatValues: () => {
        let { description, amount, date } = Form.getValues();

        amount = Utils.formatAmount(amount);
        date = Utils.formatDate(date);

        return {
            description,
            amount,
            date
        }
    },

    saveTransaction: (transaction) => {
        Transaction.add(transaction);
    },

    clearFields: () => {
        Form.description.value = '';
        Form.amount.value = '';
        Form.date.value = '';
    },

    submit: (e) => {
        e.preventDefault();

        try {
            Form.validateFields();
            const transaction = Form.formatValues();
            Form.saveTransaction(transaction);
            Form.clearFields();
            Modal.close();

        } catch (error) {
            alert(error.message);
        }
    }
}

const App = {
    setup: () => {

        Transaction.all.forEach(DOM.addTransaction);

        DOM.updateBalance();

        Storage.set(Transaction.all);

    },

    update: () => {
        DOM.clearTransactions();
        App.setup();
    }
}

App.setup();
