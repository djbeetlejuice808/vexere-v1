const crypto = require('crypto');
const axios = require('axios');

// Your API URL, CLIENT_ID, and API_KEY
const API_URL = 'https://api-merchant.payos.vn/v2/payment-requests';
const CLIENT_ID = '980c6d49-d222-4ce3-a30e-a5828a202ae4';
const API_KEY = '9a8d4348-f742-4528-8120-bfdb36f6f5fa';
const CHECKSUM_KEY = 'e55c0dcb04f60d51ecbcd3b165e008b80ab21ec84cbc55c630c7e9d01f19ae96'; // You need to get this from your payment provider

function createSignature(data) {
    const sortedKeys = Object.keys(data).sort();
    const sortedData = sortedKeys.map(key => `${key}=${data[key]}`).join('&');
    return crypto.createHmac('sha256', CHECKSUM_KEY).update(sortedData).digest('hex');
}

function generateRandomNumber(length) {
    const digits = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomByte = crypto.randomBytes(1)[0];
        result += digits[randomByte % 10];
    }
    return parseInt(result, 10);
}

// Function to generate a random string of specified length
function generateRandomString(length) {
    return crypto.randomBytes(length)
        .toString('base64')
        .slice(0, length)
        .replace(/\+/g, '0')
        .replace(/\//g, '0');
}

exports.createPayment = async (req, res) => {
    try {
        console.log("Tiến hành tạo link thanh toán");
        const { orderId, amount, buyerName, buyerEmail, buyerPhone, buyerAddress } = req.body;
        console.log(req.body);
        const now = Math.floor(Date.now() / 1000);
        const validExpiredAt = now + 3600; 

        const data = {
            orderCode: generateRandomNumber(8), 
            amount,
            description: generateRandomString(10),
            buyerName,
            buyerEmail,
            buyerPhone,
            buyerAddress,
            cancelUrl: 'http://localhost:5173/order/669822242c07823647fd03ca',
            returnUrl: 'http://localhost:5173/order/669822242c07823647fd03ca',
            expiredAt: validExpiredAt
        };

        console.log(data);
        data.signature = createSignature({
            amount: data.amount,
            cancelUrl: data.cancelUrl,
            description: data.description,
            orderCode: data.orderCode,
            returnUrl: data.returnUrl
        });

        const fullUrl = API_URL;
        console.log('Sending request to:', fullUrl);
        console.log('Request data:', JSON.stringify(data, null, 2));

        const response = await axios.post(fullUrl, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': CLIENT_ID,
                'x-api-key': API_KEY
            }
        });

        console.log('Response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error creating payment link:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getSuccessPayment = async (req, res) => {
    try {
        let order = req.params.orderId
        let url = 'https://api-merchant.payos.vn/v2/payment-requests/'+order
        console.log(order)
        const response = await axios.get(url, {
            headers: {
                'x-client-id': CLIENT_ID,
                'x-api-key': API_KEY
            }
        }); 

            // Assuming the response data contains the payment information
        console.log('Response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching payment link information:', error.message);
        throw new Error('Failed to fetch payment link information');
    }
};