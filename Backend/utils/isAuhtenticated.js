import jwt from 'jsonwebtoken'


const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Login first" });
    }
  
    // Verify the token using JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      req.userID = decoded.userID; // Attach userID to the request object
      next(); // Proceed to the next middleware or route handler
    });
  };
  export default isAuthenticated 