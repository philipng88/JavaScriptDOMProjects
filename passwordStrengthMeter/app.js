const strengthMeter = document.getElementById('strength-meter');
const passwordInput = document.getElementById('password-input');
const feedbackList = document.getElementById('feedback-list');

const lengthWeakness = password => {
  const length = password.length;
  if (length <= 5) {
    return {
      message: 'Your password is too short',
      deduction: 40,
    };
  }

  if (length <= 10) {
    return {
      message: 'Your password could be longer',
      deduction: 15,
    };
  }
};

const characterTypeWeakness = (password, regex, type) => {
  const matches = password.match(regex) || [];
  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}`,
      deduction: 20,
    };
  }
  if (matches.length <= 2) {
    return {
      message: `Your password could use more ${type}`,
      deduction: 5,
    };
  }
};

const lowercaseWeakness = password =>
  characterTypeWeakness(password, /[a-z]/g, 'lowercase characters');

const uppercaseWeakness = password =>
  characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters');

const numberWeakness = password =>
  characterTypeWeakness(password, /[0-9]/g, 'numbers');

const specialCharacterWeakness = password =>
  characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters');

const repeatCharactersWeakness = password => {
  const matches = password.match(/(.)\1/g) || [];
  if (matches.length > 0) {
    return {
      message: 'Your password has consecutive repeating characters',
      deduction: matches.length * 10,
    };
  }
};

const calculatePasswordStrength = password => {
  const feedback = [];
  feedback.push(lengthWeakness(password));
  feedback.push(lowercaseWeakness(password));
  feedback.push(uppercaseWeakness(password));
  feedback.push(numberWeakness(password));
  feedback.push(specialCharacterWeakness(password));
  feedback.push(repeatCharactersWeakness(password));
  return feedback;
};

const showFeedback = () => {
  if (passwordInput.value.trim() !== '') {
    const feedback = calculatePasswordStrength(passwordInput.value);
    let strength = 100;
    feedbackList.innerHTML = '';
    feedback.forEach(feedbackItem => {
      if (feedbackItem === undefined) return;
      strength -= feedbackItem.deduction;
      feedbackList.insertAdjacentHTML(
        'beforeend',
        `<li>${feedbackItem.message}</li>`
      );
    });
    strengthMeter.setAttribute('value', strength);
    if (strength >= 66) {
      strengthMeter.className = 'nes-progress is-success';
    } else if (strength > 33 && strength < 66) {
      strengthMeter.className = 'nes-progress is-warning';
    } else if (strength <= 33) {
      strengthMeter.className = 'nes-progress is-error';
    }
  } else {
    feedbackList.innerHTML = '';
    strengthMeter.setAttribute('value', 0);
  }
};

passwordInput.addEventListener('input', showFeedback);
