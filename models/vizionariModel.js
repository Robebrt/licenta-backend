import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Filme from "./filmeModel.js";
import Seriale from "./serialeModel.js";
import Utilizatori from "./utilizatoriModel.js";
import Episoade from "./episoadeModel.js";

class Vizionari extends Model {}

Vizionari.init(
  {
    ID_Vizionare: {
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
    ID_Episod: {
      type: DataTypes.STRING,
      references: {
        model: Episoade,
        key: "ID_Episod",
      },
      allowNull: true,
    },
    Data_vizionare: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Vazut_complet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Preferat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Vizionari",
    tableName: "Vizionari",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log(
      'Tabela "Vizionari" a fost creată/sincronizată în baza de date'
    );
  })
  .catch((err) => {
    console.error(
      'Eroare la sincronizarea modelului "Vizionari" cu baza de date:',
      err
    );
  });

export default Vizionari;
