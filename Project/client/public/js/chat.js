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

// const username = prompt("What's your name?");

document.getElementById("search").addEventListener("submit", postChat);
async function postChat(e) {
  e.preventDefault();
  await sendMsg("fgasgsdfgsd", "Melody", "JJ", "How is it going");

  // const timestamp = Date.now();
  // const chatTxt = document.getElementById("chat-txt");
  // const message = chatTxt.value;
  // chatTxt.value = "";
  // db.ref("messages/" + timestamp).set({
  //   // user: username,
  //   msg: message,
  // });
  const msg = document.getElementById("searchfield").value;
}

async function isExistChatRoom(roomId) {
  const chatRoomRef = db.collection("chats").doc(roomId);
  const doc = await chatRoomRef.get();
  return doc.exists;
}

async function createChatRoom(roomId, user1, user2) {
  if (await isExistChatRoom(roomId)) {
    return;
  }
  const newChatRoom = db.collection("chats").doc(roomId);
  newChatRoom
    .set({
      messages: [],
      user1: user1,
      user2: user2,
    })
    .then(() => {
      console.log(newChatRoom);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function sendMsg(roomId, sender, receiver, msg) {
  await createChatRoom(roomId, sender, receiver);
  const newMsg = {
    roomId: roomId,
    sender: sender,
    receiver: receiver,
    msg: msg,
    timestamp: Date.now(),
  };
  const chatRoomRef = db.collection("chats").doc(roomId);
  chatRoomRef.update({
    messages: firebase.firestore.FieldValue.arrayUnion(newMsg),
  });
}
// const fetchChat = db.ref("messages/");
// fetchChat.on("child_added", function (snapshot) {
//   const messages = snapshot.val();
//   const msg = "<li>" + messages.user + " : " + messages.msg + "</li>";
//   document.getElementById("messages").innerHTML += msg;
// });
