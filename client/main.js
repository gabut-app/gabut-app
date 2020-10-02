let baseUrl = 'http://localhost:3000';

$(document).ready(() => {
  checkAuth();
});

function checkAuth() {
  if (getToken()) {
    // hide login page
    $('#login-page').hide();
    // ini untuk fetch music
    fetchRandomMusic();
    // fetch random movies
    fetchRandomMovies();
    // ini untuk fetch dark joke
    darkJoke();
    // fetch cerpen
    randomCerpen();
  } else {
    $('#login-page').show();
    $('#home-page').hide();
    $('#button-logout').hide();
  }
}

function logout() {
  removeToken();
  onSignOut();
  checkAuth();
}

// API Call

function fetchRandomMusic() {
  $.ajax({
    url: `${baseUrl}/api-musics`,
    method: 'get',
    headers: {
      // belum ada token, belum di setLocalStorage
      token: getToken(),
    },
  })
    .done((data) => {
      console.log(data);
      $('#container-music').empty();
      $('#container-music').append(`
        <li class="media bg-white rounded p-2 shadow mt-3">
          <img src="${data.thumbnail}" alt=""
            class="mr-3 rounded" width="100px">
          <div>
            <h3>${data.artistName}</h3>
            <a href="${data.selectedVideo}" class="btn btn-outline-primary" target="_blank">Click Me!</a>
          </div>
        </li>
      `);
    })
    .fail((err) => {
      Swal.fire(
        'Display music failed',
        err.responseJSON.errors.join(','),
        'error'
      );
    });
}

function darkJoke() {
  $.ajax({
    url: `${baseUrl}/jokes`,
    method: 'get',
    headers: {
      // belum ada token, belum di setLocalStorage
      token: getToken(),
    },
  })
    .done((data) => {
      $('#container-joke').empty();
      data.randomJoke.forEach((element) => {
        $('#container-joke').append(`
          <li class="media bg-white rounded p-2 shadow mt-3">
            <div class="mx-auto">
              <b>${element}</b>
            </div>
          </li>
        `);
      });
    })
    .fail((err) => {
      Swal.fire(
        'Display todo failed',
        err.responseJSON.errors.join(','),
        'error'
      );
    });
}

function randomCerpen() {
  $.ajax({
    url: `${baseUrl}/api-cerpen`,
    method: 'get',
    headers: {
      // belum ada token, belum di localStorage
      token: getToken(),
    },
  })
    .done((data) => {
      console.log(data);
      $('#container-cerpen').empty();
      $('#container-cerpen').append(`
        <li class="media bg-white rounded p-2 shadow mt-3">
          <div class="mx-auto">
            <p>${data.cerpen}</p>
          </div>
        </li>
      `);
    })
    .fail((err) => {
      Swal.fire(
        'Display cerpen failed',
        err.responseJSON.errors.join(','),
        'error'
      );
    });
}

function fetchRandomMovies() {
  $.ajax({
    url: `${baseUrl}/api-movies`,
    method: 'get',
    headers: {
      token: getToken(),
    },
  })
    .done((data) => {
      console.log('data', data);
    })
    .fail((err) => {
      Swal.fire(
        'Display todo failed',
        err.responseJSON.errors.join(','),
        'error'
      );
    });
}

// Google Sign Button

function onSignIn(googleUser) {
  const googleToken = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: baseUrl + '/google-sign-in',
    method: 'POST',
    data: { googleToken },
  })
    .done((data) => {
      setToken(data.token);
      checkAuth();
    })
    .fail((err) => {
      Swal.fire(
        'Display todo failed',
        err.responseJSON.errors.join(','),
        'error'
      );
    });
}

function showRegisterForm() {
  $('#register-page').show();
  $('#login-page').hide();
}

function backToLogin() {
  $('#register-page').hide();
  $('#login-page').show();
  location.reload();
}

function onSignOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => console.log('User signed out.'));
}

// Login
$('#register-page').hide();
function login(event) {
  event.preventDefault();
  let email = $('#login-email').val();
  let password = $('#login-password').val();

  $.ajax({
    url: `${baseUrl}/login`,
    method: 'post',
    data: {
      email,
      password,
    },
  })
    .done((data) => {
      console.log(data);
      setToken(data.token);
      checkAuth();
      location.reload();
    })
    .fail((err) => {
      console.log(err);
      Swal.fire('Login Failed!', err.responseJSON.errors.join(','), 'error');
    })
    .always(() => {
      clear();
    });
}

// Register
function register(event) {
  event.preventDefault();
  $('#login-page').hide();
  const email = $('#register-email').val();
  const password = $('#register-password').val();

  $.ajax({
    url: `${baseUrl}/register`,
    method: 'post',
    data: {
      email,
      password,
    },
  })
    .done((data) => {
      clear();
      $('#login-page').show();
      $('#register-page').hide();
    })
    .fail((err) => {
      Swal.fire('Register Failed', err.responseJSON.errors.join(','), 'error');
    })
    .always(() => {
      clear();
    });
}

// Local Storage Utils

function setToken(token) {
  localStorage.setItem('token', token);
}

function getToken() {
  return localStorage.getItem('token');
}

function removeToken() {
  localStorage.removeItem('token');
}

function clear() {
  $('#login-email').val('');
  $('#login-password').val('');
  $('#register-email').val('');
  $('#register-password').val('');
}
