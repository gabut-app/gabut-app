# Gabut App
Gabut app is an application for gabut people enjoy their gabut time. This app has : 
* RESTful endpoint for asset's Read operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /api-cerpen

> Get random cerpen

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "cerpen": "\"BIANGLALA\\nCerpen Karangan: Dheea Octa\\nKategori: Cerpen Cinta\\nLolos moderasi pada: 5 February 2020\\n\\nPada akhirnya aku akan terbiasa hanya menatap pada keheningan. Bukan bias\\nwarna-warninya yang mengisi setiap relung pikirku! Pada tempat yang pernah kita\\nsinggahi, kembali aku teringat akan janji yang pernah kau ucapkan tentang si\\npembuat keindahan.
    ...
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (500)_
```
{
  "message": "Internal server error"
}
```

### GET /api-musics

> Get random musics

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "artistName": "BLACKPINK",
    "thumbnail": "https://www.theaudiodb.com/images/media/artist/thumb/txuxsy1476547962.jpg",
    "selectedVideo": "https://www.youtube.com/watch?v=Amq-qlqbjYA"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (500)_
```
{
  "message": "Internal server error"
}
```

### GET /api-movies

> Get random movies

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (500)_
```
{
  "message": "Internal server error"
}
```

### GET /jokes

> Get random jokes

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "randomJoke": [
        "Your momma is so fat, you need to switch to NTFS to store a picture of her.",
        "The glass is neither half-full nor half-empty, the glass is twice as big as it needs to be."
    ]
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (500)_
```
{
  "message": "Internal server error"
}
```

### POST /register

> Create new user

_Request Header_
```
not needed
```
_Request Params_
```
not needed
```

_Request Body_
```
{
  "email": "<string>",
  "password": "<string>"
}
```

_Response (201 - Created)_
```
{
    "id": 1,
    "email": "gabut@mail.com",
    "msg": "Register success"
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "invalid email format",
        "email is required",
        "password is required",
    ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /login

> Login user

_Request Header_
```
not needed
```
_Request Params_
```
not needed
```

_Request Body_
```
{
  "email": "<string>",
  "password": "<string>"
}
```

_Response (201 - Created)_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoibWFnc0BtYWlsLmNvbSIsImlhdCI6MTYwMTQzOTM1M30.4oIcQzfdJpw8_WimrsgcMsx7maw75dXmSUvzpZcawOg"
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "invalid email or password"
    ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```