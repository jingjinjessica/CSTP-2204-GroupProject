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
test('email', async () =>{
    const p1 = await getProfileByUserEmail("test@gmail.com");
    return expect(p1.name).toBe("test");
},20000);
