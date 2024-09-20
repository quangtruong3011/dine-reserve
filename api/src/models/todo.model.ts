import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class Todo extends Model {
    public id!: number;
    public title!: string;
    public completed!: boolean;
    public isDeleted!: boolean;
}

Todo.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize,
    modelName: "Todo",
    tableName: "Todos",
    timestamps: true,
    paranoid: true,
});

export default Todo;