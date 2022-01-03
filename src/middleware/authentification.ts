
import {Request, Response, NextFunction} from "express";
import token from "../resources/models/token";
import jwt from "jsonwebtoken";
import User from "../resources/models/user.model";

async function authentification(
    req: Request,
    res: Response
): Promise<string | User> {
    //const response : Response = res.status(401).json({message: "Unauthorised"});
    const response: string = "Unauthorised";

    const bearer : string | undefined = req.headers.authorization; //Returns token with Bearer word in it. such as: Bearer eyJhbGciOiJIUzI1NiI...

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return response;
    }

    const accessToken = bearer.split('Bearer ')[1].trim();

    

    try {
        const payload = await token.verifyToken(accessToken);
        
        if (payload instanceof jwt.JsonWebTokenError){
            console.log("error");
            return response;
        }
        const user = await User.findOne({attributes: {exclude: ["password"]}, where: {id: payload.id}}); //

        if (!user){
            return  response;
        }

        return user;
    } catch (error) {
        return response;
    }
}

export default authentification;
