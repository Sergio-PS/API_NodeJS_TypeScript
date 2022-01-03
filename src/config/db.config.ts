import {Sequelize} from "sequelize";

const db = new Sequelize("bbdd", "", "", {
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false,
    define: {
        timestamps: false //disable createdAt and updatedAt columns generated automatically in sequelize
    }
});

export default db;