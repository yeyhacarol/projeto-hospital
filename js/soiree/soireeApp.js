import { getPatienteByName, getSpecialty } from "./soiree.js"

const createRow = (patient) => {
    const row = document.createElement('div')
    row.classList.add('column-patient')
    row.dataset.id = patient.id
    row.innerHTML =
        `<span>${patient.firstName}</span>
         <span>${patient.lastName}</span> -
         <span>${patient.cpf}</span>
        `

    return row
}

const createOption = (specialty) => {
    const option = document.createElement('option')
    option.innerHTML =
        `<option id="${specialty.id}">${specialty.name}</span>`

    return option
}

const updateOption = async () => {
    const tableContainer = document.getElementById('specialty')

    const specialties = await getSpecialty()
    console.log(specialties)
    const options = specialties.map(createOption)
    tableContainer.replaceChildren(...options)
}

const updateTable = async () => {
    const tableContainer = document.getElementById('data-list')

    const patients = await getPatienteByName(document.getElementById('patient-name').value)

    const rows = patients.map(createRow)
    tableContainer.replaceChildren(...rows)

    return patients
}



const selectPatientByName = async () => {
    if (document.getElementById('patient-name').value.length > 2) {
        const patients = await updateTable()

        const columnsPatient = document.querySelectorAll('.column-patient');

        for (const column of columnsPatient) {
            column.addEventListener('click', (event) => {
                let patient = patients.filter(item => {
                    return item.id == event.target.parentElement.dataset.id
                })[0]

                document.getElementById('patient-name').value = patient.firstName + ' ' + patient.lastName
                document.getElementById('patient-cpf').value = patient.cpf
                document.getElementById('patient-birth-date').value = patient.birthDate
            });
        }
    }
}

updateOption()
document.getElementById('patient-name').addEventListener('keypress', selectPatientByName)


