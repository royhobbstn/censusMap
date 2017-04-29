/* global $ */

import {
    Store
}
from './reduxSetup.js';



export default function () {


    $('#myModal').modal({
        show: false
    });

    document.getElementById('choose_theme').addEventListener('click', clickChooseTheme, false);

    function clickChooseTheme() {
        $('#myModal').modal('show');
    }



}
