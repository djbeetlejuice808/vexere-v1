const crypto = require('crypto');

//Định nghĩa độ dài của mật khẩu sau khi mã hóa.
const PASSWORD_LENGTH = 256;
//Định nghĩa độ dài của salt, là một chuỗi ngẫu nhiên được thêm vào mật khẩu trước khi mã hóa để tăng tính bảo mật.
const SALT_LENGTH = 64;
//Số lần lặp lại của thuật toán mã hóa để làm cho quá trình mã hóa chậm hơn và khó bị tấn công.
const ITERATIONS = 10000;
//Thuật toán băm được sử dụng (SHA-256).
const DIGEST = "sha256";
//Định dạng để chuyển đổi dữ liệu băm từ byte sang chuỗi, có thể là "hex" hoặc "base64".
const BYTE_TO_STRING_ENCODING = "hex";
//Khởi tạo hàm generateHashPassword nhận vào mật khẩu của người dùng.
function generateHashPassword(password) {
    //Trả về một Promise, với hàm callback nhận hai tham số accept và reject.
    return new Promise((accept, reject) => {
    //Tạo một chuỗi salt ngẫu nhiên và chuyển đổi nó thành chuỗi.
        const salt = crypto.randomBytes(SALT_LENGTH).toString(BYTE_TO_STRING_ENCODING);
    //Sử dụng hàm pbkdf2 để mã hóa mật khẩu với salt và các tham số khác.
        crypto.pbkdf2(password, salt, ITERATIONS, PASSWORD_LENGTH, DIGEST, (error, hash) => {
        if (error) return reject(error);
            accept({
                    salt: salt,
                    hash: hash.toString(BYTE_TO_STRING_ENCODING),
                    iterations: ITERATIONS,
            });
        });
    });
}

//Hàm này kiểm tra mật khẩu người dùng nhập vào so với mật khẩu đã được lưu trữ.
function comparePassword(persistedPassword, passwordAttempt) {
    //Trả về một Promise, với hàm callback nhận hai tham số accept và reject.
    return new Promise((accept, reject) => {
    //Sử dụng hàm pbkdf2 để mã hóa mật khẩu người dùng nhập vào với salt và các tham số khác từ mật khẩu đã lưu trữ.
        crypto.pbkdf2(passwordAttempt, persistedPassword.salt, persistedPassword.iterations, PASSWORD_LENGTH, DIGEST, (error, hash) => {
      //Nếu có lỗi xảy ra trong quá trình mã hóa, reject Promise với lỗi đó.
        if (error) {
            return reject(error);
        }
      // Nếu mã hóa thành công,
      // accept Promise với giá trị boolean kiểm tra xem hash của mật khẩu người dùng nhập vào có 
      // khớp với hash của mật khẩu đã lưu trữ hay không.
        accept(persistedPassword.hash === hash.toString(BYTE_TO_STRING_ENCODING));
        });
    });
}

module.exports = { generateHashPassword, comparePassword };