'use strict'

const socket = io()

//let newuser = prompt('Please enter name');
// Send a message to say that I've connected
//socket.emit('newuser', newuser)

// Event listener, waiting for an incoming "newuser"
//socket.on('newuser', (data) => console.log(`${newuser} has connected!`))


// Listen for the 'submit' of a form
// 	 event.preventDefault()  (prevent the form from leaving the page)
//   Emit a message using "chatmsg"
// Listen for "chatmsg"
//   add a <li> with the chat msg to the <ol>

const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')
const $userForm = document.getElementById('enterName')
let $username = 'newGuest';

let $msgTime = 0;

$userForm.addEventListener('submit',(event)=>{
	event.preventDefault()
	$msgList.style.display='flex';
	$userForm.style.display='block';
	$userForm.style.display='none';
	$username = event.currentTarget.username.value;
	socket.emit('newuser', {user: `${$username} is Online`})
})

socket.on('newuser', (data) => {
	const newMsg = document.createElement('li')
	$msgList.appendChild(newMsg)
	newMsg.textContent = data.user
	newMsg.classList.add("userjoined");
})


$msgForm.addEventListener('submit', (event) => {
	event.preventDefault()

	
	// To Add sender msg in the message block
	const newMsg = document.createElement('li')
	$msgList.appendChild(newMsg)
	newMsg.textContent = event.currentTarget.txt.value;
	newMsg.classList.add("messagesent");

	//get time of msg sent
	getDateTime();
	console.log($msgTime);

	socket.emit('chatmsg', {msg: event.currentTarget.txt.value, sentdatetime: $msgTime})
	event.currentTarget.txt.value = ''
})


socket.on('chatmsg', (data) => {
	const newMsg = document.createElement('li')
	$msgList.appendChild(newMsg)
	newMsg.classList.add("messagereceive");
	newMsg.innerHTML = data.msg + "<b class='senderDetails'> - by " + $username + " at "+ data.sentdatetime +"</b>";
})
function getDateTime(){
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	$msgTime = date+' '+time;
}
