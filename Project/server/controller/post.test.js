// connect with mongoDB  database
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://petsitter:2204@cluster0.awxokwt.mongodb.net/test", (error) => {
    if (error) {
      console.log("There was an error", error);
    } else {
      console.log("Database Succesfully Connected");
    }
});


// What: deleted post
// When:after user create a post request then want to delete these post 
// SHOULD delete this post and this post cannot show in database 
const {createPetPostInner, deletePetPostInner} = require("./testownerpost");
const {getPostByEmail} = require("./user");
test('email', async () =>{
    ////create test data into db
    const post = await createPetPostInner({postId: "",
        title: "unit-test",
        desc: "unit-test-desc",
        startdate: "2023-03-18",
        enddate: "2023-03-18"
}, "test@gmail.com" );
    // test getPostyEmail api 
    const postList = await getPostByEmail("test@gmail.com");
    // check test result 
    let exist = postList.filter(p => p._id.toString() == post._id.toString());
    expect(exist.length).toBe(1);
    // check each property's value from db 
    expect(exist[0].title).toBe("unit-test");
    expect(exist[0].desc).toBe("unit-test-desc");
    expect(exist[0].startDate).toBe("2023-03-18");
    expect(exist[0].endDate).toBe("2023-03-18");

    //clear data delete test data from db
    await deletePetPostInner(post._id);
    // test getPostyEmail api after test data deleted
    const postListAfter = await getPostByEmail("test@gmail.com");
    //check no test return
    exist = postListAfter.filter(p => p._id.toString() == post._id.toString());
    return expect(exist.length).toBe(0);
},40000);