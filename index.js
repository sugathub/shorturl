const express = require("express");
const path = require('path');
const { connectToMongoDB } = require("./connect");


const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const port = 8001;

// ✅ Correct DB connection handling
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB error:", err));

app.set('view engine', "ejs");
app.set('views',path.resolve("./views"));

// ✅ Middleware to read JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ✅ Correct route + correct variable name
app.use('/url', urlRoute);

app.use('/user', userRoute);

app.use('/',staticRouter);


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(), // ✅ correct structure
                    },
                },
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).send("URL not found"); // ✅ safety
        }

        res.redirect(entry.redirectURL); // ✅ fixed typo
    } catch (err) {
        res.status(500).send("Server error");
    }
});

app.listen(port, () => console.log(`Server started at port: ${port}`));