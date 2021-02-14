import { route } from './router.js';

let msg = '';
const LOGIN_LINK = 'https://zwzt-zadanie.netlify.app/api/login';
const LOGIN_SUCCESS = 'Login success!';

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

route('/', 'home', function () {
  this.msg = '';

  this.$on('.login-button', 'click', e => {
    e.preventDefault();

    const username = document.getElementById('username');
    const password = document.getElementById('pass');

    postData(LOGIN_LINK, {
      username: username.value,
      password: password.value,
    }).then(data => {
      msg = data.message;

      if (data.message == LOGIN_SUCCESS) {
        window.location.href = '#/success';
      } else {
        this.msg = msg;
        this.$refresh();
      }
    });
  });
});

route('/success', 'success', function () {
  this.msg = msg;
});
