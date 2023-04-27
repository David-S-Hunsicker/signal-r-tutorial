"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = require("@microsoft/signalr");
require("./css/main.css");
var divMessages = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var btnSend = document.querySelector("#btnSend");
var username = new Date().getTime();
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
// The strongly styped hub defines this behavior
connection.on("messageReceived", function (username, message) {
    var m = document.createElement("div");
    m.innerHTML = "<div class=\"message-author\">".concat(username, "</div><div>").concat(message, "</div>");
    // <a>https://us.plus500.com/helplink</a>
    divMessages.appendChild(m);
    divMessages.scrollTop = divMessages.scrollHeight;
});
connection.start().catch(function (err) { return document.write(err); });
tbMessage.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        send();
    }
});
btnSend.addEventListener("click", send);
// this will trigger the "NewMessage" Task in the hub
function send() {
    connection.send("newMessage", username, tbMessage.value)
        .then(function () { return (tbMessage.value = ""); });
}
