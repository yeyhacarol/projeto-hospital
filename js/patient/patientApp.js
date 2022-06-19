'use strict'

import { formatDate } from "../utils/formatDate.js"
import { createPatient, readPatients } from "./patient.js"
import { openModal, closeModal } from "../modal.js"

const createRow = (patient) => {
    const row = document.createElement('div')
    row.classList.add('column')
    row.innerHTML =
        `<span>${patient.firstName}</span>
         <span>${patient.lastName}</span>
         <span>${formatDate(patient.birthDate)}</span>
         <span>${patient.phone}</span>
         <span>${patient.cpf}</span>
         <span>
             <img src="img/edit.png" alt="Editar paciente" id="edit">
         </span>`

    return row
}

const savePatient = async () => {
    const patient = {
        "firstName": document.getElementById('firstName').value,
        "lastName": document.getElementById('lastName').value,
        "birthDate": document.getElementById('birthDate').value,
        "phone": document.getElementById('phone').value,
        "cpf": document.getElementById('cpf').value
    }

    await createPatient(patient)
}

const updateTable = async () => {
    const tableContainer = document.getElementById('values')

    const patients = await readPatients()

    const rows = patients.map(createRow)
    tableContainer.replaceChildren(...rows)
}

updateTable()

document.getElementById('new-patience').addEventListener('click', openModal)
document.getElementById('save').addEventListener('click', savePatient)
