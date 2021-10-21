const router = require("express").Router();
const notes = require("../db/index");
const { route } = require("./html");

router.get("/notes", (req, res) => {
    notes
      .readNotes()
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  });

  router.post("/notes", (req, res) => {
    notes
      .addNote(req.body)
      .then((note) => res.json(note))
      .catch((err) => res.status(500).json(err));
  });
  
  router.delete("/notes/:id", (req, res) => {
    notes
      .deleteNote(req.params.id)
      .then(() => res.json({ ok: true }))
      .catch((err) => res.status(500).json(err));
  });
  
  module.exports = router;