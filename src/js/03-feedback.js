import { throttle } from 'lodash';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');
const FEEDBACK_KEY = 'feedback-form-state';

const obj = {};

try {
  let data = JSON.parse(localStorage.getItem(FEEDBACK_KEY));

  if (data.email) {
    inputEl.value = data.email;
    obj.email = data.email;
  }

  if (data.message) {
    messageEl.value = data.message;
    obj.message = data.message;
  }
} catch (err) {}

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
  event.preventDefault();
  console.log(obj);

  for (key in obj) {
    delete obj[key];
  }
  localStorage.removeItem(FEEDBACK_KEY);
  event.target.reset();
});
