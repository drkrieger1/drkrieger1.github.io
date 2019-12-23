'use strict';

let mil = '';
let meters = '';
let navOpen = false;

function handleClick(e) {
    if (navOpen) {
        hideNav();
    }

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
    const valid = (m <= 1600 && m >= 100);
    const milDec = document.getElementById('mil_dec');

    console.log(milDec);

    mil = ((m - 4224.25) / -4.21781).toString();

    let index = mil.indexOf('.');

    milDec.innerHTML = `.${mil.slice(index + 1, (index + 3))}`;
    mil = mil.slice(0, index);

    const status = document.getElementById('range_error');


    // Range valedation
    if (!valid && status.className === 'range_valid') {
        status.className = 'range_error';
        status.childNodes[1].id = 'warning';
    } else if (valid && status.className === 'range_error') {
        status.className = 'range_valid';
        status.childNodes[1].id = 'warning_off';
    }

    document.getElementById('code').value = meters;
    document.getElementById('elevation').value = mil;
    document.getElementById('slider').value = meters;
}

function clr() {
    mil = '';
    meters = '';
    document.getElementById('code').value = meters;
    document.getElementById('elevation').value = mil;
    hideNav();
}

function del() {
    meters = meters.slice(0, -1);
    calc();
    hideNav();
}

function hideNav() {
    const keypad = document.getElementById('keypad');
    keypad.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navOpen = false;
}

window.onload = () => {
    hideNav();
}

window.addEventListener('scroll', () => {
    navOpen = true;
});