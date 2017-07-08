/* global Redux */

console.log('start redux setup');

var initialState = {
    theme: 'pop_acs1115',
    dataset: 'acs1115',
    geoscheme: 'state',
    stops: [],
    draw: true
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
    case 'CHANGE GEOSCHEME':
        return Object.assign({}, state, {
            geoscheme: action.value
        });
    case 'LOAD STOPS':
        return Object.assign({}, state, {
            stops: action.value
        });
    case 'APPEND STOPS':
        return Object.assign({}, state, {
            stops: [].concat(state.stops, action.value)
        });
    case 'DISABLE DRAWING':
        return Object.assign({}, state, {
            draw: false
        });
    case 'ENABLE DRAWING':
        return Object.assign({}, state, {
            draw: true
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
    console.log('redux store change.');
    console.log(Store.getState());
});


function observeStore(property, onChange) {
    console.log('observeStore subscription');
    let currentState = Store.getState()[property];

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

console.log('end redux setup');


export {
    Store,
    observeStore
};
