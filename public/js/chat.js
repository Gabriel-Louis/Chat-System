
const io = require("socket.io")

const socket = io(); 


const messageForm = document.getElementById("message-form") 
const messageFormInput = messagForm.getElementById("input"); 
const messageButton = messageForm.getElementById('button')
const sendLocation = document.getElementById("Send"); 
const messages = document.getElementById("messages")


const messageTemplate = document.getElementById("messageTemplate").innerHTML
const LocationTemplate = document.getElementById("LocationTemplate").innerHTML
const sidebarTemplate = document.getElementById('sidebar-template').innerHTML


const autoScroll = () => {
    const scrollMessages = messages.lastElementChild

    //height of the page 
    const scrollMessasgeStyles = getComputedStyle(scrollMessages)
    const scrollMessageMargin = parseInt(scrollMessasgeStyles.marginBottom)
    const scrollMessageHeight = scrollMessages.offsetHeight +  scrollMessageMargin

    //visible height 

    const visibleHeight = messages.offsetHeight

    //height of container 
    const containerHeight = scrollMessages.scrollHeight
    
    //limit of scrolling
    const scrollOffset = messages.scrollTop + visibleHeight

    if(containerHeight = scrollMessageHeight <= scrollOffset) {
        messages.scrolltop = messages.scrollHeight;
    }

}


socket.on("message", (message)=> {
    console.log(message)
    const html = Mustasche.render(messageTemplate, {
        username: message.username,  
        credentials: moment(message.credentialAt).format('h:mm a')
    })

    messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})


socket.on('roomData', (room, users) =>{
    const html = Mustasche.render(sidebarTemplate, {
        room, 
        users
    })

    document.getElementById("sidebar").innerHTML = html 

})


socket.on('LocationMessage', (url) => {
    const html = Mustasche.render(LocationTemplate, {
        username: messagForm.username, 
        url: message.url, 
        credentialsAt: moment(message.credentialAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html)
})


document.getElementById("first").addEventListener("submit", (e) => {
    e.preventDefault(); 

    messagForm.setAttribute('disabled', 'disabled')

    e.target.elements.message.value; 

    socket.emit('message', message, (error) => {
        messageButton.removeAttribute('disabled')
        messageFormInput.value = " "
        messageFormInput.focus()

       if(error) {
           return console.log(error)
       }
    })
})


sendLocation.addEventListener("click", () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported')
    }

    sendLocation.setAttribute("disabled ")

    
    navigator.geolocation.getCurrentPosition(position, () => {
        console.log(position); 
        socket.emit('message', () => {
            latitude: position.concord.latitude
            longitude: position.concord.longitude
        })
    }, () => {
        sendLocation.removeAttribute('disabled')
        console.log("LOcation shared!")
    })
})

socket.emit('Join', (username, room), (error) => {
    if (error) {
        alert(error)
        location.href = '/'
        location
    }
})