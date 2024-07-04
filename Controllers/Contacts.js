
const { response } = require('express');
const Contact = require('../modal/Contacts')
const User = require('../modal/User')
var jwt = require('jsonwebtoken')


exports.createContact = async (req, res) => {
    try {
        const { name, image, phoneNumber, age, address, userId } = req.body;
        const now = new Date();
        const findUser = await User.findOne({ _id: userId, Active: 1 })
        const findName = await Contact.findOne({ name: name, Active: 1 })
        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (findName) {
            return res.status(404).json({ error: "Name Is Already Exists! Try Again Different Name" });
        }
        // Create a new contact
        const createdContact = new Contact({
            name,
            age,
            image,
            phoneNumber,
            address,
            Active: 1,
            CreatedBy: findUser._id,
            createdAt: now,
            updatedAt: now,
        });
        if (findUser) {
            const UpdateUser = await User.findOne({ _id: findUser._id })
            if (UpdateUser) {
                UpdateUser.contacts.push(createdContact)
            } else {
                return res.status(404).json({ error: "Contacts Not Updated In User" })
            }
            await UpdateUser.save()
            await createdContact.save()
            return res.status(201).json({
                message: "Contact created successfully",
                Contact: createdContact,
                UpdateUser: UpdateUser
            });
        }
    } catch (error) {
        console.error("Error Creating Contact:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getContacts = async (req, res, next) => {

    try {
        const { userId } = req.body;
        console.log(userId, 'userId');
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await Contact.find({ CreatedBy: userId,Active:1 });
        console.log(user, 'ss');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user, "Retrieved user details");
        return res.status(200).json({ message: 'get Contacts', Contacts: user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
exports.getallContactss = async (req, res) => {

    try {
        const Contacts = await Contact.find({ Active: 1 });
        console.log(Contacts, 'ss');
        if (!Contacts) {
            return res.status(404).json({ error: 'Contacts not found' });
        }
        console.log(Contacts, "Retrieved user details");
        return res.status(200).json({ message: 'Contacts List', Contacts });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }


}
exports.getContactdata = async (req, res, next) => {

    try {
        const userId = req.body.userId;
        console.log(userId, 'userId');
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const Contact = await Contact.find({ _id: userId });
        console.log(Contact, 'ss');
        if (!Contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        console.log(Contact, "Retrieved Contact details");
        return res.status(200).json({ message: 'get Contact', Contact });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
exports.editContact = async (req, res) => {
    const { name, image, phoneNumber, age, address, userId, contactId } = req.body;
    // Validate input data
    if (!name || !image || !phoneNumber || !age || !address || !userId || !contactId) {
        return res.status(400).json({ error: 'Id is required' });
    }
    if (typeof age !== 'number') {
        return res.status(400).json({ error: 'Age must be a number' });
    }
    if (typeof phoneNumber !== 'number') {
        return res.status(400).json({ error: 'phoneNumber must be a number' });
    }
    try {
        const findUser = await User.findOne({ _id: userId });
        const findcontactId = await Contact.findOne({ _id: contactId });
        if (!findUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!findcontactId) {
            return res.status(404).json({ error: 'contact  not found' });
        }
        const updatedContactdetails = await Contact.findByIdAndUpdate(
            {_id:findcontactId._id},
            { name, image, phoneNumber, age, address },
            { new: true, runValidators: true }
        );
        const findContactinuser = findUser.contacts.find((contact) => contact._id == findcontactId._id);
        findUser.contacts.splice(findContactinuser, 1)
        findUser.contacts.push(updatedContactdetails)
        await findUser.save(); // Save the updated vendor
        res.status(200).json({ message: 'Contact updated successfully', updatedContactdetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
exports.deleteContact = async (req, res) => {
    const { ContactId } = req.body;
    // Validate input data
    if (!ContactId) {
        return res.status(400).json({ error: 'Id is required' });
    }

    try {
        const updatedContact = await Contact.findById({_id:ContactId});
        if (updatedContact)
            if (!updatedContact) {
                return res.status(404).json({ error: 'Contact not found' });
            } else {
                if (updatedContact) {
                    const deletedData = await Contact.findByIdAndUpdate({ _id: ContactId, Active: 1 },
                        { Active: 0 },
                        { new: true })
                    res.status(200).json({ message: 'Contact Deleted successfully', deletedData });
                }
            }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};