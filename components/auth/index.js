import React, {createContext, useEffect, useState} from 'react';
import Parse from 'parse';
import Login from "~/pages/login";
import {useRouter} from "next/router";
import {message} from "antd";
import {PulseLoader} from "react-spinners";
import {getRoleCurrentUser} from "../../parse_server";

const AuthContext = createContext()
const LoadingPage = () => {
    return (
        <div class={'fixed top-0 left-0 w-full h-full ease-in-out duration-300'}>
            <div class={'w-5/12 absolute ml-[30%] mt-[44vh] text-center'}>
                <h2 className={'font-extrabold text-4xl'}>Logo</h2>
                <PulseLoader color="#169CEE" margin={3} size={15} speedMultiplier={0.5}/>
            </div>
        </div>
    )
}

const Authentication = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    const [roleUser, setRoleUser] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(  () => {
        const user = Parse.User.current()
        setCurrentUser(user)
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, []);

    useEffect(() => {
        const user = Parse.User.current()
       user && getRoleCurrentUser(user).then(result => {
            setRoleUser(result)
        })
    },[currentUser])

    const handleLogin = async (payload) => {
        const {username, password} = payload
        try {
            await Parse.User.logIn(username, password);
            getCurrentUser();
        } catch (error) {

            if (error.code === 101) {
                message.error(`The email or pass word you entered doesn't match `);
            }
        }
    }

    const handleLogout = async () => {
        try {
            await Parse.User.logOut();
            getCurrentUser();
            return true;
        } catch (error) {
            alert(`Error! ${error.message}`);
            return false;
        }
    }

    const getCurrentUser = () => {
        const currentUser = Parse.User.current();
        setCurrentUser(currentUser);
        return currentUser;
    };


    const value = {handleLogin, handleLogout, roleUser}


    return (
        <AuthContext.Provider value={value}>
            {loading ? <LoadingPage/> : (currentUser ? children : <Login/>)}
        </AuthContext.Provider>
    );
};

export {AuthContext}
export default Authentication;