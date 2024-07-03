
const { response } = require('express');
const Contact = require('../modal/Contacts')
const User = require('../modal/Users')
var jwt = require('jsonwebtoken')
const moment = require('moment');
const mongoose = require('mongoose');



exports.createContact = async (req, res) => {
    try {
        const { name, image, phoneNumber, age, address, userId } = req.body;
        const now = new Date();

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        // Log the userId to debug
        console.log('userId:', userId);

        // Find the user

        // Log the result to debug

        if (!userId) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new contact
        const createdContact = new Contact({
            name,
            age,
            image,
            phoneNumber,
            address,
            Active: 1,
            CreatedBy: userId,
            createdAt: now,
            updatedAt: now,
        });
        return res.status(201).json({
            message: "Contact created successfully",
            Contact: createdContact,
        });

    } catch (error) {
        console.error("Error Creating Contact:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.getContacts = async (req, res, next) => {

    try {
        const {userId} = req.body;
        console.log(userId, 'userId');
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await Contact.find({ CreatedBy: userId });
        console.log(user, 'ss');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user, "Retrieved user details");
        return res.status(200).json({ message: 'get Contacts', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

exports.getallusers = async (req, res) => {

    try {
        const user = await userModule.find({ Active: 1 });
        console.log(user, 'ss');
        if (!user) {
            return res.status(404).json({ error: 'Users not found' });
        }
        console.log(user, "Retrieved user details");
        return res.status(200).json({ message: 'Users List', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }


}
exports.getUserdata = async (req, res, next) => {

    try {
        const userId = req.body.userId;
        console.log(userId, 'userId');
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await userModule.find({ _id: userId });
        console.log(user, 'ss');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user, "Retrieved user details");
        return res.status(200).json({ message: 'get data', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
exports.editUser = async (req, res) => {
    const { name, age, id, Active } = req.body;
    // Validate input data
    if (!id) {
        return res.status(400).json({ error: 'Id is required' });
    }
    if (typeof age !== 'number') {
        return res.status(400).json({ error: 'Age must be a number' });
    }
    try {
        const findedId = await userModule.findById(
            id

        );
        const updatedUser = await userModule.findById(id);
        if (!findedId) {
            return res.status(404).json({ error: 'User not found' });
        } else {
            const updatedUserdetails = await userModule.findByIdAndUpdate(
                id,
                { name, age, Active },
                { new: true, runValidators: true }
            );
            res.status(200).json({ message: 'User updated successfully', updatedUserdetails });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
exports.deleteuser = async (req, res) => {
    const { id } = req.body;
    // Validate input data
    if (!id) {
        return res.status(400).json({ error: 'Id is required' });
    }

    try {
        const updatedUser = await userModule.findById(
            id

        );
        if (updatedUser)
            if (!updatedUser) {
                return res.status(404).json({ error: 'id not found' });
            } else {
                if (updatedUser) {
                    const deletedData = await userModule.findByIdAndUpdate({ _id: id, Active: 1 },
                        { $set: { Active: 0 } },
                        { new: true })
                    res.status(200).json({ message: 'User Deleted successfully', deletedData });
                }
            }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};