import { EventEmitter } from 'events';

var emitter = new EventEmitter();

var loginState = false;

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