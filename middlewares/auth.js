require('dotenv').config();

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: "Unauthenticated"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        req.customer = decoded.customer;

        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Unauthenticated'
        });
    }
}

module.exports = auth;