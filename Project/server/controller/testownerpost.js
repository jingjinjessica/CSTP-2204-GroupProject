const PetPost = require("../model/PetPost");
const jwt = require("jsonwebtoken");
const User = require("../model/User");


const createPetPostInner = async (data, email) => {

    const findUser = await User.findOne({ email: email });
    //console.log("finduser", findUser);
    let output;
    if (findUser) {
      const post = {
        title: data.title,
        desc: data.desc,
        startDate: data.startdate,
        endDate: data.enddate,
        userID: findUser._id,
      };
      if (data.postId !== ""){
          // update
          output = await PetPost.findByIdAndUpdate(
              data.postId,
            {
              $set: post,
            },
            {
              new: true,
            }
          );
      }
      else{
        const newPost = new PetPost(post);
        //console.log(newPost);
        output = await newPost.save();
      }
      return output;
    }
    else{
      throw "User was not Found! Please register first.";
    }
}
//create post
const createPetPost = async (request, response) => {
  const data = request.body;
  //console.log(data);
  const token = request.cookies["access-token"];
  const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
  if (decodedValues.email) {
    try{
      const output = await createPetPostInner(data, decodedValues.email);
      return response.status(201).json({
        message: "Post Succesfully Created",
        data: output,
      });
    }
    catch(error){
      return response.status(500).json({
        message: error,
        error,
      });
    }
    
  } else {
    return response.status(401).json({
      message: "Token required!",
    });
  }
};

//update post
// const updatePetPost = async (request, response) => {
//   try {
//     const post = await PetPost.findById(request.params.id);
//     // console.log(post);
//     if (post.userID == request.body.userID) {
//       //console.log("this is post userid", post.userID);
//       //console.log("this is userid", request.body.userID);
//       try {
//         const postUpdate = await PetPost.findByIdAndUpdate(
//           request.params.id,
//           {
//             $set: request.body,
//           },
//           {
//             new: true,
//           }
//         );
//         response.status(200).json(postUpdate);
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       response.status(401).json("You can't update this post.");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };


const deletePetPostInner = async(postId) =>{
  const post = await PetPost.findById(postId);
  await post.delete();
      
}
//delete post
const deletePetPost = async (request, response) => {
  try {
    await deletePetPostInner(request.params.id);
    response.status(200).json("Post already deleted.");
      
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
};

//get all posts
const getAllPetPosts = async (request, response) => {
  try {
    const data = await PetPost.find();
    return response.status(200).json({
      message: "Posts found Succesfully",
      data,
    });
  } catch (error) {
    return response.status(500).json({
      message: "There was an error",
      error,
    });
  }
};

//get post by id
const getPost = async (request, response) => {
  try {
    const post = await PetPost.findById(request.params.id);
    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
};

module.exports = {
  createPetPost,
  //updatePetPost,
  deletePetPost,
  getAllPetPosts,
  getPost,
  createPetPostInner,
  deletePetPostInner
};
