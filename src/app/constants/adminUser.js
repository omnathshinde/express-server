import { User } from "#app/database/index.js";

export default async () => {
	try {
		const [user, created] = await User.findOrCreate({
			where: { username: "admin" },
			defaults: { username: "admin", password: "Admin@123" },
			logging: false,
		});

		if (created) {
			console.log("🛡️ Admin created:", user.username);
		} else {
			console.log("🔰 Admin already exists:", user.username);
		}
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError") {
			console.log("🔰 Admin already exists (caught unique constraint)");
		} else {
			console.error("❌ Failed to seed admin user:", error);
		}
	}
};
