const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config/dev.env' });


// set up express server

const app = express();
app.use(express.json());
app.use(cors());

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
  