const mongoose = require('mongoose');
const Profile = require('../model/Profile')
const User =  require('../model/User')

const databaseName = "test"

beforeAll(async() => {
    const url = `mongodb+srv://petsitter:2204@cluster0.awxokwt.mongodb.net/${databaseName}`
    await mongoose.connect(url, { useNewUrlParser: true })
})

// CREATE PET SITTER PROFILE
describe("Creating Pet Sitter Profile", () => {
    it('Get an existing user account from the database', async() => {
        const findUser = await User.findOne({email: 'sitter@gmail.com'})
        const userID = mongoose.Types.ObjectId(findUser._id)
        // console.log(userID)
    })

    it('Create Pet Sitter Profile', async() => {
        // Get the user ID from when they register and login to their
        // account
        const findUser = await User.findOne({email: 'sitter@gmail.com'})
        const userID = mongoose.Types.ObjectId(findUser._id)
        // const userType = findUser.userType;
        // console.log(userType)

        const newPetSitterProfile = {
            name: 'Test Pet Sitter',
            province: 'British Columbia',
            city: 'Vancouver',
            phone: '778-123-1234',
            userID: userID,
            avatar: '',
            photo1: '',
            photo2: '',
            photo3: '',
            aboutMe: 'This is a test to create a pet sitter profile'
        }

        const checkProfile = await Profile.findOne({userID: userID})
        if(checkProfile){
            console.log("There's an existing profile with the same userID")
            // await checkProfile.delete()
        }
        
        const createProf = new Profile(newPetSitterProfile)
        await createProf.save()
    })

    it('Get the Pet Sitter profile from the database', async() => {
        // Get the profile datas from the database
        const findPetSitterProf = await Profile.findOne({name: 'Test Pet Sitter'})
        const petSitterProfID = mongoose.Types.ObjectId(findPetSitterProf.userID)

        // Get the user information
        const findUser = await User.findOne({email: 'sitter@gmail.com'})
        const userID = mongoose.Types.ObjectId(findUser._id)

        const correctSitterProfile = {
            name: 'Test Pet Sitter',
            province: 'British Columbia',
            city: 'Vancouver',
            phone: '778-123-1234',
            userID: userID,
            avatar: '',
            photo1: '',
            photo2: '',
            photo3: '',
            aboutMe: 'This is a test to create a pet sitter profile'
        }

        const correctSitterProfileID = mongoose.Types.ObjectId(correctSitterProfile.userID)

        // Compare the data we created with the data from the database

        // console.log("userID: " + userID)
        // console.log("petSitterProfID: " + petSitterProfID)
        // console.log('correctSitterProfileID: ' + correctSitterProfileID)

        if( findPetSitterProf.name === correctSitterProfile.name &&
            petSitterProfID.equals(correctSitterProfileID) && 
            findPetSitterProf.province === correctSitterProfile.province &&
            findPetSitterProf.city === correctSitterProfile.city &&
            findPetSitterProf.phone === correctSitterProfile.phone &&
            findPetSitterProf.avatar === correctSitterProfile.avatar &&
            findPetSitterProf.photo1 === correctSitterProfile.photo1 &&
            findPetSitterProf.photo2 === correctSitterProfile.photo2 &&
            findPetSitterProf.photo3 === correctSitterProfile.photo3
            ){
                console.log(findPetSitterProf)
            }
    })

    it('Delete Pet Sitter Profile', async() => {
        const findPetSitter = await Profile.findOne({name: 'Test Pet Sitter'})
        // const userAccount = await User.findOne({email: 'sitter@gmail.com'})

        // const petSitterID = mongoose.Types.ObjectId(findPetSitter.userID)
        // const userID = mongoose.Types.ObjectId(userAccount._id)

        // if(petSitterID.equals(userID)){
        //     await findPetSitter.delete()
            
        // }
        await findPetSitter.delete()
        console.log("Successfuly deleted it")
    })
    
}, 10000)