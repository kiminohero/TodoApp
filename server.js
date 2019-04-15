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

app.get("/", (req, res) => {
  res.json({
    message: "working"
  });
});
const PORT = 5000 || process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`Express App running on ${PORT}`);
});
