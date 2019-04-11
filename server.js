const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

app.get("/", (req, res) => {
  res.json({
    message: "working"
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Express App running on ${PORT}`);
});
