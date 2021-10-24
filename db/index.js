const fs = require("fs");
const util = require("util");
const uuidv1 = require("uuid/v1");

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readAsync("db/db.json", "utf-8");
    }
    write(data) {
        return writeAsync("db/db.json", JSON.stringify(data));
    }
    readNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
            parsedNotes = [];
        }
        return parsedNotes;
        });
    }
    addNote(data) {
        const { title, text } = data;

        const newNote = {
            title,
            text,
            id: uuidv1(),
        };
        return this.readNotes()
            .then((data) => [...data, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }
    deleteNote(id) {
        return this.readNotes()
            .then((data) => data.filter((note) => note.id !== id))
            .then((updatedNotes) => this.write(updatedNotes));
    }
}

module.exports = new Notes();