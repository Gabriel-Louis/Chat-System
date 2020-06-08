
const generateMessage = (username, text) => {
    return {
        username, 
        text, 
        credentials: new Date().getTime() 
    }
}

const generateLocalMessage = (username, url) => {
    return {
        username,
        url, 
        credentialsAt: new Date().getTime()
    }
}


module.exports = generateMessage, generateLocalMessage 