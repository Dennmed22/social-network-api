const { Thought, User } = require("../models");

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find({})
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .select("-__v");
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async getThoughtById(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.id });
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought with this ID" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async createThought(req, res) {
    try {
      console.log(req.body);
      const thoughtData = await Thought.create(req.body);
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );

      if (!dbUserData) {
        res.status(404).json({ message: "No User with this ID" });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought with this ID" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({
        _id: req.params.id,
      });
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought with this ID" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought with this id" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },
};

module.exports = thoughtController;
