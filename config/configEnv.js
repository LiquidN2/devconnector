const configureEnv = () => {
  const env = process.env.NODE_ENV || 'development';
  if (env !== 'production') {
    const keyConfig = require('./configEnv.json');
    const envConfig = keyConfig[env];

    for (let key in envConfig) {
      process.env[key] = envConfig[key];
    }
  }
};

module.exports = configureEnv;