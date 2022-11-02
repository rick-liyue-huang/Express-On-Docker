const express = require("express");
const mongoose = require("mongoose");
const {
	MONGO_IP,
	MONGO_PASSWORD,
	MONGO_USER,
	MONGO_PORT,
} = require("./config/config");
const postRouter = require("./routes/postRoute");
const authRouter = require("./routes/authRoute");

const app = express();

app.use(express.json());

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
	mongoose
		.connect(mongoURL, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			// useFindAndModify: false,
		})
		.then(() => {
			console.log("successed to Mongo DB");
		})
		.catch((err) => {
			console.log(err);
			setTimeout(connectWithRetry, 5000);
		}); // docker inspect express-on-docker-mongo-1
};

connectWithRetry();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("<h2>Home  page!</h2>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", authRouter);

app.listen(port, () => {
	console.log(`this server is running on port of ${port}`);
});
