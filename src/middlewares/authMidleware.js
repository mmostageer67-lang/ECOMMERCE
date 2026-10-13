const jwt = require('jsonwebtoken');
const User = require('../modules/user/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'fail',
        message: 'Not authorized, no token provided',
      });
    }

    const token = authHeader.split(' ')[1];
if (!token) {                                                                                                            
      return res.status(401).json({                                                                                          
        status: 'fail',                                                                                                      
        message: 'Not authorized, no token provided',                                                                        
      });                                                                                                                    
    }                
    const decoded = jwt.verify(token, process.env.PROD_JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'User belonging to this token no longer exists',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
