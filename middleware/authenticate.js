const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err)
                res.status(401).json({
                    message: "Invalid token",
                });
            else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "No token provided" });
    }
};
