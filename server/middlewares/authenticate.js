const {validateSession} = require("../controller/session");
const {getUserById} = require("../controller/user");

module.exports = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ");
    if (!token) return res.status(400).json({message: "You need to provide a token"});
    if (!(token.length === 2 && token[0] === "Bearer")) return res.status(400).json({message: "You need to provide a bearer token"});

    const user = await validateSession(token[1]);
    if (user === null) return res.status(401).json({message: "The provided token is incorrect"});

    req.user = await getUserById(user.userId);
    if (req.user === null) return res.status(401).json({message: "The provided token is incorrect"});

    next();
}