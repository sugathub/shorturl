const express = require("express");

const { connectToMongoDB } = require("./connect");
const urlRoute = require('./routes/url');

const app = express();
const port = 8001;

// ✅ Correct DB connection handling
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB error:", err));

// ✅ Middleware to read JSON
app.use(express.json());

// ✅ Correct route + correct variable name
app.use('/url', urlRoute);

app.listen(port, () => console.log(`Server started at port: ${port}`));