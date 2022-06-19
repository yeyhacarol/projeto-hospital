'use strict'

function padTo2Digits(date) {
    return date.toString().padStart(2, '0');
}

function formatDate(birthDate) {
    const date = new Date(birthDate)

    return [
        padTo2Digits(date.getDate() + 1),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

export { formatDate }