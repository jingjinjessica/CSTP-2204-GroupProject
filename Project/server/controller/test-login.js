// Black box testing for owner login

// import and create database
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test", (error) => {
    if (error) {
        console.log("There was an error", error);
    } else {
        console.log("Database Succesfully Connected");
    }
});
const User = require("../model/User");
const Profile = require("../model/Profile");
const PetPost = require("../model/PetPost");
const bcrypt = require("bcryptjs");
const { isValidLogin } = require('./user');
const {searchPetPost} = require('./petPostList');

// test login
test("test user login", async () => {
    // test user account, if not exist return null
    const user = await isValidLogin("hello", "login");
    expect(user).toBeNull();
    // create a test user
    const email = "unit-test1@gmail.com";
    const password = "test-password";
    const u1 = await crearteUser(email, password );
    // test login function
    const u2 = await isValidLogin(email, password);
    expect(u2._id.toString()).toEqual(u1._id.toString());
    // delete test user
    await deleteUser(u1);

});

// create a test user function
const crearteUser = async (email, password) => {
    const encryptPassword = await bcrypt.hash(password, 10);

    // user object
    const newUser = new User({
        email: email,
        password: encryptPassword,
        userType: "owner"
    });
    // create instert user to db
    try {
        const p1 = await newUser.save();
        return p1;
        
    } catch (error) {
        console.log(error); // if wrong will show error msg
        return null;
    }
};


// delete test user function
const deleteUser = async (user) =>{
    await user.delete();
}