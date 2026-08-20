
const devError = (req,res, err) => {
    const statusCode = err.statusCode || 500;

       res.status(statusCode).json({  
      status :statusCode >= 500 ? 'error' : 'fail',
        message: err.message,
        stack: err.stack,
        error: err,
      });
    }
    const castError = (err) => {
      const msg = `Invalid ${err.path}: ${err.value}`;
      err.message = msg;
      err.statusCode = 400;
      err.isOperational = true;
      return err
    }
    const doublicateError = (err) => {
      const msg = `Duplicate field value entered`;
      err.message = msg;
      err.statusCode = 409;
      err.isOperational = true;
      return err;
    }
    const prodError = (req, res, err) => {
          const statusCode = err.statusCode || 500;

      if(err.isOperational) {
       return  res.status(statusCode).json({  
      status :statusCode >= 500 ? 'error' : 'fail',
          message: err.message
        })
      } else {
        res.status(500).json({
          status: 'error',
          message: 'Something went wrong!',
        });
      }
    }


const errorMiddleware = (err, req, res, next) => {


if(process.env.NODE_ENV === 'development') {
 return devError(req,res, err)
}
 if (process.env.NODE_ENV === 'production') {
  if(err.name === 'CastError')     err=castError(err);

  if (err.code === 11000)err = doublicateError(err);
    

 return prodError(req, res, err);
}

return prodError(req, res, err);}
module.exports = errorMiddleware;
