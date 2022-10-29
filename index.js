const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send("<h2>Home page</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`this server is running on port of ${port}`);
});
