'use strict'

import { readDoctors } from "./doctor.js"
import { closeModal, openModal } from "../modal.js"

const createRow = (doctor) => {
    const row = document.createElement('div')
    row.classList.add('row')
    row.innerHTML =
        `<span>${doctor.firstName}</span>
         <span>${doctor.lastName}</span>
         <span>${doctor.specialties.name}</span>
         <span>${doctor.phone}</span>
         <span>
             <img src="img/edit.png" alt="Editar paciente" id="edit-${doctor.id}">
         </span>`

    return row
}

const updateTable = async () => {
    const tableContainer = document.getElementById('values')

    const doctors = await readDoctors()

    const rows = doctors.map(createRow)
    tableContainer.replaceChildren(...rows)
}

updateTable()

