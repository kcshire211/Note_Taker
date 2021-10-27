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
  
  router.delete("/notes/:id", (req, res) => {
    readAsync("db/db.json", "utf-8")
      .then((data) => {
        const parsedData = JSON.parse(data)
        const deleteNotes = []
        for(let i= 0; i< parsedData.length; i++) {
          if(parsedData[i].id !== req.params.id) {
            deleteNotes.push(parsedData[i]) 
          } 
        } 
        return writeAsync("db/db.json", JSON.stringify(deleteNotes));
      })
      .then(() => {
        res.json({ok: true})
      })
      .catch((err) => res.status(500).json(err));
  });
  
  module.exports = router;