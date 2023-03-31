const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const User = require("../model/User");
const profile = require("../model/Profile");
const firebaseConfig = require("../library/firebase");
const db = require("../library/firebase").db;
const { getProfileByUserEmail } = require("./profile");
const { collection, query, where, getDocs } = require("firebase/firestore");

// GET CURRECT USER PROFILE
const getCurrUser = async (req, res) => {
  const token = req.cookies["access-token"];
  const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
  let foundUser = await User.findOne({ email: decodedValues.email });
  if (!foundUser) {
    return;
  }
  const profile = await getProfileByUserEmail(decodedValues.email);
  return profile;
};

const getCurrUserChatRoom = async (req, res) => {
  const profile = await getCurrUser(req, res);
  const { name } = profile;

  // Query to get all chatrooms containing both user1 and user2
  const chatroomRef = collection(db, "chats");
  const q = query(chatroomRef, where("users", "array-contains", name));

  // Execute query and process results
  getDocs(q)
    .then((snapshot) => {
      const chatrooms = [];
      snapshot.forEach((doc) => {
        const chatroom = doc.data();
        chatroom.id = doc.id;
        chatrooms.push(chatroom);
      });
      console.log("chatroom", chatrooms);
      res.render("pages/message", { chatrooms, currUser: name });
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  getCurrUserChatRoom,
};
