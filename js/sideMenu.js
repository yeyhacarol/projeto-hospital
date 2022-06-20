'use strict'

function openNav() {
    document.getElementById("side-menu").style.width = "260px";
}

function closeNav() {
    document.getElementById("side-menu").style.width = "0";
}

document.getElementById('open-nav').addEventListener('click', openNav)
document.getElementById('close-nav').addEventListener('click', closeNav)