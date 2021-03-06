let baseUrl = 'http://localhost:3000';

$(document).ready(() => {
  checkAuth();
});

function checkAuth() {
  console.log('called');
  if (getToken()) {
    // hide login page
    $('#login-page').hide();
    $('#home-page').show();
    $('#button-logout').show();
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
          <li class="media bg-white rounded p-4 shadow mt-3">
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
      $('#container-cerpen').html(`
        <li class="media bg-white rounded p-2 shadow mt-3">
          <div class="mx-auto">
            <p>${data.cerpen.replace(/\n/gm, "<br>")}</p>
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
    method: 'GET',
    headers: {
      token: getToken(),
    },
  })
    .done(data => {
      console.log('movies', data.movies)
      const container = $('#movies > .row')
      container.empty()

      data.movies.forEach(movie => {
        container.append(`
          <div class="col-6">
            <div class="card mb-3 shadow">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src="${movie.poster_path}" class="card-img" alt="cover">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bolder">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <h6 class="card-subtitle mb-2 text-muted">Release Date: ${movie.release_date}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Language: ${movie.original_language}</h6>
                    ${movie.genre_ids.map(i => `<div class="badge badge-primary mr-2 mt-2">${i}</div>`).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `)
      })
    })
    .fail((err) => {
      console.log('err', err)
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
