import argon2 from "argon2";
import jwt from "jsonwebtoken";

import logger from "#configs/logger.js";
import { User } from "#database/index.js";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export default async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.sendError(400, "Username and password are required");
		}

		const user = await User.findOne({ where: { username } });

		if (!user) {
			return res.sendError(404, "User not found");
		}

		const isPasswordValid = await argon2.verify(user.password, password);

		if (!isPasswordValid) {
			return res.sendError(401, "Invalid password");
		}

		const token = jwt.sign({ username: user.username }, SECRET_KEY);
		req.user = { username: user.username };

		const data = {
			username: user.username,
			role: user.role,
			token,
		};
		logger.warn("User Logged", { "Auth User": user.username });
		return res.sendSuccess(200, data);
	} catch (error) {
		logger.error("Sign-in error:", error);
		return res.sendError(500, "Internal server error");
	}
};
