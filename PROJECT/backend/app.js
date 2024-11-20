const express = require("express");
const bodyParser = require("body-parser");
const registerRoute = require("../routes/register");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.use("/api/register", registerRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
