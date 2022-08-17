const bodyParser = require("body-parser");
const usersRoutes = require("./usersRoutes");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(usersRoutes);
  app.get("/", (req, res) =>
    res.status(200).send({ message: "Fullstack Challenge 🏅 - Dictionary" })
  );
};
