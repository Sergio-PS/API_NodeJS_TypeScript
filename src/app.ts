import express, { Application} from "express";
import db from "./config/db.config";
import router from "./resources/endpoints/endpoints";


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


        this.express.use("/api", router);
    }


    public listen(): void{
        this.express.listen(this.port, () => {
            console.log(`App listening on port: ${this.port}`);
        })
    }

}


export default App;