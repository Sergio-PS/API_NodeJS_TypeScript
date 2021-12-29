import express, {Request, Response} from "express";
import Product from "../model/product.model";

const router = express.Router();

router.post(
    "/post", async (req: Request, res: Response)=> {
        try{
            const object = await Product.create(req.body);
            return res.json({object, msg: "Post correct"});
        }catch(e){
            return res.json({msg: "fail to post", status: 500, route: "/post"});
        }
    }
);

router.get("/get", async (req: Request, res: Response)=> {
    try{
        const object = await Product.findAll({where: {}});
        return res.json({object, msg: "Get correct"});
    }catch(e){
        return res.json({msg: "fail to get", status: 500, route: "/get"});
    }
})

export default router;
