

function errHandler(err, req, res, next) { // identifier err handler ada 4 params
  // console.log(err, '<< ini dari error handler')
  let errors = []
  let statusCode = 500
  
  console.log(err.name)
  // proses error disini
  switch(err.name) {
    case 'SequelizeUniqueConstraintError':
      errors.push('Email is being used')
      statusCode = 400
      break;
    case 'JsonWebTokenError':
      errors.push('Failed to authenticate!')
      statusCode = 401
      break;
    case 'SequelizeValidationError':
      err.errors.forEach(element => {
        errors.push(element.message)
      });
      statusCode = 400
      break;
    default:
      errors.push(err.msg || 'internal server error')
      statusCode = err.statusCode || 500
  }


  res.status(statusCode).json({
    errors: errors
  })
}


module.exports = errHandler