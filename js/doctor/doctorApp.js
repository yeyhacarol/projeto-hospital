'use strict'

import { readDoctors,getSpecialty, createDoctor, readDoctor, updateDoctor } from "./doctor.js"
import { closeModal, openModal } from "../modal.js"
import { capitalize } from "../utils/capitalize.js"

const createRow = (doctor) => {
    const row = document.createElement('div')
    row.classList.add('row')

    let specialties;

    if(doctor.specialties.length > 1){
        specialties = doctor.specialties.reduce(function (a, b) {
            return (a.name || a) + ", " + b.name}
        )
    }else{
        specialties = doctor.specialties[0].name
    }

    row.innerHTML =
        `<span>${doctor.firstName}</span>
         <span>${doctor.lastName}</span>
         <span>${ specialties }</span>
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

const updateOption = async () => {
    const tableContainer = document.getElementById('specialties')

    const specialties = await getSpecialty()
    specialties.unshift(
        {
            id: 0,
            name:"Selecione uma especialidade",
            cost: 0
        }
    );
    const options = specialties.map(createOption)
    tableContainer.replaceChildren(...options)
}

const createOption = (specialty) => {
    const option = document.createElement('option')
    option.setAttribute("data-id", specialty.id);
    option.setAttribute("data-cost", specialty.cost);
    option.innerHTML = specialty.name

    return option
}

const saveDoctor = async () => {

    var options = document.getElementById('specialties').selectedOptions;
    var selectedSpecialties = Array.from(options).map(({ dataset }) => dataset.id);
    const doctor = {
        "firstName": document.getElementById('firstName').value.toLowerCase(),
        "lastName": document.getElementById('lastName').value.toLowerCase(),
        "specialties": selectedSpecialties,
        "phone": document.getElementById('phone').value
    }

    const form = document.getElementById('doctor-registration')

    if (form.dataset.id) {
        await updateDoctor(doctor, form.dataset.id)
    } else {
       await createDoctor(doctor)
    }

    closeModal()
    updateTable()

}

const editDoctor = async (event) => {
    if (event.target.tagName === 'IMG') {

        const [action, id] = event.target.id.split('-')

        if (action == 'edit') {
            openModal(document.getElementById('doctor-modal'))

            let doctor = await readDoctor(id)

            document.getElementById('doctor-registration').dataset.id = doctor.id

            document.getElementById('firstName').value = capitalize(doctor.firstName)
            document.getElementById('lastName').value = capitalize(doctor.lastName)
            document.getElementById('phone').value = doctor.phone
            let element = document.getElementById('specialties');
            let values = doctor.specialties.map(item =>  item.name);

            for (var i = 0; i < element.options.length; i++) {
                element.options[i].selected = values.indexOf(element.options[i].value) >= 0;
            }

        }
    }

}


document.getElementById('save-doctor').addEventListener('click', saveDoctor)
document.getElementById('values').addEventListener('click', editDoctor)

updateTable()
updateOption()

