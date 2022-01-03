import express, {Request, response, Response} from "express";
import Product from "../models/product.model";
import authentification from "../../middleware/authentification";
import User from "../models/user.model";
import { Primitive } from "sequelize/dist/lib/utils";

const router = express.Router();

/*
Methods have to be async await because making querys to a bbdd has to use separate resources and has to 
execute asynchronously with the program. This way we can keep querys processing while executing program code.
*/

/*Validation is required althought return User object might not be used*/


//post product
router.post(
    "/post", async (req: Request, res: Response): Promise<Response> => {

        const user: string | User = await authentification(req, res);
    
        if(user instanceof User){
            try{
                const object = await Product.create(req.body);
                return res.status(201).json({object, status: "Athorised. Post correct"}); //200 OK
            }catch(e){
                return res.status(500).json({message: "Could not create object"}); //500 Internal Server Error
            }
            
        }

        return res.status(401).json({message: user});

    }
);

//get product
router.get("/get", async (req: Request, res: Response) : Promise<Response> => {
    
    const user: string | User = await authentification(req, res);
    
    if(user instanceof User){
        try{
            const object = await Product.findAll({where: {}});
            return res.status(200).json({object, status: "Authorised. Get correct", objects_returned: object.length}); //200 OK
        }catch(e){
            return res.status(500).json({message: "Could not get objects"});
        }
        
    }

    return res.status(401).json({message: user});
    
});

//put product
router.put("/update/:name", async (req: Request, res: Response): Promise<Response> => {

    const user: string | User = await authentification(req, res);
    
    if(user instanceof User){
        try{
            //get variable name
            const name = req.params.name;
            //find object with name input
            const objectToUpdate = await Product.findOne({where: {name: name}});
            if(!objectToUpdate) return res.status(404).json({message: "Object does not exist."}); //404 Not Found
            //update in bbdd and return the object
            const objectUpdated = await objectToUpdate.update({
                name: req.body.name,
                amount: req.body.amount,
                price: req.body.price,
            });

            return res.status(201).json({objectUpdated, status: name + " updated correctly."}); //202 Accepted
        }catch(e){
            return res.status(500).json({message: "Could not update object"});
        }
         
    }

    return res.status(401).json({message: user});

});

//delete product
router.delete("/delete/:name", async (req: Request, res: Response) => {

    const user: string | User = await authentification(req, res);
    
    if(user instanceof User){
        try{
            
            const name = req.params.name;
            const objectToDelete = await Product.findOne({where: {name}});
            if(!objectToDelete) return res.status(404).json({message: "Object does not exist."}); //404 Not Found

            await objectToDelete.destroy();

            return res.status(202).json({status: name + " deleted correctly"}); //202 Accepted


        }catch(e){
            return res.status(500).json({message: "Could not delete object"}); //500 Internal Server Error
        }
        
    }

    return res.status(401).json({message: user});
});

export default router;
