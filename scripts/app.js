'use strict';


let mil = '';
let meters = '';
let navOpen = false;
let lastScrollTop = 0;

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

function goTo(id) {
    const targetSection = document.getElementById(id);

    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navOpen = false;
}
function navListeners() {
    //overrides for bootstrap 
    const logo = document.getElementById('logo');
    const link = document.getElementById('link_ht');

    logo.addEventListener('click', () => goTo('keypad'));
    link.addEventListener('click', (e) => {
        e.stopPropagation();
        goTo('howTo');
    });
}
window.onload = () => {
    navListeners();
    hideNav();

}

window.addEventListener('scroll', () => {

    navOpen = true;
    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
        // downscroll code
        console.log('scroll down');
    } else {
        // upscroll code
        console.log('scroll UP');
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);
