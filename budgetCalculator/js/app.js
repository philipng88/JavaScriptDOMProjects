// eslint-disable-next-line import/extensions
import UI from './classes/UI.js';

const eventListeners = () => {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseTable = document.getElementById('expense-table');
  const clearDataBtn = document.getElementById('clear-data-btn');
  const ui = new UI();
  budgetForm.addEventListener('submit', event => {
    event.preventDefault();
    ui.submitBudgetForm();
  });
  expenseForm.addEventListener('submit', event => {
    event.preventDefault();
    ui.submitExpenseForm();
  });
  expenseTable.addEventListener('click', event => {
    if (event.target.classList.contains('edit-expense-btn'))
      ui.editExpense(event.target.parentElement.parentElement);
    if (event.target.classList.contains('delete-expense-btn'))
      ui.deleteExpense(event.target.parentElement.parentElement);
  });
  clearDataBtn.addEventListener('click', () => ui.clearData());
};
document.addEventListener('DOMContentLoaded', () => eventListeners());
