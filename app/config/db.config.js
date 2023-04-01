module.exports = {
    HOST: "localhost",
    USER: "your_DB_user_name",
    DB: "testdb",
    PASSWORD: "Your _DB _PASSWORD",
    dialect: "mysql",
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
    }
};