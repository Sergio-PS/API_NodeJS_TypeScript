import express, {Request, Response} from "express";
import User from "../models/user.model";
import Token from "../models/token";

const router = express.Router();

//register user
router.post("/register", async (req: Request, res: Response) => {
    try{

        const user = await User.create(req.body);
        const token : string = Token.createToken(user);

        return res.status(201).json({user: user, token: token, status: "successfull register"}); //201 Created token: token

    }catch(e){
        return res.status(500).json({message: "fail to register", route: "/register"}); //500 Internal Server Error
    }
});

//login
router.post("/login", async (req: Request, res: Response) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        const user = await User.findOne({where: {email: email}});

        if(!user) return res.status(404).json({message: "unable to find user with this email address"}); //404 Not Found
        if(!await user.isValidPassword(password)) return res.status(401).json({message: "invalid password credentials"}); //401 Unauthorised

        const token = Token.createToken(user);

        return res.json({token: token, status: "successfull login"});
        
    }catch(e){
        return res.status(500).json({message: "fail to login", route: "/login"}); //500 Internal Server Error
    }
});

export default router;
