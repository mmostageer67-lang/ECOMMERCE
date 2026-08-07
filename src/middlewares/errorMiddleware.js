
const devError = (req,res, err) => {
    const statusCode = err.statusCode || 500;

       res.status(statusCode).json({  
      status :statusCode >= 500 ? 'error' : 'fail',
        message: err.message,
        stack: err.stack,
        error: err,
      });
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
return devError(req,res, err);
}
return  prodError(req, res, err);
}


module.exports = errorMiddleware;