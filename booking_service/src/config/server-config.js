const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    EVENT_SERVICE: process.env.EVENT_SERVICE
}