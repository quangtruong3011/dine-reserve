import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public isDeleted!: boolean;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

}, {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
    paranoid: true,
});

export default User;