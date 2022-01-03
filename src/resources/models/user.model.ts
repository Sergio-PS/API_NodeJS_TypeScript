import { DataTypes, Model } from "sequelize";
import UserInterface from "../../utils/interfaces/user.interface";
import db from "../../config/db.config";
import bcrypt from "bcrypt";

class User extends Model<UserInterface>{
    public id!: number;
    public name!: string;
    public password!: string;

    public isValidPassword = async  (
        passwordToCheck: string
    ): Promise<Error | boolean> => {
        return await bcrypt.compare(passwordToCheck, this.password);
    };
}

User.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    
    sequelize: db,
    tableName: "user",
    timestamps: true //we want to know when the user was created
});

//define hooks
User.beforeSave(async (user, options) => {
    if(user.changed()){
        const hash = await bcrypt.hash(user.password, 10);

        user.password = hash; //
    }
});


export default User;