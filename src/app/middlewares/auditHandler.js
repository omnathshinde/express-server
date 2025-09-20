import asyncLocalStorage from "#src/app/constants/asyncLocalStorage.js";

export default (req, res, next) => {
	asyncLocalStorage.run({ user: req.user?.username || "system" }, () => next());
};
