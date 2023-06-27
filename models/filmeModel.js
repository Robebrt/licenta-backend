import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Filme extends Model {}

Filme.init(
  {
    ID_Film: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    Titlu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    An_Lansare: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Regizor: {
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
    IMDB_Rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Descriere: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Durata: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Filme",
    tableName: "Filme",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log('Tabela "Filme" a fost creată/sincronizată în baza de date');
  })
  .catch((err) => {
    console.error(
      'Eroare la sincronizarea modelului "Filme" cu baza de date:',
      err
    );
  });

export default Filme;
