const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./models/User");
require("./config/passport");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(res => console.log("connection successfull"))
  .catch(err => console.log(err));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["someRAndomString"]
  })
);

app.use(passport.initialize()); // used to intialize passport
app.use(passport.session()); // used to persist user login

require("./routes/api/auth")(app);
require("./routes/api/todos")(app);

// app.get("/", (req, res) => {
//   res.json({
//     message: "working"
//   });
// });

// serve production assets like index.html, main.css file etc
app.use(express.static("./client/build"));

// If there is a incoming route request that our express app doesn't understand then just forward it to index.html to see if it gets resolved there --> Kicks the user to the client side application
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);
