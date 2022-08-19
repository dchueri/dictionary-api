const express = require("express");
const routes = require("./routes");
const { insertWordsIntoDB } = require("./utils/WordsImport");

const app = express();

routes(app);

insertWordsIntoDB();

module.exports = app;
