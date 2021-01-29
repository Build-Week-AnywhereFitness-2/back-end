function validateUserCreds() {
        return function (req, res, next) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Missing required parameters: (username, password)"
            });
        }

        req.credentials = {
            username,
            password
        }

        next();
    }
}

module.exports = validateUserCreds;