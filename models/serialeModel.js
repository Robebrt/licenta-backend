import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Seriale extends Model {}

Seriale.init(
  {
    ID_Serial: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Titlu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    An_inceput: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    An_sfarsit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Gen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Actori: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Sezoane: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IMDB_Rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Descriere: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Seriale",
    tableName: "Seriale",
    timestamps: false,
  }
);
sequelize
  .sync()
  .then(() => {
    console.log('Tabela "Seriale" a fost creată/sincronizată în baza de date');
  })
  .catch((err) => {
    console.error(
      'Eroare la sincronizarea modelului "Seriale" cu baza de date:',
      err
    );
  });

export default Seriale;
