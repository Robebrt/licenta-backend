import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Utilizatori from "./utilizatoriModel.js";
import Comentariu from "./comentariiModel.js";

class Apreciere extends Model {}

Apreciere.init(
  {
    ID_Apreciere: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_Comentariu: {
      type: DataTypes.INTEGER,
      references: {
        model: Comentariu,
        key: "ID_Comentariu",
      },
      allowNull: false,
    },
    ID_Utilizator: {
      type: DataTypes.INTEGER,
      references: {
        model: Utilizatori,
        key: "ID_Utilizator",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Apreciere",
    tableName: "Aprecieri_Comentarii",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log(
      'Tabela "Aprecieri_Comentarii" a fost creată/sincronizată în baza de date'
    );
  })
  .catch((err) => {
    console.error(
      'Eroare la sincronizarea modelului "Apreciere" cu baza de date:',
      err
    );
  });

export default Apreciere;
