

const express = require("express")
const socketIo = require("socket.io") 
const http = require("http")
const path = require("path")
const filter = require("bad-words")


const { generateMessage, generateLocalMessage } = require("./utils/message")
const { addUser, removeUser, getUser, getUserInRoom } = require("./utils/users")


//Instantiating  
const port = process.env.PORT || 3000; 
const app =  express();
const server = http.createServer(app)
const io = socketIo(server) 
const pathDirPath  = path.join(__dirname, '../public')


app.use(express.static(pathDirPath))

    io.on('Connection ', (socket) => {

        socket.on('Join ', ({ username, room}, callback) => {

           const { error, user } =  addUser ({
                id: socket.id, 
                ...options  
            })

            if(error) {
                return callback(error)
            }


            socket.join(room)

            socket.emit('message', generateMessage('Gabriel', 'Welcome'))
            socket.broadcast.to(room).emit('message', generateMessage(`${user.username} has Joined the Room `))
            io.to(user.room).emit('roomData', {
                room:user.room, 
                users: getUserInRoom(user.room)
            })


            callback()
        })
    

        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id) 
            const filter = new filter() 

            if(filter.isProfane(message)) {
                return callback('Profane is not Allowed!')
            }

            io.to('Center City').emit('message', generateMessage(user.username, message))
            callback(); 

        })

        socket.on('Disconnected ', () => {
            const user = removeUser(socket.id); 

            if(user){
                io.to(user.room).emit('message', generateMessage(`Admin ${user.username} has left the group `))
                io.to(user.room).emit('roomData', {
                    room:user.room, 
                    users:getUserInRoom(user.room)
                })
            }

        })


        socket.on('SendLocation', (concord, callback) => {
            const user = getUser(socket.id)
            io.to(user.room).emit('message', () => {
                Location: generateLocalMessage(`https://google.com/maps?q=${concord.latitude}. ${concord.longitude}`)
                callback()
            })
        })
    })
    
    
app.listen(port, () => {
    console.log("Loginging in to The Server!")
})
