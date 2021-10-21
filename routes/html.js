const router = require("express").Router();
const path = require("path");

//create a route that goes to /notes and reads notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//create a route that only opens index.html
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;