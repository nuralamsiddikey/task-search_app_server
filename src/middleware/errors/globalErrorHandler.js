const globalErrorHandler = (err, req, res, next) => {
  console.log(err);

  let code = err.statusCode ? err.statusCode : 500;

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(code).json({
      statusCode: code,
      status: 'error',
      message: err.errors[0].message,
    });
  }

  res.status(code).json({
    statusCode: code,
    status: 'error',
    message: err.message,
  });
};

export default globalErrorHandler;
