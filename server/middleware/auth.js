import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (request, response, next) => {
  const token = request.headers["authorization"].split(" ")[1];

  if (!token) {
    return response.status(403).send("A token is required for authentication");
  }

  try {
    request.user = jwt.verify(token, config.TOKEN_KEY);
  } catch (err) {
    return response.status(401).send("Invalid Token");
  }

  return next();
};

export { verifyToken };
