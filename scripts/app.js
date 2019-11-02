'use strict';

let mil = '';
let meters = '';

function handleClick(input) {
    meters += input;
    calc();
}

function change(value) {
    meters = value;
    calc();
}

function calc() {
    const m = parseInt(meters);
    mil = (Math.round((m - 4224.25) / -4.21781)).toString();

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

