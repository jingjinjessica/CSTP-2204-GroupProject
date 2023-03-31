const firebaseConfig = {
  apiKey: "AIzaSyCQfZHpR-9-_PlEB0YZGifmotOt884js9A",
  authDomain: "live-chat-d8030.firebaseapp.com",
  databaseURL: "https://live-chat-d8030-default-rtdb.firebaseio.com",
  projectId: "live-chat-d8030",
  storageBucket: "live-chat-d8030.appspot.com",
  messagingSenderId: "332889385084",
  appId: "1:332889385084:web:6cc17a4a4c2762f0b4c1f9",
  measurementId: "G-BVM7N2PHW5",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// document.getElementById("search").addEventListener("submit", postChat);
// async function postChat(e) {
//   e.preventDefault();
//   // const timestamp = Date.now();
//   // const chatTxt = document.getElementById("chat-txt");
//   // const message = chatTxt.value;
//   // chatTxt.value = "";
//   // db.ref("messages/" + timestamp).set({
//   //   // user: username,
//   //   msg: message,
//   // });
// }

async function isExistChatRoom(roomId) {
  const chatRoomRef = db.collection("chats").doc(roomId);
  const doc = await chatRoomRef.get();
  return doc.exists;
}

async function createChatRoom(roomId, user1, user2, currAvatar, userAvatar) {
  const reverseId = roomId.split("_").reverse().join("_");
  // console.log(reverseId);
  if (await isExistChatRoom(roomId)) return roomId;
  else if (await isExistChatRoom(reverseId)) return reverseId;

  // const roomID = {
  //   roomId:[currUserId,ownerId]
  // }
  const newChatRoom = await db.collection("chats").doc(roomId);
  //set create new document
  newChatRoom
    .set({
      users: [user1, user2],
      user1Avatar: currAvatar,
      user2Avatar: userAvatar,
    })
    .then(() => {
      newChatRoom.collection("messages");
      console.log(newChatRoom);
    })
    .catch((error) => {
      console.log(error);
    });

  return roomId;
}

async function sendMsg(roomId, sender, receiver, currAvatar, user2Avatar, msg) {
  if (!msg) {
    return;
  }

  let id = await createChatRoom(
    roomId,
    sender,
    receiver,
    currAvatar,
    user2Avatar
  );
  const newMsg = {
    roomId: id,
    sender: sender,
    receiver: receiver,
    // currAvatar: currAvatar,
    // user2Avatar: user2Avatar,
    msg: msg,
    timestamp: Date.now(),
  };
  const chatRoomRef = await db.collection("chats").doc(id);

  const msgRef = chatRoomRef.collection("messages");

  await chatRoomRef.update({
    lastMsg: newMsg,
  });
  await msgRef.add(newMsg);
}



// Get a reference to the chat document that contains the messages subcollection
// const chatRef = firebase.firestore().collection("chats").doc("chat");

// Get a reference to the messages subcollection
// const messagesRef = chatRef.collection("messages");

// Listen for changes to the messages subcollection

// fetchChat.on("child_added", function(snapshot){

// const fetchChat = db.ref("messages/");
// fetchChat.on("child_added", function (snapshot) {
//   const messages = snapshot.val();
//   const msg = "<li>" + messages.user + " : " + messages.msg + "</li>";
//   document.getElementById("messages").innerHTML += msg;
// });
