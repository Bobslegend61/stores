const config = {};

config.production = {
    PORT: process.env.PORT,
    name: 'production'
};

config.development = {
    PORT: process.env.PORT || 3000,
    name: 'development'
};


const environment = (process.env.NODE_ENV === 'production' && typeof(process.env.NODE_ENV) === 'string') ? 'production' : 'development';
module.exports = config[environment];
