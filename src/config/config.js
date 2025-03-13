import 'dotenv/config';

const {
  NODE_ENV,
  PORT,
  LOCAL_DATABASE_URL,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASS,

  PROD_DATABASE_URL,
  PROD_DATABASE_NAME,
  PROD_DATABASE_USER,
  PROD_DATABASE_PASS,
} = process.env;

const validEnvironments = ['dev', 'prod', 'local'];

if (!validEnvironments.includes(process.env.NODE_ENV)) {
  throw new Error(
    `Invalid NODE_ENV value: ${
      process.env.NODE_ENV
    }. Must be one of ${validEnvironments.join(', ')}.`
  );
}

const config = {
  nodeEnv: NODE_ENV,
  local: {
    port: PORT,
    db_url: LOCAL_DATABASE_URL,
    db_name: DATABASE_NAME,
    db_user: DATABASE_USER,
    db_pass: DATABASE_PASS,
  },
  prod: {
    port: PORT,
    db_url: PROD_DATABASE_URL,
    db_name: PROD_DATABASE_NAME,
    db_user: PROD_DATABASE_USER,
    db_pass: PROD_DATABASE_PASS,
  },
};

export default config[NODE_ENV];
