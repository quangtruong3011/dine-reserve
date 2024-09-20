import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class InvoiceDetail extends Model {
    id!: number;
    invoiceId!: number;
    productId!: number;
    quantity!: number;
    price!: number;
    isDeleted!: boolean;
}

InvoiceDetail.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
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
    modelName: "InvoiceDetail",
    tableName: "InvoiceDetails",
    timestamps: true,
    paranoid: true
});

export default InvoiceDetail;