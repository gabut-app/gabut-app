let baseUrl = 'http://localhost:3000';

// ini untuk fetch music
fetchRandomMusic();
// ini untuk fetch dark joke
darkJoke();
// ini untuk fetch cerpen
randomCerpen();

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

function randomCerpen() {
  $.ajax({
    url: `${baseUrl}/api-cerpen`,
    method: 'get',
    headers: {
      // belum ada token, belum di localStorage
      token: localStorage.token,
    },
  })
    .done(data => {
      console.log(data)
      $('#container-cerpen').empty()
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
