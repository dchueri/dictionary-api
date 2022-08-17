const db = require("../models");
const Repository = require("../repositories/Repository");
const Words = require("../utils/WordsImport");

const UserRepository = new Repository(db.Users);

class UserController {
  static async getUser(req, res) {
    try {
      const { id } = req.params;
      const me = await UserRepository.findOne(id);
      return res.status(200).json(me);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = req.body;
      const newUserCreated = await UserRepository.create(newUser);
      return res.status(200).json(newUserCreated);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }


}

module.exports = UserController;
