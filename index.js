const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

require('dotenv').config({ path: './config/dev.env' });


// set up express server

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`The server has started on port ${PORT}`);
})

// Set up mongoose
mongoose.connect(
   process.env.MONGODB_KEY,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  ).then(
      console.log("MongoDB connection established")
  ).catch(err => console.log(err));


app.use("/users", require("./routes/userRoute"));
app.use("/nodes", require("./routes/nodeRoutes"));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/*", (req, res) => {
  console.log("heheh")
  res.sendFile(path.join(__dirname, "./client/build/"));
});