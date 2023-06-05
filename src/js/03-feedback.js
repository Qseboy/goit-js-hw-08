import { throttle } from 'lodash';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');
const FEEDBACK_KEY = 'feedback-form-state';

const obj = {};

// check data
try {
  let data = JSON.parse(localStorage.getItem(FEEDBACK_KEY));
  if (data) {
    inputEl.value = data.email;
    messageEl.value = data.message;
  }
} catch (err) {
  console.log(err);
}

formEl.addEventListener(
  'input',
  throttle(event => {
    if (event.target.nodeName === 'INPUT') {
      obj.email = event.target.value;
      localStorage.setItem(FEEDBACK_KEY, JSON.stringify(obj));
      return;
    }

    obj.message = event.target.value;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(obj));
  }, 500)
);

formEl.addEventListener('submit', event => {
  try {
    event.preventDefault();
    console.log(JSON.parse(localStorage.getItem(FEEDBACK_KEY)));
    localStorage.removeItem(FEEDBACK_KEY);
    event.target.reset();
  } catch (err) {
    console.log(err.name);
  }
});
