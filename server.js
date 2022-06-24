const express = require("express");
const app = express();
const cors = require("cors");
const originURL = ["https://athletistan.netlify.app"];
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: originURL,
    credentials: true,
  })
);
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/routes/signin_api/", require("./routes/signin_api"));
app.use("/routes/olympics/", require("./routes/olympics"));
app.use("/routes/guinness/", require("./routes/guinness"));
app.use("/routes/dashboard/", require("./routes/dashboard"));
app.use("/routes/home/", require("./routes/home"));
app.use("/routes/searchacoach/", require("./routes/searchacoach"));
app.use("/routes/poa/", require("./routes/poa"));

app.listen(port, () => {
  console.log("Server is running on port http://localhost:5000/");
});
