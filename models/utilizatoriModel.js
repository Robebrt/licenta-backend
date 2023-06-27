import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Utilizatori extends Model {}

Utilizatori.init(
  {
    ID_Utilizator: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nume_utilizator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Parola: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Prenume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Tip_utilizator: {
      type: DataTypes.ENUM("normal", "admin"),
      defaultValue: "normal",
    },
  },
  {
    sequelize,
    modelName: "Utilizatori",
    tableName: "Utilizatori",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log('Tabela "Utilizatori" a fost creată/sincronizată în baza de date');
  })
  .catch((err) => {
    console.error(
      'Eroare la sincronizarea modelului "Utilizatori" cu baza de date:',
      err
    );
  });

export default Utilizatori;
