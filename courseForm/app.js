(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const display = new Display();
    display.checkFields();
    display.hideSubmit();
  });

  document
    .getElementById('customer-form')
    .addEventListener('submit', function(event) {
      event.preventDefault();
      const name = this.querySelector('.name');
      const course = this.querySelector('.course');
      const author = this.querySelector('.author');
      const customer = new Customer(name.value, course.value, author.value);
      const display = new Display();
      display.feedback(customer);
      display.clearFields();
    });

  function Display() {
    this.name = document.getElementById('name');
    this.course = document.getElementById('course');
    this.author = document.getElementById('author');
    this.customers = document.querySelector('.customer-list');
  }

  Display.prototype.checkFields = function() {
    this.name.addEventListener('blur', this.validateField);
    this.course.addEventListener('blur', this.validateField);
    this.author.addEventListener('blur', this.validateField);
  };

  Display.prototype.validateField = function() {
    if (this.value === '') {
      // show warning text
      this.parentElement.nextElementSibling.classList.remove('is-hidden');

      // change feedback icon
      this.nextElementSibling.firstChild.classList.remove('fa-check');
      this.nextElementSibling.firstChild.classList.add(
        'fa-exclamation-triangle'
      );

      // change border color
      this.classList.remove('is-primary');
      this.classList.add('is-danger');

      this.classList.remove('complete');
    } else {
      // hide warning text
      this.parentElement.nextElementSibling.classList.add('is-hidden');

      // change feedback icon
      this.nextElementSibling.firstChild.classList.add('fa-check');
      this.nextElementSibling.firstChild.classList.remove(
        'fa-exclamation-triangle'
      );

      // change border color
      this.classList.add('is-primary');
      this.classList.remove('is-danger');

      this.classList.add('complete');
    }
    document.querySelectorAll('.complete').length === 3
      ? (document.querySelector('.submitBtn').disabled = false)
      : (document.querySelector('.submitBtn').disabled = true);
  };

  Display.prototype.hideSubmit = function() {
    document.querySelector('.submitBtn').disabled = true;
  };

  Display.prototype.feedback = function(customer) {
    const feedback = document.querySelector('.feedback');
    feedback.classList.remove('is-hidden');
    document.querySelector('.submitBtn').classList.add('is-loading');
    const self = this;
    self.hideSubmit();
    setTimeout(function() {
      document.querySelector('.submitBtn').classList.remove('is-loading');
      feedback.classList.add('is-hidden');
      self.addCustomer(customer);
    }, 2500);
  };

  Display.prototype.addCustomer = function(customer) {
    document.querySelector('.customer-list').classList.remove('is-hidden');
    document.getElementById('customer-list-items').insertAdjacentHTML(
      'afterbegin',
      `
        <tr>
          <th>${customer.name}</th>
          <td>${customer.course}</td>
          <td>${customer.author}</td>
        </tr>
      `
    );
  };

  Display.prototype.clearFields = function() {
    this.name.value = '';
    this.course.value = '';
    this.author.value = '';

    this.name.classList.remove('complete');
    this.course.classList.remove('complete');
    this.author.classList.remove('complete');

    this.name.nextElementSibling.firstChild.classList.remove('fa-check');
    this.course.nextElementSibling.firstChild.classList.remove('fa-check');
    this.author.nextElementSibling.firstChild.classList.remove('fa-check');
  };

  function Customer(name, course, author) {
    this.name = name;
    this.course = course;
    this.author = author;
  }
})();
