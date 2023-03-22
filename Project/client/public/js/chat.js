// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = firebase.database();

const username = prompt("What's your name?");

document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
  e.preventDefault();
  const timestamp = Date.now();
  const chatTxt = document.getElementById("chat-txt");
  const message = chatTxt.value;
  chatTxt.value = "";
  db.ref("messages/" + timestamp).set({
    user: username,
    msg: message,
  });
}
const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const msg = "<li>" + messages.user + " : " + messages.msg + "</li>";
  document.getElementById("messages").innerHTML += msg;
});
