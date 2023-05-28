import dotenv from 'dotenv'

dotenv.config()
export default {
    persistence: process.env.PERSISTENCE,
    mongo_uri: process.env.MONGO_URI,
    mongo_db_name: process.env.MONGO_DB_NAME,
    port: process.env.PORT,
    email: process.env.EMAIL_TRANSPORT,
    pass: process.env.PASS_TRANSPORT,
    private_key: process.env.PRIVATE_KEY,
    jwt_cookie_name: process.env.JWT_COOKIE_NAME
}