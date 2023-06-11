import jwt from 'jsonwebtoken';

const generateToken = (payload: { email: string, role: string }): string => {
    const token = jwt.sign(payload, 'eZTdFm9@0qp-+s#F9A3nQI6XTwNRGKLX', { expiresIn: '1h' }); // Adjust the expiration time as needed
    return token;
};

export default generateToken;
