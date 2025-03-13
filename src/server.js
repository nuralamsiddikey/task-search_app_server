import express from 'express';
import cors from 'cors';

import config from './config/config.js';
import globalErrorHandler from './middleware/errors/globalErrorHandler.js';
import dbConnect from './db/dbConnect.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//import routes
import productRouter from './api/product/product.route.js';
app.use('/api', productRouter);

app.use('/test', (req, res, next) => {
  res.send('test ok');
});

app.use(globalErrorHandler);

app.listen(config.port, () => {
  console.log(`server running on port ${config.port}`);
  dbConnect.sequelize
    .authenticate()
    .then(() => {
      console.log('database connect successfully');
    })
    .catch((err) => {
      console.log('unable to connect the database', err);
    });
  // dbConnect.sequelize.sync();
  // dbConnect.sequelize.sync({ alter: true });
  //dbConnect.sequelize.sync({ force: true });
});
