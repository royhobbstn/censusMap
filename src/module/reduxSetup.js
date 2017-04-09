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
    case 'CHANGE THEME':
        return Object.assign({}, state, {
            theme: action.value
        });
    case 'CHANGE DATASET':
        return Object.assign({}, state, {
            dataset: action.value
        });
    default:
        return state;
    }

}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
var Store = Redux.createStore(app);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

Store.subscribe(function () {
    console.log(Store.getState());
});


function observeStore(property, onChange) {
    let currentState;

    function handleChange() {
        let nextState = Store.getState()[property];
        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    let unsubscribe = Store.subscribe(handleChange);

    return unsubscribe;
}

export {
    Store,
    observeStore
};
