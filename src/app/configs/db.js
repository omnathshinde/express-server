import tableRelationship from "#app/constants/tableRelationship.js";
import sequelize from "#app/database/index.js";
import logger from "#configs/logger.js";

export default async () => {
	try {
		console.log("⏳ Connecting to database...");
		await sequelize.authenticate();
		await sequelize.sync();

		const modelNames = Object.keys(sequelize.models);
		console.log("✅ Database connected successfully!");
		console.log("📌 Synchronized Models:", modelNames.length ? modelNames : "None");
		console.log("🔍 Table Relationships:");
		tableRelationship(sequelize);
	} catch (error) {
		logger.error("❌ Database connection failed:", error.message);
		console.error("❌ Database connection failed:", error.message);
		console.error(error);
		process.exit(1);
	}
};
