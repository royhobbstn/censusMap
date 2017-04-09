/* global Redux */

var initialState = {
    theme: 'pop',
    dataset: 'acs1115'
};

function app(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case 'INCREMENT':
        return Object.assign({}, state, {
            theme: 'something'
        });
    case 'DECREMENT':
        return Object.assign({}, state, {
            dataset: 'other'
        });
    default:
        return state;
    }

}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let Store = Redux.createStore(app)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

Store.subscribe(function () {
    console.log(Store.getState());
});

export default Store;
