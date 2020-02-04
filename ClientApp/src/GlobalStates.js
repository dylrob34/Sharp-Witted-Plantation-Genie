import { EventEmitter } from 'events';
import jwt from 'jwt-decode'

var emitter = new EventEmitter();

var loginState = false;
// var token = "";
const tokenKey = 'token';

export function getLoginState() {
    return loginState;

}
export function subscribe(callback) {
    emitter.addListener('login', callback);
}
export function unsubscribe(callback) {
    emitter.removeListener('login', callback);
}
export function updateLoginState(state) {
    loginState = state;
    emitter.emit('login');
}

export function updateToken(t) {
    localStorage.setItem(tokenKey, t)
}

export function getToken() {
    var token = localStorage.getItem(tokenKey);
    if (token === null) return "";

    const decodedToken = jwt(token);
    if (decodedToken.exp < new Date().getTime()/1000) {
        console.log("token is expired and the user needs to sign in again");
        removeToken();
        return "";
    }
    
    return "Bearer " + token;
}

// we can export this and use it to sign out the user
function removeToken(){
    localStorage.removeItem(tokenKey);
}