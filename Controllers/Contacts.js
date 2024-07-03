
const Contact = require('../modal/Contacts')
const User = require('../modal/Users')
var jwt = require('jsonwebtoken')
const moment = require('moment');


exports.createContact = async (req, res) => {
    const { name, image, phoneNumber, age, address, userId } = req.body;

    if (!name || !image || !phoneNumber || !address || !age) {
        return res.status(400).json({ error: 'Fields are empty' });
    } else if (typeof phoneNumber !== 'number') {
        return res.status(401).json({ error: 'Phone number must be a number' });
    } else if (typeof age !== 'number') {
        return res.status(401).json({ error: 'Age must be a number' });
    }
    try {
        let now = moment().format("YYYY-MM-DDTHH:mm:ss");
        const findUser = await User.findOne({ _id: userId, Active: 1 });
        
        if (!findUser) {
            return res.status(401).json({ error: 'User not found' });
        }

        const createdContact = new Contact({
            name: name,
            age: age,
            image: image,
            phoneNumber: phoneNumber,
            address: address,
            Active: 1,
            createdBy: userId,
            createdAt: now,
            updatedAt: now,
        });

        await createdContact.save();
        findUser.contacts.push(createdContact._id);  // Assuming 'contacts' is an array of ObjectId
        await findUser.save();

        return res.status(200).json({ message: 'Contact created successfully', Contact: createdContact });
    } catch (error) {
        console.error(error);
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