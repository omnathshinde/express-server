import "dotenv/config";

import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.status(200).json({ message: "Hello World!" });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

(async () => {
	app.listen(PORT, HOST, () => {
		console.log(`Server running at http://${HOST}:${PORT}`);
	});
})();
