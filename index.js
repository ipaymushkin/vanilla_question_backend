const express = require("express");
const app = express();
const PORT = '5050';

const test = require('./test');

app.use("/test", test);

app.listen(PORT, () => {
    console.log("Server is running in port 5050");
});
