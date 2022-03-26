import CustomErrorHandler from "../services/CustomErrorHandler";
import Jwtservice from "../services/JwtService";

const auth = async (req,res,next) => {
  let authHeader = req.headers.authorization;
  if(!authHeader){
      return next(CustomErrorHandler.unAuthrorized());
  }
  
  const token = authHeader.split(' ',)[1];
  
  try {
      const {_id,role} = Jwtservice.verify(token);
      const user = {
          _id,
          role
      }
      console.log(req.user);
      req.user = user;
      next();
  } catch (err) {
      return next(CustomErrorHandler.unAuthrorized());
  }
  
}

export default auth;