// connect with mongoDB  database
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://petsitter:2204@cluster0.awxokwt.mongodb.net/test", (error) => {
    if (error) {
      console.log("There was an error", error);
    } else {
      console.log("Database Succesfully Connected");
    }
});

// give an existing user's email: test@gmail.com, to test getProfileByUserEmail function to get his profile, 
// than check his name is same to "test" which save in database or not

// What : get user's name from profile by email
// When: after user login
// We SHOULD get these user's name: "test"

const {getProfileByUserEmail} = require("./user");
const User = require("../model/User");
const Profile = require("../model/Profile");
test('email', async () =>{
    // prepare test user and profile
    const user1 = new User({
      email:"user-test-1@gmail.com",
      password:"123",
      userType:"owner"
    })
    const dbUser1 = await user1.save();

    const profile1 = new Profile({
      userID:dbUser1._id,
      name:"user1-name",
      city:"richmond"
    })
    const dbProfile = await profile1.save()

    const p1 = await getProfileByUserEmail("user-test-1@gmail.com");
    expect(p1.name).toBe("user1-name");
    expect(p1.city).toBe("richmond");

    // delete 
    await dbProfile.delete();
    await dbUser1.delete();

},40000);
