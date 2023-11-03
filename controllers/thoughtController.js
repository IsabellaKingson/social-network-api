const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            res.json(thoughts);
        } catch(err) {
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId
            }).select("-__v");

            if(!thought) {
                return res.status(404).json({ message: "No thought with that ID"});
            }

            res.json(thought);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({
                _id: req.params.thoughtId,
            });

            if(!thought) {
                return res.status(404).json({ message: "No thought with that ID" });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            
            if(!user) {
                return res.status(404).json({
                    message: "Thought deleted but user was not found",
                });
            }
            res.json({ message: "Thought has been successfully deleted" });
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}