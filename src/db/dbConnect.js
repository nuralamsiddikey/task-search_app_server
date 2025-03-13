import Sequelize from 'sequelize';
import config from '../config/config.js';


const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_pass,
  {
   // host: 'localhost',
   host: config.db_url,
   dialect: 'mysql',
  }
);
const db = {
  sequelize,
  DataTypes: Sequelize.DataTypes,
};

export default db;
