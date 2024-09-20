import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class Payment extends Model{
    id!: number;
    amount!: number;
    paymentType!: string;
    paymentDate!: Date;
    isDeleted!: boolean;
}

Payment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: "Payment",
    tableName: "Payments",
    timestamps: true,
    paranoid: true
});

export default Payment;