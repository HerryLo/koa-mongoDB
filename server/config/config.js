/**
 * 需要检查的token的 请求地址
 */
const verifyPath = [
    '/api/userlist',
    'api/createarticle'
];

export default {
    db: {
        url: 'mongodb://localhost/test'
    },
    secret: 'LiuHeng9227fe78182er',
    port: process.env.port || '12345',
    redis: {
        host: process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
        port: process.env.REDIS_PORT_6379_TCP_PORT || 6379,
        password: process.env.REDIS_PASSWORD || ''
    },
    session: {
        cookie: {
            maxAge: 60000 * 5
        }
    },
    verifyPath
}