require('dotenv').config();


module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    DOMAIN: process.env.DOMAIN,
    VERIFY_SIGNATURE: process.env.VERIFY_SIGNATURE
}