import jwt from 'jsonwebtoken';
import User from './user.model';
import Token from '../../utils/interfaces/user.interface';


export const createToken = (user: User): string => {
    const secret : string = process.env.JWT_SECRET as string;

    const token : string = jwt.sign(
        { id: user.id }, 
        secret as jwt.Secret, 
        {expiresIn: '1d'}
        );

    console.log(token);
    return token;
};

/*
jwt.verify returns a promise. 
Resolve returns a value, in this case: payload as a Token {id: x, expiresIn: y}
Reject returns an object being an error.
*/

export const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);

                resolve(payload as Token);
            }
        );
    });
};

export default { createToken, verifyToken };