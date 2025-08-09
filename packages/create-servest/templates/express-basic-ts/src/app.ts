import express from 'express';
import cors from 'cors';
import { notFoundHandler, globalErrorHandler } from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';

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

export default app;
