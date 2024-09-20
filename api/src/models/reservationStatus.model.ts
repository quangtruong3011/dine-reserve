import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db.config";

class ReservationStatus extends Model {
    id!: number;
    name!: string;
}

ReservationStatus.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: "ReservationStatus",
    tableName: "ReservationStatuss",
    timestamps: false
});

export default ReservationStatus;