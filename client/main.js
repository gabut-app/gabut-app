let baseUrl = 'http://localhost:3000';

$(document).ready(() => {
  checkAuth()
});

function checkAuth() {
  if (getToken()) {

    // ini untuk fetch music
    fetchRandomMusic();
    // ini untuk fetch dark joke
    darkJoke();
  } else {

  }
}

// API Call

function fetchRandomMusic() {
  $.ajax({
    url: `${baseUrl}/api-musics`,
    method: 'get',
    headers: {
      // belum ada token, belum di setLocalStorage
      token: localStorage.token,
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
        'Display todo failed',
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
      token: localStorage.token,
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

// Google Sign Button

function onSignIn(googleUser) {
  const googleToken = googleUser.getAuthResponse().id_token

  $.ajax({
    url: baseUrl + '/google-sign-in',
    method: 'POST',
    data: { googleToken }
  })
    .done(data => {
      setToken(data.token)
      checkAuth()
    })
    .fail(err => {
      console.log('err', err)
    })
}

function onSignOut() {
  const auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(() => console.log('User signed out.'))
}

// Local Storage Utils

function setToken(token) {
  localStorage.setItem('token', token)
}

function getToken() {
  return localStorage.getItem('token')
}

function removeToken() {
  localStorage.removeItem('token')
}
