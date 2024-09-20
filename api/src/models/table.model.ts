import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class Table extends Model {
    id!: number;
    tableNumber!: number;
    capacity!: number;
    status!: string;
    isDeleted!: boolean;
}

Table.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tableNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize,
    modelName: "Table",
    tableName: "Tables",
    timestamps: true,
    paranoid: true,
});

export default Table;