const express = require('express');
const cors = require('cors');
const { notFoundHandler, globalErrorHandler } = require('express-error-toolkit');
const { StatusCodes } = require('http-status-toolkit');

const app = express();

// cors and body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home route
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Server is running',
  });
});

// not found handler and global error handler
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
