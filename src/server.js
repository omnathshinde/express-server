import app from "#src/app.js";

// 🌍 Config
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// 🚀 Start Server
(async () => {
	try {
		console.clear();
		app.listen(PORT, HOST, () => {
			console.log(`Server running at http://${HOST}:${PORT}`);
		});
	} catch (error) {
		console.error("❌ Server startup failed:", error.message);
		process.exit(1);
	}
})();
