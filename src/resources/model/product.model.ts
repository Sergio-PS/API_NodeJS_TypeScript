import { DataTypes, Model } from "sequelize";
import ProductInterface from "../../utils/interfaces/product.interface";
import db from "../../config/db.config";

//creating a Product class that extends from sequelize model and is casted to ProductInterface <>
class Product extends Model<ProductInterface>{}

Product.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    amount: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: false
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: false
    }
}, {
    sequelize: db,
    tableName: "product",
});

export default Product;