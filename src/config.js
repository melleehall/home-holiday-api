module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://MelanieLee@localhost/home-holiday',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://MelanieLee@localhost/home-holiday-test',
    CLIENT_ORIGIN: 'https://home-holiday.now.sh/'
}