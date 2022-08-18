const db = require("../models");
const Repository = require("../repositories/Repository");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository(db.Users);

class UserController {
  static async getUser(req, res) {
    try {
      const { id } = req.params;
      const me = await UserRepository.findOneById(id);
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

  static async addFavoriteWord(req,res) {
    try {
      const {word} = req.params;
      const {userId} = req.body;
      await UserRepository.addFavoriteWord(word,userId);
      return res.status(204).json();
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  static async removeFavoriteWord(req,res) {
    try {
      const {word} = req.params;
      const {userId} = req.body;
      await UserRepository.removeFavoriteWord(word,userId);
      return res.status(204).json();
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }
}

module.exports = UserController;
