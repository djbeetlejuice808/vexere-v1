require('dotenv').config({ path: './src/.env'})
const config = {
    port: process.env.PORT,
    database: {
        name:   process.env.MONGODB,
        username:   '',
        password:   ''
    },
    storage:{
        driver:process.env.DRIVER
    },
    EMAIL:{
        username:process.env.GMAIL_USERNAME,
        password:process.env.GMAIL_PASSWORD
    }
}
module.exports = { config };