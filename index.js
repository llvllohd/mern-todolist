const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// routes
const todo = require("./routes/todo");
const { patch } = require("./routes/todo");
app.use("/todo", todo);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendfile(patch.join(__dirname, "client", "build", "index.html"));
  });
}

const tododb = "tododb";
const uri = process.env.mongodb || `mongodb://localhost:27017/${tododb}`;

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      process.exit(1);
      console.log("Unable to connect to the " + tododb);
    } else {
      console.log("Successfully connected to the " + tododb);
    }
  }
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App is running on port " + port);
});
