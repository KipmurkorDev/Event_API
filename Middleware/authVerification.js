const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (ex) {
    console.error("Token verification error:", ex);
    return null;
  }
}

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ error: "Missing authorization header" });

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer")
      return res.status(401).json({ error: "Malformed authorization" });
    const decodedToken = verifyToken(token);
    if (!decodedToken) return res.status(401).json({ error: "Invalid token" });

    // Store the decoded token's data in res.locals for future use
    res.locals.author = decodedToken.author;
    next();
  } catch (ex) {
    console.error("Authentication error:", ex);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authMiddleware;
