import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class Customer extends Model {
    id!: number;
    name!: string;
    email!: string;
    phone!: string;
    isDeleted!: boolean;
}

Customer.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize,
    modelName: "Customer",
    tableName: "Customers",
    timestamps: true,
    paranoid: true,
});

export default Customer;