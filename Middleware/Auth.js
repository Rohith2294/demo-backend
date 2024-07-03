const jwt = require('jsonwebtoken')





module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log(authHeader,'authHeader')
    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    console.log(authHeader, 'authHeader');
    const token = authHeader.split(' ')[1];
    console.log(token, 'Token');
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretKey');
        req.userId = decodedToken.userId;
        console.log(decodedToken.userId,'decodedToken');
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        } else if (err instanceof jwt.JsonWebTokenError) {

            console.error('JWT Error:', err);
            return res.status(401).json({ message: 'Invalid token' });
        } else {

            console.error('Unexpected Error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};
