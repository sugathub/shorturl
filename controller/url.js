const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: 'url is required' });
    }

    const shortId = shortid();

    await URL.create({
        shortId: shortId,              // ✅ correct field
        redirectURL: body.url,         // ✅ correct value
        visitHistory: [],
        createdBy: req.user._id,
    });
   const allUrls = await URL.find({
    createdBy: req.user._id,
});

return res.render('Home', {
    id: shortId,
    urls: allUrls,
    host: `${req.protocol}://${req.get("host")}`,
});
}
// -------------------------------------------------
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    try {
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.json({
            totalClicks: result.visitHistory.length, // ✅ better naming
            analytics: result.visitHistory,
        });

    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
}

async function handleDeleteURL(req, res) {
    const shortId = req.params.shortId;

    await URL.deleteOne({
        shortId,
        createdBy: req.user._id,
    });

    return res.redirect("/");
}


module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleDeleteURL,
};