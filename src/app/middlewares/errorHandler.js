export default (error, request, response, next) => {
	let statusCode = error.statusCode || 500;
	let title = "Internal Server Error";

	switch (statusCode) {
		case 400:
			title = "Bad Request";
			break;
		case 401:
			title = "Unauthorized";
			break;
		case 403:
			title = "Forbidden";
			break;
		case 404:
			title = "Not Found";
			break;
		case 502:
			title = "Bad Gateway";
			break;
		case 503:
			title = "Service Unavailable";
			break;
		case 504:
			title = "Gateway Timeout";
			break;
	}

	if (request.transaction) {
		request.transaction.rollback();
	}

	response.status(statusCode).json({
		success: false,
		message: title,
		name: error.name,
		error,
		stack: error.stack,
	});

	next();
};
