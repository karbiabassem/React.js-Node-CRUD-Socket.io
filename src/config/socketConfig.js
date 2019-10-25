import socketIOClient from "socket.io-client";
const token = localStorage.getItem("token");

var socket = socketIOClient("http://localhost:4000/", {
  extraHeaders: {
    Authorization: "Bearer " + token
  }
});

export default socket;
