const mongoose = require("mongoose");
const Users = require("../models/users.js");

const getUsers = async (req, res) => {
    try {
        const users= await Users.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(404).json({ error: e });
    }
}

const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new Users(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

const updateUser = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No user with that id');
    }

    const updatedUser = await Users.findByIdAndUpdate(_id, { ...user, _id }, { new: true });

    res.status(200).json(updatedUser);
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No user with that id');
    }

    await Users.findByIdAndRemove(id);

    res.status(200).json({ message: 'User deleted successfully' });
}

module.exports = { getUsers, createUser, updateUser, deleteUser };