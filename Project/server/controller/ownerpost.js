const PetPost = require("../model/PetPost");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

//create post
const createPetPost = async (request, response) => {
  const data = request.body;
  //console.log(data);
  const token = request.cookies["access-token"];
  const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
  if (decodedValues.email) {
    const findUser = await User.findOne({ email: decodedValues.email });
    //console.log("finduser", findUser);
    let output;
    if (findUser) {
      try {
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
        console.info(output);
        return response.status(201).json({
          message: "Post Succesfully Created",
          data: output,
        });
      } catch (error) {
        console.info(error);
        return response.status(500).json({
          message: "There was an error",
          error,
        });
      }
    } else {
      return response.status(404).json({
        message: "User was not Found! Please register first.",
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

//delete post
const deletePetPost = async (request, response) => {
  try {
    const post = await PetPost.findById(request.params.id);
      try {
        await post.delete();
        response.status(200).json("Post already deleted.");
      } catch (error) {
        response.status(500).json(error);
      }
  } catch (error) {
    console.log(error);
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
  getPost
};
