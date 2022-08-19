const UserRepository = require("../repositories/UserRepository");

class UserController {
  static async getUser(req, res) {
    const { userId } = req.body;
    const attributesForReturnOfSearch = ["id", "name", "email"];
    try {
      const me = await UserRepository.findOneById(
        userId,
        attributesForReturnOfSearch
      );
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
