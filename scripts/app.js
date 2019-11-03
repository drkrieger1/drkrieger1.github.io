'use strict';

let mil = '';
let meters = '';

function handleClick(e) {
    meters += e.target.innerText;

    calc();
    e.preventDefault();
}

function change(value) {
    meters = value;
    calc();
}

function calc() {
    const m = parseInt(meters);
    // mil = (Math.round((m - 4224.25) / -4.21781)).toString();

    mil = ((m - 4224.25) / -4.21781).toString();
    let index = mil.indexOf('.');

    mil = mil.slice(0, (index + 3));

    document.getElementById('code').value = meters;
    document.getElementById('elevation').value = mil;
    document.getElementById('slider').value = meters;
}

function clr() {
    mil = '';
    meters = '';
    document.getElementById('code').value = meters;
    document.getElementById('elevation').value = mil;
}

function del() {
    meters = meters.slice(0, -1);
    calc();
}


