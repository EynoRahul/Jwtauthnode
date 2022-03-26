import Joi from 'Joi';
import {User} from '../../models';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import CustomErrorHandler from '../../services/CustomErrorHandler';

 const registerController = {

    async register(req,res,next) {
    
    // Check list 
    // validate the request 
    // authorise the rquest 
    // check user if is in the data base already
    // preapare model 
    // store in database
    // generate jwt token
    // send response

    // validation 

    const registerSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        repeat_password: Joi.ref('password')
    });

    console.log(req.body);

    const {error} = registerSchema.validate(req.body);

    if(error){
       return next(error);
    }
    
    // check if user in the data base is already

    try {
        const exist = await User.exists({email: req.body.email});
        if(exist){
            return next(CustomErrorHandler.alreadyExist('This email is already taken'));
        }

    } catch (err) {
        return next(err);
    }

    const {name,email,password} = req.body;
    
    // Hash Password 

    const hashedPassword = await bcrypt.hash(password,10);

    // Prepare the model 


    const user = new User({
        name,
        email,
        password:hashedPassword
    });

    let access_token;

    try {
        const result = await user.save();
        console.log(result);
      access_token = JwtService.sign({_id:result._id,role:result.role});
    } catch (err) {
        return next(err);
    }

    res.json({access_token:access_token});

    }
} 

export default registerController;