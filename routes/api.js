const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const uuidv1 = require("uuid/v1");

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

router.get("/notes", (req, res) => {
   readAsync("db/db.json", "utf-8")
      .then((data) => {
        res.json(JSON.parse(data));
      })
      .catch((err) => res.status(500).json(err));
  });

  router.post("/notes", (req, res) => {
    readAsync("db/db.json", "utf-8")
      .then((data) => {
        const newNote = {
          title: req.body.title,
          text: req.body.text,
          id: uuidv1()
        }
       const parsedData = JSON.parse(data)
        parsedData.push(newNote)
        return writeAsync("db/db.json", JSON.stringify(parsedData));
      })
      .then(() => {
        res.json({ok: true})
      })
      .catch((err) => res.status(500).json(err));
  });
  
  //router.delete("/notes/:id", (req, res) => {
  //   notes
  //     .deleteNote(req.params.id)
  //     .then(() => res.json({ ok: true }))
  //     .catch((err) => res.status(500).json(err));
  // });
  
  module.exports = router;