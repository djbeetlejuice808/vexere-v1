const pino = require('pino');
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true, // Màu sắc cho log
            customColors: 'info:green,err:red', // Màu tùy chỉnh cho các mức log khác nhau
            crlf: true, // Sử dụng kiểu xuống dòng CRLF (Windows-style)
            singleLine: false, // Đảm bảo log không bị gộp vào một dòng
            errorLikeObjectKeys: ['err', 'error'], // Các khóa sẽ được coi là lỗi
            levelFirst: true, // Hiển thị mức log đầu tiên
            messageKey: 'msg', // Khóa của thông điệp log
            translateTime: 'SYS:standard', 
            ignore: 'pid,hostname', 
        }
    }
});

module.exports = {
    logger
};