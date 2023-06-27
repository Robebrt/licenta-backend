import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Seriale from "./serialeModel.js";

class Episoade extends Model {}

Episoade.init(
  {
    ID_Episod: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Titlu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Sezon: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Episod: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Durata: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descriere: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IMDB_Rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ID_Serial: {
      type: DataTypes.STRING,
      references: {
        model: Seriale,
        key: "ID_Serial",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Episoade",
    tableName: "Episoade",
    timestamps: false,
  }
);
sequelize
  .sync()
  .then(() => {
    console.log('Tabela "Episoade" a fost creată/sincronizată în baza de date');
  })
  .catch((err) => {
    console.error(
      'Eroare la sincronizarea modelului "Episoade" cu baza de date:',
      err
    );
  });

export default Episoade;
