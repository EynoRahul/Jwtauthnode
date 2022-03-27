import CustomErrorHandler from "../services/CustomErrorHandler";
import Jwtservice from "../services/JwtService";

const auth = async (req,res,next) => {
  let authHeader = req.headers.authorization;
  if(!authHeader){
      return next(CustomErrorHandler.unAuthrorized());
  }
  
  const token = authHeader.split(' ',)[1];
  console.log(token);
  
  try {
      const {_id,role} = await Jwtservice.verify(token);
      console.log(role);
      const user = {
          _id,
          role,
      }
      req.user = user;
      next();
  } catch (err) {
      return next(CustomErrorHandler.unAuthrorized());
  }
  
}
export default auth;