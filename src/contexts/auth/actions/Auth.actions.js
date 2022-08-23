import jwt_decode from "jwt-decode"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseURL} from "../../../../BaseUrl";
import Toast from "react-native-toast-message";
import axios from "axios";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Login success",
            text2: "welcome",
            })
            // console.log(data);
            const token = data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const email = data.email;
            // const password = data.password;
            AsyncStorage.setItem("email", email)
            // AsyncStorage.setItem("password", password)
            AsyncStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded, user))
        } else {
           logoutUser(dispatch)
        }
    })
    .catch((err) => {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please provide correct credentials",
            text2: "Don't have an account yet?? Please register"
        });
        logoutUser(dispatch)
    });
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}