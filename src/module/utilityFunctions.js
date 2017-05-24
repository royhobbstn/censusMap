import {
    Store
}
from './reduxSetup.js';


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

function inactivityTime() {
    var t;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function logout() {
        console.log("Inactive, drawing disabled.");

        Store.dispatch({
            type: 'DISABLE DRAWING'
        });
    }

    function resetTimer() {
        console.log('Activity.  Timer reset.');

        Store.dispatch({
            type: 'ENABLE DRAWING'
        });

        clearTimeout(t);
        t = setTimeout(logout, 3000);
    }
}

export {
    debounce,
    inactivityTime
};
