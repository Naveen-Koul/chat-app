'use strict'

const socket = io()

let newuser = prompt('Please enter name');
// Send a message to say that I've connected
socket.emit('newuser', newuser)

// Event listener, waiting for an incoming "newuser"
socket.on('newuser', (data) => console.log(`${newuser} has connected!`))


// Listen for the 'submit' of a form
// 	 event.preventDefault()  (prevent the form from leaving the page)
//   Emit a message using "chatmsg"
// Listen for "chatmsg"
//   add a <li> with the chat msg to the <ol>

const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')


$msgForm.addEventListener('submit', (event) => {
	event.preventDefault()

	socket.emit('chatmsg', {msg: event.currentTarget.txt.value})
	event.currentTarget.txt.value = ''
})


socket.on('chatmsg', (data) => {
	const newMsg = document.createElement('li')
	$msgList.appendChild(newMsg)

	newMsg.textContent = (`${newuser} -> ${data.msg}`)
})
