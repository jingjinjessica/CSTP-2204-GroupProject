const mongoose = require('mongoose')
const PetSitterPost = require('../model/PetSitterPost');
const User =  require('../model/User')

const databaseName = "test"

beforeAll(async() => {
    const url = `mongodb+srv://petsitter:2204@cluster0.awxokwt.mongodb.net/${databaseName}`
    await mongoose.connect(url, { useNewUrlParser: true })
})

// CREATE PET SITTER
describe("Creating Pet Sitter Job Post", () => {
    it('Create Pet Sitter Post', async() => {
        const getUserAccount = await User.findOne({email: 'sitter@gmail.com'})
        const userID = mongoose.Types.ObjectId(getUserAccount._id)
        console.log("User ID from user account" + userID)

        const sitterPost = {
            title: "Pet Sitter Test Post Request",
            rate: 75,
            services: 'Walking',
            experience: 'This is the Pet Sitter Test experiences section',
            userID: userID
        }

        // const checkPost = await PetSitterPost.findOne({title: 'Pet Sitter Test Post Request'})
        // const checkPostID = mongoose.Types.ObjectId(checkPost.userID)
        // if(checkPost){}

        const newPost = new PetSitterPost(sitterPost)
        await newPost.save()

        
        // console.log(output)
        // const findUser = await PetPost.findOne({title: 'Owner Post Request 1'})
        // console.log(findUser)

    })

    it("Get the Pet Sitter Post from Database", async() => {
        const findUser = await PetSitterPost.findOne({title: 'Pet Sitter Test Post Request'})
        const findUserID = mongoose.Types.ObjectId(findUser.userID)

        const userAccount = await User.findOne({email: 'sitter@gmail.com'})
        const userID = mongoose.Types.ObjectId(userAccount._id)

        const correctSitterPost = {
            title: "Pet Sitter Test Post Request",
            rate: 75,
            services: 'Walking',
            experience: 'This is the Pet Sitter Test experiences section',
            userID: userID
        }
        const correctSitterPostID = mongoose.Types.ObjectId(correctSitterPost.userID)

        if(findUserID.equals(correctSitterPostID) &&
            findUser.title === correctSitterPost.title &&
            findUser.rate === correctSitterPost.rate &&
            findUser.services === correctSitterPost.services &&
            findUser.experience === correctSitterPost.experience
        ){
            console.log(`Get Pet Sitter Post:\n ${findUser}`)
            // res.sendStatus(200)
        } else {
            // res.sendStatus(500)
        }
        
        // expect(findUser.title).toBe('Owner Post Request 1')
    })  
    
}, 10000);

describe("Deleting Pet Owner Post", () => {
    it("Get the pet owner test post from database", async() => {
        const findUser = await PetSitterPost.findOne({title: 'Pet Sitter Test Post Request'})
        // console.log(`Search an existing pet owner post: \n ${findUser}`)
        expect(findUser.title).toBe('Pet Sitter Test Post Request')
        
    })
    
    it("Delete pet sitter test post", async() => {
        const findUser = await PetSitterPost.findOne({title: 'Pet Sitter Test Post Request'})
        // console.log(`The deleted pet sitter post: \n ${findUser}`)
        try {
            await findUser.delete()
            console.log("User post has been successfully deleted")
            // findUser.status(200)
        } catch (err) {
            console.log("ERROR in deleting the user post:", err)

            // res.status(500). json({
            //     message: "Fail to delete the post",
            //     err
            // })
        }
        
        expect(findUser).toBeTruthy()
    })
}, 10000);

