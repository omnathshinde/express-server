import { Sequelize } from "sequelize";

import dbConfig from "#database/configs.js";
import hooks from "#database/hooks.js";
import models from "#database/models.js";

const sequelize = new Sequelize(dbConfig);
await hooks(sequelize);
export const db = await models(sequelize);
export default sequelize;
export const { User } = db;
