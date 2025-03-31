require("dotenv").config();
const express = require("express");
const { syncDB } = require("./models");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Sync database on startup
syncDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
