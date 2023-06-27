import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Utilizatori from "./utilizatoriModel.js";
import Filme from "./filmeModel.js";
import Seriale from "./serialeModel.js";

class Comentariu extends Model {}

Comentariu.init(
  {
    ID_Comentariu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_Utilizator: {
      type: DataTypes.INTEGER,
      references: {
        model: Utilizatori,
        key: "ID_Utilizator",
      },
      allowNull: false,
    },
    Comentariu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ID_Film: {
      type: DataTypes.STRING,
      references: {
        model: Filme,
        key: "ID_Film",
      },
      allowNull: true,
    },
    ID_Serial: {
      type: DataTypes.STRING,
      references: {
        model: Seriale,
        key: "ID_Serial",
      },
      allowNull: true,
    },
    Data_Postare: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Aprecieri: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comentariu",
    tableName: "Comentariu",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log(
      'Tabela "Comentariu" a fost creată/sincronizată în baza de date'
    );
  })
  .catch((err) => {
    console.error(
      'Eroare la sincronizarea modelului "Comentarii" cu baza de date:',
      err
    );
  });

export default Comentariu;
