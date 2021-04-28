import React,  { createContext } from 'react'
import { 
    CognitoUserPool, 
    CognitoUser, 
    AuthenticationDetails } from "amazon-cognito-identity-js";
import { globals } from '../globals';

const AccountContext = createContext()

const Account = props => {
    const UserPool = new CognitoUserPool(globals.USER_POOL_INFO)

    const authenticate = async (Username, Password) => {
        await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool: UserPool
            })
            const authDetails = new AuthenticationDetails({
                Username,
                Password
            })
            user.authenticateUser(authDetails, {
                onSuccess: data => {
                    resolve(data)
                },
                onFailure: data => {
                    reject(data)
                },
                newPasswordRequired: data => {
                    resolve(data)
                }
            })
        })
    }

    const getSession = async () => {
        await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) reject()
                    else resolve(session)
                })
            } else reject()
        })
    }

    const logout = () => {
        const user = UserPool.getCurrentUser()
        if (user) user.signOut()
    }

    return (
        <AccountContext.Provider value={{
            authenticate,
            getSession,
            logout
        }}>
            {props.children}
        </AccountContext.Provider>
    )
}

export {
    Account, AccountContext
}