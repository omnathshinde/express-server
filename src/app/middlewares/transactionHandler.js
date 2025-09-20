import sequelize from "#app/database/index.js";

export default async (req, res, next) => {
	const transaction = await sequelize.transaction();
	req.transaction = transaction;
	try {
		await next();
		await transaction.commit();
	} catch (error) {
		await transaction.rollback();
		next(error);
	}
};
