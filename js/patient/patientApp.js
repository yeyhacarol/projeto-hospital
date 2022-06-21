'use strict'

import { formatDate } from "../utils/formatDate.js"
import { createPatient, readPatient, readPatients, updatePatient } from "./patient.js"
import { openModal, closeModal } from "../modal.js"

const createRow = (patient) => {
    const row = document.createElement('div')
    row.classList.add('row')
    row.innerHTML =
        `<span>${patient.firstName}</span>
         <span>${patient.lastName}</span>
         <span>${formatDate(patient.birthDate)}</span>
         <span>${patient.phone}</span>
         <span>${patient.cpf}</span>
         <span>
             <img src="img/edit.png" alt="Editar paciente" id="edit-${patient.id}">
         </span>`

    return row
}

const savePatient = async () => {
    const patient = {
        "firstName": document.getElementById('firstName').value.toLowerCase(),
        "lastName": document.getElementById('lastName').value.toLowerCase(),
        "birthDate": document.getElementById('birthDate').value,
        "phone": document.getElementById('phone').value,
        "cpf": document.getElementById('cpf').value
    }

    const form = document.getElementById('modal-container')

    if (form.dataset.id) {
        await updatePatient(patient, form.dataset.id)
    } else {
        await createPatient(patient)
    }

    closeModal()
    updateTable()

}

const editPatient = async (event) => {
    if (event.target.tagName === 'IMG') {

        const [action, id] = event.target.id.split('-')

        if (action == 'edit') {
            openModal()

            let patient = await readPatient(id)

            document.getElementById('modal-container').dataset.id = patient.id

            document.getElementById('firstName').value = patient.firstName
            document.getElementById('lastName').value = patient.lastName
            document.getElementById('birthDate').value = patient.birthDate
            document.getElementById('phone').value = patient.phone
            document.getElementById('cpf').value = patient.cpf

        }
    }

}

const updateTable = async () => {
    const tableContainer = document.getElementById('values')

    const patients = await readPatients()

    const rows = patients.map(createRow)
    tableContainer.replaceChildren(...rows)
}

updateTable()

document.getElementById('new-patience').addEventListener('click', openModal)
document.getElementById('close-modal').addEventListener('click', closeModal)
document.getElementById('save').addEventListener('click', savePatient)
document.getElementById('values').addEventListener('click', editPatient)
