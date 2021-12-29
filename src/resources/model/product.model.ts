import { DataTypes, Model } from "sequelize";
import ProductInterface from "../../utils/interfaces/product.interface";
import db from "../../config/db.config";

//creating a Product class that extends from sequelize model and is casted to ProductInterface <>
class Product extends Model<ProductInterface>{}

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
}, {
    sequelize: db,
    tableName: "product",
});

export default Product;