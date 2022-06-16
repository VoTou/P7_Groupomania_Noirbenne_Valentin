const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

// Obtenir toutes les infos des utilisateurs
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  };
  
  // Obtenir les infos d'un utilisateur
  module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    UserModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID unknown : " + err);
    }).select("-password");
  };

  //Mise à jour de la bio utilisateur
  module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            bio: req.body.bio,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          if (err) return res.status(500).send({ message: err });
        }
      ).clone();
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

// Suppresion de l'utilisateur
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.deleteOne({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

  