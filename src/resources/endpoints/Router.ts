import express, {Request, Response} from "express";
import Product from "../model/product.model";

const router = express.Router();

/*
Methods have to be async await because making querys to a bbdd has to use separate resources and has to 
execute asynchronously with the program. This way we can keep querys processing while executing program code.
*/

router.post(
    "/post", async (req: Request, res: Response) => {
        try{
            const object = await Product.create(req.body);
            return res.json({object, status: "Post correct"});
        }catch(e){
            return res.json({message: "fail to post", status: 500, route: "/post"});
        }
    }
);

router.get("/get", async (req: Request, res: Response)=> {
    try{
        const object = await Product.findAll({where: {}});
        return res.json({object, status: "Get correct", objects_returned: object.length});
    }catch(e){
        return res.json({message: "fail to get", status: 500, route: "/get"});
    }
});

router.put("/update/:name", async (req: Request, res: Response) => {
    try{
        //get variable name
        const name = req.params.name;
        //find object with name input
        const objectToUpdate = await Product.findOne({where: {name}});
        if(!objectToUpdate) return res.json({message: "Object does not exist."});
        //update in bbdd and return the object
        const objectUpdated = await objectToUpdate.update({
            name: req.body.name,
            amount: req.body.amount,
            price: req.body.price,
        });

        return res.json({objectUpdated, status: name + " updated correctly."});
    }catch(e){
        return res.json({message: "fail to update", status: 500, route: "/update"})
    }
});


router.delete("/delete/:name", async (req: Request, res: Response) => {
    try{
        const name = req.params.name;
        const objectToDelete = await Product.findOne({where: {name}});
        if(!objectToDelete) return res.json({message: "Object does not exist."});

        await objectToDelete.destroy();

        return res.json({status: name + " deleted correctly"});

    }catch(e){
        return res.json({message: "fail to update", status: 500, route: "/update"})
    }
});


export default router;
