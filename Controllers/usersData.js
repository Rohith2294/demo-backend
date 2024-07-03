
const userModule = require('./../modal/ModalsControl')
var jwt = require('jsonwebtoken')
exports.createUserasync = async (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ error: 'Fields are empty' });
    }

    else if (typeof age !== 'number') {
        return res.status(401).json({ error: 'Age must be a number' });
    }
    try {
        const finddublicateuser = await userModule.findOne({ name,Active:1 })
        if (finddublicateuser) {
            return res.status(401).json({ error: 'user ALredyCreated' });
        }
        const obj = {
            name: name,
            age: age,
            Active: 1
        };
        await userModule.insertMany(obj);
        return res.status(200).json({ message: 'User created successfully', user: obj });
    }

    catch (error) {
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