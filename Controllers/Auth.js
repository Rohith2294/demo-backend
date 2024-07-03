const MainuserModel = require('../modal/Users')
var jwt = require('jsonwebtoken')
const date = require("date-and-time");
const lib1 = require("../Middleware/email");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
exports.signup = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const phonenumber = req.body.phonenumber
    const gender = req.body.gender

    let date1 = new Date();
    let now = date.format(date1, "YYYY-MM-DDTHH:mm:ss");
    const bcryptPassword = await bcrypt.hash(password, 7);
    const findEmail = await MainuserModel.findOne({ email: email })
    if (findEmail) {
        return res.status(401).json({ error: `a user already registered with this id ${email}` })
    }

    const otp = otpGenerator.generate(8, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false,
    });
    const MainUserData = new MainuserModel({
        otp: otp,
        name: name,
        email: email,
        password: bcryptPassword,
        phonenumber: phonenumber,
        gender: gender,
        CreatedTime: now,
        contacts:[],
        Active: 0,
    })
    // Save both the User and Admin documents
    const [TrainerResult] = await Promise.all([
        MainUserData.save()
    ]);
    console.log(MainUserData, 'mainuserdatat')
    if (TrainerResult) {
        lib1.sendMail(email, otp, name);
        console.log(MainUserData, 'UserData')
        res.status(200).json({ message: 'Registration Successfull', MainUserData })
    }

}
exports.Login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    let loginuserData
    if (!email || !password) {
        return res.status(400).json({ error: "Enter All Fields" })
    }
    await MainuserModel.findOne({ email: email, Active: 1 }).then((userData) => {
        if (!userData) {
            return res.status(401).json({ error: "Email Not Found" })
        }
        loginuserData = userData

        return bcrypt.compare(password, userData.password);
    }).then(async (userdetails) => {
        if (!userdetails) {
            return res.status(401).json({ error: "Wrong Password !" });
        } else {
            if (loginuserData) {
                console.log(loginuserData, 'loginuserData')
                const token = jwt.sign(
                    { email: loginuserData.email, userId: loginuserData._id.toString() },
                    "secretKey",
                )
                if (token) {
                    loginuserData.token = token
                    await loginuserData.save()
                }
                res
                    .status(200)
                    .json({
                        message: "Login Successfully",
                        token: loginuserData.token,
                        userDetails: loginuserData,
                    });
            }

        }
    })


}
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email) {
            return res.status(401).json({ error: 'Email is Required' });
        }
        if (!otp) {
            return res.status(401).json({ error: 'otp is Required' });
        }

        const findUser = await MainuserModel.findOne({ email: email });

        if (!findUser) {
            return res.status(401).json({ error: 'User Not Found' });
        }
        if (findUser.otp !== otp) {
            return res.status(401).json({ error: 'Invalid otp' });
        }
        if (findUser.Active == 0) {
            // Update user's active status
            const updatedUser = await MainuserModel.findOneAndUpdate(
                { email: email },
                { $set: { Active: 1 } },
                { new: true }
            );
            if (updatedUser) {
                return res.status(200).json({ message: "OTP matched", MainUserData: updatedUser });
            } else {
                return res.status(400).json({ error: "Failed to update user" });
            }
        } else {
            return res.status(400).json({ error: "User Already Verified" });
        }

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(401).json({ error: 'Email is Required' });
        }


        const findUser = await MainuserModel.findOne({ email: email });

        if (!findUser) {
            return res.status(401).json({ error: 'User Not Found' });
        }

        const otp = otpGenerator.generate(8, {
            digits: true,
            alphabets: false,
            upperCase: false,
            specialChars: false,
        });
        // Update user's active status
        const updatedUser = await MainuserModel.findOneAndUpdate(
            { email: email, Active: 1 },
            { $set: { otp: otp } },
            { new: true }
        );
        if (updatedUser) {
            lib1.sendforgotpasswordMail(email, otp);
            return res.status(200).json({ message: "otp sent to your mail id", updatedUser});

        } else {
            return res.status(400).json({ error: "Failed to sent otp" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.CreatePassword = async (req, res) => {
    try {
        const { email, otp, newPassword, ConfirmPassword } = req.body;

        if (!email) {
            return res.status(401).json({ error: 'Email Is Required' });
        }
        if (newPassword !== ConfirmPassword) {
            return res.status(401).json({ error: 'New Password And ConfirmPassword Should be same' });
        }
        const findUser = await MainuserModel.findOne({ email: email });
        console.log(findUser, 'finduser')
        if (!findUser) {
            return res.status(401).json({ error: 'User Not Found' });
        }
        const hashedPwd = await bcrypt.hash(newPassword, 7);
        // Update user's active status
        if (findUser.otp !== otp) {
            return res.status(401).json({ error: 'Invalid otp' });
        }
        findUser.password = hashedPwd
        findUser.save()
        return res.status(200).json({ message: "Password Created Successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.UpdatedPassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        if (!email) {
            return res.status(401).json({ error: 'Email Is Required' });
        }
        const findUser = await MainuserModel.findOne({ email: email });
        if (!findUser) {
            return res.status(401).json({ error: 'User Not Found' });
        }
        const isEqual = await bcrypt.compare(oldPassword, user.password);
        if (!isEqual) {
            return res.status(401).json({ error: 'Wrong Password' });
        }
        const hashedPwd = await bcrypt.hash(newPassword, 7);
        findUser.password = hashedPwd
        findUser.save()
        return res.status(200).json({ message: "Password Updated Successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
