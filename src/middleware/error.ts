import { Request, Response, NextFunction } from 'express';
import HTTPException from "../utils/exceptions/http.exception";

//como no se crea una clase, se debe utilizar "function" ya que esto viene de javascript
//si no se utiliza "function", se debe crear una clase con su funcion publica y constructor.
function validateError(
    error: HTTPException,
    req: Request,
    res: Response,
    next: NextFunction,
): void{
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    res.status(status).send({
        status,
        message,
    });
}

export default validateError;