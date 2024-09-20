import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class Invoice extends Model {
    id!: number;
    reservationId!: number;
    total!: number;
    isDeleted!: boolean;
}

Invoice.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reservationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: "Invoice",
    tableName: "Invoices",
    timestamps: true,
    paranoid: true
});

export default Invoice;