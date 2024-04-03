import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
export const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return response
      .status(301)
      .json({ msg: "Requested resource require authentication" });
    }
    
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, (error, user) => {
        if (error) return response.status(301).json({ msg: "Invalid Token Passed" })
        
        request.user = user;
        next()
    })
};
