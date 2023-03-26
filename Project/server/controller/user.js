const User = require("../model/User");
const bcrypt = require("bcryptjs"); // This library/package will be used to encrypt the password
const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const Profile = require("../model/Profile");
const PetPost = require("../model/PetPost");
const SitterPost = require("../model/PetSitterPost");

//Registe 7
const registerUser = async (request, response) => {
  const data = request.body;

  // We are hashing/encrypting password based the data.password string and the salt value 10 which is the utmost encryption
  const encryptPassword = await bcrypt.hash(data.password, 10);

  //const profile = new Profile({});
  const newUser = new User({
    email: data.email,
    password: encryptPassword,
    userType: data.userType
  });
  try {
     const p1 = await newUser.save();
     return response.status(201).json({
      message: "Succesfully Registered User"
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "There was an error",
      error,
    });
  }
};


const getProfileByUserEmail = async (email) => {
  //console.info(email);
  const user = await User.findOne({email: email});
  //console.info(user);
  const profile = await Profile.findOne({userID: user._id.toString()});
  //console.info(profile);
  return profile;
}


const afterLoginSuccess = async (email,res) =>{
  const foundUser = await User.findOne({email:email});
  const profileInform = await getProfileByUserEmail(email);
      // has profile
  if (profileInform){
    res.cookie("user-name", profileInform.name );
    if(foundUser.userType === "owner"){
      res.redirect("/list/listsitterpost");
    }
    else if(foundUser.userType === "sitter"){
      res.redirect("/list/listpetpost");
    }
  }
  // has not profile by type
  else if(foundUser.userType === "owner"){
    res.redirect("/profile/createPetOwner");
  }
  else if(foundUser.userType === "sitter"){
    res.redirect("/profile/createPetSitter");
  }
  return;
    
}
// Login
const loginUser = async (req, res) => {
  const data = req.body;
  let foundUser = await User.findOne({ email: data.email });
  if (foundUser) {
    // Then we will check for password
    // This will be either true or false
    const matchPassword = await bcrypt.compare(data.password,foundUser.password);
    if (matchPassword) {
      // // We are trying to create an access token based on which the user will be able to interact with the website
      const accessToken = jwt.sign({
          email: foundUser.email
        },
        process.env.SECRET_KEY
      );
      res.cookie("access-token", accessToken);

      // const loggedin = res.cookie.loggedin = true;
      res.locals.isLogin = true;
      await afterLoginSuccess(data.email,res);
      return;
    }
  }
    // If user doesn't exist
  res.render("pages/login", {title: "Login"});
};

const googleLogin = async(req, res) =>{
  const email = req.query.email;
  const user = await User.findOne({email: email});
  if (user){
    const accessToken = jwt.sign({
      email: email
    },
    process.env.SECRET_KEY
  );
  res.cookie("access-token", accessToken);
    await afterLoginSuccess(email,res);
  }
  else{
    res.render("pages/googleUserType",{email:email});
  }
};


//google usertype register
const googleUserTypeRegister = async(req,res) => {
  const data = req.body;
  const newUser = new User({
    email: data.email,
    password: "google",
    userType: data.userType
  });
  try {
     const p1 = await newUser.save();
     const accessToken = jwt.sign({
      email: data.email
    },
    process.env.SECRET_KEY
  );
  res.cookie("access-token", accessToken);
     await afterLoginSuccess(data.email, res);
    }
   catch (error) {
    console.log(error);
    res.redirect("/login");
    };
};

const getAllUsers = async (request, response) => {
  try {
    const data = await User.find();
    const filteredData = data.map((user) => {
      return {
        email: user.email,
        userID: user._id,
        createdAt: user.createdAt,
      };
    });
    return response.status(200).json({
      message: "Users found Succesfully",
      filteredData,
    });
  } catch (error) {
    return response.status(500).json({
      message: "There was an error",
      error,
    });
  }
};

//Dashboard
function formatDate(date){
  return "Create date: " +
  date.getFullYear() +
  "-" +
  (date.getMonth() + 1) +
  "-" +
  date.getDate();
}

const getHistoryPost = async (req,res) => {
  const token = req.cookies["access-token"];
  const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
  const post = await getPostByEmail(decodedValues.email);
  const profile = await getProfileByUserEmail(decodedValues.email);
  const user = await getUser(decodedValues.email);
  if (user.userType === "owner"){
    res.render("pages/dashboard", {posts: post, postImage:profile.petImage, fd:formatDate, userType:"owner"})
  }
  else if (user.userType === "sitter"){
    res.render("pages/dashboard", {posts: post, postImage:profile.avatar, fd:formatDate, userType:"sitter"})
  }
}

const getUser =async (email) => {
  const user = await User.findOne({ email: email });
  return user;
}
  
const getPostByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (user.userType === "owner"){
    const post = await PetPost.find({userID: user._id.toString() })
    return post;
  }
  else if (user.userType === "sitter"){
    const post = await SitterPost.find({userID: user._id.toString() })
    return post;
  }
}

// logout
const logout = async(req,res) =>{
    res.clearCookie('connect.sid');
    res.clearCookie('access-token');
    res.clearCookie('user-name');
    req.session&&req.session.destroy();
    res.redirect('/login');
};


module.exports = {
  registerUser,
  loginUser,
  getHistoryPost,
  getAllUsers,
  googleLogin,
  googleUserTypeRegister,
  logout
};
