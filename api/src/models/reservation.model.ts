import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class Reservation extends Model {
    id!: number;
    customerId!: number;
    tableId!: number;
    reservationDate!: Date;
    reservationTime!: string;
    status!: string;
    isDeleted!: boolean;
}

Reservation.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tableId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reservationDateTime: {
        type: DataTypes.DATE,
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
    }
}, {
    sequelize,
    modelName: "Reservation",
    tableName: "Reservations",
    timestamps: true,
    paranoid: true
});

export default Reservation;