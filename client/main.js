let baseUrl = 'http://localhost:3000';

$(document).ready(() => {
  checkAuth()
});

function checkAuth() {
  if (getToken()) {

    // ini untuk fetch music
    // fetchRandomMusic();
    // ini untuk fetch dark joke
    // darkJoke();
    //
    // randomCerpen();
    // ini untuk fetch movies
    fetchRandomMovies()
  } else {

  }
}

function logout() {
  removeToken()
  onSignOut()
  checkAuth()
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
    .done(data => {
      console.log(data)
      $('#container-cerpen').empty()
      $('#container-cerpen').append(`
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
      const container = $('#movies > .row')
      container.empty()

      data.movies.forEach(movie => {
        container.append(`
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${movie.poster_path}" class="card-img" alt="cover">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${movie.title}</h5>
                  <p class="card-text">${movie.overview}</p>
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
      Swal.fire(
        'Display todo failed',
        err.responseJSON.errors.join(','),
        'error'
      );
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
