// Black box testing for pet post list of filter
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

// test filter 
test("search pet post", async () =>{
    // data setup
    const user1 = await crearteUser("unit-test1@abc.com", "1234");
    const user2 = await crearteUser("unit-test2@abc.com", "1234");

    const profile1 = await createProfile({
        province: "BC-TEST",
        city: "burnaby",
        petType: "dog",
        userID: user1._id
    });
    const profile2 = await createProfile({
        province: "BC-TEST",
        city: "vancouver",
        petType: "cat",
        userID: user2._id
    });

    const post1 = await createPetPost({
        title: "dog post",
        desc: "dog desc",
        startDate: "2023/03/03",
        endDate: "2023/03/05",
        userID: user1._id
    });

    const post2 = await createPetPost({
        title: "cat post",
        desc: "cat desc",
        startDate: "2023/03/03",
        endDate: "2023/03/05",
        userID: user2._id
    });
    // test filter function
    const result = await searchPetPost({province: "BC-TEST"});
    expect(result.length).toBe(2);

    const result1 = await searchPetPost({province: "BC-TEST", city: "vancouver"});
    expect(result1.length).toBe(1);
    // delete data
    await deleteEntity(post1);
    await deleteEntity(post2);
    await deleteEntity(profile1);
    await deleteEntity(profile2);
    await deleteEntity(user1);
    await deleteEntity(user2);

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

// create a test user profile
const createProfile = async (data) => {
    const newProfile = new Profile(data);
    try{
        const p1 = await newProfile.save();
        return p1;
    }
    catch(error){
        return null;
    }
}

// create a test user post
const createPetPost = async (data) => {
    const newPost = new PetPost(data);
    try{
        const p1 = await newPost.save();
        return p1;
    }
    catch(error){
        return null;
    }
}

// delete test user function
const deleteUser = async (user) =>{
    await user.delete();
}

// delete test user entity
const deleteEntity = async (entity) =>{
    await entity.delete();
}