import {Sequelize} from "sequelize";

const db = new Sequelize("productos", "", "", {
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false
});

export default db;