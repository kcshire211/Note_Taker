const express = require("express");
const htmlroutes = require("./routes/html");
const apiRoutes = require("./routes/api");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlroutes);

app.listen(PORT, () =>
    console.log('App listening at http://localhose:${PORT}')
);