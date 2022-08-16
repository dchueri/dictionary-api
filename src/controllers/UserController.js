const db = require("../models");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const allUsers = await db.Users.findAll();
      return res.status(200).json(allUsers);
    } catch (e) {
      return res.status(500).json("error: " + e.message);
    }
  }

  static async getUser(req, res) {
    try {
      const { id } = req.params;
      const me = await db.Users.findOne({ where: { id: id } });
      return res.status(200).json(me);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = req.body;
      const newUserCreated = await db.Users.create(newUser);
      return res.status(201).json(newUserCreated);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }
}

module.exports = UserController;
