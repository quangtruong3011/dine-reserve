import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class ReservationItem extends Model{
    id!: number;
    reservationId!: number;
    menuId!: number;
    quantity!: number;
}

ReservationItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reservationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    menuId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "ReservationItem",
    tableName: "ReservationItems",
    timestamps: true,
    paranoid: true
});

export default ReservationItem;