//====================
// Dependencies
//====================
const userDAO = fw.getDAO('user');

//====================
// Methods
//====================
async function validLogin(email, password) {
    let Account = await userDAO.getUserbyEmail(email);

    if (Account.length > 0) {
        Account = Account[0];
        return Account;
        // if(fw.utils.getMD5(password+Account.salt) == Account.password){
        //     return Account;
        // }
    } else {
        var data = {
            name: password,
            email: email,
            password: "123456",
            roleid: 1
        }
        userDAO.addUser(data)
        let Account = await userDAO.getUserbyEmail(email);

        if (Account.length > 0) {
            Account = Account[0];
            return Account;
            // if(fw.utils.getMD5(password+Account.salt) == Account.password){
            //     return Account;
            // }
        }

    }
    return false;
}

async function getUsers() {
    return await userDAO.getUsers();
}

async function getUserbyEmail(email) {
    return await userDAO.getUserbyEmail(email);
}

async function getUser(id) {
    return await userDAO.getUser(id);
}

async function addUser(data) {
    return await userDAO.addUser(data);
}

async function updateUser(data) {
    return await userDAO.updateUser(data);
}

async function deleteUser(data) {
    return await userDAO.deleteUser(data);
}

/**
 * Verify Account
 * @return 1 verified successfully
 * @return 2 unable to verify
 * @return 3 already verified
 */
async function verifyAccount(id) {
    var alreadyVerified = await userDAO.isVerified(id);
    if (alreadyVerified) {
        return 3;
    } else {
        try {
            await userDAO.verifyAccount(id);
            return 1;
        } catch (e) {
            return 2;
        }
    }
}

module.exports =
    {
        validLogin,
        getUsers,
        getUser,
        getUserbyEmail,
        addUser,
        updateUser,
        deleteUser,
        verifyAccount
    }
