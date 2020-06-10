export default class UI {
  constructor() {
    this.budgetFeedback = document.querySelector('.budget-feedback');
    this.expenseFeedback = document.querySelector('.expense-feedback');
    this.expenseItemsFeedback = document.querySelector(
      '.expense-items-feedback'
    );
    this.budgetForm = document.getElementById('budget-form');
    this.budgetInput = document.getElementById('budget-input');
    this.budgetAmount = document.getElementById('budget-amount');
    this.expenseAmount = document.getElementById('expense-amount');
    this.balance = document.getElementById('balance');
    this.balanceAmount = document.getElementById('balance-amount');
    this.expenseForm = document.getElementById('expense-form');
    this.expenseInput = document.getElementById('expense-input');
    this.amountInput = document.getElementById('amount-input');
    this.expenseTable = document.getElementById('expense-table');
    this.itemList = [];
    this.itemID = 0;
  }

  submitBudgetForm() {
    const value = this.budgetInput.value.replace(/,/g, '');
    const inputIsValid = value.match(/^[0-9](?:,?[0-9])*(?:\.[0-9]{2})?$/g);
    if (value !== '' && inputIsValid && inputIsValid.length === 1) {
      this.budgetAmount.innerText = Number(value).toFixed(2);
      this.budgetInput.value = '';
      this.showBalance();
    } else {
      this.budgetFeedback.classList.remove('d-none');
      this.budgetFeedback.innerText = `"${value}" is not a valid amount. Please enter a valid amount`;
      setTimeout(() => this.budgetFeedback.classList.add('d-none'), 4000);
    }
  }

  showBalance() {
    const expense = this.totalExpense();
    const total = (+this.budgetAmount.innerText - expense).toFixed(2);
    this.balanceAmount.innerText = total;
    if (total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    } else if (total > 0) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    } else {
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack');
    }
  }

  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value.replace(/,/g, '');
    const amountInputIsValid = amountValue.match(
      /^[0-9](?:,?[0-9])*(?:\.[0-9]{2})?$/g
    );
    if (
      amountValue !== '' &&
      expenseValue !== '' &&
      amountInputIsValid &&
      amountInputIsValid.length === 1
    ) {
      const amount = +amountValue;
      this.expenseInput.value = '';
      this.amountInput.value = '';
      const expense = {
        id: this.itemID,
        title: expenseValue,
        amount,
      };
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    } else {
      this.expenseFeedback.classList.remove('d-none');
      this.expenseFeedback.innerText =
        'Invalid field value(s). Expense value cannot be blank and expense amount must be a valid amount';
      setTimeout(() => this.expenseFeedback.classList.add('d-none'), 6000);
    }
  }

  addExpense(expense) {
    this.expenseTable.insertAdjacentHTML(
      'afterbegin',
      `<tr>
        <td>${expense.title}</td>
        <td>$${expense.amount.toFixed(2)}</td>
        <td>
          <button
            type="button"
            class="btn btn-info btn-sm edit-expense-btn"
            data-id="${expense.id}"
          >Edit
          </button>
          <button 
            type="button" 
            class="btn btn-danger btn-sm delete-expense-btn"
            data-id="${expense.id}"
          >Delete
          </button>
        </td>
      </tr>`
    );
  }

  editExpense(element) {
    const id = +element.children[2].children[0].dataset.id;
    const expense = this.itemList.filter(item => item.id === id);

    element.parentElement.removeChild(element);
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    this.itemList = this.itemList.filter(item => item.id !== id);
    this.showBalance();
  }

  deleteExpense(element) {
    const id = +element.children[2].children[0].dataset.id;
    element.parentElement.removeChild(element);
    this.itemList = this.itemList.filter(item => item.id !== id);
    this.showBalance();
  }

  clearData() {
    if (
      this.budgetAmount.innerText === '0.00' &&
      this.expenseAmount.innerText === '0.00' &&
      this.balanceAmount.innerText === '0.00' &&
      this.expenseTable.children.length === 0
    ) {
      this.expenseItemsFeedback.classList.remove('d-none');
      this.expenseItemsFeedback.innerText = 'There is no data to clear';
      setTimeout(() => {
        this.expenseItemsFeedback.classList.add('d-none');
        this.expenseItemsFeedback.innerText = '';
      }, 2000);
    } else {
      // eslint-disable-next-line no-lonely-if, no-alert
      if (window.confirm('Are you sure you wish to clear all the data?')) {
        this.budgetAmount.innerText = '0.00';
        this.itemList = [];
        this.showBalance();
        while (this.expenseTable.firstChild)
          this.expenseTable.removeChild(this.expenseTable.firstChild);
      }
    }
  }

  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, curr) => {
        acc += curr.amount;
        return acc;
      }, 0);
    }
    this.expenseAmount.innerText = total.toFixed(2);
    return total.toFixed(2);
  }
}
