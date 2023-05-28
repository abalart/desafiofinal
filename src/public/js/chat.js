const socket = io();
let user = '';
let email = '';
let chatBox = document.getElementById('chatbox');

Swal.fire({
    title: 'Authentication',
    input: 'text',
    text: 'Set username',
    inputValidator: value => {
        return !value.trim() && 'Please. Write a username!'
    },
    allowOutsideClick: false
}).then( result => {
    user = result.value;
    document.getElementById('username').innerHTML = user
    Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address',
        allowOutsideClick: false
    }).then( result => {
        email = result.value;
        document.getElementById('email').innerHTML = email
    })
})




chatBox.addEventListener('keyup', event =>{
    if(event.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('messagein', {
                email,
                user,
                message: chatBox.value,
                date: `${new Date().getHours()}:${new Date().getMinutes()}`
            })
            chatBox.value = '';
        }
    }
})

//recibir messages

socket.on('messageout', data => {
    const divLog = document.getElementById('messageLogs')
    let messages = ''

    data.reverse().forEach(message => {
        messages += `<div class='bubble'><i class='bubble-user'>${message.user}</i><p class='bubble-message'>${message.message}<span class='hour'>${message.date}</span></p></div>`
    });

    divLog.innerHTML = messages
})