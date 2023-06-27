import { Sequelize } from "sequelize";

const sequelize = new Sequelize("re109", "root", "orison", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
