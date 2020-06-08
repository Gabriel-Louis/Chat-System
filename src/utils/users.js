
const Users = [   ]; 


const addUser = ({id, username, room }) => {
    username = username.trim().toLowerCase(); 
    room = room.trim().toLowerCase(); 

    if(!username || !room) {
        return {
            error: 'Username and room are required '
        }
    } 

    var user = { 
        id,
        username, 
        room
    }

    //check for Existing User
    
    const existingUser = user.find(user, () => {
        return user.room === room && user.username == username; 
    })


    //validate username 

    if(existingUser) {
        return {
            error: 'Userame is in Use'
        }
    }

    user.push(Users)

    return { user }; 
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if(index !== -1) {
        return users.splice(index, -1)[0]; 
    }
}

const getUser = (id) => {
    Users.find((user) == user.id == id)
}

const getUserInRoom = (room) => {
    room = room.trim().toLowerCase()
    return Users.filter((user) => user.room === room)
}



module.exports = {
    getUser, 
    addUser, 
    removeUser, 
    getUserInRoom
}

//Aplication Not Complete
