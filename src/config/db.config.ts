import {Sequelize} from "sequelize";

const db = new Sequelize("productos", "", "", {
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false,
    define: {
        timestamps: false //disable createdAt and updatedAt columns generated automatically in sequelize
    }
});

export default db;