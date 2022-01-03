import express, { Application} from "express";
import db from "./config/db.config";
import morgan from "morgan";
import RouterCRUD from "./resources/endpoints/product.router";
import RouterUser from "./resources/endpoints/user.router";
import dotenv from "dotenv";

dotenv.config(); //Configure env variables in project


class App {
    public express: Application;
    public port: number;

    constructor(){
        this.express = express();
        this.port = 8000;

        this.connectToDb();
        this.initialiseMiddleware();
    }


    private connectToDb(): void{
        //connect to sqlite db
        db.sync().then(() => {
            console.log("connected to db");
        });
    }

    private initialiseMiddleware(): void{
        this.express.use(express.json());
        this.express.use(morgan('dev')); //morgan module tracks api request and logs them

        //calling express middleware to set created routes
        this.express.use("/api", RouterCRUD);
        this.express.use("/api", RouterUser);
    }


    public listen(): void{
        this.express.listen(this.port, () => {
            console.log(`App listening on port: ${this.port}`);
        })
    }

}


export default App;