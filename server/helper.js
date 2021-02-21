

const authenticateUser = user => {
    let userEmail = user?.email || '',
        userPassword = user?.password || '';
        
    if(userEmail && userPassword && userEmail === process.env.Email && userPassword === process.env.Password){
            return true;
    } else {
        return false
    }
}


module.exports = {authenticateUser};