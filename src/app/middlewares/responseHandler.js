import logger from "#configs/logger.js";
const toPlain = (data) => {
	if (Array.isArray(data)) {
		return data.map((d) => (typeof d?.get === "function" ? d.get({ plain: true }) : d));
	}
	return typeof data?.get === "function" ? data.get({ plain: true }) : data;
};

export default (req, res, next) => {
	res.sendSuccess = (statusCode = 200, data = null) => {
		let response = { success: true };
		if (typeof data != "string") {
			response = toPlain(data);
		} else {
			response.message = data;
		}
		logger.info(`${statusCode} - ${response.message || "Success"}`);
		return res.status(statusCode).json(response);
	};

	res.sendError = (statusCode = 500, message = "Catch Error") => {
		const response = { success: false, message: message };
		logger.error(`${response.message}`);
		return res.status(statusCode).json(response);
	};
	next();
};
