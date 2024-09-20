import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class MenuItems extends Model{
    id!: number;
    name!: string;
    price!: number;
    imgUrl!: string;
    isDeleted!: boolean;
}

MenuItems.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: "MenuItems",
    tableName: "MenuItems",
    timestamps: true,
    paranoid: true
});

export default MenuItems;