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
// When:delete post selected
// SHOULD
const {createPetPostInner, deletePetPostInner} = require("./testownerpost");
const {getPostByEmail} = require("./user");
test('email', async () =>{
    const post = await createPetPostInner({postId: "",
        title: "unit-test",
    desc: "unit-test-desc",
    startdate: "2023-03-18",
    enddate: "2023-03-18"
}, "test@gmail.com" );
    const postList = await getPostByEmail("test@gmail.com");
    let exist = postList.filter(p => p._id.toString() == post._id.toString());
    expect(exist.length).toBe(1);
    await deletePetPostInner(post._id);
    const postListAfter = await getPostByEmail("test@gmail.com");
    exist = postListAfter.filter(p => p._id.toString() == post._id.toString());
    return expect(exist.length).toBe(0);
},20000);